window.PB_CONFIG = Object.freeze({
  version: "Beta Version",
  backendUrl: "", // Configure this after you deploy the secure backend. Never put API keys here.
  createdDate: "13 Sep 2026",
  updatedDate: "13 Sep 2026",
  endpoints: Object.freeze({
    referral: "/api/send-referral",
    support: "/api/support",
    feedback: "/api/feedback",
    siteReference: "/api/site-reference",
    testimonials: "/api/testimonials",
    visitorCount: "/api/visitor-count",
    generateImage: "/api/ai/generate-image",
    translateDialogue: "/api/ai/translate-dialogue"
  })
});
