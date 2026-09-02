/**
 * Activities data extracted from WordPress Elementor page content.
 */

const WP_BASE = "https://moccasin-wombat-987069.hostingersite.com/wp-content/uploads/2025/06";

export interface Activity {
  id: string;
  title: string;
  image: string;
}

export interface Destination {
  id: string;
  title: string;
  image: string;
}

export const ACTIVITIES: Activity[] = [
  {
    id: "shuttle-pickup",
    title: "Shuttle Pickup",
    image: `${WP_BASE}/MLG00669-scaled.jpg`,
  },
  {
    id: "the-blooms-garden",
    title: "The Blooms Garden",
    image: `${WP_BASE}/Blooms.png`,
  },
  {
    id: "piknik-bbq",
    title: "Piknik & BBQ Package",
    image: `${WP_BASE}/MLG00195-scaled.jpg`,
  },
  {
    id: "atv",
    title: "ATV",
    image: `${WP_BASE}/MLG00414-scaled.jpg`,
  },
  {
    id: "rabbit-garden",
    title: "Rabbit Garden",
    image: `${WP_BASE}/MLG00491-scaled.jpg`,
  },
  {
    id: "strawberry-farm",
    title: "Strawberry & Guava Farm",
    image: `${WP_BASE}/7.jpg`,
  },
  {
    id: "fishing-pond",
    title: "Fishing Pond",
    image: `${WP_BASE}/MLG00592-scaled.jpg`,
  },
  {
    id: "playground",
    title: "Playground",
    image: `${WP_BASE}/MLG00429-scaled.jpg`,
  },
  {
    id: "shooting-target",
    title: "Shooting Target",
    image: `${WP_BASE}/MLG00526-scaled.jpg`,
  },
  {
    id: "panball",
    title: "Panball",
    image: `${WP_BASE}/MLG00560-scaled.jpg`,
  },
  {
    id: "camping",
    title: "Camping",
    image: `${WP_BASE}/MLG01159-scaled.jpg`,
  },
  {
    id: "e-bike",
    title: "E-Bike",
    image: `${WP_BASE}/MLG00297-scaled.jpg`,
  },
  {
    id: "trekking",
    title: "Tracking to Mount Pohen & Mount Abang",
    image: `${WP_BASE}/MLG00601-scaled.jpg`,
  },
];

export const RESTAURANT = {
  name: "Pohen Hills Restaurant",
  subtitle: "Taste of The Tropics",
  description:
    "Elevate your dining experience at Pohen Hills Restaurant, overlooking the lush Blooms Garden. Our menu is a celebration of tropical flavors, featuring iconic Balinese dishes like crispy duck and our signature pork ribs. We also offer a range of international cuisines prepared with our chef's special touch. A perfect pairing to nature's beauty.",
  images: [
    `${WP_BASE}/MLG00723-scaled.jpg`,
    `${WP_BASE}/MLG00637-scaled.jpg`,
    `${WP_BASE}/MLG00755-scaled.jpg`,
    `${WP_BASE}/MLG00629-scaled.jpg`,
  ],
};

export const DESTINATIONS: Destination[] = [
  {
    id: "blooms-garden",
    title: "The Blooms Garden",
    image: `${WP_BASE}/Blooms-2.png`,
  },
  {
    id: "ulun-danu",
    title: "Ulun Danu Beratan",
    image: `${WP_BASE}/Ulun-Danu.png`,
  },
  {
    id: "danau-buyan",
    title: "Danau Buyan Tamblingan",
    image: `${WP_BASE}/Danau.png`,
  },
  {
    id: "kebun-raya",
    title: "Kebun Raya Bali",
    image: `${WP_BASE}/Kebun-Raya.png`,
  },
  {
    id: "jati-luwih",
    title: "Jati Luwih",
    image: `${WP_BASE}/Jati-Luwih.png`,
  },
  {
    id: "bali-farm",
    title: "Bali Farm House",
    image: `${WP_BASE}/Bali-Farm.png`,
  },
];
