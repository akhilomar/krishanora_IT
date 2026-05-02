import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Android App Development Company India | Krishanora IT',
  description:
    'Hire Android app developers in India. Custom Android app development for startups, small businesses, and entrepreneurs. Fast delivery, affordable pricing. Get a free quote.',
  keywords: [
    'android app development company',
    'hire android app developer',
    'custom android app development',
    'android app development india',
    'android app development for startups',
    'android app development services',
    'kotlin app development',
    'jetpack compose development',
  ],
  openGraph: {
    title: 'Android App Development Company | Krishanora IT',
    description:
      'Custom Android apps built in 7–14 days. Fast, affordable, and built to scale. Get a free consultation today.',
    type: 'website',
    url: 'https://krishanora.com/android',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Android App Development Company | Krishanora IT',
    description: 'Custom Android apps built in 7–14 days. Get a free quote today.',
  },
  alternates: {
    canonical: 'https://krishanora.com/android',
  },
}

export default function AndroidLayout({ children }: { children: React.ReactNode }) {
  return children
}
