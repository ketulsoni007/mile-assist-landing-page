// Single source of truth for SEO. Replace placeholders before launch.
export const site = {
  name: "Miles Assist",
  appName: "Miles Assist Driver",
  tagline: "From Route to Relief - MilesAssist Has You Covered",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://milesassist.com", // TODO: confirm production domain
  description:
    "Miles Assist rewards drivers on duty: free food and free stay at partner restaurants and hotels on your route, cashback on every bill you upload, plus insurance, roadside and 24/7 support.",
  locale: "en_IN",
  email: "support@milesassist.in",
  phone: "+91 85114 36397",
  phoneHref: "tel:+918511436397",
  address: {
    street: "4th Floor, 430 Pearl Plaza, Nr. Sandipani School, Naroda",
    city: "Ahmedabad",
    region: "Gujarat",
    postalCode: "382330",
    country: "IN",
    mapUrl: "https://maps.app.goo.gl/MSiZUPhMPc6RPEMy7",
  },
  playStoreUrl: "https://play.google.com/store/apps/details?id=com.milesassist.driver",
  appStoreUrl: "https://apps.apple.com/in/app/miles-assist-driver/id6758386740",
  social: {
    facebook: "https://www.facebook.com/profile.php?id=61589353885876",
    instagram: "https://www.instagram.com/milesassistofficial/",
    youtube: "https://www.youtube.com/@milesassist01",
  },
};

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  url: site.url,
  logo: `${site.url}/brand/logo-square.png`,
  slogan: site.tagline,
  areaServed: "IN",
  email: site.email,
  telephone: site.phone,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    addressLocality: site.address.city,
    addressRegion: site.address.region,
    postalCode: site.address.postalCode,
    addressCountry: site.address.country,
  },
  contactPoint: [{ "@type": "ContactPoint", contactType: "customer support", email: site.email, telephone: site.phone, areaServed: "IN" }],
  sameAs: [...Object.values(site.social), site.playStoreUrl, site.appStoreUrl],
};

export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: site.name,
  url: site.url,
  inLanguage: "en-IN",
};

/** The driver app on both stores, so search engines can show it as a mobile app. No rating is claimed. */
export const appJsonLd = {
  "@context": "https://schema.org",
  "@type": "MobileApplication",
  name: site.appName,
  operatingSystem: "Android, iOS",
  applicationCategory: "TravelApplication",
  description: site.description,
  publisher: { "@type": "Organization", name: site.name, url: site.url },
  installUrl: [site.playStoreUrl, site.appStoreUrl],
  sameAs: [site.playStoreUrl, site.appStoreUrl],
  offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
};

// Prevents </script> injection, per the Next.js JSON-LD guide: "<" becomes the JSON escape <.
export const jsonLdString = (data: unknown) =>
  JSON.stringify(data).replace(/</g, "\\u003c");
