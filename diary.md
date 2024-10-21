# Day 20 (2024-10-21)

I started working through chapter 18. As an own example, I started rewriting my
Rust `warmup` program as a form.

# Day 19 (2024-10-20)

I worked through the first half of chapter 17, which is about Canvas.

In the evening, I read the rest of the chapter and made some examples. Instead
of doing the exercises, I displayed the Doom Guy as sprites.

# Day 18 (2024-10-19)

I worked through the rest of chapter 16, but I didn't do the exercises, because
they don't align to what I'm trying to achieve right now. I'd like to move
through the book quickly and then learn TypeScript thoroughly.

# Day 17 (2024-10-18)

I figured out the issue from yesterday; I misread a sequence of instructions to
belong to an `if`-statement, when in fact it was only a single instruction
to be executed conditionally. (The author probably had to omit the curly braces
in order to save space on the page to prevent an ugly page break.)

I continued with the implementation of the game.

# Day 16 (2024-10-17)

I continued working through chapter 16. Unfortunately, the game isn't rendered
as intended, so I need to debug the code.

# Day 15 (2024-10-16)

I started working through chapter 16, in which a small platform game is
implemented.

# Day 14 (2024-10-15)

I read chapter 15 and worked through exercise 1 in the morning. I did the other
two exercises in the evening.

# Day 13 (2024-10-14)

I read through the very short chapter 13, which showed how to load ES modules.
However, it doesn't work using the `file://` protocol, so I need to find a very
small web server for testing.

I found darkhttpd, which does _exactly_ what I need.

I started reading chapter 14 on the train and worked through the first exercise
while waiting in the hospital. I finished the exercises on my way back.

It's October 14th, and I have finished 14 chapters out of 22. If I continue like
this, I'll be able to get started with TypeScript earlier.

# Day 12 (2024-10-13)

I finished working through chapter 12, but I skipped the exercises. I'm
interested in revisiting JavaScript, not in building programming languages.

Chapter 13 will be about the browser, which is closer to my personal goal.

# Day 11 (2024-10-12)

I half-heartedly worked through the last exercise of chapter 11, which is about
implementing `Promise.all`. I also started working through chapter 12.

# Day 10 (2024-10-11)

I finished reading chapter 11, which unfortunately uses fictional examples that
cannot be run as they are. The exercises are based on those examples, which
rather annoys me.

# Day 9 (2024-10-10)

I continued working through chapter 11. I learned about `async`/`await` and how
those keywords relate to promises, and about generators.

# Day 8 (2024-10-09)

I continued working through chapter 11 and now better understand the handling of
`Promise`.

# Day 7 (2024-10-08)

I started reading chapter 11 on asynchronous programming.

# Day 6 (2024-10-07)

I worked through chapter 10 about modules, which was rather thin. Doing some
small examples was enough, and I didn't bother working through the exercises,
which don't go beyond my own examples, or are about CommonJS, which I'll ignore.

# Day 5 (2024-10-06)

I worked through chapter 8 about errors and exception handling in the morning,
which only had two rather easy exercises.

I also worked through chapter 9 on regex during the day, which had some rather
challenging exercises.

I went rather quickly through the first 9 chapters. For October, I planned to do
two chapters in three days. Now I rather did three chapters in two days. But now
begins the part I missed out on so far: modules and async programming. It's time
to slow down and work carefully through those.

# Day 4 (2024-10-05)

I worked through chapter 6 about object-oriented programming. I learned a couple
of new features, such as private fields, static methods, and how to implement
iterators. The exercises are well-suited to the chapter.

In the evening, I worked through chapter 7. However, I didn't to do exercise 2
properly. (I remember that this chapter made me abandon the last edition of this
book roughly five years ago. So I'd rather continue without doing everything
perfectly.)

# Day 3 (2024-10-04)

I worked through chapter 5 about higher-order functions, which wasn't too
difficult, and neither were the exercises.

# Day 2 (2024-10-03)

I worked through chapter 4, which had quite some challenging exercises.

# Day 1 (2024-10-02)

I worked through chapter 3 of _Eloquent JavaScript_ and documented how to use
Deno as a REPL with a file to be evaluated first (e.g. containing function
definitions to be called inside the REPL).

I started reading chapter 4 in the evening on the train.

# Day 0 (2024-10-01)

It's October: the last quarter of the year, which I'd like to devote to web
frontend programming—at least for roughly one hour every morning.

I worked through chapter 2, which had some easy exercises to do.

By accident, I figured out that Deno has a `fmt` command, which seems to do the
same as `prettier`. Typing `deno fmt` and `prettier -w` is roughly the same, but
I'll stick to the former when I work with Deno, and use the latter in any other
environment.

# Day -1 (2024-09-30)

I read through chapter 1, which didn't have any exercises. The operator `??` was
new to me, and I wrote its semantics down in comparison to the `||` operator.

I also decided to use `prettier` as a formatter. By default, it uses double
quotes for strings, trailing commas, and a indentation with two space
characters. (I'd prefer four, but I'll stick to the standard settings
nonetheless.)

# Day -2 (2024-09-29)

I wanted to start the _Daily Frontend Grind_ in October; but here I am. I
finished my effort to learn Rust after 190 days today, in order to spend the
next three months with JavaScript, TypeScript, and Angular. Since it's not
October yet, I call this day "-2". But I'd like to get started anyway.

I just read the introduction of _Eloquent JavaScript_ (4th Edition). I'd like to
use Deno for the examples, except for those targeting the browser and Node.js.
Since Deno supports TypeScript out of the box, I'll also use it for _Essential
TypeScript_ (5th Edition).
