---
name: inmc-google-ads-search-terms-audit
description: Audit Google Ads search terms before adding negatives. Find irrelevant spend and flag terms that need more evidence.
---

# Audit Google Ads search terms before adding negatives

Use this workflow when asked for this output. Request the relevant inputs below if they are missing. Use the sample only if the user wants to practice. Respond in the user’s language.

## Inputs

Bring a redacted Search terms export with cost, clicks, conversions and actual offer. Verify the conversion action, window and freshness.

## Method

Classify each search term as relevant, clearly out of scope or ambiguous with one reason. Show spend, clicks and reported conversions. Distinguish intent evidence from low sample size. Return up to three negative-review candidates with proposed scope, conflict risk and a verification checklist. Never change a campaign, budget, bids or keywords. Mark unreported terms unknown.

## Practice input

Fictional campaign sells paid PDF-invoicing software. Free invoice template: USD 18, 8 clicks, 0 purchases. Invoice software for freelancer: USD 40, 12 clicks, 2 purchases. Invoice template for consultants: USD 3, 1 click, 0 purchases.

## Verify

- Keep spend and conversion counts on the same currency and attribution basis.
- Check the proposed scope against converting search terms and planned offers.

## Expected output

- The first term is a negative-review candidate if free templates are out of scope.
- Keep the second term under review as relevant. One click on the third term is insufficient by itself.
- Avoid blocking the broad word invoice; check query conflicts first.

[Full guide and Spanish prompt](https://ineedmycredits.com/ideas/google-ads-search-terms-audit).

Reference: [Google Ads · About the search terms report](https://support.google.com/google-ads/answer/13738234).
