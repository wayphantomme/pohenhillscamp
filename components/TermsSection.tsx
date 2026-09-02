import { TERMS_AND_CONDITIONS } from "@/data/terms";

export default function TermsSection() {
  return (
    <section
      id="terms"
      className="ph-section ph-terms"
      aria-labelledby="terms-heading"
    >
      <div className="ph-container">
        <h2 id="terms-heading" className="ph-section__title">
          Terms &amp; Conditions
        </h2>
        <div className="ph-terms__box">
          <ul className="ph-terms__list">
            {TERMS_AND_CONDITIONS.map((term, i) => (
              <li key={i} className="ph-terms__item">
                {term}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
