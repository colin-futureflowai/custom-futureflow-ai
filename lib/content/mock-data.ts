/**
 * Mock Content Data
 * This will be replaced with Basehub API calls later
 */

import type { LandingPageContent } from './types'

export const mockLandingPageContent: LandingPageContent = {
  hero: {
    title: "Gewoon Beginnen met AI",
    subtitle: "Elke Ondernemer Kan AI Leren",
    ctaText: "Pre-order Nu - €27",
    videoUrl: "/video.mp4",
  },

  pricing: {
    originalPrice: 47,
    discountPrice: 27,
    discountPercentage: 43,
    currency: "EUR",
    ctaText: "Ja, Ik Wil Pre-orderen! →"
  },

  book: {
    title: "Gewoon Beginnen met AI",
    author: "FutureFlowAI",
    description: "Van twijfel naar toepassing in 11 praktische hoofdstukken",
    chapters: [
      {
        partNumber: 1,
        partTitle: "Kennismaken met AI",
        description: "Begrijp wat AI is en wat het voor u kan betekenen"
      },
      {
        partNumber: 2,
        partTitle: "De Juiste Mindset",
        description: "Ontwikkel de juiste houding tegenover AI"
      },
      {
        partNumber: 3,
        partTitle: "Gewoon Doen",
        description: "Praktische stappen om vandaag nog te beginnen"
      },
      {
        partNumber: 4,
        partTitle: "De Volgende Stap",
        description: "Schaal op en integreer AI in uw hele organisatie"
      }
    ],
    whyThisBook: [
      "U hoeft geen techneut te zijn",
      "Praktische gids door ondernemer voor ondernemers",
      "Van verlamming naar actie",
      "Focus op mensen versterken"
    ],
    targetAudience: [
      "MKB ondernemers",
      "Managers zonder technische achtergrond",
      "Beslissers die AI willen begrijpen",
      "Iedereen die wil starten met AI"
    ]
  },

  testimonials: [
    {
      id: "1",
      name: "Jan de Vries",
      company: "E-learning Bedrijf",
      quote: "Dit boek heeft ons geholpen om onze ontwikkeltijd van 3 maanden naar 3 weken te brengen.",
      rating: 5
    }
  ],

  successStory: {
    title: "E-learning bedrijf transformeert met AI",
    metrics: [
      {
        label: "3 → 3",
        value: "Van maanden naar weken",
        description: "ontwikkeltijd"
      },
      {
        label: "4x",
        value: "Meer cursussen",
        description: "zonder extra personeel"
      },
      {
        label: "↑",
        value: "Hogere kwaliteit",
        description: "door AI-ondersteuning"
      }
    ],
    quote: "Dit zijn de resultaten die mogelijk zijn als je AI op de juiste manier inzet in je organisatie."
  },

  faqs: [
    {
      id: "1",
      question: "Heb ik technische kennis nodig?",
      answer: "Nee, het boek is speciaal geschreven voor niet-technische ondernemers. Alle concepten worden in begrijpelijke taal uitgelegd."
    },
    {
      id: "2",
      question: "Wanneer ontvang ik het e-book?",
      answer: "Direct na de officiële lancering ontvangt u het e-book automatisch per email. Pre-order kopers zijn de eersten die het boek ontvangen."
    },
    {
      id: "3",
      question: "Is dit ook geschikt voor mijn sector?",
      answer: "Ja, het boek bevat voorbeelden uit diverse branches. Van retail tot dienstverlening, van productie tot e-learning."
    },
    {
      id: "4",
      question: "Wat als ik niet tevreden ben?",
      answer: "Geen probleem! U heeft 30 dagen geld-terug-garantie. Niet tevreden? Dan krijgt u uw geld terug zonder gedoe."
    }
  ],

  footer: {
    companyName: "FutureFlowAI",
    companyTagline: "Wij zetten ons in om repetitieve taken binnen 2 weken te automatiseren zonder uw huidige systemen te vervangen.",
    links: {
      privacy: "#",
      terms: "#",
      contact: "#"
    }
  },

  seo: {
    title: "Gewoon Beginnen met AI - FutureFlowAI",
    description: "Praktische gids voor ondernemers die willen starten met AI zonder technische kennis. Pre-order nu met 43% korting.",
    keywords: ["AI", "kunstmatige intelligentie", "ondernemen", "MKB", "automatisering", "digitalisering"],
    ogImage: "/images/og-image.png"
  }
}

// Function to get content (will be replaced with Basehub API call)
export async function getContent(): Promise<LandingPageContent> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 100))
  return mockLandingPageContent
}