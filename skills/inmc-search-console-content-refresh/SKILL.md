---
name: inmc-search-console-content-refresh
description: Compare two Search Console periods and turn one drop into a brief you can verify.
---

# Find pages to refresh with Search Console

Use this workflow when asked for this output. Request the relevant inputs below if they are missing. Use the sample only if the user wants to practice. Respond in the user’s language.

## Inputs

Two exports for the same property, search type, country, device and comparable date ranges. Include page, query when available, clicks and impressions. A page-level export is enough for the demo.

## Method

Compare the windows at the page level. Compute CTR from clicks and impressions (undefined at zero impressions); show click change, impression change and CTR in percentage points. Keep unknown fields unknown and never infer demand from hidden queries. Pick one candidate with material click loss and enough impressions for inspection. Separate visible observations from hypotheses. Deliver a one-page refresh brief: URL, symptom, likely explanations to check, one source-backed change or a hold, and one same-window follow-up. Do not edit or publish.

## Practice input

Fictional site. Two complete, comparable 28-day windows. /starter-kit fell from 80 clicks on 1,600 impressions to 48 on 1,600. /templates fell from 30 clicks on 600 impressions to 18 on 360. /guide moved from 4 clicks on 80 impressions to 1 on 90.

## Verify

- Recompute CTR from clicks ÷ impressions, including zero-denominator handling.
- Keep chart totals and query-row sums separate. Confirm the current page and query intent before editing.

Reference: [Google Search Console](https://support.google.com/webmasters/answer/17011364).
