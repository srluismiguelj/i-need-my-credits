---
name: inmc-utm-campaign-link-builder
description: Build a UTM naming plan and campaign URLs. Tag one campaign consistently across channels and check the URLs before publishing.
---

# Build a UTM naming plan and campaign URLs

Use this workflow when asked for this output. Request the relevant inputs below if they are missing. Use the sample only if the user wants to practice. Respond in the user’s language.

## Inputs

Provide the canonical destination, channels and a short campaign name. No analytics login is needed for the exercise.

## Method

Produce one naming table and two URLs, starting from the supplied destination. Validate source, medium and campaign; percent-encode values where needed. Preserve unrelated query parameters and append the fragment after the query. Use common campaign naming across placements and report collisions. Do not tag internal navigation, include personal data or publish. State which redirects still need verification.

## Practice input

Fictional URL https://example.com/guide?lang=en#checklist. Campaign november-guide. Placements: LinkedIn company page and an opted-in newsletter. Sample medium convention: organic_social or email.

## Verify

- Verify exactly one value per required UTM field.
- Keep people’s names, emails, IDs and free-text from forms out of URL tags.

## Expected output

- LinkedIn: https://example.com/guide?lang=en&utm_source=linkedin&utm_medium=organic_social&utm_campaign=november-guide#checklist
- Newsletter: replace utm_source with newsletter and utm_medium with email. The untouched lang parameter and fragment are retained.

[Full guide and Spanish prompt](https://ineedmycredits.com/ideas/utm-campaign-link-builder).

Reference: [Google Analytics · Campaigns and traffic sources](https://support.google.com/analytics/answer/11242841).
