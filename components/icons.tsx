import { siWhatsapp } from "simple-icons";

// Small inline icons for the contact buttons; colour follows the text.
export const MailIcon = (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M3 5h18a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm1.6 2 7.4 5.6L19.4 7H4.6ZM4 17h16V9.3l-8 6.1-8-6.1V17Z" />
  </svg>
);

export const WhatsAppIcon = (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d={siWhatsapp.path} />
  </svg>
);

export const DownloadIcon = (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M11 3h2v9.2l3.3-3.3 1.4 1.4L12 16.1l-5.7-5.8 1.4-1.4 3.3 3.3V3ZM4 19h16v2H4v-2Z" />
  </svg>
);
