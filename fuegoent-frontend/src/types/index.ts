export interface EventCollection {
  id: string;
  title: string;
  subtitle?: string;
  slug: string;
  image: string;
  day: string;
  time: string;
  ageLimit: string;
  venue?: string;
  address?: string;
  instagramHandle?: string;
  guestlistUrl?: string;
  ticketUrl?: string;
  description?: string;
  images: string[];
}

export interface Product {
  id: string;
  title: string;
  price: string;
  image: string;
  url: string;
  available: boolean;
}

export interface NavItem {
  label: string;
  href: string;
}
