# M.A.T.E. Security Threat Model

**Product Name:** M.A.T.E. (Meeting Adventure Travel Escape)  
**Standard:** OWASP Top 10, OWASP API Security Top 10, OWASP ASVS / MASVS  
**Status:** Active Security Baseline

---

## 1. System Assets & Trust Boundaries

### Critical Assets
1. **User Identities & Credentials:** Password hashes, refresh tokens, session records, email/phone verification status.
2. **Personal Profile & Preferences:** Travel DNA, availability calendar, home location, travel style.
3. **Trip Room Data:** Private itineraries, member lists, rendezvous points, emergency contacts.
4. **Direct & Group Messages:** Private traveler conversations.
5. **Media Files:** Original user photos, thumbnails, perceptual hashes, visual embeddings.
6. **Safety & Moderation Records:** User reports, blocks, moderation notes, banned IDs.

### Trust Boundaries
- **Client (Web Browser / Flutter Mobile) <-> Reverse Proxy / API Gateway:** Untrusted public network. All payloads must be authenticated, rate-limited, and schema-validated.
- **Node.js Express API <-> PostgreSQL Database:** Secure internal network. Queries must use parameterized statements; connection strings must not be exposed.
- **Node.js Express API <-> Python Image Processing Service:** Internal service-to-service channel. File inputs must be validated before invocation.
- **Clients <-> Object Storage:** No direct unauthenticated access. Uploads via short-lived presigned URLs; downloads via authorized CDN / signed links.

---

## 2. Threat Scenarios & Mitigations (OWASP API Top 10)

| Threat ID | Threat Name | Attack Scenario | Implemented Mitigation |
| :--- | :--- | :--- | :--- |
| **THREAT-01** | Broken Object Level Authorization (BOLA / IDOR) | Attacker alters plan ID `TRIP-123` to `TRIP-456` in URL to view or edit another traveler's private Trip Room. | Every controller invokes `authorizeTripMember(req.user.id, req.params.id, requiredRole)`. Database queries enforce ownership or active membership filters. |
| **THREAT-02** | Broken User Authentication | Attacker uses brute-force or credential stuffing against `/api/v1/auth/login`. | Rate limiting with IP and username buckets, bcrypt password hashing (cost 12), account lockout after 5 failed attempts, refresh token rotation with family revocation. |
| **THREAT-03** | Broken Object Property Level Authorization | Attacker submits `{"role": "ADMIN", "is_verified": true}` during profile update. | Zod schemas enforce strict input allow-lists with `stripUnknown: true`. Role/verification fields are strictly omitted from mutable profile schemas. |
| **THREAT-04** | Unrestricted Resource Consumption | Attacker floods image similarity endpoints or uploads 500MB video to exhaust memory and disk. | Payload size limits (max 10MB per image), rate limit of 10 similarity queries per minute, stream validation, and worker memory/CPU quotas. |
| **THREAT-05** | Broken Function Level Authorization | Non-admin user calls `/api/v1/admin/reports` to inspect moderation cases. | Role-Based Access Control (RBAC) middleware verifying `req.user.role === 'ADMIN'` before hitting admin handlers. |
| **THREAT-06** | Server-Side Request Forgery (SSRF) | Attacker passes internal metadata URL (e.g. `http://169.254.169.254`) as an image URL for similarity search. | Image service only accepts validated file uploads or whitelisted S3 storage buckets; outbound arbitrary URL fetching is disabled. |
| **THREAT-07** | Security Misconfiguration | Unsanitized stack traces leak internal paths, database schemas, or environment variables in 500 responses. | Centralized Express error handler catches all unhandled exceptions, logs full stack to secure logger, and returns sanitized RFC 7807 problem details to the client. |
| **THREAT-08** | Stored XSS in Posts & Comments | Attacker inputs `<script>alert(1)</script>` in trip captions or travel stories. | Strict text encoding in React/Flutter UI; server-side sanitization; strict Content Security Policy (`Content-Security-Policy: default-src 'self' ...`). |
| **THREAT-09** | Information Disclosure via Media EXIF | Attacker downloads user photos to extract GPS latitude/longitude of a traveler's private home. | Python media worker automatically strips all EXIF metadata (specifically GPS coordinates and camera serial numbers) during normalization. |
| **THREAT-10** | Harassment by Blocked Users | Blocked user creates alternative connection requests or views blocker's travel plans. | Global database-level exclusion filter: queries for travelers, plans, and messages automatically join against `blocks` table and exclude records where blocker/blocked relationship exists. |
