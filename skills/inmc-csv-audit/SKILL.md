---
name: inmc-csv-audit
description: Validate a conversion rate from a CSV with additive eligible and converted counts. Use to audit duplicates, conflicting IDs, missing values, and invalid denominators before sharing a rate.
---

# Audit a CSV conversion rate

Ask which file is authorized, which fields identify batches and count eligible and converted sessions, and whether eligible sessions are distinct across batches. Do not upload the file or alter the original. If batches overlap or a session can convert more than once, ask for a suitable definition before computing the rate.

1. Read the header and first eight data rows, excluding the header. Report the affected ID, row numbers and issue. Keep one copy of exact duplicates; hold all rows for an ID with conflicting counts.
2. Exclude rows with missing IDs or counts, negative or noninteger counts, a zero denominator, or converted above eligible. A blank is unknown, never zero. Show the excluded row reasons.
3. Sum converted and eligible counts over the remaining distinct batches, then divide the sums. List included IDs and show numerator and denominator. If no valid denominator remains, report rate unavailable. Label this as a sample, not a full-file result.
4. Expand only when asked. Check the entire file for ID conflicts, including IDs from the first sample, then recompute the rate. Do not average row-level rates.

Practice data and expected calculations: https://ineedmycredits.com/ideas/csv-conversion-audit
