'use client'

import { useEffect, useRef, useState, useMemo } from 'react'
import * as THREE from 'three'

const allSkills = [
  'JavaScript', 'TypeScript', 'React.js', 'Next.js', 'Node.js', 'React Native',
  'Redux', 'GraphQL', 'REST APIs', 'Redis', 'Socket.io', 'WebRTC',
  'MongoDB', 'PostgreSQL', 'MySQL', 'Prisma', 'Sequelize', 'NoSQL',
  'Tailwind', 'CSS', 'Radix UI', 'Shadcn', 'Material UI', 'Bootstrap',
  'Firebase', 'Stripe', 'Cloudinary', 'Wasabi', 'Docusign', 'AWS S3',
  'Twilio', 'Veriff', 'Auth', 'Payment Integrations', 'Docker', 'CI/CD',
  'Linux', 'Nginx', 'Cpanel', 'Cron Jobs', 'SMTP', 'Agile/Scrum',
  'Claude Code', 'Cursor', 'Trae AI', 'Windsurf', 'Qoder', 'Antigravity'
]

export function SkillNetwork() {
  const mountRef = useRef<HTMLDivElement>(null)
  const [labels, setLabels] = useState<{ id: number; text: string; x: number; y: number; scale: number; opacity: number }[]>([])

  // Create 3D points evenly distributed on a sphere
  const points = useMemo(() => {
    const pts: THREE.Vector3[] = []
    const phi = Math.PI * (3 - Math.sqrt(5)) // golden angle
    const radius = 120

    for (let i = 0; i < allSkills.length; i++) {
      const y = 1 - (i / (allSkills.length - 1)) * 2
      const radiusAtY = Math.sqrt(1 - y * y) * radius
      const theta = phi * i

      const x = Math.cos(theta) * radiusAtY
      const z = Math.sin(theta) * radiusAtY
      pts.push(new THREE.Vector3(x, y * radius, z))
    }
    return pts
  }, [])

  useEffect(() => {
    if (!mountRef.current) return
    const container = mountRef.current
    let W = container.clientWidth
    let H = container.clientHeight

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, W / H, 1, 1000)
    camera.position.z = 320

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(W, H)
    container.appendChild(renderer.domElement)

    const group = new THREE.Group()
    scene.add(group)

    // Form connections (nodes that are close to each other)
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x5D9F96,
      transparent: true,
      opacity: 0.15,
    })

    const lineGeometry = new THREE.BufferGeometry()
    const linePositions: number[] = []

    for (let i = 0; i < points.length; i++) {
      for (let j = i + 1; j < points.length; j++) {
        if (points[i].distanceTo(points[j]) < 65) {
          linePositions.push(
            points[i].x, points[i].y, points[i].z,
            points[j].x, points[j].y, points[j].z
          )
        }
      }
    }

    lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3))
    const lines = new THREE.LineSegments(lineGeometry, lineMaterial)
    group.add(lines)

    // Add glowing nodes at the vertices
    const dotGeo = new THREE.SphereGeometry(1.5, 8, 8)
    const dotMat = new THREE.MeshBasicMaterial({ color: 0xABE2F4 })
    points.forEach(p => {
      const dot = new THREE.Mesh(dotGeo, dotMat)
      dot.position.copy(p)
      group.add(dot)
    })

    let raf: number
    const animate = () => {
      raf = requestAnimationFrame(animate)

      // Rotate network
      group.rotation.y += 0.002
      group.rotation.x += 0.001

      renderer.render(scene, camera)

      // Project 3D points to 2D for HTML labels
      const newLabels = points.map((p, i) => {
        const v = p.clone()
        // apply group rotation to point to get world position
        v.applyMatrix4(group.matrixWorld)
        v.project(camera)

        const x = (v.x * .5 + .5) * W
        const y = (v.y * -.5 + .5) * H

        // Use z coordinate to determine scale and opacity
        // v.z goes from roughly -1 to +1 in projection
        const zDepth = (v.z + 1) / 2 // normalized 0 to 1
        // we want points closer to camera to be larger and more opaque
        // actually v.z closer to 0 is closer to camera in NDC, but since camera is at 300, objects at 120 are closer. 
        // simpler: calculate distance from camera
        const worldPos = p.clone().applyMatrix4(group.matrixWorld)
        const dist = camera.position.distanceTo(worldPos)

        // max distance ~ 440, min distance ~ 200
        const scale = Math.max(0.4, 1 - (dist - 200) / 240)
        const opacity = Math.max(0.1, 1 - (dist - 200) / 200)

        return {
          id: i,
          text: allSkills[i],
          x,
          y,
          scale,
          opacity
        }
      })

      // Sort by scale so larger (closer) ones render on top organically, though React maps it, z-index can fix it.
      setLabels(newLabels)
    }
    animate()

    const onResize = () => {
      W = container.clientWidth
      H = container.clientHeight
      camera.aspect = W / H
      camera.updateProjectionMatrix()
      renderer.setSize(W, H)
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
      renderer.dispose()
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
    }
  }, [points])

  return (
    <div className="relative w-full h-[500px]" style={{ perspective: '1000px' }}>
      <div ref={mountRef} className="absolute inset-0 z-0" />

      {/* HTML Labels overlaid on top of 3D Canvas */}
      <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
        {labels.map((lbl) => (
          <div
            key={lbl.id}
            className="absolute left-0 top-0 pointer-events-auto transition-colors hover:text-white cursor-crosshair whitespace-nowrap"
            style={{
              transform: `translate3d(${lbl.x}px, ${lbl.y}px, 0) translate(-50%, -50%) scale(${lbl.scale})`,
              opacity: lbl.opacity,
              zIndex: Math.round(lbl.scale * 100),
              color: '#5D9F96',
              fontWeight: lbl.scale > 0.8 ? 700 : 500,
              fontSize: '14px',
              textShadow: '0 2px 10px rgba(0,0,0,0.8)'
            }}
          >
            {lbl.text}
          </div>
        ))}
      </div>
    </div>
  )
}
