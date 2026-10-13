# M.A.T.E. Requirements Traceability Matrix (RTM)

**Product Name:** M.A.T.E. (Meeting Adventure Travel Escape)  
**Baseline Document:** M.A.T.E. Project Documentation v1.0 (9 October 2026)  
**Last Updated:** October 2026

---

## 1. Traceability Overview

This document maps all documented functional and non-functional requirements to their implementing modules, database entities, API endpoints, UI surfaces, and verification tests.

---

## 2. Functional Requirements Matrix

| Req ID | Category | Description | Priority | Architecture Module | API Endpoint / Contract | Database Entity | Verification / Test |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **AUTH-01** | Authentication | User registration, login, token refresh, password recovery, session logout | MVP | `services/api/src/modules/auth` | `POST /api/v1/auth/register`<br>`POST /api/v1/auth/login`<br>`POST /api/v1/auth/refresh`<br>`POST /api/v1/auth/logout` | `users`, `user_sessions`, `password_resets` | Unit test: password hashing, timing attack protection.<br>Integration: registration + login token cycle. |
| **AUTH-02** | Rate Limiting & Abuse | Strict rate limiting on login/registration/recovery endpoints | MVP | `services/api/src/middleware/rateLimiter` | Global & route middleware | In-memory / Redis cache | Integration: 429 Too Many Requests response after threshold breaches. |
| **PROF-01** | User Profile | Basic profile management: avatar, bio, home city, languages, verification badge | MVP | `services/api/src/modules/profile` | `GET /api/v1/profile/me`<br>`PATCH /api/v1/profile/me`<br>`GET /api/v1/users/:id` | `profiles` | Unit: validation schemas.<br>Integration: IDOR prevention (cannot patch other user's profile). |
| **PROF-02** | Travel DNA | Structured preferences: travel styles, budget tier, pace, accommodation preference, dietary/social habits | MVP | `services/api/src/modules/travelDna` | `GET /api/v1/travel-dna/me`<br>`PUT /api/v1/travel-dna/me` | `travel_dna`, `user_travel_interests` | Unit: Travel DNA schema enum checks.<br>Integration: persistence and retrieval. |
| **DEST-01** | Destinations | Canonical destination catalogue, categories, tags, coordinates, media, and search | MVP | `services/api/src/modules/destinations` | `GET /api/v1/destinations`<br>`GET /api/v1/destinations/:id`<br>`GET /api/v1/destinations/categories` | `destinations`, `destination_media` | Integration: paginated query and search keyword filtering. |
| **DEST-02** | Saved Places | Users can save/bookmark destinations and specific places | MVP | `services/api/src/modules/destinations` | `POST /api/v1/destinations/:id/save`<br>`DELETE /api/v1/destinations/:id/save`<br>`GET /api/v1/destinations/saved` | `saved_destinations` | Integration: unique constraint (prevent duplicate saves), authorization check. |
| **TRIP-01** | Travel Plans | Create, edit, publish, draft, cancel, and archive trip intent plans | MVP | `services/api/src/modules/trips` | `POST /api/v1/travel-plans`<br>`GET /api/v1/travel-plans`<br>`GET /api/v1/travel-plans/:id`<br>`PATCH /api/v1/travel-plans/:id` | `travel_plans` | Unit: plan lifecycle state machine.<br>Integration: access control on update. |
| **TRIP-02** | Trip Membership | Capacity management, join requests, approval, leave, removal | MVP | `services/api/src/modules/trips` | `POST /api/v1/travel-plans/:id/join`<br>`PATCH /api/v1/travel-plans/:id/members/:userId`<br>`DELETE /api/v1/travel-plans/:id/leave` | `plan_members` | Integration: capacity limits enforced atomically via DB transactions. |
| **TRIP-03** | Trip Room & Itinerary | Member-only shared workspace: itinerary days/items, shared notes, agreed safety rules | MVP | `services/api/src/modules/trips` | `GET /api/v1/travel-plans/:id/room`<br>`POST /api/v1/travel-plans/:id/itinerary`<br>`PATCH /api/v1/travel-plans/:id/itinerary/:itemId` | `itinerary_items`, `trip_notes` | Integration: non-members receive 403 Forbidden on private Trip Room access. |
| **MATCH-01** | Companion Matching | Search compatible travelers by destination, dates, budget tier, and style | MVP | `services/api/src/modules/matching` | `POST /api/v1/matches/search`<br>`GET /api/v1/matches/recommendations` | `match_runs`, `match_results` | Unit: scoring algorithm weights calculation.<br>Integration: blocked users excluded from results. |
| **MATCH-02** | Explainable Match | Provide explicit match breakdown (e.g. 90% style match, same dates, overlapping budget) | MVP | `services/api/src/modules/matching` | In match result payload (`compatibilityFactors`) | In-memory computed / cached | Unit: check explanations are factual and avoid fabricated safety claims. |
| **CONN-01** | Connections | Send, accept, decline, and cancel companion connection requests | MVP | `services/api/src/modules/connections` | `POST /api/v1/connections`<br>`PATCH /api/v1/connections/:id`<br>`GET /api/v1/connections` | `connections` | Integration: state transition validator (PENDING -> ACCEPTED/DECLINED). |
| **MSG-01** | Messaging | Private and group trip conversations with real-time delivery support | MVP | `services/api/src/modules/messaging` | `GET /api/v1/conversations`<br>`GET /api/v1/conversations/:id/messages`<br>`POST /api/v1/conversations/:id/messages` | `conversations`, `conversation_members`, `messages` | Integration: BOLA/IDOR test ensuring non-participant cannot read or post. |
| **CONT-01** | Social Discovery | Travel posts, stories, hidden gems, photo feeds with likes and comments | MVP | `services/api/src/modules/content` | `GET /api/v1/posts`<br>`POST /api/v1/posts`<br>`POST /api/v1/posts/:id/like`<br>`POST /api/v1/posts/:id/comments` | `posts`, `post_media`, `post_likes`, `post_comments` | Integration: author ownership check on delete; pagination test. |
| **CONT-02** | Hidden Gems | Dedicated curated/community hidden gems with location context | MVP | `services/api/src/modules/content` | `GET /api/v1/hidden-gems`<br>`POST /api/v1/hidden-gems` | `hidden_gems` | Integration: retrieval by destination and approval filter. |
| **SAFE-01** | Report & Block | User reporting and blocking mechanisms across profiles, posts, and chats | MVP | `services/api/src/modules/safety` | `POST /api/v1/safety/reports`<br>`POST /api/v1/safety/block`<br>`DELETE /api/v1/safety/block/:userId` | `reports`, `blocks`, `moderation_cases` | Integration: blocked user cannot message, invite, or view blocker profile. |
| **SAFE-02** | Trust Signals | Verifiable badges (email verified, phone verified, completed trips) | MVP | `services/api/src/modules/safety` | In user profile response | `verification_records` | Unit: badge computation logic; cannot spoof via client-provided body. |
| **MEDIA-01** | Secure Upload | Upload authorization, file validation, asynchronous processing, thumbnailing | MVP | `services/api/src/modules/media` | `POST /api/v1/media/upload-intents`<br>`POST /api/v1/media/:id/complete` | `media_assets`, `media_derivatives` | Integration: rejects spoofed MIME types, strips EXIF, enforces quotas. |
| **SIM-01** | Exact Duplicate | SHA-256 byte checksum identification across image assets | MVP | `services/image-processing` / `media` | `POST /api/v1/media/similarity/exact` | `media_hashes` | Unit & Integration: identical images return match with 100% confidence. |
| **SIM-02** | Perceptual Hashes | pHash / dHash perceptual hashing to identify resized or compressed photos | Phase 2 | `services/image-processing` | `POST /api/v1/media/similarity/perceptual` | `media_hashes` | Integration: resized/compressed variations match within Hamming threshold. |
| **SIM-03** | Visual Similarity | Vision embedding vectors and nearest-neighbor search | Phase 3 | `services/image-processing` | `POST /api/v1/media/similarity/semantic` | `media_embeddings` (pgvector) | Precision/Recall benchmarks against travel test image dataset. |
| **NOTIF-01** | Notifications | In-app notification center and push notification integration | MVP | `services/api/src/modules/notifications` | `GET /api/v1/notifications`<br>`PATCH /api/v1/notifications/:id/read` | `notifications`, `notification_preferences` | Integration: unread count accuracy and read state toggles. |
| **REW-01** | Rewards & Badges | Server-audited explorer levels and points for verified activities | Phase 2 | `services/api/src/modules/rewards` | `GET /api/v1/rewards/me`<br>`GET /api/v1/rewards/leaderboard` | `user_points`, `reward_events` | Unit: business rule validation preventing duplicate awards or tampering. |

---

## 3. Non-Functional Requirements (NFR) Matrix

| NFR ID | Category | Requirement Specification | Verification Method |
| :--- | :--- | :--- | :--- |
| **NFR-SEC-01** | Access Control | OWASP Top 10 & API Security: Server-side authorization checks for every protected resource (no IDOR/BOLA). | Automated integration security tests testing unauthorized resource access. |
| **NFR-SEC-02** | Data Protection | All sensitive credentials encrypted at rest; EXIF geolocation data stripped from public media derivatives. | Automated EXIF scrubber test on uploaded JPEG images. |
| **NFR-PERF-01** | Latency | p95 latency under 500ms for read endpoints under expected normal load. | Load testing suite with Autocannon / k6. |
| **NFR-A11Y-01** | Accessibility | Web frontend conforms to WCAG 2.2 AA standards (contrast, semantic HTML, keyboard focus, screen reader labels). | Automated axe-core / Lighthouse audit and keyboard navigation test. |
| **NFR-RESP-01** | Responsiveness | Responsive mobile-first and desktop layouts supporting 320px to 4K resolutions. | Responsive viewport visual checks. |
| **NFR-REL-01** | Reliability | Graceful degradation, circuit breakers for external services, database connection pooling, idempotent mutations. | Simulated network failure and database retry tests. |
