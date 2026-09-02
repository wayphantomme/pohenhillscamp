import { SITE } from "@/data/site";

/**
 * Google Reviews widget.
 * The original site used the "Widget Google Reviews" WordPress plugin.
 * This component reproduces the header stats (rating, count) and links to Google.
 */
export default function GoogleReviews() {
  return (
    <div className="ph-reviews" role="region" aria-label="Google Reviews">
      <div className="ph-reviews__header">
        <a
          href={SITE.googleReviewUrl}
          className="ph-reviews__name"
          target="_blank"
          rel="noopener noreferrer"
        >
          Pohen Hill Camp
        </a>
        <div className="ph-reviews__stars" aria-label={`Rating: ${SITE.googleRating} out of 5`}>
          {Array.from({ length: 5 }).map((_, i) => (
            <span
              key={i}
              className={
                i < Math.floor(SITE.googleRating)
                  ? "ph-reviews__star ph-reviews__star--filled"
                  : i < SITE.googleRating
                  ? "ph-reviews__star ph-reviews__star--half"
                  : "ph-reviews__star"
              }
              aria-hidden="true"
            >
              ★
            </span>
          ))}
          <span className="ph-reviews__rating-num">{SITE.googleRating}</span>
        </div>
        <p className="ph-reviews__count">
          Based on {SITE.googleReviewCount} reviews
        </p>
        <p className="ph-reviews__powered">
          powered by{" "}
          <strong>
            <span style={{ color: "#3c6df0" }}>G</span>
            <span style={{ color: "#d93025" }}>o</span>
            <span style={{ color: "#fb8e28" }}>o</span>
            <span style={{ color: "#3c6df0" }}>g</span>
            <span style={{ color: "#188038" }}>l</span>
            <span style={{ color: "#d93025" }}>e</span>
          </strong>
        </p>
        <a
          href={SITE.googleWriteReviewUrl}
          className="ph-reviews__write-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          review us on Google
        </a>
      </div>
    </div>
  );
}
