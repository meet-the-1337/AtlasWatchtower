# Security Policy

## Supported Versions

| Version | Supported |
|---|---|
| 2.5.x | ✅ Active |
| < 2.5 | ❌ No longer supported |

## Reporting a Vulnerability

**Please do NOT open a public GitHub issue for security vulnerabilities.**

Report via email: 📧 **manansinghal1176@gmail.com**

Include: description, reproduction steps, potential impact, and suggested fix.

### What to Expect

- **Acknowledgment** within 48 hours
- **Assessment** within 7 days
- **Fix** within 30 days for confirmed vulnerabilities

## Scope

**In scope:** API key exposure, XSS, injection, SSRF, data leakage.

**Out of scope:** Third-party dependency bugs, rate limiting, self-XSS.

## Best Practices for Contributors

- Never commit API keys or secrets
- All secrets go in `.env` (gitignored) or GitHub Secrets
- Use `VITE_` prefix only for client-safe env vars
- Sanitize user input (see `src/utils/sanitize.ts`)
