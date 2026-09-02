"use client";

import Image from "next/image";
import { ACTIVITIES, RESTAURANT, DESTINATIONS } from "@/data/activities";
import { resolveImageUrlClient } from "@/lib/cloudinary-client";
import ImageCarousel from "./ImageCarousel";

export default function ActivitiesSection() {
  return (
    <section
      id="activities"
      className="ph-section ph-activities"
      aria-labelledby="activities-heading"
    >
      <div className="ph-container">
        <h2 id="activities-heading" className="ph-section__title">
          Pohen Hills Activities
        </h2>

        {/* Restaurant */}
        <div className="ph-activities__restaurant">
          <div className="ph-activities__restaurant-grid">
            <div className="ph-activities__restaurant-info">
              <h3 className="ph-activities__restaurant-name">
                {RESTAURANT.name}
              </h3>
              <h4 className="ph-activities__restaurant-sub">
                {RESTAURANT.subtitle}
              </h4>
              <p className="ph-activities__restaurant-desc">
                {RESTAURANT.description}
              </p>
            </div>
            <div className="ph-activities__restaurant-gallery">
              <ImageCarousel images={RESTAURANT.images} alt="Pohen Hills Restaurant" />
            </div>
          </div>
        </div>

        {/* Other Activities */}
        <div className="ph-activities__other">
          <h3 className="ph-activities__other-heading">
            Other Activities for reservation
          </h3>
          <p className="ph-activities__other-desc">
            Book additional activities to make the most of your stay. From
            guided forest walks, morning yoga, bonfires under the stars, to
            traditional Balinese workshops, there&apos;s something for every
            explorer.
          </p>
          <p>
            <strong>Explore. Experience. Enjoy.</strong>
          </p>

          <div className="ph-activities__grid" role="list">
            {ACTIVITIES.map((activity) => (
              <div
                key={activity.id}
                className="ph-activities__item"
                role="listitem"
              >
                <div className="ph-activities__item-img-wrap">
                  <Image
                    src={resolveImageUrlClient(activity.image, {
                      width: 400,
                      height: 300,
                    })}
                    alt={activity.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    style={{ objectFit: "cover" }}
                  />
                  <div className="ph-activities__item-overlay" aria-hidden="true" />
                  <span className="ph-activities__item-label">
                    {activity.title}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Destinations Nearby */}
        <div className="ph-activities__destinations">
          <h3 className="ph-activities__destinations-heading">
            Destination Near By
          </h3>
          <div className="ph-activities__dest-grid" role="list">
            {DESTINATIONS.map((dest) => (
              <div
                key={dest.id}
                className="ph-activities__dest-item"
                role="listitem"
              >
                <div className="ph-activities__dest-img-wrap">
                  <Image
                    src={resolveImageUrlClient(dest.image, {
                      width: 400,
                      height: 300,
                    })}
                    alt={dest.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    style={{ objectFit: "cover" }}
                  />
                  <div className="ph-activities__item-overlay" aria-hidden="true" />
                  <span className="ph-activities__item-label">{dest.title}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
