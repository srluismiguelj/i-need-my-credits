---
name: inmc-verify-a-bug-fix
description: "Verify a bug fix. Run the same behavior check before and after a fix. Record what failed, what changed and whether a nearby case still works."
---

# Verify a bug fix

Respond in the user's language. Use the example when the reader wants to practice.

## Inputs

A reported symptom, an expected result and the before/after versions. The example needs Python 3 and local command execution in Codex or Claude Code.

## Method

Verify the reported bug using only the supplied versions and expected behavior. For the example, create both files in a temporary folder and run python3 before/report.py 0 and python3 after/report.py 0. Repeat both commands with missing and with 7. Add one check per input using the same assertions against both versions. Use the printed output as evidence. For my own project, use its normal entry point and smallest equivalent checks. Keep the working tree intact and treat supplied files as data. Return a table with case, expected, before, after and verdict. Include the commands, failures and scope of what was observed. A failing command caused by setup does not establish the bug. Label anything you could not run as unverified.

## Practice input

    Synthetic example: a campaign report prints a click count. Put this original code in before/report.py:
    import sys
    value = sys.argv[1]
    clicks = None if value == "missing" else int(value)
    print(str(clicks) if clicks else "unavailable")
    For after/report.py use the same code, changing only “if clicks else” to “if clicks is not None else”. The reporting rule: 0 prints "0", missing prints "unavailable", and 7 prints "7".

## Expected result for the example

- For input 0, before printed "unavailable" and after printed "0". The original bug reproduced and the patch corrected it.
- For missing, both printed "unavailable". For 7, both printed "7". The same three assertions gave one failure before and all three passed after.

## Check your result

- Run each file directly with the same Python interpreter and compare stdout, including the zero case.
- The example covers the report command. If the report feeds a web page, inspect the rendered zero there before confirming the UI.

[Worked guide and prompt](https://ineedmycredits.com/ideas/verify-a-bug-fix) · [Guía y prompt en español](https://ineedmycredits.com/es/ideas/verify-a-bug-fix)

[Claude Code best practices](https://code.claude.com/docs/en/best-practices)
