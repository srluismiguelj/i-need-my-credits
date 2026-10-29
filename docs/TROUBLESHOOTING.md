# I Need My Credits: connection and update troubleshooting

Start with the provider named in the app. A missing reading stays unavailable; it is never treated as full capacity. You do not need an INMC account or browser extension.

## Codex has no current reading

1. Open the official Codex app on this Mac and sign in to the account you want to monitor.
2. Return to INMC. Open Settings and confirm that **Monitor Codex** is on.
3. Refresh INMC once. Read any connection message before retrying.
4. If Codex itself needs attention, finish that step in Codex. INMC does not approve provider permissions for you.

Expected result: INMC shows a current reading and its reset information. A token-activity history is a different view from available plan capacity.

[Codex setup guide](https://ineedmycredits.com/providers/codex) · [Official Codex documentation](https://developers.openai.com/codex/)

## Switching Codex accounts

Use the current INMC release. From 0.3.63, INMC stays open when Codex signs out or a usage check is interrupted.

1. Switch to the intended account in Codex and leave INMC open.
2. Open the INMC monitor to check immediately. Background checks also detect the current session; interrupted checks retry automatically with a bounded backoff. Previous readings are hidden after a failed check.
3. If it still needs attention, open Codex connection details, check **Account in Codex**, then choose **Reconnect to this account**. Finish any required sign-in in Codex.

The available usage, resets and annual activity belong to the current detected account. A delayed response from a previous session is discarded. INMC does not sign you out of Codex or merge two accounts into one allowance.

If the INMC menu-bar item really disappears on the latest release, report the INMC/macOS versions and the steps through private support. Include a sanitized macOS crash report if available; remove account details, tokens and personal paths. An unavailable provider reading should leave INMC running.

## Claude Code needs attention

1. Confirm that your account can use Claude Code. Claude web and Desktop sign-in are separate from the official Claude Code connection used here.
2. Choose **Retry connection** or **Connect Claude** in INMC. Keep the app open while the official sign-in flow runs.
3. Complete sign-in and approval in the browser when Claude requests it. If you closed that page, return to the INMC connection view and retry.
4. Refresh after the sign-in completes. If an account or plan is unsupported, follow the displayed message rather than treating the missing value as available capacity.

Expected result: a fresh authorized reading replaces the connection message. An expired session requires signing in again; INMC never asks you to paste browser cookies or credentials into a support issue.

[Claude Code setup guide](https://ineedmycredits.com/providers/claude) · [Official Claude Code setup](https://code.claude.com/docs/en/setup)

## Use the GitHub update channel on 0.3.61–0.3.64

These versions include Sparkle and read the website's signed update feed, which now offers the current release. Open INMC Settings → **Check for updates**. If discovery is still stuck, you can select the official GitHub feed once in Terminal:

```sh
defaults write app.duetbar.mac SUFeedURL -string 'https://github.com/srluismiguelj/i-need-my-credits/releases/latest/download/appcast.xml'
```

Open INMC Settings → **Check for updates**. If the running app retains the old preference, quit and reopen that same installed app, then check again. This opens the native update window; it does not require Finder or a DMG. You choose **Install Update**, then **Install and Relaunch**. This preference only changes the public feed location; signed-feed and archive validation stay enabled. No GitHub account or additional permission is required.

After installing 0.3.65, both update availability and the native installer use GitHub by default. The older version's blue availability button also uses the restored website feed until this first update.

## Read what changed in the installed version

From **0.3.71**, click the version/Beta label in the footer. It opens that exact version’s release notes in the language selected in INMC. Hover shows **What’s new** / **Novedades**. This opens the public website only; it does not start an update or share provider readings. If the browser is offline, try again when connected.

## Integrated update did not complete

From **0.3.70**, click the blue **Update** button and choose **Update** or **Cancel** in the confirmation. Only confirming starts the update. Progress stays inside the button; INMC verifies, installs and restarts automatically. Versions **0.3.68–0.3.69** use their existing direct button once to install this improvement. If it cannot finish, a short inline message lets you retry. Downloads can be cancelled before extraction; if restart is delayed, use the same button to retry it. macOS may still ask permission for protected installations. Your connections and settings are kept. In **0.3.65–0.3.67**, the blue button opens the existing native update window: choose **Install Update**, then **Install and Relaunch** once to install this improvement. If verification fails, cancel and retry on a stable connection; never disable macOS security or manually install an unverified archive. The signed DMG on the [personal GitHub release](https://github.com/srluismiguelj/i-need-my-credits/releases/latest) remains the recovery path.

For 0.3.61–0.3.64, use Settings → Check for updates; the one-time feed setup above is an optional recovery path. For 0.3.60 or earlier, use the DMG installer once to enable integrated updates. The website and GitHub offer the same current release; the public health workflow checks that they agree.

## First installation or DMG download did not complete

1. Use the [current official download page](https://ineedmycredits.com/descargar) or [latest GitHub release](https://github.com/srluismiguelj/i-need-my-credits/releases/latest).
2. Wait until the DMG download completes. Open it and double-click **Install I Need My Credits**.
3. The installer closes and replaces the active old copy, then opens the app. Read the version in the footer and compare it with the release page.
4. If the download reports an integrity error, discard that incomplete download and retry from the official page. Do not bypass macOS security warnings.

Every release includes a checksum file. In Terminal, `shasum -a 256` followed by the path to your downloaded DMG should match its published SHA-256 exactly. The installer requires macOS 13 or later. Apple silicon and Intel are included; physical Intel testing is still pending.

## Still stuck?

[Report a problem](https://github.com/srluismiguelj/i-need-my-credits/issues/new?template=bug.yml) with your INMC version, macOS version, chip type, steps and the non-sensitive error text. Remove private account readings and identifiers from screenshots. For private support, see [Support](../SUPPORT.md).

[Back to the app](../README.md) · [Privacy](https://ineedmycredits.com/privacidad)
