# Check Codex and Claude Code usage limits on Mac

Use this guide to check a limit now, then decide whether you want it visible in your menu bar. The commands below display information; they do not start a coding task. INMC is an independent app, not affiliated with OpenAI or Anthropic.

## Check Codex usage

Prerequisite: an active Codex CLI session signed in to the account you want to check.

```text
/status
```

Read the available limit windows and reset times. OpenAI also provides a usage dashboard, linked from its [official usage and pricing guide](https://learn.chatgpt.com/docs/pricing#where-can-i-see-my-current-usage-limits). Windows depend on your plan; some plans have no five-hour cap. No fixed number of remaining prompts can be inferred from a percentage.

For a persistent Mac view, [set up the Codex usage monitor](https://ineedmycredits.com/providers/codex). INMC reads available plan limits from the account signed in on this Mac; it does not need a browser extension.

## Check Claude Code usage

Prerequisite: Claude Code signed in to the intended compatible account.

```text
/usage
```

Subscribers see plan usage bars. Keep the Session API cost estimate separate from subscription capacity. Follow the labels and reset windows reported for your own account. [Official Claude Code usage reference](https://code.claude.com/docs/en/costs#using-the-usage-command).

For the INMC Claude Code connection, personal accounts need Pro or Max; Claude Free chat cannot authorize it. Team and Enterprise access depends on the organization. A Claude web or Desktop session alone does not authorize this connection. [Set up the Claude Code usage monitor](https://ineedmycredits.com/providers/claude) or read the [official account guide](https://support.claude.com/en/articles/11145838-use-claude-code-with-your-pro-or-max-plan).

## Compare the same thing

| Reading | What it tells you | What it does not establish |
| --- | --- | --- |
| Remaining plan capacity | Allowance left in a reported plan window | A cash balance or guaranteed number of prompts |
| Used percentage | The portion used in that same window | Remaining capacity unless converted using the same denominator |
| Recorded tokens | Text processed in the recorded activity | A subscription allowance or exact API bill |
| API credits or costs | A separate API billing measurement | Your included consumer-plan capacity |

**Illustrative comparison:** if an official view says **25% used**, **75% remains** in that same window. Compare account, window and reading time before treating two views as inconsistent. This is arithmetic with fictional data, not an account reading or performance claim.

If a reading is missing or expired, it is unavailable; it does not mean 100% remains. For connection problems, use the [troubleshooting guide](TROUBLESHOOTING.md). INMC does not inspect the content of your questions, change your reasoning setting, or provide additional credits.

## Install the free monitor

1. [Download the current signed and Apple-notarized DMG](https://ineedmycredits.com/descargar), or use the [latest GitHub release](https://github.com/srluismiguelj/i-need-my-credits/releases/latest).
2. Open it and double-click **Install I Need My Credits**.
3. Use your signed-in Codex account and connect Claude only if you want it. Finish Claude’s official approval when asked, then wait for a current reading.

Requires macOS 13+. The universal installer includes Apple silicon and Intel; physical Intel testing remains pending. No INMC account or credit card is needed. Optional product reporting starts only if you consent. The application source is private; this public repository distributes installers and documentation.

[Usage alerts](https://ineedmycredits.com/smarter-usage/alerts) · [Privacy](https://ineedmycredits.com/privacidad) · [Back to the app](../README.md)
