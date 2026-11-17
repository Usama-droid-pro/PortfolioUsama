import { footer, nav, profile } from "@/data/profile";
import { DownloadIcon, MailIcon, WhatsAppIcon } from "./icons";
import MagneticButton from "./MagneticButton";
import styles from "./Footer.module.css";

// Last thing on the page: call to action, contact details and links.
export default function Footer() {
  return (
    <footer id="contact" className={styles.footer}>
      <div className={styles.top}>
        <div className={styles.pitch}>
          <h2 className={styles.heading}>{footer.heading}</h2>
          <p className={styles.text}>{footer.text}</p>
          <div className={styles.cta}>
            <MagneticButton href={`mailto:${profile.email}`} icon={MailIcon}>
              {footer.emailCta}
            </MagneticButton>
            <MagneticButton href={profile.whatsapp} external tone="whatsapp" icon={WhatsAppIcon}>
              {footer.whatsappCta}
            </MagneticButton>
            <MagneticButton href={profile.resume} external download tone="lilac" icon={DownloadIcon}>
              {footer.resumeCta}
            </MagneticButton>
          </div>
        </div>

        <nav className={styles.col} aria-label="Footer">
          <h3 className={styles.colTitle}>Explore</h3>
          <ul>
            {nav.map((n) => (
              <li key={n.href}>
                <a href={n.href}>{n.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.col}>
          <h3 className={styles.colTitle}>Contact</h3>
          <ul>
            <li>
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
            </li>
            <li>
              <a href={profile.whatsapp} target="_blank" rel="noreferrer">
                WhatsApp {profile.phone}
              </a>
            </li>
            <li>
              <a href={profile.linkedin} target="_blank" rel="noreferrer">
                LinkedIn
              </a>
            </li>
            <li>
              <a href={profile.resume} target="_blank" rel="noreferrer" download>
                Download resume
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className={styles.bottom}>
        <p>
          © {new Date().getFullYear()} {profile.name}. {profile.role}, {profile.location}.
        </p>
        <a href="#top">Back to top ↑</a>
      </div>
    </footer>
  );
}
