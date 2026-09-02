/**
 * Room data extracted from WordPress Elementor page content.
 * Source: Home page (ID 20) — SSA booking types included.
 */

export interface RoomAmenity {
  text: string;
}

export interface Room {
  id: string;
  name: string;
  unitCount: number;
  priceIDR: number;
  priceLabel: string;
  ssaTypes: number[];
  ssaLabel: number;
  images: string[]; // WordPress original URLs (replaced with Cloudinary post-migration)
  size: string;
  bedSize: string;
  capacity: string;
  breakfast: string;
  bathroom: string;
  amenities: string[];
  inclusions: string[];
  note: string;
  bookingUrl: string;
}

const WP_BASE = "https://moccasin-wombat-987069.hostingersite.com/wp-content/uploads/2025/06";
const WA = "https://wa.wizard.id/ddaefb";

export const ROOMS: Room[] = [
  {
    id: "family-room",
    name: "Family Room",
    unitCount: 1,
    priceIDR: 2000000,
    priceLabel: "IDR 2.000.000 / Tent / Night",
    ssaTypes: [1],
    ssaLabel: 1,
    images: [
      `${WP_BASE}/MLG00999-1024x675.jpg`,
      `${WP_BASE}/MLG00938-1024x683.jpg`,
      `${WP_BASE}/MLG00960-1024x683.jpg`,
      `${WP_BASE}/MLG00961-1024x683.jpg`,
      `${WP_BASE}/MLG00980-1024x683.jpg`,
      `${WP_BASE}/MLG01017-1024x683.jpg`,
      `${WP_BASE}/MLG01038-1024x683.jpg`,
    ],
    size: "10 x 9 meters (2 floors)",
    bedSize: "180x200cm (2 beds)",
    capacity: "6 Pax Adult",
    breakfast: "Breakfast for 4pax & 2 kids under 7yo",
    bathroom: "Private Bathroom — Hot & Cold Water",
    amenities: [
      "Towel, Toothbrush, Shampoo, Soap",
      "Coffee, Tea, Snack, Instant Noodle",
      "Smart TV & Hairdryer & Electric Kettle",
      "Extra bed 100x200cm (IDR 150.000)",
    ],
    inclusions: [
      "BBQ Package",
      "Free Entry to The Blooms Garden",
      "Free Entry to Ulun Danu Beratan",
    ],
    note: "*notes: availability hanya untuk display kamar yang ready, mohon booking via WhatsApp. Terima kasih.",
    bookingUrl: WA,
  },
  {
    id: "cabin-room",
    name: "Cabin Room",
    unitCount: 2,
    priceIDR: 1400000,
    priceLabel: "IDR 1.400.000 / Tent / Night",
    ssaTypes: [2, 3],
    ssaLabel: 2,
    images: [
      `${WP_BASE}/MLG00806-1024x682.jpg`,
      `${WP_BASE}/MLG00794-1024x683.jpg`,
      `${WP_BASE}/MLG00809-1024x683.jpg`,
      `${WP_BASE}/MLG00818-1024x682.jpg`,
      `${WP_BASE}/DJI_0098.jpg`,
    ],
    size: "9.5 x 8 meters",
    bedSize: "180x200cm",
    capacity: "3 Adult max",
    breakfast: "Breakfast for 2pax & 1 kid under 7yo",
    bathroom: "Private Bathroom — Hot & Cold Water",
    amenities: [
      "Towel, Kimono, Toothbrush, Shampoo, Soap",
      "Coffee, Tea, Snack & Electric Kettle",
      "Smart TV & Hairdryer",
      "Extra bed 100x200cm (IDR 150.000)",
    ],
    inclusions: [
      "BBQ Package",
      "Free Entry to The Blooms Garden",
      "Free Entry to Ulun Danu Beratan",
    ],
    note: "*notes: availability hanya untuk display kamar yang ready, mohon booking via WhatsApp. Terima kasih.",
    bookingUrl: WA,
  },
  {
    id: "black-room",
    name: "Black Room",
    unitCount: 3,
    priceIDR: 800000,
    priceLabel: "IDR 800.000 / Tent / Night",
    ssaTypes: [4, 5],
    ssaLabel: 3,
    images: [
      `${WP_BASE}/MLG00895-1-1024x683.jpg`,
      `${WP_BASE}/MLG00879-1024x683.jpg`,
      `${WP_BASE}/MLG00927-1-1024x667.jpg`,
      `${WP_BASE}/MLG00912-1-1024x683.jpg`,
      `${WP_BASE}/MLG00861-1-1024x654.jpg`,
      `${WP_BASE}/MLG00082-1-1024x683.jpg`,
    ],
    size: "7 x 6.5 meters",
    bedSize: "160x200cm",
    capacity: "2 Adult & 1 kids",
    breakfast: "Breakfast for 2pax & 1 kid under 7yo",
    bathroom: "Private Bathroom — Hot & Cold Water",
    amenities: [
      "Towel, Toothbrush, Shampoo, Soap",
      "Coffee, Tea & Electric Kettle",
      "Smart TV & Hairdryer",
      "Extra bed 100x200cm (IDR 150.000)",
    ],
    inclusions: [
      "BBQ Package",
      "Free Entry to The Blooms Garden",
    ],
    note: "*notes: availability hanya untuk display kamar yang ready, mohon booking via WhatsApp. Terima kasih.",
    bookingUrl: WA,
  },
  {
    id: "deluxe-room",
    name: "Deluxe Room",
    unitCount: 4,
    priceIDR: 800000,
    priceLabel: "IDR 800.000 / Tent / Night",
    ssaTypes: [7, 8, 9, 10],
    ssaLabel: 4,
    images: [
      `${WP_BASE}/MLG01176-1024x683.jpg`,
      `${WP_BASE}/MLG01205-1024x683.jpg`,
      `${WP_BASE}/MLG01215-1024x700.jpg`,
      `${WP_BASE}/MLG01214-1024x683.jpg`,
      `${WP_BASE}/MLG01195-1024x692.jpg`,
      `${WP_BASE}/MLG00160-1024x683.jpg`,
      `${WP_BASE}/MLG00163-1024x682.jpg`,
      `${WP_BASE}/MLG01208-1024x683.jpg`,
      `${WP_BASE}/MLG001423.jpg`,
    ],
    size: "7 x 6.5 meters",
    bedSize: "160x200cm",
    capacity: "2 Adult & 1 kids",
    breakfast: "Breakfast for 2pax & 1 kid under 7yo",
    bathroom: "Private Bathroom — Hot & Cold Water",
    amenities: [
      "Towel, Toothbrush, Shampoo, Soap",
      "Coffee, Tea & Electric Kettle",
      "Smart TV & Hairdryer",
      "Extra bed 100x200cm (IDR 150.000)",
    ],
    inclusions: [
      "BBQ Package",
      "Free Entry to The Blooms Garden",
    ],
    note: "*notes: availability hanya untuk display kamar yang ready, mohon booking via WhatsApp. Terima kasih.",
    bookingUrl: WA,
  },
  {
    id: "vip-room",
    name: "VIP Room",
    unitCount: 3,
    priceIDR: 700000,
    priceLabel: "IDR 700.000 / Tent / Night",
    ssaTypes: [11, 12, 13],
    ssaLabel: 5,
    images: [
      `${WP_BASE}/MLG01224-1024x683.jpg`,
      `${WP_BASE}/MLG01217-1024x683.jpg`,
      `${WP_BASE}/MLG01222-1024x683.jpg`,
      `${WP_BASE}/MLG01231-1024x683.jpg`,
      `${WP_BASE}/MLG01249-1024x685.jpg`,
      `${WP_BASE}/MLG01253-1024x683.jpg`,
      `${WP_BASE}/MLG00073-1024x683.jpg`,
    ],
    size: "6 x 5 meters",
    bedSize: "160x200cm",
    capacity: "2 Adult & 1 kids",
    breakfast: "Breakfast for 2pax & 1 kid under 7yo",
    bathroom: "Private Bathroom — Hot & Cold Water",
    amenities: [
      "Towel, Toothbrush, Shampoo, Soap",
      "Coffee, Tea & Electric Kettle",
      "Smart TV & Hairdryer",
      "Set Piknik",
      "Extra bed 100x200cm (IDR 150.000)",
    ],
    inclusions: [
      "Free Entry to The Blooms Garden",
    ],
    note: "*notes: availability hanya untuk display kamar yang ready, mohon booking via WhatsApp. Terima kasih.",
    bookingUrl: WA,
  },
  {
    id: "triangle-room",
    name: "Triangle Room",
    unitCount: 3,
    priceIDR: 600000,
    priceLabel: "IDR 600.000 / Tent / Night",
    ssaTypes: [14, 15, 16],
    ssaLabel: 6,
    images: [
      `${WP_BASE}/MLG00091-1024x682.jpg`,
      `${WP_BASE}/MLG01272-1024x683.jpg`,
      `${WP_BASE}/MLG01275-1024x682.jpg`,
      `${WP_BASE}/MLG01277-1024x680.jpg`,
      `${WP_BASE}/MLG00096-1024x683.jpg`,
      `${WP_BASE}/MLG00097-1024x683.jpg`,
    ],
    size: "5 x 4 meters",
    bedSize: "160x200cm",
    capacity: "2 Adult & 1 kids",
    breakfast: "Breakfast for 2pax & 1 kid",
    bathroom: "Private Bathroom — Hot & Cold Water",
    amenities: [
      "Towel, Toothbrush, Shampoo, Soap",
      "Coffee, Tea & Electric Kettle",
      "TV",
      "Extra bed 100x200cm (IDR 150.000)",
    ],
    inclusions: [
      "Free Entry to The Blooms Garden",
    ],
    note: "*notes: availability hanya untuk display kamar yang ready, mohon booking via WhatsApp. Terima kasih.",
    bookingUrl: WA,
  },
  {
    id: "bamboo-room",
    name: "Bamboo Room",
    unitCount: 3,
    priceIDR: 600000,
    priceLabel: "IDR 600.000 / Tent / Night",
    ssaTypes: [17, 18],
    ssaLabel: 7,
    images: [
      `${WP_BASE}/MLG00100-1024x683.jpg`,
      `${WP_BASE}/MLG01128-1024x683.jpg`,
      `${WP_BASE}/MLG01139-1024x683.jpg`,
      `${WP_BASE}/MLG00104-1024x678.jpg`,
    ],
    size: "5 x 4 meters",
    bedSize: "160x200cm",
    capacity: "2 Adult & 1 kids",
    breakfast: "Breakfast for 2pax & 1 kid under 7yo",
    bathroom: "Private Bathroom — Hot & Cold Water",
    amenities: [
      "Towel, Toothbrush, Shampoo, Soap",
      "Coffee, Tea & Electric Kettle",
      "TV",
      "Extra bed 100x200cm (IDR 150.000)",
    ],
    inclusions: [
      "Free Entry to The Blooms Garden",
    ],
    note: "*notes: availability hanya untuk display kamar yang ready, mohon booking via WhatsApp. Terima kasih.",
    bookingUrl: WA,
  },
  {
    id: "shaped-room",
    name: "Shaped Room",
    unitCount: 2,
    priceIDR: 500000,
    priceLabel: "IDR 500.000 / Tent / Night",
    ssaTypes: [19, 20],
    ssaLabel: 8,
    images: [
      `${WP_BASE}/MLG00104-1-1024x678.jpg`,
      `${WP_BASE}/MLG01056-1024x683.jpg`,
      `${WP_BASE}/MLG00107-1024x682.jpg`,
      `${WP_BASE}/MLG01328-1.jpg`,
    ],
    size: "5 x 4 meters",
    bedSize: "160x200cm",
    capacity: "2 Adult & 1 kids",
    breakfast: "Breakfast for 2pax & 1 kid under 7yo",
    bathroom: "Private Bathroom — Hot & Cold Water",
    amenities: [
      "Towel, Toothbrush, Shampoo, Soap",
      "Coffee, Tea & Electric Kettle",
      "TV",
      "Extra bed 100x200cm (IDR 150.000)",
    ],
    inclusions: [
      "Free Entry to The Blooms Garden",
    ],
    note: "*notes: availability hanya untuk display kamar yang ready, mohon booking via WhatsApp. Terima kasih.",
    bookingUrl: WA,
  },
  {
    id: "tent-room",
    name: "Tent Room",
    unitCount: 2,
    priceIDR: 450000,
    priceLabel: "IDR 450.000 / Tent / Night",
    ssaTypes: [21, 22],
    ssaLabel: 9,
    images: [
      `${WP_BASE}/MLG00104-2-1024x678.jpg`,
      `${WP_BASE}/MLG01076-1024x683.jpg`,
      `${WP_BASE}/MLG01080-1024x683.jpg`,
      `${WP_BASE}/MLG01087-1024x683.jpg`,
      `${WP_BASE}/MLG00136-1024x683.jpg`,
      `${WP_BASE}/MLG00138-1024x683.jpg`,
    ],
    size: "3 x 4 meters",
    bedSize: "160x200cm",
    capacity: "2 Adult & 1 Kids",
    breakfast: "Breakfast for 2pax & 1 kid under 7yo",
    bathroom: "Sharing Bathroom (2 Bathrooms) — Hot & Cold Water",
    amenities: [
      "Towel, Toothbrush, Shampoo, Soap",
      "Coffee, Tea & Hot Water",
      "Water Refill on Lobby",
      "Fan",
    ],
    inclusions: [
      "Free Entry to The Blooms Garden",
    ],
    note: "*notes: availability hanya untuk display kamar yang ready, mohon booking via WhatsApp. Terima kasih.",
    bookingUrl: WA,
  },
];

export const CAMPING_TENT = {
  id: "camping-tent",
  name: "Camping Tent",
  pricing: [
    { capacity: "1–2 pax", priceIDR: 170000, priceLabel: "IDR 170.000" },
    { capacity: "3–4 pax", priceIDR: 290000, priceLabel: "IDR 290.000" },
    { capacity: "5–6 pax", priceIDR: 500000, priceLabel: "IDR 500.000" },
  ],
  image: `${WP_BASE}/MLG01159-1024x683.jpg`,
  facilities: [
    "Sharing Bathroom (hot water)",
    "Include: Mattress, pillow, blanket, soap & shampoo",
    "Tooth brush (by request)",
    "Parking area",
    "Free entry to The Blooms Garden",
  ],
  rules: [
    "Dilarang menjemur pakaian",
    "Electronic di atas 200w dilarang",
    "Volume music speaker tidak kencang",
    "Early check-in wajib info",
    "Wajib menjaga kebersihan",
  ],
  addOns: [
    { item: "Sewa tempat", priceIDR: 50000 },
    { item: "Blanket", priceIDR: 25000 },
    { item: "Mattress", priceIDR: 35000 },
    { item: "Pillow", priceIDR: 20000 },
    { item: "Lampu sorot", priceIDR: 25000 },
    { item: "Bonfire", priceIDR: 30000 },
    { item: "Tikar", priceIDR: 25000 },
    { item: "Kabel roll", priceIDR: 25000 },
    { item: "Panci mini", priceIDR: 20000 },
    { item: "Kompor portable", priceIDR: 50000 },
    { item: "Pan yakiniku", priceIDR: 25000 },
    { item: "Gas portable", priceIDR: 35000 },
  ],
  bookingUrl: WA,
};
