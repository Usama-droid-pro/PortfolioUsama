// Simple Icons paths for the tech pills, keyed by Simple Icons slug.
// Named imports keep only these icons in the bundle.
import {
  siNextdotjs, siReact, siNodedotjs, siPostgresql, siDocker, siClaude, siTypescript, siExpress,
  siMongodb, siRedis, siPrisma, siGraphql, siSocketdotio, siTailwindcss, siShadcnui, siNginx,
  siLinux, siPm2, siGithubactions, siMysql, siFirebase, siStripe, siCursor, siModelcontextprotocol,
  siElectron, siAstro, siWebrtc, siSequelize, siGit, siWindsurf,
  siJavascript, siCss, siBootstrap, siRadixui, siMui, siMantine, siMongoose, siVercel,
  siNamecheap, siHostinger, siDigitalocean, siNetlify, siMarkdown,
} from "simple-icons";

export const techIcons: Record<string, { path: string; hex: string }> = {
  nextdotjs: siNextdotjs, react: siReact, nodedotjs: siNodedotjs, postgresql: siPostgresql,
  docker: siDocker, claude: siClaude, typescript: siTypescript, express: siExpress,
  mongodb: siMongodb, redis: siRedis, prisma: siPrisma, graphql: siGraphql,
  socketdotio: siSocketdotio, tailwindcss: siTailwindcss, shadcnui: siShadcnui, nginx: siNginx,
  linux: siLinux, pm2: siPm2, githubactions: siGithubactions, mysql: siMysql,
  firebase: siFirebase, stripe: siStripe, cursor: siCursor, modelcontextprotocol: siModelcontextprotocol,
  electron: siElectron, astro: siAstro, webrtc: siWebrtc, sequelize: siSequelize,
  git: siGit, windsurf: siWindsurf,
  javascript: siJavascript, css: siCss, bootstrap: siBootstrap, radixui: siRadixui,
  mui: siMui, mantine: siMantine, mongoose: siMongoose, vercel: siVercel,
  namecheap: siNamecheap, hostinger: siHostinger, digitalocean: siDigitalocean, netlify: siNetlify,
  markdown: siMarkdown,
};
