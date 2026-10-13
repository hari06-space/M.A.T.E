# M.A.T.E. Architecture Decision Records (ADRs)

**Product Name:** M.A.T.E. (Meeting Adventure Travel Escape)  
**Version:** 1.0  
**Status:** Approved Baseline

---

## Table of Decisions

- [ADR-001: Modular Monolith Architecture for API Core](#adr-001-modular-monolith-architecture-for-api-core)
- [ADR-002: PostgreSQL as Canonical Relational Store](#adr-002-postgresql-as-canonical-relational-store)
- [ADR-003: Decoupled Python Service for Image Processing & Similarity](#adr-003-decoupled-python-service-for-image-processing--similarity)
- [ADR-004: React 18, TypeScript, Vite, and Tailwind CSS for Web Client](#adr-004-react-18-typescript-vite-and-tailwind-css-for-web-client)
- [ADR-005: Flutter & Dart for Native Mobile Applications](#adr-005-flutter--dart-for-native-mobile-applications)
- [ADR-006: Private Object Storage & Presigned Media Processing](#adr-006-private-object-storage--presigned-media-processing)
- [ADR-007: Staged Image Similarity (Exact -> Perceptual -> Vector Embeddings)](#adr-007-staged-image-similarity-exact---perceptual---vector-embeddings)
- [ADR-008: OWASP-Aligned Security, Auth, and IDOR Prevention](#adr-008-owasp-aligned-security-auth-and-idor-prevention)

---

### ADR-001: Modular Monolith Architecture for API Core

#### Context
Building an early distributed microservices architecture introduces network latency, deployment overhead, distributed transaction complexity, and excessive cloud cost before user traffic justifies it. However, the system must remain structured so that distinct business domains (Auth, Matching, Trips, Messaging, Media) can be maintained cleanly and split if needed.

#### Decision
Implement the backend as an **Express.js + TypeScript Modular Monolith** (`services/api`). The monolith strictly enforces domain boundaries using route-controller-service-repository patterns with dependency injection.

#### Trade-offs
- **Pros:** Fast development velocity, single transactional database, simple local Docker setup, zero inter-service network overhead.
- **Cons:** Shared CPU/memory runtime; addressed by offloading heavy CPU operations (image processing) to a separate dedicated service.

---

### ADR-002: PostgreSQL as Canonical Relational Store

#### Context
M.A.T.E. requires strong transactional consistency for trip membership capacity, companion connection requests, and access control. Geospatial queries (distances between travelers or destinations) and vector similarity (pgvector) will also be required.

#### Decision
Adopt **PostgreSQL** as the primary data store with schema migrations, foreign keys, unique constraints, and connection pooling. PostGIS and pgvector will be enabled as extensions.

#### Trade-offs
- **Pros:** ACID compliance, rich ecosystem, native JSON support, PostGIS geospatial queries, and pgvector for cost-effective vector search.
- **Cons:** Vertical scaling required at very high write volumes, mitigated by read replicas and Redis caching.

---

### ADR-003: Decoupled Python Service for Image Processing & Similarity

#### Context
Image decoding, EXIF scrubbing, thumbnail generation, perceptual hashing, and deep learning embeddings are CPU and memory intensive. Running these inside Node.js can block the event loop and crash API instances.

#### Decision
Deploy a separate **Python (FastAPI + OpenCV + PIL + ImageHash)** service (`services/image-processing`). The main Node.js API delegates image similarity and hash computation asynchronously via REST or worker queues.

#### Trade-offs
- **Pros:** Access to rich Python computer vision libraries, independent container scaling, isolated resource limits.
- **Cons:** An additional service to containerize and monitor.

---

### ADR-004: React 18, TypeScript, Vite, and Tailwind CSS for Web Client

#### Context
The web interface must be responsive, interactive, visually rich, accessible, and fast.

#### Decision
Use **React.js with TypeScript, Vite, Tailwind CSS, React Router, and Lucide Icons**. The design system is styled using colors derived directly from the official M.A.T.E. logo:
- Sunset Orange (`#FF5E36` / `#FF7A45`)
- Adventure Magenta (`#E0287D` / `#D81B60`)
- Deep Twilight Purple (`#6C2EB9` / `#4A154B`)
- Midnight Navy (`#0E1326` / `#161B33`)
- Clean Slate & Surface Neutrals (`#F8FAFC`, `#0F172A`)

#### Trade-offs
- **Pros:** Rapid HMR, strong typing, zero CSS bloat, rich UI components, full WCAG 2.2 accessibility control.
- **Cons:** Requires disciplined component encapsulation to avoid style repetition.

---

### ADR-005: Flutter & Dart for Native Mobile Applications

#### Context
M.A.T.E. requires a unified, high-performance mobile application for Android and iOS that feels genuinely native, with access to camera, location, push notifications, and biometric storage.

#### Decision
Build `apps/mobile` with **Flutter and Dart**, consuming the same versioned REST API (`/api/v1`) and OpenAPI contracts.

#### Trade-offs
- **Pros:** 60fps native rendering, shared codebase across iOS and Android, rich animation framework, single UI maintenance team.
- **Cons:** Binary size slightly larger than purely native Swift/Kotlin.

---

### ADR-006: Private Object Storage & Presigned Media Processing

#### Context
Storing raw image binaries in PostgreSQL bloats the database and slows down backups. Exposing public S3 buckets risks data scraping and unauthorized uploads.

#### Decision
1. Client requests a short-lived upload intent from `/api/v1/media/upload-intents`.
2. Client uploads directly to private object storage.
3. Media worker decodes image safely, removes EXIF geolocation from public derivatives, computes hashes, and saves normalized thumbnails.
4. Images are served through signed URLs or a CDN proxy.

#### Trade-offs
- **Pros:** Keeps database lean, eliminates backend bandwidth bottleneck, protects user privacy.
- **Cons:** Requires client-side two-step upload lifecycle.

---

### ADR-007: Staged Image Similarity (Exact -> Perceptual -> Vector Embeddings)

#### Context
The product documentation mandates exact duplicate detection, near-duplicate detection, and visually similar image search. Attempting full multi-modal vector search at day one before verifying basic duplicate detection adds unwarranted complexity and cost.

#### Decision
Adopt a 3-tier staged pipeline:
1. **Tier 1 (MVP):** SHA-256 byte digest for 100% exact duplicate identification.
2. **Tier 2:** Perceptual hashing (Average Hash, Difference Hash, Perceptual Hash / pHash) with Hamming distance thresholding for resized/compressed photos.
3. **Tier 3:** Deep visual embeddings (e.g., MobileNet / ResNet / CLIP) indexed via pgvector for semantic scene similarity.

#### Trade-offs
- **Pros:** Instant speed and zero AI GPU cost for 90% of duplicate use cases; transparent confidence scores.
- **Cons:** Tier 2/3 similarity requires calibration against travel image benchmarks.

---

### ADR-008: OWASP-Aligned Security, Auth, and IDOR Prevention

#### Context
Travel applications deal with personal itineraries, companion communication, and location data. Security must be foundational.

#### Decision
- Strict access-control middleware verifying resource ownership and membership on every protected endpoint (preventing BOLA/IDOR).
- Passwords hashed using bcrypt (cost 12) or Argon2id.
- JWT Access Tokens (short-lived 15m) + secure HTTP-only Refresh Tokens (7d) with rotation and revocation.
- Parameterized queries to eliminate SQL injection.
- Strict input validation using Zod.
- Security headers (Helmet) with strict CSP, HSTS, CORS, and rate limiting.
