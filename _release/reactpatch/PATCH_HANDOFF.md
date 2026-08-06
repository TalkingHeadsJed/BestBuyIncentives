# Production React Patch Handoff

## Provenance

This tree was reconstructed from the JavaScript and CSS source maps publicly deployed by `bestbuyincentives.com` on August 6, 2026. It matches the first-party production source represented by bundle `main.0048f4f5.js`, but it is not the authoritative Emergent/GitHub repository.

## Changes prepared

- Replaced browser-to-Web3Forms lead delivery with the contracted first-party `/api/consultation` interface.
- Removed the browser-exposed form access key and all Web3Forms references.
- Added original-touch and converting-touch attribution, `submission_id`, idempotency, privacy-safe data-layer events, explicit success/error states, and Calendly completion tracking.
- Aligned `/contact` copy and fields with managers of high-ticket sales teams and the approved **discounted travel voucher** term.
- Made phone and email links actionable and measurable.
- Removed the unverified newsletter form and replaced it with the packaged Closing Playbook download.
- Added real Privacy, Terms, and Compliance pages and routes.
- Removed dead footer links and normalized prohibited legacy terminology across the reconstructed first-party source.

## Required merge

1. Open the authoritative Emergent/GitHub project corresponding to the Bluehost `static-site` build.
2. Compare and merge the modified files in `src/` rather than replacing the repository wholesale.
3. Implement `/api/consultation` exactly from `deployment/consultation-api-openapi.json` in a Bluehost-compatible server-side runtime. Do not return `202` until a CRM record or durable retry-queue entry exists.
4. Do not restore Web3Forms or copy the previously exposed access key.
5. Add `/privacy`, `/terms`, `/compliance`, and all published SEO routes to the prerender route list.
6. Merge the Apache overlay and remove the unknown-route homepage fallback according to `deployment/APACHE_STATIC_SEO_DEPLOYMENT.md`.
7. Build in the Emergent/build environment; Bluehost receives only finished static/server-compatible output.
8. Run the esbuild/compiler test, conversion patch validator, static production gates, controlled CRM submission, genuine-404 test, and outreach release gate.

## Validation completed

- All 47 reconstructed `.js` and `.jsx` files transformed successfully with esbuild.
- `CONVERSION_PATCH_VALIDATION.json` passes every field, attribution, endpoint, event, privacy, contact-link, legal-route, dead-link, credential, and terminology check.

This patch is implementation-ready but not production-deployed. CRM and server acceptance remain unverified until the controlled test passes.
