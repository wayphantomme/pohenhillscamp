import { SITE } from "@/data/site";

export default function ContactSection() {
  return (
    <section
      className="ph-section ph-contact"
      aria-labelledby="contact-heading"
    >
      <div className="ph-container ph-contact__inner">
        <p className="ph-contact__sub">Ready to get in touch?</p>
        <h2 id="contact-heading" className="ph-contact__title">
          CONTACT US
        </h2>
        <a
          href={SITE.whatsapp}
          className="ph-btn ph-btn--primary ph-btn--lg"
          target="_blank"
          rel="noopener noreferrer"
        >
          WhatsApp Now
        </a>
      </div>
    </section>
  );
}
