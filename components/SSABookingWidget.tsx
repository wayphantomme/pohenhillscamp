"use client";

import { SITE } from "@/data/site";

interface SSABookingWidgetProps {
  /** SSA appointment type IDs */
  types: number[];
  /** SSA label parameter */
  label: number;
  /** Room name for accessibility */
  roomName: string;
}

/**
 * Simple Schedule Appointments (SSA) booking iframe widget.
 *
 * The SSA plugin is hosted on the original WordPress site and continues
 * to serve bookings. The iframe embeds it directly — no changes needed
 * to the booking backend.
 *
 * Note: availability is for display only; actual booking is via WhatsApp.
 */
export default function SSABookingWidget({
  types,
  label,
  roomName,
}: SSABookingWidgetProps) {
  const typesParam = types.join("%2C");
  const bookingUrl = `${SITE.wpBaseUrl}/wp-json/ssa/v1/embed-inner?integration&type&label=${label}&types=${typesParam}&edit&view&payment_provider&ssa_locale=en_US&ssa_is_rtl&appointment_types_view=cardList&version&accent_color&background&padding=20px&font&booking_url=${encodeURIComponent(SITE.wpBaseUrl + "/")}&booking_title=Booking#/`;

  return (
    <div className="ph-ssa-wrapper">
      <iframe
        src={bookingUrl}
        height="400"
        width="100%"
        title={`Book ${roomName}`}
        loading="lazy"
        className="ph-ssa-iframe"
        aria-label={`Availability calendar for ${roomName}`}
      />
    </div>
  );
}
