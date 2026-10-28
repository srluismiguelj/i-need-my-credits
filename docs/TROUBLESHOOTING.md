# I Need My Credits: connection and update troubleshooting

Start with the provider named in the app. A missing reading stays unavailable; it is never treated as full capacity. You do not need an INMC account or browser extension.

## Codex has no current reading

1. Open the official Codex app on this Mac and sign in to the account you want to monitor.
2. Return to INMC. Open Settings and confirm that **Monitor Codex** is on.
3. Refresh INMC once. Read any connection message before retrying.
4. If Codex itself needs attention, finish that step in Codex. INMC does not approve provider permissions for you.

Expected result: INMC shows a current reading and its reset information. A token-activity history is a different view from available plan capacity.

[Codex setup guide](https://ineedmycredits.com/providers/codex) · [Official Codex documentation](https://developers.openai.com/codex/)

## Claude Code needs attention

1. Confirm that your account can use Claude Code. Claude web and Desktop sign-in are separate from the official Claude Code connection used here.
2. Choose **Retry connection** or **Connect Claude** in INMC. Keep the app open while the official sign-in flow runs.
3. Complete sign-in and approval in the browser when Claude requests it. If you closed that page, return to the INMC connection view and retry.
4. Refresh after the sign-in completes. If an account or plan is unsupported, follow the displayed message rather than treating the missing value as available capacity.

Expected result: a fresh authorized reading replaces the connection message. An expired session requires signing in again; INMC never asks you to paste browser cookies or credentials into a support issue.

[Claude Code setup guide](https://ineedmycredits.com/providers/claude) · [Official Claude Code setup](https://code.claude.com/docs/en/setup)

## Integrated update did not complete

From 0.3.61 onward, open the blue Update button again to return to the active update window. Choose Install Update, then Install and Relaunch when ready. Your connections and settings are kept. If verification fails, cancel and retry on a stable connection; never disable macOS security or manually install an unverified archive. The signed DMG on the website remains the recovery path.

For 0.3.60 or earlier, use the DMG installer once to enable integrated updates.

## First installation or DMG download did not complete

1. Use the [current official download page](https://ineedmycredits.com/descargar) or [latest GitHub release](https://github.com/srluismiguelj/i-need-my-credits/releases/latest).
2. Wait until the DMG download completes. Open it and double-click **Install I Need My Credits**.
3. The installer closes and replaces the active old copy, then opens the app. Read the version in the footer and compare it with the release page.
4. If the download reports an integrity error, discard that incomplete download and retry from the official page. Do not bypass macOS security warnings.

Every release includes a checksum file. In Terminal, `shasum -a 256` followed by the path to your downloaded DMG should match its published SHA-256 exactly. The installer requires macOS 13 or later. Apple silicon and Intel are included; physical Intel testing is still pending.

## Still stuck?

[Report a problem](https://github.com/srluismiguelj/i-need-my-credits/issues/new?template=bug.yml) with your INMC version, macOS version, chip type, steps and the non-sensitive error text. Remove private account readings and identifiers from screenshots. For private support, see [Support](../SUPPORT.md).

[Back to the app](../README.md) · [Privacy](https://ineedmycredits.com/privacidad)
