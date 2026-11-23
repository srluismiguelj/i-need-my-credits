---
name: inmc-explain-an-unfamiliar-codebase
description: "Understand an unfamiliar codebase. Pick one visible result and trace the code that produces it. Get a short reading order, file and function references, and an input you can check yourself."
---

# Understand an unfamiliar codebase

Respond in the user's language. Use the example when the reader wants to practice.

## Inputs

Start with one behavior and either a repository you may read or pasted code snippets. A chat is enough for the sample. To inspect local files, the coding tool needs read access to the project.

## Method

Act as my guide to this unfamiliar codebase. Explain only the behavior I asked about, using the supplied files as evidence. Give a reading order from the entry point to the result. Cite file:function at each hop and explain each in plain language. Trace the sample input and give the exact displayed value. Identify one tempting file that does not participate and explain how you know. Suggest one small change to the input that would check your explanation and predict the new result. End with one thing the evidence cannot tell us. Return the explanation only. Leave the files untouched and label predictions separately from observed test runs.

## Practice input

    Question: Why does the weekly total show 12.50 rather than 20.00?
    Input rows: [('paid', 1250), ('pending', 750)]

    view.py
    from summary import paid_cents
    def weekly_total(rows):
        return f"{paid_cents(rows) / 100:.2f}"

    summary.py
    def paid_cents(rows):
        return sum(cents for status, cents in rows if status == 'paid')

    legacy.py
    def gross_cents(rows):
        return sum(cents for status, cents in rows)

## Expected result for the example

- Start at view.py:weekly_total. It calls summary.py:paid_cents, divides the returned cents by 100 and formats the result with two decimals.
- Only the paid row contributes, so 1,250 cents becomes 12.50. legacy.py:gross_cents sums both rows but neither function in the observed path calls it.
- Prediction: changing the pending row to paid would display 20.00. The code shown does not tell us who supplies the rows or selects the week.

## Check your result

- Confirm the import and call both point to paid_cents. Check that 'pending' fails the equality test.
- Run the same example with both rows marked 'paid' if the project is available. Keep any prediction labeled until tested.

[Worked guide and prompt](https://ineedmycredits.com/ideas/explain-an-unfamiliar-codebase) · [Guía y prompt en español](https://ineedmycredits.com/es/ideas/explain-an-unfamiliar-codebase)

[Claude Code · Common workflows](https://code.claude.com/docs/en/common-workflows)
