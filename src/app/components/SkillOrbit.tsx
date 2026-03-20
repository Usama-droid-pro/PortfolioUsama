'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import * as THREE from 'three'
import mindIcon from '@/assets/icons/mindicon.png'

interface Skill {
    name: string
    iconUrl: string  // simple-icons CDN URL
    color: string
    ring: number
}

// All icons from https://cdn.simpleicons.org/{slug}/{hex}
const skills: Skill[] = [
    // Ring 0 — Frontend (innermost, fastest)
    { name: 'React', iconUrl: 'https://cdn.simpleicons.org/react/61DAFB', color: '#61DAFB', ring: 0 },
    { name: 'Next.js', iconUrl: 'https://cdn.simpleicons.org/nextdotjs/ffffff', color: '#ffffff', ring: 0 },
    { name: 'TypeScript', iconUrl: 'https://cdn.simpleicons.org/typescript/3178C6', color: '#3178C6', ring: 0 },
    { name: 'Redux', iconUrl: 'https://cdn.simpleicons.org/redux/764ABC', color: '#764ABC', ring: 0 },
    { name: 'Tailwind CSS', iconUrl: 'https://cdn.simpleicons.org/tailwindcss/38BDF8', color: '#38BDF8', ring: 0 },

    // Ring 1 — Backend (middle)
    { name: 'Node.js', iconUrl: 'https://cdn.simpleicons.org/nodedotjs/68A063', color: '#68A063', ring: 1 },
    { name: 'Express', iconUrl: 'https://cdn.simpleicons.org/express/ffffff', color: '#ffffff', ring: 1 },
    { name: 'MongoDB', iconUrl: 'https://cdn.simpleicons.org/mongodb/47A248', color: '#47A248', ring: 1 },
    { name: 'PostgreSQL', iconUrl: 'https://cdn.simpleicons.org/postgresql/336791', color: '#336791', ring: 1 },
    { name: 'GraphQL', iconUrl: 'https://cdn.simpleicons.org/graphql/E535AB', color: '#E535AB', ring: 1 },
    { name: 'Redis', iconUrl: 'https://cdn.simpleicons.org/redis/DC382D', color: '#DC382D', ring: 1 },
    { name: 'Socket.io', iconUrl: 'https://cdn.simpleicons.org/socketdotio/ffffff', color: '#ffffff', ring: 1 },

    // Ring 2 — DevOps / Integrations (outermost, slowest)
    { name: 'React Native', iconUrl: 'https://cdn.simpleicons.org/react/61DAFB', color: '#61DAFB', ring: 2 },
    { name: 'Docker', iconUrl: 'https://cdn.simpleicons.org/docker/2496ED', color: '#2496ED', ring: 2 },
    { name: 'AWS S3', iconUrl: 'https://cdn.simpleicons.org/amazons3/FF9900', color: '#FF9900', ring: 2 },
    { name: 'Git', iconUrl: 'https://cdn.simpleicons.org/git/F05032', color: '#F05032', ring: 2 },
    { name: 'Firebase', iconUrl: 'https://cdn.simpleicons.org/firebase/FFA000', color: '#FFA000', ring: 2 },
    { name: 'Stripe', iconUrl: 'https://cdn.simpleicons.org/stripe/6772E5', color: '#6772E5', ring: 2 },
    { name: 'Cloudinary', iconUrl: 'https://cdn.simpleicons.org/cloudinary/3448C5', color: '#3448C5', ring: 2 },
]

// Increased radii & speeds for larger orbits
const RING_RADII = [148, 228, 316]
const RING_SPEEDS = [0.38, 0.20, 0.12]
const RING_TILTS_X = [Math.PI * 0.09, Math.PI * 0.22, Math.PI * 0.13]
const RING_TILTS_Z = [0, Math.PI * 0.06, Math.PI * 0.10]
const ICON_SIZES = [68, 62, 55]   // screen-space size of each icon plane

/* ----------------------------------------------------------------
   Loads a brand SVG from simple-icons CDN, draws it centered on a
   128×128 canvas with a dark pill background + colored border ring.
   Returns a THREE.CanvasTexture ready to use as a sprite material.
---------------------------------------------------------------- */
function loadBrandTexture(skill: Skill): Promise<THREE.CanvasTexture> {
    return new Promise((resolve) => {
        const size = 192
        const cv = document.createElement('canvas')
        cv.width = size
        cv.height = size
        const ctx = cv.getContext('2d')!

        const drawFinal = (iconImg?: HTMLImageElement) => {
            ctx.clearRect(0, 0, size, size)

            // Outer glow halo (semi-transparent ring)
            ctx.beginPath()
            ctx.arc(size / 2, size / 2, size / 2 - 2, 0, Math.PI * 2)
            ctx.strokeStyle = skill.color + '66'   // 40% opacity
            ctx.lineWidth = 6
            ctx.stroke()

            // Dark pill background
            ctx.beginPath()
            ctx.arc(size / 2, size / 2, size / 2 - 8, 0, Math.PI * 2)
            ctx.fillStyle = 'rgba(6, 12, 24, 0.92)'
            ctx.fill()

            // Bright border ring
            ctx.beginPath()
            ctx.arc(size / 2, size / 2, size / 2 - 8, 0, Math.PI * 2)
            ctx.strokeStyle = skill.color
            ctx.lineWidth = 3.5
            ctx.stroke()

            if (iconImg) {
                // Draw the brand icon (SVG loaded as image) centered with padding
                const pad = 38
                ctx.drawImage(iconImg, pad, pad, size - pad * 2, size - pad * 2)
            } else {
                // Fallback: 2-letter abbreviation
                ctx.font = `bold ${size * 0.30}px system-ui, sans-serif`
                ctx.fillStyle = skill.color
                ctx.textAlign = 'center'
                ctx.textBaseline = 'middle'
                ctx.fillText(skill.name.slice(0, 2).toUpperCase(), size / 2, size / 2 + 2)
            }

            resolve(new THREE.CanvasTexture(cv))
        }

        // Load real brand icon
        const img = new Image()
        img.crossOrigin = 'anonymous'
        img.onload = () => drawFinal(img)
        img.onerror = () => drawFinal()          // graceful fallback
        img.src = skill.iconUrl
    })
}

export function SkillOrbit() {
    const mountRef = useRef<HTMLDivElement>(null)
    const frameRef = useRef<number>(0)
    const startTimeRef = useRef(0)
    const mouseRef = useRef({ x: 0, y: 0 })
    const [tooltip, setTooltip] = useState<{ name: string; x: number; y: number; color: string } | null>(null)

    const handleMouseMove = useCallback((e: MouseEvent) => {
        if (!mountRef.current) return
        const rect = mountRef.current.getBoundingClientRect()
        mouseRef.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1
        mouseRef.current.y = -((e.clientY - rect.top) / rect.height) * 2 + 1
    }, [])

    useEffect(() => {
        if (!mountRef.current) return
        const container = mountRef.current
        const W = container.clientWidth
        const H = container.clientHeight

        /* ---- Scene ---- */
        const scene = new THREE.Scene()
        const camera = new THREE.PerspectiveCamera(55, W / H, 0.1, 2000)
        camera.position.set(0, 70, 480)
        camera.lookAt(0, 0, 0)

        /* ---- Renderer ---- */
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        renderer.setSize(W, H)
        renderer.setClearColor(0x000000, 0)
        container.appendChild(renderer.domElement)

        /* ---- Lighting ---- */
        scene.add(new THREE.AmbientLight(0xffffff, 0.7))
        const dirL = new THREE.DirectionalLight(0xABE2F4, 1.4)
        dirL.position.set(5, 10, 5)
        scene.add(dirL)
        const pLight1 = new THREE.PointLight(0x5D9F96, 2.5, 700)
        pLight1.position.set(-120, 0, 240)
        scene.add(pLight1)
        const pLight2 = new THREE.PointLight(0xFA7305, 1.8, 600)
        pLight2.position.set(150, -80, 120)
        scene.add(pLight2)

        /* ---- Central glowing sphere ---- */
        const cSphere = new THREE.Mesh(
            new THREE.SphereGeometry(44, 64, 64),
            new THREE.MeshPhongMaterial({ color: 0x5D9F96, emissive: 0x1a4a40, shininess: 140, transparent: true, opacity: 0.96 })
        )
        scene.add(cSphere)

        // Inner glow shell
        scene.add(new THREE.Mesh(
            new THREE.SphereGeometry(50, 32, 32),
            new THREE.MeshBasicMaterial({ color: 0x5D9F96, transparent: true, opacity: 0.07, side: THREE.BackSide })
        ))

        // Equatorial halo ring
        const halo = new THREE.Mesh(
            new THREE.TorusGeometry(56, 1.8, 16, 120),
            new THREE.MeshBasicMaterial({ color: 0xABE2F4, transparent: true, opacity: 0.45 })
        )
        halo.rotation.x = Math.PI / 2
        scene.add(halo)

        /* ---- Orbit guide lines ---- */
        RING_RADII.forEach((r, i) => {
            const pts = new THREE.EllipseCurve(0, 0, r, r * 0.36, 0, Math.PI * 2, false, 0)
                .getPoints(160).map(p => new THREE.Vector3(p.x, p.y, 0))
            const ring = new THREE.LineLoop(
                new THREE.BufferGeometry().setFromPoints(pts),
                new THREE.LineBasicMaterial({ color: 0xA7CFC3, transparent: true, opacity: 0.16 })
            )
            ring.rotation.x = RING_TILTS_X[i]
            ring.rotation.z = RING_TILTS_Z[i]
            scene.add(ring)
        })

        /* ---- Star field ---- */
        const starPos = new Float32Array(300 * 3)
        for (let i = 0; i < 300; i++) {
            starPos[i * 3 + 0] = (Math.random() - 0.5) * 1100
            starPos[i * 3 + 1] = (Math.random() - 0.5) * 1100
            starPos[i * 3 + 2] = (Math.random() - 0.5) * 500
        }
        const starGeo = new THREE.BufferGeometry()
        starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3))
        scene.add(new THREE.Points(starGeo, new THREE.PointsMaterial({ color: 0xABE2F4, size: 1.6, transparent: true, opacity: 0.30 })))

        /* ---- Icon sprites — async texture loading ---- */
        type SpriteDef = { mesh: THREE.Mesh; skill: Skill; ring: number; angleOffset: number }
        const spriteDefs: SpriteDef[] = []
        const spritesByRing: Record<number, Skill[]> = { 0: [], 1: [], 2: [] }
        skills.forEach(s => spritesByRing[s.ring].push(s))

        // Raycaster state (set up before animate)
        const raycaster = new THREE.Raycaster()
        raycaster.params.Mesh = { threshold: 4 }
        let hoveredMesh: THREE.Mesh | null = null

        /* ---- Animation loop (started after textures load) ---- */
        let animStarted = false
        const startAnimate = () => {
            if (animStarted) return
            animStarted = true
            startTimeRef.current = performance.now()

            const animate = () => {
                frameRef.current = requestAnimationFrame(animate)
                const t = (performance.now() - startTimeRef.current) / 1000

                camera.position.y = 70 + Math.sin(t * 0.38) * 10
                cSphere.rotation.y = t * 0.22
                halo.rotation.z = t * 0.14

                spriteDefs.forEach(({ mesh, ring, angleOffset }) => {
                    const angle = t * RING_SPEEDS[ring] + angleOffset
                    const r = RING_RADII[ring]
                    const ey = r * 0.36

                    const rawX = r * Math.cos(angle)
                    const rawY = ey * Math.sin(angle)

                    const cX = Math.cos(RING_TILTS_X[ring]), sX = Math.sin(RING_TILTS_X[ring])
                    const cZ = Math.cos(RING_TILTS_Z[ring]), sZ = Math.sin(RING_TILTS_Z[ring])

                    const zX = rawX * cZ - rawY * sZ
                    const zY = rawX * sZ + rawY * cZ

                    mesh.position.set(zX, zY * cX, zY * sX)
                    mesh.lookAt(camera.position)

                    const depthScale = 0.72 + (mesh.position.z + 320) / (320 * 2) * 0.52
                    mesh.scale.setScalar(depthScale)
                        ; (mesh.material as THREE.MeshBasicMaterial).opacity = 0.45 + depthScale * 0.55
                })

                // Hover detection
                raycaster.setFromCamera(mouseRef.current as THREE.Vector2, camera)
                const hits = raycaster.intersectObjects(spriteDefs.map(s => s.mesh))
                if (hits.length > 0) {
                    const hit = hits[0].object as THREE.Mesh
                    if (hit !== hoveredMesh) {
                        hoveredMesh = hit
                        const skill = hit.userData.skill as Skill
                        const proj = hit.position.clone().project(camera)
                        const rect = container.getBoundingClientRect()
                        setTooltip({
                            name: skill.name,
                            x: ((proj.x + 1) / 2) * rect.width,
                            y: ((-proj.y + 1) / 2) * rect.height - 52,
                            color: skill.color,
                        })
                    }
                } else if (hoveredMesh) {
                    hoveredMesh = null
                    setTooltip(null)
                }

                renderer.render(scene, camera)
            }
            animate()
        }

        // Build icon meshes from async textures
        let loadedCount = 0
        skills.forEach(skill => {
            const ringSkills = spritesByRing[skill.ring]
            const idx = ringSkills.indexOf(skill)
            const angleOff = (idx / ringSkills.length) * Math.PI * 2

            loadBrandTexture(skill).then(tex => {
                const mat = new THREE.MeshBasicMaterial({ map: tex, transparent: true, side: THREE.DoubleSide, depthWrite: false })
                const mesh = new THREE.Mesh(new THREE.PlaneGeometry(ICON_SIZES[skill.ring], ICON_SIZES[skill.ring]), mat)
                mesh.userData = { skill }
                scene.add(mesh)
                spriteDefs.push({ mesh, skill, ring: skill.ring, angleOffset: angleOff })

                loadedCount++
                // Start animation as soon as the first icon is ready; remaining load in
                if (loadedCount === 1) startAnimate()
            })
        })

        /* ---- Resize ---- */
        const onResize = () => {
            const w = container.clientWidth, h = container.clientHeight
            camera.aspect = w / h
            camera.updateProjectionMatrix()
            renderer.setSize(w, h)
        }
        window.addEventListener('resize', onResize)
        container.addEventListener('mousemove', handleMouseMove)

        return () => {
            cancelAnimationFrame(frameRef.current)
            window.removeEventListener('resize', onResize)
            container.removeEventListener('mousemove', handleMouseMove)
            renderer.dispose()
            if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement)
        }
    }, [handleMouseMove])

    return (
        <div className="relative w-full h-full select-none">
            {/* Three.js canvas mount */}
            <div ref={mountRef} className="w-full h-full" />

            {/* Hover tooltip */}
            {tooltip && (
                <div
                    className="pointer-events-none absolute z-30 px-3 py-1.5 rounded-lg text-xs font-bold shadow-xl"
                    style={{
                        left: tooltip.x,
                        top: tooltip.y,
                        transform: 'translateX(-50%)',
                        background: 'rgba(4, 10, 22, 0.92)',
                        border: `1px solid ${tooltip.color}88`,
                        color: tooltip.color,
                        backdropFilter: 'blur(10px)',
                        whiteSpace: 'nowrap',
                        letterSpacing: '0.04em',
                        boxShadow: `0 0 16px ${tooltip.color}44`,
                    }}
                >
                    {tooltip.name}
                </div>
            )}

            {/* mindicon image overlay on central sphere */}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center" style={{ zIndex: 5 }}>
                <img
                    src={mindIcon.src}
                    alt="mind"
                    width={90}
                    height={90}
                    style={{
                        objectFit: 'contain',
                        filter: 'drop-shadow(0 0 14px #5D9F96cc) drop-shadow(0 0 28px #5D9F9688)',
                        opacity: 0.92,
                    }}
                />
            </div>
        </div>
    )
}
