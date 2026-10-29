# Availability and release checks

## Current website and native channel alignment

Current stable release: **0.3.67**, with more breathing room around proportional Halloween artwork and the existing signed native update flow.

On October28,2026, the canonical website and its signed update feed were brought into alignment with GitHub 0.3.65, inside the same Sites hosting platform. Native 0.3.65 continues to use GitHub directly; older Sparkle clients can also use the restored website feed. The original Site was retained as a separate rollback archive. The historical rollout mismatch below is resolved; all existing integrity and agreement checks remain enabled. No update was installed on the owner's Mac.


The [Public health workflow](https://github.com/srluismiguelj/i-need-my-credits/actions/workflows/public-health.yml) runs on GitHub every day at approximately 13:17 UTC (08:17 Colombia time), after changes to the public hub, and on manual dispatch. GitHub may delay scheduled runs. Public-repository schedules can be disabled after extended inactivity; the separate INMC maintenance routine checks that the workflow remains enabled.

## Daily

- Public product, setup, download, release, idea and shortcut pages respond with their expected canonical and one main heading.
- GitHub's latest stable version, installer size and SHA-256 agree with the website's update feed.
- Robots, sitemap, llms.txt and representative Markdown remain available with the correct canonical/noindex policy.
- The first and last installer fragments are available; their lengths are checked when the CDN exposes them in HEAD responses. This daily check does not prove the complete installer bytes.
- README documentation links and all three screenshot assets exist.

## Weekly and after a release

Saturday's scheduled check also verifies all canonical sitemap pages, the Markdown references from llms.txt, every installer fragment, each fragment's SHA-256 and the complete assembled installer checksum. Maintainers can run the same full check with **Run workflow → Verify every installer part** after the website and GitHub release are both live.

The workflow is read-only and uses GitHub's built-in repository-scoped token. It cannot release an app, change the website, read provider accounts or approve sign-in. It needs no extra personal token or signing certificate. Actions run status provides the result; notifications follow the owner's GitHub notification settings. A green badge represents the last completed run, not a real-time uptime guarantee or an SEO ranking.

INMC's separate Codex maintenance routines inspect failed runs and can repair routine website/documentation issues. Native changes require actual compatibility tests, signing, notarization and release verification on the owner's Mac. Neither system silently installs updates on users' Macs.

[Latest stable release](https://github.com/srluismiguelj/i-need-my-credits/releases/latest) · [Troubleshooting](TROUBLESHOOTING.md) · [Back](../README.md)

## Integrated updates

From 0.3.61, the monitor also checks the signed Sparkle appcast, its version and personal GitHub update asset. Full checks download the update-only ZIP, compare its size and GitHub SHA-256 and verify its Ed25519 signature. The updater itself requires signed feeds and signed archives before extraction, plus the application signature checks. Native signing keys stay in the owner’s Keychain and are never uploaded to Actions. These automated downloads are operational checks, not user installations.

## October 28, 2026: GitHub-first 0.3.64 rollout

The owner authorized releasing the signed and notarized 0.3.64 app on GitHub before completing the website rollout. The website and signed in-app feed remain on 0.3.63. This is a known channel mismatch, not a claim that the integrated Update button already offers 0.3.64.

The existing Public health agreement check will flag that mismatch until the channels converge. The check is intentionally retained; it must not be disabled or weakened to hide the rollout status. Direct GitHub artifact hashes and the signed 0.3.64 update archive are verified separately. Manual users should choose the versioned DMG; users waiting to test the integrated update can keep their installed app.
