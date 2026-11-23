---
name: inmc-codex-claude-session-handoff
description: "Hand off a coding session. Give the next session a short note with the goal, changed files, last verified result and one next check. It can pick up the work in the same project."
---

# Hand off a coding session

Respond in the user's language. Use the example when the reader wants to practice.

## Inputs

Use a session you can access and a project folder you may share with the receiving provider. The sample only needs a chat. Switching providers requires access to both. A note needs neither a chat export nor an API key.

## Method

Prepare a Markdown handoff under 130 words for a fresh Codex or Claude Code session. Work only from the evidence below. Give the goal and acceptance condition, file paths and worktree state, last verified command and outcome, pending check, and a first message I can paste into the next session. State which results are unknown. Use the existing test runner and exact test name for one next command. Return text only. Leave out private chat history, credentials and personal identifiers. If the destination cannot see a file, have it ask for the smallest relevant excerpt before editing.

## Practice input

    Goal: keep the columns in an empty CSV export.
    Decision: column order is name,qty, including empty exports.
    Touched: export_csv.py and test_export.py; work is uncommitted.
    Latest check: python3 -m unittest test_export.HeaderTests.test_populated → 1 test, OK.
    Open check: test_export.HeaderTests.test_empty exists and has not run. No other checks recorded.

## Expected result for the example

- Goal: an empty CSV retains name,qty in that order. Uncommitted changes are in export_csv.py and test_export.py.
- Verified: python3 -m unittest test_export.HeaderTests.test_populated ran one passing test. The empty case is still unverified.
- First message: Confirm both files are present, then run python3 -m unittest test_export.HeaderTests.test_empty. Report the result before changing code.

## Check your result

- The destination should identify the pending empty case from the note alone. Compare that command with the original test name.
- Confirm the first run checks the same working copy. Record its actual output before marking the empty case complete.

[Worked guide and prompt](https://ineedmycredits.com/ideas/codex-claude-session-handoff) · [Guía y prompt en español](https://ineedmycredits.com/es/ideas/codex-claude-session-handoff)

[Claude Code · Manage sessions](https://code.claude.com/docs/en/sessions)
