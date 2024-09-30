# Chapter 1

The `??` operator behaves mostly like the `||` operator, but only yields the
right-hand value if the left-hand value evaluates to `null` or `undefined`:

    > 0 || 13
    13
    > 0 ?? 13
    0

    > "" || "foo"
    "foo"
    > "" ?? "foo"
    ""
