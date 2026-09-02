import { ROOMS, CAMPING_TENT } from "@/data/rooms";
import RoomCard from "./RoomCard";
import CampingTentCard from "./CampingTentCard";
import { SITE } from "@/data/site";

export default function RoomsSection() {
  return (
    <section id="rooms" className="ph-section ph-rooms" aria-labelledby="rooms-heading">
      <div className="ph-container">
        <h2 id="rooms-heading" className="ph-section__title">
          Pohen Hills Room
        </h2>

        <div className="ph-rooms__list">
          {ROOMS.map((room, i) => (
            <div key={room.id} className="ph-rooms__item">
              {i > 0 && <hr className="ph-rooms__divider" />}
              <div className="ph-rooms__type-header">
                <h3 className="ph-rooms__type-name" id={`room-${room.id}-heading`}>
                  {room.name}
                </h3>
                <span className="ph-rooms__unit-count">
                  ({room.unitCount} Room{room.unitCount > 1 ? "s" : ""})
                </span>
              </div>
              <RoomCard room={room} />
            </div>
          ))}
        </div>

        {/* Camping Tent — separate section */}
        <div className="ph-rooms__camping">
          <hr className="ph-rooms__divider" />
          <h3 className="ph-rooms__type-name">Camping Tent</h3>
          <CampingTentCard data={CAMPING_TENT} />
        </div>
      </div>
    </section>
  );
}
