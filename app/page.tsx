import fs from "node:fs";
import path from "node:path";
import { experience } from "@/data/profile";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Work from "@/components/Work";
import Experience from "@/components/Experience";
import TechStack from "@/components/TechStack";
import AiFlow from "@/components/AiFlow";
import Showcase from "@/components/Showcase";
import Faq from "@/components/Faq";
import Footer from "@/components/Footer";
// Kept but hidden for now:
// import ToolPile from "@/components/ToolPile"; // falling sticker pile with filters
// import Journey from "@/components/Journey"; // "Follow one request" timeline
// import Stack from "@/components/Stack"; // plain list

// Project screenshots in public/projectspics, keyed by project name.
const shots: Record<string, string> = {
  Fastkey: "/projectspics/fastkey.png",
  "Rita's Italian Ice": "/projectspics/ritasice.png",
  "OBS Workflow Manager": "/projectspics/obsflowmanager.png",
  Vac2Go: "/projectspics/vac2go.png",
};

// Company logos: drop public/companies/<logo>.(svg|png|webp|jpg); missing ones fall back to a letter.
function companyLogos() {
  const dir = path.join(process.cwd(), "public/companies");
  const files = fs.existsSync(dir) ? fs.readdirSync(dir) : [];
  const out: Record<string, string> = {};
  for (const j of experience.jobs) {
    const f = files.find((x) => x.replace(/\.[^.]+$/, "").toLowerCase() === j.logo);
    if (f) out[j.logo] = `/companies/${f}`;
  }
  return out;
}

export default function Home() {
  return (
    <>
    <main>
      <Hero />
      <About />
      <Work shots={shots} />
      <Experience logos={companyLogos()} />
      <TechStack />
      <AiFlow />
      <Faq />
      <Showcase />
    </main>
    <Footer />
    </>
  );
}
