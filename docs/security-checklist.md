# M.A.T.E. Security & Release Verification Checklist

**Product Name:** M.A.T.E. (Meeting Adventure Travel Escape)  
**Standard:** OWASP ASVS v4.0 / MASVS Baseline

---

## 1. Authentication & Session Management
- [x] Passwords hashed with bcrypt (minimum cost factor 12) or Argon2id.
- [x] Enforce minimum password length (8+ characters) with complexity guidance.
- [x] Short-lived JWT access tokens (15 minutes).
- [x] HttpOnly, Secure, SameSite=Strict cookies for refresh tokens.
- [x] Refresh token rotation with immediate invalidation of token families on reuse detection.
- [x] Explicit logout invalidates active refresh token in database session table.
- [x] Login rate limiting (5 failed attempts per IP/account triggers exponential backoff).

## 2. Authorization & Access Control (Anti-IDOR / Anti-BOLA)
- [x] Server-side authorization check on every mutation and query involving resources with an owner.
- [x] Trip Room read/write operations strictly check active membership in `plan_members`.
- [x] Direct and group messages can only be retrieved by participants.
- [x] Administrative endpoints (`/api/v1/admin/*`) strictly restricted to `ADMIN` role.
- [x] No client-supplied IDs trusted for identity; always derive user identity from validated JWT claims (`req.user.id`).

## 3. Data Protection & Cryptography
- [x] HTTPS enforced in production with HSTS (`Strict-Transport-Security`).
- [x] Sensitive environment variables and secrets stored outside repository in `.env` (excluded by `.gitignore`).
- [x] Database queries parameterized via ORM/prepared statements (zero raw string concatenation).
- [x] EXIF geolocation and camera metadata stripped from user-uploaded images prior to public storage.
- [x] Exact image checksums computed using SHA-256.

## 4. Input Validation & Output Encoding
- [x] Strict schema validation on all incoming request bodies and query parameters using Zod.
- [x] Max payload limit on API requests (10MB for media endpoints, 100KB for JSON endpoints).
- [x] User-generated content properly encoded to prevent Cross-Site Scripting (XSS).
- [x] Strict Content Security Policy (CSP), X-Frame-Options: DENY, and X-Content-Type-Options: nosniff via Helmet.

## 5. Trust, Safety & Privacy Controls
- [x] Bidirectional user blocking: blocked users cannot view profile, message, or join common trips.
- [x] Report submission workflow with reason categorizations and audit trail.
- [x] Consent-based, revocable temporary location sharing.
- [x] Account deletion and data export endpoints adhering to GDPR / Digital Personal Data Protection principles.

## 6. Infrastructure & Deployment Security
- [x] Containers run as non-privileged users (`USER node` in Dockerfile).
- [x] No credentials or secrets baked into Docker images.
- [x] Health checks implemented for all service containers.
- [x] Automated dependency vulnerability scanning (`npm audit`, Trivy, Dependabot).
