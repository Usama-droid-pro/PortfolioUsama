import type { Metadata, Viewport } from "next";
import { Unbounded, Hanken_Grotesk } from "next/font/google";
import { siteUrl } from "@/lib/site";
import SmoothScroll from "@/components/SmoothScroll";
import "./globals.css";

const unbounded = Unbounded({ subsets: ["latin"], weight: ["500", "800"], variable: "--font-unbounded" });
const hanken = Hanken_Grotesk({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-hanken" });

const title = "Usama | Senior Full-Stack Engineer";
const description =
  "Senior full-stack engineer with 4+ years building web products with React, Node.js and PostgreSQL, from the database to deployment, using AI tools in a daily workflow.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  openGraph: { type: "website", title, description, siteName: "Usama" },
  twitter: { card: "summary_large_image", title, description },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#2f3cff",
};

// Runs before paint: hides [data-intro] elements until the hero timeline
// takes over. Safety timeout reveals them if JS fails later.
const motionScript = `(function(){if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;var d=document.documentElement;d.classList.add('js-motion');setTimeout(function(){d.classList.remove('js-motion')},4000)})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${unbounded.variable} ${hanken.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: motionScript }} />
      </head>
      <body>
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
