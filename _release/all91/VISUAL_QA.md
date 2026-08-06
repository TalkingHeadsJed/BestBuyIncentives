# All-91 Apache Bundle Visual QA

Date: 2026-08-06

## Automated result

- 91 physical route pages generated.
- 915/915 structural, metadata, schema, CTA, terminology, operational-note, asset, and encoding checks passed.

## Browser samples

### General article — desktop

`/sales-closing-techniques-high-ticket-purchases/`

- One H1, 12 H2s, 14 links.
- No horizontal overflow at 1,265 CSS-pixel viewport width.
- Hero hierarchy, CTA, content column, typography, and header rendered correctly.
- No operational/editorial notes appeared in visible copy.

### Jewelry vertical — mobile

`/industries/jewelry-stores/`

- One H1, nine H2s, and three H3s.
- No horizontal overflow (`scrollWidth=375`, `clientWidth=375`).
- Mobile navigation, headline wrapping, CTA width, paragraph measure, and section transition rendered correctly.
- Approved **discounted travel voucher** terminology appeared; no operational notes appeared.

### Inherited first-13 samples

- Homepage desktop and mobile passed.
- High-Ticket Closing Playbook passed after the functional PDF-download correction.

## Deployment state

The bundle is ready for a staged overlay deployment. It must be extracted over the existing public root without deleting unbundled working routes such as `/contact/`. Production verification remains mandatory before sitemap submission or outreach release.
