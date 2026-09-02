import { SITE } from "@/data/site";
import GoogleReviews from "./GoogleReviews";

export default function AboutSection() {
  return (
    <section id="about" className="ph-section ph-about" aria-labelledby="about-heading">
      <div className="ph-container">
        <h2 id="about-heading" className="ph-section__title">
          Pohen Hills Camp
        </h2>
        <p className="ph-about__desc">{SITE.description}</p>
        <GoogleReviews />
      </div>
    </section>
  );
}
