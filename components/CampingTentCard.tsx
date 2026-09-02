import Image from "next/image";
import { resolveImageUrl } from "@/lib/cloudinary";
import AvailabilityDisplay from "./AvailabilityDisplay";
import type { CAMPING_TENT } from "@/data/rooms";

type CampingTentData = typeof CAMPING_TENT;

interface Props {
  data: CampingTentData;
}

export default function CampingTentCard({ data }: Props) {
  return (
    <article className="ph-camping" aria-labelledby="camping-heading">
      {/* Top row: image (left) + availability calendar (right) — mirrors RoomCard */}
      <div className="ph-room-card__top">
        <div className="ph-camping__img-wrap">
          <Image
            src={resolveImageUrl(data.image, { width: 800, height: 533 })}
            alt="Camping Tent at Pohen Hills"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="ph-room-card__availability-wrap">
          <AvailabilityDisplay
            unitCount={data.unitCount}
            roomName="Camping Tent"
            bookingUrl={data.bookingUrl}
          />
        </div>
      </div>

      {/* Bottom row: full-width camping details */}
      <div className="ph-camping__info">
        {/* Pricing */}
        <div className="ph-camping__pricing">
          <p><strong>CAMPING</strong></p>
          <ul>
            {data.pricing.map((p) => (
              <li key={p.capacity}>
                <strong>Capacity {p.capacity}:</strong> {p.priceLabel}
              </li>
            ))}
          </ul>
        </div>

        {/* Facilities */}
        <div className="ph-camping__facilities">
          <p><strong>FACILITIES</strong></p>
          <ul>
            {data.facilities.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
        </div>

        {/* Rules */}
        <div className="ph-camping__rules">
          <p><strong>CAMPER RULES</strong></p>
          <ul>
            {data.rules.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
        </div>

        {/* Add-ons */}
        <div className="ph-camping__addons">
          <p><strong>ADD ON:</strong></p>
          <ul>
            {data.addOns.map((a) => (
              <li key={a.item}>
                {a.item} — IDR {a.priceIDR.toLocaleString("id-ID")}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}
