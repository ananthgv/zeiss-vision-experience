# Zeiss Vision Experience — Production Roadmap

A practical guide for taking this prototype to a production-grade in-store application.

---

## Phase 1: Stakeholder Validation & Feedback

### Target Personas for Feedback

| Persona | Why Their Input Matters |
|---------|----------------------|
| **Optometrist** | Validates clinical accuracy of the refraction workflow, Rx data presentation, and whether the VISUCORE/VISUFIT guidance steps match real device operation |
| **Optician / Dispensing Optician** | The primary daily user — tests frame selection flow, coating comparisons, pricing logic, and order placement UX |
| **Store Manager** | Evaluates operational fit: patient throughput, inventory accuracy ("In Store" vs "Order from HQ"), and order routing to HQ vs local POS |
| **Patient / End Consumer** | Validates the "premium feel" — is it approachable? Does the AI recommendation build confidence or confusion? |
| **Zeiss Sales / Account Manager** | Can this be used as a demo tool for pitching Zeiss equipment + lens bundles to new stores? |
| **IT / Systems Admin** | Evaluates deployment feasibility — on-premise vs cloud, device integration complexity, data security |

### Suggested Feedback Process

- [ ] Deploy to a private staging URL (or local iPad kiosk) for in-store walkthroughs
- [ ] Run 3–5 moderated sessions per persona with a simple feedback form
- [ ] Track: task completion rate, confusion points, feature requests, and "wow" moments
- [ ] Iterate on UI based on consolidated feedback before any backend work

---

## Phase 2: Backend Integration Strategy

### Current State
The prototype is a **fully self-contained React SPA** with no backend dependencies. All data (Rx values, lens catalog, frame catalog, pricing) is hardcoded. This makes it trivial to demo but means every data point needs a real source for production.

### Integration Architecture

The app is designed so each stage maps cleanly to a single backend service. This means integration can happen **incrementally, one stage at a time**, without rewriting the UI.

| Stage | Current (Hardcoded) | Production Backend | Integration Approach |
|-------|--------------------|--------------------|---------------------|
| Patient Onboarding | Local React state | **Patient Management System (PMS)** | REST API: `POST /patients`, `GET /patients/:id` |
| Refraction | Simulated scan + static Rx table | **VISUCORE 500 API** or **FHIR-based EHR** | Query device DB for latest Rx by patient ID |
| Centration | Simulated 3D scan | **VISUFIT 1000 API** | Fetch avatar + centration data post-scan |
| Lifestyle + Coating | Hardcoded coating list | **Zeiss Product API** | `GET /coatings` with pricing and availability |
| Lens Recommendation | JavaScript if/else logic | **Zeiss AI/ML Service** | `POST /recommendations` with Rx + lifestyle payload → returns ranked lenses |
| Frame Selection | Static array of 6 frames | **Frame Catalog API + Inventory Service** | `GET /frames?store_id=X` with real-time stock from ERP |
| Order & Checkout | No-op button click | **Order Management System + Payment Gateway** | `POST /orders` → route to HQ (Zeiss fulfillment) or local POS |

### On-Premise vs Cloud Deployment

**Option A: Cloud-First (Recommended for pilot)**
- Deploy the React SPA to a CDN (Vercel, AWS CloudFront, or Azure Static Web Apps)
- Backend APIs hosted on Zeiss cloud infrastructure
- Clinical device data synced from store to cloud via secure gateway
- *Pros:* Easy updates, centralized analytics, multi-store rollout
- *Cons:* Requires internet connectivity in-store

**Option B: On-Premise / Hybrid**
- React SPA served from a local in-store server or kiosk
- Backend APIs run locally, syncing to cloud periodically
- Device integration via local network (VISUCORE/VISUFIT on same LAN)
- *Pros:* Works offline, keeps patient data on-premise for compliance
- *Cons:* Harder to update, per-store maintenance

**Option C: Progressive Web App (PWA)**
- Package as a PWA with offline caching
- Sync to cloud when connected, work with cached catalogs when offline
- *Best of both worlds for stores with unreliable internet*

---

## Phase 3: Production Feature Enhancements

### High Priority
- [ ] **Real device handshake** — Poll VISUCORE 500 / VISUFIT 1000 for scan completion instead of simulated timers
- [ ] **Dynamic product catalog** — Lenses, coatings, and frames served from API with real pricing, descriptions, and images
- [ ] **Persistent patient sessions** — Save progress so a patient can pause and resume (e.g., while waiting for frames to arrive)
- [ ] **Multi-language support** — Critical for global Zeiss stores (German, Mandarin, Japanese, Hindi, etc.)
- [ ] **Print / PDF export** — Generate a professional prescription + order summary PDF for the patient

### Medium Priority
- [ ] **Appointment scheduling** — Book follow-up fitting appointment from the order confirmation screen
- [ ] **AR frame try-on** — Use the VISUFIT avatar data for virtual frame preview (leverage existing Zeiss AR capabilities)
- [ ] **Staff authentication** — Role-based access (optometrist sees Rx data, optician manages frames/orders)
- [ ] **Analytics dashboard** — Track conversion rates per stage, popular lenses, average order value
- [ ] **Rx history** — Show returning patients their previous prescription for comparison

### Nice to Have
- [ ] **Dark mode** — For store environments with controlled lighting
- [ ] **Tablet-optimized layout** — Most in-store kiosks are iPad-based
- [ ] **Voice guidance** — Accessibility for visually impaired patients
- [ ] **QR code sharing** — Patient scans QR to view their recommendation summary on their phone

---

## Phase 4: Compliance & Security

- [ ] **HIPAA / GDPR compliance** — Patient health data requires encryption at rest and in transit
- [ ] **Data residency** — Ensure patient records stay in the correct geographic region
- [ ] **Audit logging** — Track who accessed/modified patient records
- [ ] **Consent management** — Patient opt-in for data storage and sharing

---

## Phase 5: Go-to-Market

- [ ] Pilot in 2–3 Zeiss Vision Centre locations
- [ ] Measure: patient satisfaction scores, staff efficiency, order accuracy, average transaction value
- [ ] Iterate based on pilot data
- [ ] Develop training materials for store staff
- [ ] Roll out to broader Zeiss Vision Centre network

---

> **Key takeaway:** The prototype's clean stage-based architecture makes it naturally "pluggable" — each stage is independent and can be wired to a real backend service without touching the others. This means production integration can happen incrementally, one stage at a time, while keeping the app functional throughout.
