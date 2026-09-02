import ImageCarousel from "./ImageCarousel";
import SSABookingWidget from "./SSABookingWidget";
import type { Room } from "@/data/rooms";

interface RoomCardProps {
  room: Room;
}

export default function RoomCard({ room }: RoomCardProps) {
  return (
    <article
      id={room.id}
      className="ph-room-card"
      aria-labelledby={`room-${room.id}-heading`}
    >
      <div className="ph-room-card__grid">
        {/* Left: carousel + info */}
        <div className="ph-room-card__left">
          <ImageCarousel images={room.images} alt={room.name} />
          <div className="ph-room-card__info">
            <p className="ph-room-card__price">{room.priceLabel}</p>
            <ul className="ph-room-card__specs">
              <li>
                <strong>Size:</strong> {room.size}
              </li>
              <li>
                <strong>Bed:</strong> {room.bedSize}
              </li>
              <li>
                <strong>Capacity:</strong> {room.capacity}
              </li>
              <li>
                <strong>Breakfast:</strong> {room.breakfast}
              </li>
              <li>
                <strong>Bathroom:</strong> {room.bathroom}
              </li>
            </ul>
            <ul className="ph-room-card__amenities">
              {room.amenities.map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ul>
            {room.inclusions.length > 0 && (
              <ul className="ph-room-card__inclusions">
                {room.inclusions.map((inc) => (
                  <li key={inc}>✓ {inc}</li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Right: booking widget */}
        <div className="ph-room-card__right">
          <SSABookingWidget
            types={room.ssaTypes}
            label={room.ssaLabel}
            roomName={room.name}
          />
          <p className="ph-room-card__note">{room.note}</p>
          <a
            href={room.bookingUrl}
            className="ph-btn ph-btn--primary"
            target="_blank"
            rel="noopener noreferrer"
          >
            Book Here
          </a>
        </div>
      </div>
    </article>
  );
}
