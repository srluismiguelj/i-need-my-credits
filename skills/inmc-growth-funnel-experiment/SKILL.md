---
name: inmc-growth-funnel-experiment
description: Use comparable funnel data to pick one bottleneck, one change and one success metric.
---

# Turn a funnel drop into one growth experiment

Use this workflow when asked for this output. Request the relevant inputs below if they are missing. Use the sample only if the user wants to practice. Respond in the user’s language.

## Inputs

Use aggregate counts from one defined cohort, window and event sequence. Export GA4 exploration counts or supply your own equivalent table. Keep event totals apart from unique users.

## Optional GA4 MCP connection

Use this path when the user asks to work with an authorized GA4 property. Walk them through one step at a time and confirm the result before moving on. Let them complete sign-in and approve the setup in their own terminal. If they prefer, use a CSV or the practice inputs.

1. Check for Python 3.10+, pipx and Google Cloud CLI. Ask the user to confirm Viewer access and an authorized Cloud project with both Analytics Admin API and Analytics Data API enabled.
2. Use [Google’s authentication steps](https://developers.google.com/analytics/devguides/MCP#set-up-authentication) to get local ADC credentials with `analytics.readonly`. The user keeps the credential file private and uses its absolute path in the terminal.
3. Use the command for the user's client in the [INMC connection walkthrough](https://ineedmycredits.com/ideas/growth-funnel-experiment#ga4-mcp). Replace the credential path and Cloud project ID in the command. Start a fresh session after adding the server.
4. Use `get_account_summaries` and ask the user to confirm the numeric GA4 property ID before querying it. Verify with `run_report` for sessions on one complete day and compare the total to GA4 using the same date and filters.
5. Use run_funnel_report for the agreed closed funnel. Confirm cohort, dates and event order. If you only get separate event totals, ask for a closed-funnel export.

[Guía paso a paso en español](https://ineedmycredits.com/es/ideas/growth-funnel-experiment#ga4-mcp). Comprueba el acceso de Lector, sigue el inicio de sesión de Google y usa el comando para tu herramienta. Confirma la propiedad y compara una consulta de un día con GA4. Usa run_funnel_report para el embudo cerrado acordado. Confirma cohorte, fechas y orden de eventos. Si solo obtienes totales sueltos, pide una exportación del embudo. Si no puedes conectarlo, usa un CSV.

## Method

Document the cohort, event sequence, window and units. If the counts are linked to the same eligible users in order, calculate each transition and show both rates and raw counts. If provenance does not establish a nested funnel, stop the rate calculations and list what is missing. Propose one experiment for the most actionable step: observed friction or a clearly labeled hypothesis, one change, primary metric and denominator, one guardrail, evidence to collect, review timing and a continue/refine/stop/inconclusive rule. Do not invent a causal finding or publish anything.

## Practice input

Fictional closed funnel for 200 consenting desktop visitors over 14 days. Landing page: 200 users. Clicked start: 100. Completed required setup: 25. Weekly repeat use is unavailable.

## Verify

- Confirm numerators, denominators and eligibility before calculating.
- Check that the proposal changes one point and does not use invented retention figures.

Reference: [Google Analytics · Funnel exploration](https://support.google.com/analytics/answer/9327974).
