# Security Specification for Skyline X Firestore Database

This document details the Zero-Trust security mapping, the "Dirty Dozen" malicious payloads designed to attempt to break security rules, and the specifications of our Firestore rules.

## 1. Data Invariants
- **Public Write Only**: Unauthenticated / anonymous visitors can write submissions to collections (`contact_submissions`, `bookings`, `voice_memos`, `newsletter_subscriptions`) to make contact, subscribe, or book a slot.
- **Zero-Read / Zero-Leak Profile**: Nobody (neither unauthenticated nor standard users) is allowed to read, list, update, or delete any user submissions from these collections to prevent PII exposure (email, telephone, name).
- **Exact Field Match Constraint**: Submissions cannot contain "ghost" or "shadow" fields to avoid document size bloating and injection.
- **Strict Server Timestamps**: Submissions MUST use the Firestore server timestamp (`request.time`) for `createdAt`. Client-supplied random timestamps are strictly rejected.
- **Length and Type Guardrails**: All string inputs are strictly bounded to small sizing limits (e.g., name <= 200 chars, email <= 300 chars) to prevent "Denial of Wallet" and database pollution.

---

## 2. The "Dirty Dozen" Malicious Payloads

### Payload 1: Large Contact Message (Value Poisoning)
Attempts to inject a massive 2MB text block to exhaust database storage and billing.
```json
{
  "name": "Attacker",
  "email": "attacker@victim.com",
  "message": "...(2 Million Characters)...",
  "createdAt": "SERVER_TIMESTAMP"
}
```

### Payload 2: Ghost Field Inject (Shadow Exploiting)
Injects an unauthorized field `isApprovedBySystem: true` to bypass lead scoring.
```json
{
  "name": "Jane Doe",
  "email": "jane@company.com",
  "message": "Enquiry details",
  "isApprovedBySystem": true,
  "createdAt": "SERVER_TIMESTAMP"
}
```

### Payload 3: Client Timestamp Hijack (Temporal Spoofing)
Attempts to overwrite creation time with a custom historic/future date.
```json
{
  "name": "Attacker",
  "email": "attacker@gmail.com",
  "message": "Message content",
  "createdAt": "2020-01-01T00:00:00Z"
}
```

### Payload 4: Invalid Types (Type Poisoning)
Tries to submit the creation form with boolean flags in standard text fields.
```json
{
  "name": true,
  "email": "valid@email.com",
  "message": "Valid message",
  "createdAt": "SERVER_TIMESTAMP"
}
```

### Payload 5: Missing Required Field (Integrity Breaking - Contact Submission)
Attempts to write without the mandatory `message` parameter.
```json
{
  "name": "Attacker",
  "email": "attacker@email.com",
  "createdAt": "SERVER_TIMESTAMP"
}
```

### Payload 6: Booking Missing Required Fields (Integrity Breaking - Booking Slot)
Attempts to secure a booking slot with missing `selectedDate` and `selectedTimeSlot`.
```json
{
  "name": "Alex",
  "email": "alex@company.com",
  "createdAt": "SERVER_TIMESTAMP"
}
```

### Payload 7: Huge Name Booking (Denial of Wallet)
Submits a booking with a 50,000 character pseudo-identity to force large heap queries.
```json
{
  "name": "...(50,000 characters)...",
  "email": "attacker@domain.com",
  "selectedDate": "2026-06-01",
  "selectedTimeSlot": "14:00",
  "createdAt": "SERVER_TIMESTAMP"
}
```

### Payload 8: Malformed Email Subscription
Writes a newsletter address node using a non-string list.
```json
{
  "email": ["attacker@domain.com", "second@domain.com"],
  "createdAt": "SERVER_TIMESTAMP"
}
```

### Payload 9: Unauthorized Submission Read Attempt (PII Scraping)
Attempt to list all submissions in `/contact_submissions/` by an unauthenticated guest.
`getDocs(collection(db, 'contact_submissions'))` -> EXPECTED: `PERMISSION_DENIED`

### Payload 10: Unauthorized Document Deletion (State Destabilization)
Attempt to delete an existing booking slot entry.
`deleteDoc(doc(db, 'bookings', 'someBookingId'))` -> EXPECTED: `PERMISSION_DENIED`

### Payload 11: Unauthorized Document Update (State Manipulation)
Attempt to update a subscriber node's email or creation date.
```json
{
  "email": "hacked@sub.com"
}
```
-> EXPECTED: `PERMISSION_DENIED`

### Payload 12: Invalid Path Variable Poisoning
Using characters outside `^[a-zA-Z0-9_\-]+$` or huge string sizes for collection IDs to stress indexing layers.
`setDoc(doc(db, 'contact_submissions', '../../hacked'))` -> EXPECTED: `PERMISSION_DENIED`

---

## 3. Test Verification Rules
To guarantee security, all of the above payloads verify as `PERMISSION_DENIED` against our `firestore.rules`.
All creation blocks enforces:
1. `request.auth` checks or anonymous public allowance strictly bounded by constraints.
2. Direct static payload schema verification before any disk operational layer.
3. Perfect strict timestamp checks: `incoming().createdAt == request.time`.
