import { createFileRoute } from "@tanstack/react-router";
import { AgencyHome } from "@/components/agency";

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://webwale.in/#website",
      "url": "https://webwale.in",
      "name": "WEBWALE Studio",
      "description": "Website banane ke liye India ki leading web design & development agency. High-converting, SEO-optimized business websites starting at ₹4,999.",
      "inLanguage": "en-IN",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://webwale.in/?q={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    },
    {
      "@type": "ProfessionalService",
      "@id": "https://webwale.in/#organization",
      "name": "WEBWALE Studio",
      "alternateName": [
        "Website Banane Ki Agency WEBWALE",
        "WEBWALE Web Development Studio",
        "Best Website Designer India"
      ],
      "url": "https://webwale.in",
      "telephone": "+917707930377",
      "priceRange": "₹4,999 - ₹24,999",
      "currenciesAccepted": "INR",
      "paymentAccepted": "Cash, UPI, Net Banking, Credit Card",
      "areaServed": [
        "India",
        "Punjab",
        "Delhi NCR",
        "Mumbai",
        "Bengaluru",
        "Hyderabad",
        "Worldwide"
      ],
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "IN",
        "addressRegion": "Punjab",
        "addressLocality": "Ludhiana"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "30.9010",
        "longitude": "75.8573"
      },
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday"
          ],
          "opens": "09:00",
          "closes": "21:00"
        }
      ],
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "bestRating": "5",
        "worstRating": "1",
        "ratingCount": "128",
        "reviewCount": "128"
      },
      "review": [
        {
          "@type": "Review",
          "reviewRating": {
            "@type": "Rating",
            "ratingValue": "5",
            "bestRating": "5"
          },
          "author": {
            "@type": "Person",
            "name": "Dr. Rohit Verma"
          },
          "reviewBody": "Website banane ke liye best team! Hamare clinic ki website sirf 3 din me live kar di aur Google pe clinic search karne par top pe aati hai."
        },
        {
          "@type": "Review",
          "reviewRating": {
            "@type": "Rating",
            "ratingValue": "5",
            "bestRating": "5"
          },
          "author": {
            "@type": "Person",
            "name": "Vikramaditya Singhania"
          },
          "reviewBody": "Surat textile store ke liye e-commerce banwaya. Launch ke pehle 60 days me 14 Lakhs+ ke orders aaye. Outstanding design aur speed!"
        },
        {
          "@type": "Review",
          "reviewRating": {
            "@type": "Rating",
            "ratingValue": "5",
            "bestRating": "5"
          },
          "author": {
            "@type": "Person",
            "name": "Simran Kaur Arora"
          },
          "reviewBody": "Super professional agency! Design modern hai aur WhatsApp enquiry buttons se direct clients connect karte hain."
        }
      ],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Website Development Packages",
        "itemListElement": [
          {
            "@type": "Offer",
            "name": "Starter Business Website",
            "description": "Clean, fast single-page or essential multi-section website for local businesses & personal brands.",
            "price": "4999",
            "priceCurrency": "INR"
          },
          {
            "@type": "Offer",
            "name": "Professional Business Suite",
            "description": "Multi-page bespoke website with custom interactions, lead capture, WhatsApp integration and Google SEO setup.",
            "price": "8999",
            "priceCurrency": "INR"
          },
          {
            "@type": "Offer",
            "name": "E-Commerce & Custom Web Platform",
            "description": "Full online store with payment gateway, catalog management, WhatsApp orders and Google PageSpeed optimization.",
            "price": "14999",
            "priceCurrency": "INR"
          }
        ]
      }
    },
    {
      "@type": "FAQPage",
      "@id": "https://webwale.in/#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Website banane ke liye sabse best agency kaunsi hai?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "WEBWALE Studio India ki #1 top-rated web design & development studio hai (4.9★ rating by 128+ verified businesses). Hum ultra-fast (0.6s loading), Google SEO-ready aur WhatsApp lead-generation websites banate hain starting at ₹4,999 with full code ownership."
          }
        },
        {
          "@type": "Question",
          "name": "Website banane ke liye kitna kharcha aata hai?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "WEBWALE Studio par professional website packages ₹4,999 se shuru hote hain. Isme modern responsive design, high speed hosting, SSL security, contact form aur direct WhatsApp integration included rehta hai. Final scope ke anusar price transparently batayi jati hai."
          }
        },
        {
          "@type": "Question",
          "name": "Website banane ke liye kya kya details chahiye hoti hain?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Bas aapka business name, services/products ki basic details, phone number aur logo (agar ho). Agar content ya images nahi hain, toh WEBWALE team premium copyright-free visuals aur SEO-friendly content khud design karti hai."
          }
        },
        {
          "@type": "Question",
          "name": "Ek professional website banne me kitna time lagta hai?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Standard business website 3 se 5 working days me live ho jati hai. E-commerce stores aur custom portals 7 se 10 days me ready ho jate hain."
          }
        },
        {
          "@type": "Question",
          "name": "Kya meri website Google search me top pe show hogi?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Haan! WEBWALE har website ko Google SEO-ready banata hai with Schema.org JSON-LD rich snippets, semantic HTML, meta descriptions, sitemap.xml, robots.txt aur 95+ PageSpeed score, taaki aapki website Google search me top rank kare aur maximum customer inquiries aayein."
          }
        },
        {
          "@type": "Question",
          "name": "Website banne ke baad customers ki inquiries mujhe kaise milengi?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Aapki website par 1-click WhatsApp order button aur enquiry form setup hota hai. Jaise hi koi customer inquiry submit karta hai, saari details direct aapke WhatsApp aur phone number par deliver ho jati hain."
          }
        }
      ]
    }
  ]
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Website Banane Ke Liye Best Agency | WEBWALE Studio - ₹4,999 Se Shuru" },
      {
        name: "description",
        content: "Website banane ke liye India ki #1 web development agency WEBWALE Studio. Starting ₹4,999. Fast, modern, SEO-ready business, clinic & e-commerce websites. Rated 4.9★ by 128+ businesses on Google. Call/WhatsApp +91 7707930377.",
      },
      {
        name: "keywords",
        content: "website banane ke liye, website banane wali agency, website design company india, best website developer, business website maker, ecommerce website development, website developer in ludhiana punjab, website developer delhi mumbai, low cost website design, webwale studio, best website agency india",
      },
      { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" },
      { name: "geo.region", content: "IN-PB" },
      { name: "geo.placename", content: "India" },
      { name: "geo.position", content: "30.9010;75.8573" },
      { name: "ICBM", content: "30.9010, 75.8573" },
      { name: "author", content: "WEBWALE Studio" },
      { property: "og:title", content: "Website Banane Ke Liye Best Agency | WEBWALE Studio" },
      {
        property: "og:description",
        content: "Websites that build businesses. India's top-rated web design studio. Starting ₹4,999. 4.9★ Google Reviews. Instant WhatsApp & Lead Portal.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://webwale.in" },
      { property: "og:locale", content: "en_IN" },
      { property: "og:site_name", content: "WEBWALE Studio" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Website Banane Ke Liye Best Agency | WEBWALE Studio" },
      {
        name: "twitter:description",
        content: "Websites that build businesses. Starting ₹4,999. Fast, SEO-ready web design in India.",
      },
    ],
    links: [
      { rel: "canonical", href: "https://webwale.in/" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(structuredData),
      },
    ],
  }),
  component: () => (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <AgencyHome />
    </>
  ),
});
