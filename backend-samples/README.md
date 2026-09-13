# Secure Backend Samples — Prompt Builder Beta Version

The GitHub Pages front end must NOT contain provider API keys, email-service keys, or private mail credentials.
Deploy these concepts to a serverless/backend host first, then place only the public HTTPS backend base URL in `javascript/config.js`.

Planned endpoints used by the front end:
- `POST /api/send-referral` — subject: **Maven Website Builder Inquiry**; recipient is configured server-side.
- `POST /api/support` — subject: **Tech Support**; recipient is configured server-side.
- `POST /api/feedback` — stores feedback as Pending; never auto-publishes testimonials.
- `POST /api/site-reference` — subject: **For site reference**; recipient is configured server-side.
- `GET /api/testimonials` — returns approved testimonials only.
- `POST /api/visitor-count` — returns a shared visitor count.
- `POST /api/ai/generate-image` — server-side AI image provider proxy.
- `POST /api/ai/translate-dialogue` — server-side translation/romanization helper.

Security rules:
1. Put email recipients and secret keys in server environment variables.
2. Validate and sanitize all user input.
3. Limit file types and file size for screenshots/logos.
4. Add rate limiting and spam protection before public launch.
5. Do not log API keys, passwords, OTPs, payment credentials, or full card/account data.
6. Keep testimonials Pending until the owner approves them.

The next setup step is to deploy a backend and configure its public HTTPS base URL. The front-end package intentionally ships with `backendUrl: ""`.
