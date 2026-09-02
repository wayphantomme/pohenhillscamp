import ImageCarousel from "./ImageCarousel";
import AvailabilityDisplay from "./AvailabilityDisplay";
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
      {/* Top row: image carousel (left) + availability panel (right) */}
      <div className="ph-room-card__top">
        <div className="ph-room-card__carousel-wrap">
          <ImageCarousel images={room.images} alt={room.name} />
        </div>
        <div className="ph-room-card__availability-wrap">
          <AvailabilityDisplay
            unitCount={room.unitCount}
            roomName={room.name}
            bookingUrl={room.bookingUrl}
          />
        </div>
      </div>

      {/* Bottom row: full-width room details */}
      <div className="ph-room-card__info">
        <p className="ph-room-card__price">{room.priceLabel}</p>

        <ul className="ph-room-card__specs">
          <li><strong>Size:</strong> {room.size}</li>
          <li><strong>Bed:</strong> {room.bedSize}</li>
          <li><strong>Capacity:</strong> {room.capacity}</li>
          <li><strong>Breakfast:</strong> {room.breakfast}</li>
          <li><strong>Bathroom:</strong> {room.bathroom}</li>
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
    </article>
  );
}
