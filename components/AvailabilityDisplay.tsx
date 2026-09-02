"use client";

import { useState, useCallback } from "react";

interface AvailabilityDisplayProps {
  unitCount: number;
  roomName: string;
  /** Base WhatsApp URL — date params will be appended */
  bookingUrl: string;
}

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

function formatDate(d: Date): string {
  return d.toLocaleDateString("id-ID", { day: "2-digit", month: "long", year: "numeric" });
}

function isSameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();
}

function isInRange(date: Date, start: Date | null, end: Date | null) {
  if (!start || !end) return false;
  return date > start && date < end;
}

function buildWhatsAppUrl(base: string, roomName: string, checkIn: Date | null, checkOut: Date | null): string {
  if (!checkIn || !checkOut) return base;
  const ci = formatDate(checkIn);
  const co = formatDate(checkOut);
  const nights = Math.round((checkOut.getTime() - checkIn.getTime()) / 86400000);
  const msg = `Halo, saya ingin booking ${roomName}.\nCheck-in: ${ci} (14:00)\nCheck-out: ${co} (12:00)\nDurasi: ${nights} malam\n\nMohon konfirmasi ketersediaan. Terima kasih.`;
  return `${base}?text=${encodeURIComponent(msg)}`;
}

export default function AvailabilityDisplay({
  unitCount,
  roomName,
  bookingUrl,
}: AvailabilityDisplayProps) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [checkIn, setCheckIn] = useState<Date | null>(null);
  const [checkOut, setCheckOut] = useState<Date | null>(null);
  const [hovered, setHovered] = useState<Date | null>(null);

  // Build calendar grid
  const firstDay = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

  const prevMonth = useCallback(() => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
    else setViewMonth(m => m - 1);
  }, [viewMonth]);

  const nextMonth = useCallback(() => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
    else setViewMonth(m => m + 1);
  }, [viewMonth]);

  const handleDayClick = useCallback((date: Date) => {
    if (date < today) return;
    if (!checkIn || (checkIn && checkOut)) {
      setCheckIn(date);
      setCheckOut(null);
    } else {
      if (date <= checkIn) {
        setCheckIn(date);
        setCheckOut(null);
      } else {
        setCheckOut(date);
      }
    }
  }, [checkIn, checkOut, today]);

  const nights = checkIn && checkOut
    ? Math.round((checkOut.getTime() - checkIn.getTime()) / 86400000)
    : null;

  const waUrl = buildWhatsAppUrl(bookingUrl, roomName, checkIn, checkOut);

  const cells: (Date | null)[] = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => new Date(viewYear, viewMonth, i + 1)),
  ];

  return (
    <div className="ph-availability" aria-label={`Availability calendar for ${roomName}`}>
      {/* Header */}
      <div className="ph-availability__header">
        <span className="ph-availability__title">Availability</span>
        <span className={`ph-availability__badge ${unitCount > 0 ? "ph-availability__badge--available" : "ph-availability__badge--full"}`}>
          {unitCount > 0 ? `${unitCount} Unit${unitCount > 1 ? "s" : ""} Available` : "Fully Booked"}
        </span>
      </div>

      {/* Calendar */}
      <div className="ph-cal">
        {/* Month nav */}
        <div className="ph-cal__nav">
          <button
            className="ph-cal__nav-btn"
            onClick={prevMonth}
            aria-label="Previous month"
          >‹</button>
          <span className="ph-cal__month-label">
            {MONTHS[viewMonth]} {viewYear}
          </span>
          <button
            className="ph-cal__nav-btn"
            onClick={nextMonth}
            aria-label="Next month"
          >›</button>
        </div>

        {/* Day labels */}
        <div className="ph-cal__grid">
          {DAYS.map(d => (
            <div key={d} className="ph-cal__day-label">{d}</div>
          ))}

          {/* Day cells */}
          {cells.map((date, i) => {
            if (!date) return <div key={`empty-${i}`} />;

            const isPast = date < today;
            const isCheckIn = checkIn && isSameDay(date, checkIn);
            const isCheckOut = checkOut && isSameDay(date, checkOut);
            const endForRange = checkOut || hovered;
            const inRange = checkIn && !checkOut && hovered
              ? isInRange(date, checkIn, hovered)
              : isInRange(date, checkIn, checkOut);

            let cls = "ph-cal__day";
            if (isPast) cls += " ph-cal__day--past";
            if (isCheckIn) cls += " ph-cal__day--checkin";
            if (isCheckOut) cls += " ph-cal__day--checkout";
            if (inRange) cls += " ph-cal__day--range";
            if (!isPast && !isCheckIn && !isCheckOut) cls += " ph-cal__day--selectable";

            return (
              <button
                key={date.toISOString()}
                className={cls}
                disabled={isPast}
                onClick={() => handleDayClick(date)}
                onMouseEnter={() => !isPast && setHovered(date)}
                onMouseLeave={() => setHovered(null)}
                aria-label={`${date.getDate()} ${MONTHS[date.getMonth()]}`}
                aria-pressed={!!(isCheckIn || isCheckOut)}
              >
                {date.getDate()}
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected range summary */}
      <div className="ph-availability__summary">
        <div className="ph-availability__date-row">
          <div className="ph-availability__date-block">
            <span className="ph-availability__date-label">Check-in</span>
            <span className="ph-availability__date-value">
              {checkIn ? formatDate(checkIn) : "—"}
            </span>
            <span className="ph-availability__date-time">14:00</span>
          </div>
          <div className="ph-availability__date-sep">→</div>
          <div className="ph-availability__date-block">
            <span className="ph-availability__date-label">Check-out</span>
            <span className="ph-availability__date-value">
              {checkOut ? formatDate(checkOut) : "—"}
            </span>
            <span className="ph-availability__date-time">12:00</span>
          </div>
        </div>
        {nights && (
          <p className="ph-availability__nights">{nights} malam</p>
        )}
      </div>

      <p className="ph-availability__note">
        *Availability hanya untuk display. Mohon booking via WhatsApp.
      </p>

      {/* WhatsApp CTA — pre-fills message when dates are selected */}
      <a
        href={waUrl}
        className={`ph-btn ph-btn--primary ph-availability__cta${!checkIn || !checkOut ? " ph-btn--muted" : ""}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={checkIn && checkOut ? `Book ${roomName} via WhatsApp` : "Select dates then book via WhatsApp"}
      >
        {checkIn && checkOut ? "Book via WhatsApp →" : "Pilih tanggal dulu"}
      </a>
    </div>
  );
}
