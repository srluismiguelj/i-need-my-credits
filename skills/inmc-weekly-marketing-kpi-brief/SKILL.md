---
name: inmc-weekly-marketing-kpi-brief
description: Turn weekly marketing KPIs into a decision brief. Explain one meaningful change with comparable numbers and a next action.
---

# Turn weekly marketing KPIs into a decision brief

Use this workflow when asked for this output. Request the relevant inputs below if they are missing. Use the sample only if the user wants to practice. Respond in the user’s language.

## Inputs

Supply two comparable periods, event definitions, filters, attribution scope and known data gaps. Export or paste aggregate data.

## Optional GA4 MCP connection

Use this path when the user asks to work with an authorized GA4 property. Walk them through one step at a time and confirm the result before moving on. Let them complete sign-in and approve the setup in their own terminal. If they prefer, use a CSV or the practice inputs.

1. Check for Python 3.10+, pipx and Google Cloud CLI. Ask the user to confirm Viewer access and an authorized Cloud project with both Analytics Admin API and Analytics Data API enabled.
2. Use [Google’s authentication steps](https://developers.google.com/analytics/devguides/MCP#set-up-authentication) to get local ADC credentials with `analytics.readonly`. The user keeps the credential file private and uses its absolute path in the terminal.
3. Use the command for the user's client in the [INMC connection walkthrough](https://ineedmycredits.com/ideas/weekly-marketing-kpi-brief#ga4-mcp). Replace the credential path and Cloud project ID in the command. Start a fresh session after adding the server.
4. Use `get_account_summaries` and ask the user to confirm the numeric GA4 property ID before querying it. Verify with `run_report` for sessions on one complete day and compare the total to GA4 using the same date and filters.
5. Use run_report for two complete weeks with identical filters, metrics and attribution scope. Ask for any CRM measures outside GA4 separately.

[Guía paso a paso en español](https://ineedmycredits.com/es/ideas/weekly-marketing-kpi-brief#ga4-mcp). Comprueba el acceso de Lector, sigue el inicio de sesión de Google y usa el comando para tu herramienta. Confirma la propiedad y compara una consulta de un día con GA4. Usa run_report para dos semanas completas con los mismos filtros, métricas y alcance de atribución. Pide por separado las métricas del CRM que estén fuera de GA4. Si no puedes conectarlo, usa un CSV.

## Method

Audit definitions before calculation. Return a concise brief for the team: what changed, exact period and numbers, what explains it only if verified, one uncertainty, one check, one decision. Show comparisons as unavailable when scopes differ. Never sum distinct people from multiple sources or invent causality.

## Practice input

Fictional matched weeks. Last week 400 landing sessions, 40 trial-start sessions and 8 qualified trials. This week 500 landing sessions, 45 trial-start sessions and 9 qualified trials. Qualification uses the same definition and observation window.

## Verify

- Recompute displayed rates and state their denominators.
- Use an evidence-backed sentence and label explanations as hypotheses.

## Expected output

- Trial-start volume rose by 5, while rate fell from 10% to 9% (−1 percentage point).
- Qualified trials grew from 8 to 9. This does not prove a channel or page effect.
- Check the device and source mix before changing the page.

[Full guide and Spanish prompt](https://ineedmycredits.com/ideas/weekly-marketing-kpi-brief).

Reference: [Google Analytics · Understand data freshness](https://support.google.com/analytics/answer/11198161).
