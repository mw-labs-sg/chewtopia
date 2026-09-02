# Chewtopia

A home-school app for two boys in Singapore: TC (Nanyang Primary, P2) and SC
(Nanyang Kindergarten, K2). Upcoming dates, the school timetable, meals, a
reading log, and the spelling / 华文 / maths practice that gets sat on an iPad.

## Stack

Vanilla ES5 in five plain `<script>` tags. **No build step, no bundler, no npm,
no framework, no TypeScript.** Open `index.html` and it runs.

- `@supabase/supabase-js` — the only runtime dependency, from jsdelivr, pinned
  to an exact version with an SRI hash. If the hash stops matching, the browser
  refuses the file, `sbc()` finds no `window.supabase`, and the app carries on
  per-device. To bump it: fetch the new file, recompute the sha384, change both.
- Google Fonts: Baloo 2, Lexend, Noto Sans SC.

State lives in `localStorage` under the `chew:` prefix; the cloud is a mirror,
never the source of truth. `results()` is cached in memory and dropped whenever
`WJ("results", …)` runs — Training reads it once per box, so re-parsing it each
time cost about a sixth of a second per draw.

## Layout

Load order matters and is fixed in `index.html`:

| File | What it holds |
|---|---|
| `data.js` | **The only file you normally edit.** Kids, word banks, timetables, meals, seed events, Supabase keys. |
| `core.js` | Storage helpers (`S/W/SJ/WJ`), dates, scores, streaks, all Supabase sync, sound, speech, the weak-items bank, mascot SVGs. |
| `timetable.js` | The Timetable tab: the weekly grid, school hours, after-school activities. |
| `training.js` | The Training tab: test list, maths generators, the quiz engine (`start` → `quizHTML` → `grade` → `next`), and the Spelling Climb (`startClimb` → `climbGrade` → `climbNext`). |
| `app.js` | `render()`, the tab router, and Upcoming / Meals / Reading / School. Loads last and boots the app. |

`render()` redraws the whole `#view` from scratch on every state change. There
is no diffing and no component model — a `v*()` function returns an HTML string
and the matching `w*()` function wires its handlers. Keep that pairing, and
remember that `render()` runs on every tile tap inside a quiz: anything it
calls is on a hot path.

Every Chinese question reaches the quiz as `k:"bd"` (tap the characters into
the gaps) or `k:"rn"` (type the pinyin). The item kinds actually in play are
`bd`, `rn`, `spell`, `dict` and `math` — nothing else. Branches for `hz`, `py`
and `tx` were unreachable and have been removed; do not add them back without
something that produces those kinds.

## Supabase

Two tables, both row-level-secured to `auth.uid() = user_id`. One family
account; sign-in takes a bare name and `asEmail()` appends `@chewtopia.family`.

- **`results`** — one row per completed test (`id, user_id, child_id,
  test_code, test_name, score, total, completed_at`).
- **`state`** — key/value for everything else, one row per `(user_id, k)`.
  See `supabase-state.sql`. Keys are in `STATE_KEYS`: `weak:tc`, `weak:sc`,
  `books:tc`, `books:sc`, `events`, `acts`, `seedgone` — plus `struck`, which
  is not in that list because it is a map, not a list, and is pushed by hand.

Sync model: **merge, never overwrite.** `cloudSync()` pulls then pushes.
`mergeList()` unions by id (or by `k` for weak items), taking `max(n)` and
letting the newer `ts` win other fields.

Three rules keep that honest, and each exists because breaking it lost work:

- **Deletions need a tombstone.** A union alone hands a deleted row straight
  back. `seedgone` covers events and activities; `struck` covers books and the
  tricky-ones bank. `dropGone()` and `dropStruck()` run after every merge.
  Missing a cleared weak item again calls `unstrike()`.
- **`pulledOnce` gates every push,** and is set only when the *state* read
  succeeds — not the results read. The lists are what a push replaces
  wholesale, so a state read that fails on its own must not open the gate.
- **Neither direction may claim success for the other.** `syncErr()` is what
  went wrong going up, `pullErr()` going down; `cloudSync` reports both.

Meals, groceries, names and streaks are deliberately **not** synced, and the
Meals panel says so on screen.

## Curriculum sources

Everything is Singapore MOE, and the PDFs it came from are in `References/`.

- **Maths** — MOE 2021 primary syllabus (Oct 2025 revision). `MA_SETS` is one
  set per P2 sub-strand. Numbers stop at 1000; tables are 2, 3, 4, 5, 10 only;
  fractions are unit and like fractions within one whole. The `reach` set is
  P3 on purpose and is labelled "Next year" so a low score means nothing.
- **华文** — 南洋小学 二年级高级华文. `HANZI` is 我会写 (生字表), `RECOG` is
  我会认 (p.116), `TC_PINYIN` is the 词表, `TC_TINGXIE` is the school's own
  听写 sheets. All keyed by lesson (`第九课`…`第十九课`) so they line up.
- **English** — STELLAR. `TC_SPELL` is keyed by list number (`3.3`, `3.4`)
  with the unit name alongside; `SC_SPELL` / `SC_TINGXIE` are keyed by week.

Practice codes are `type|key`: `en` `es` `zh` `hz` `rn` `tx` `ma`. A seed event
carrying `p:"en|3.5"` gets a practice button and feeds the daily set.

- **The Spelling Climb is not curriculum**, and `CLIMB_WORDS` says so at the
  top. It is a ladder of ordinary English words keyed by length, 3 letters to
  15, for finding out where a boy falls over rather than testing a set list.
  Three right in a row goes up a rung; three misses on one rung ends the run,
  and the lives refill on the way up so a slip low down is not a ceiling.
  Nothing missed there joins the weak-items bank — a P2 boy handed
  "extracurricular" has run out of ladder, not found a word he needs to drill.
  It has no practice code and is not in `allCodes()`, so it never feeds the
  daily set; it is its own panel on Training and its own state (`climb`),
  because a mark out of ten is exactly what it is not.

## Local dev

No install, no test suite. Serve the folder over http (`file://` breaks
`localStorage` scoping and the CDN):

```bash
python -m http.server 8899
```

Bump the `?v=` on any script you change in `index.html`, and bump the build
number in `.foot` — the boys' iPads cache aggressively.

There is no test runner, but the app will run headless: stub `document`,
`window` and `localStorage`, concatenate `data.js` `core.js` `timetable.js`
`training.js`, and drive `start()` → `grade()` → `next()` over `allCodes()`.
Answering everything correctly must score full marks on every code; that one
check catches most marking regressions in under a second. Worth driving the
climb the same way: a perfect climber must clear level 15 in 39 words and
every word must be exactly as long as the rung it was asked on.

## Conventions

- ES5 only: `var`, `function`, string concatenation. No arrow functions, no
  template literals, no `let`/`const`, no optional chaining. Matches every
  existing line and keeps old iPads working.
- Comments explain *why*, in plain English, often naming the real-world
  failure that prompted the code. Keep that voice; don't reduce them to
  restating the syntax.
- Escape everything user- or cloud-supplied with `esc()` before it reaches
  `innerHTML`.
- Never invent curriculum. If a list isn't off the school's sheet, say so in a
  comment above it (see `第十四课` in `TC_TINGXIE`).
- Give every new `SEED_EVENTS` / `SEED_ACTS` entry a fresh id. Anything deleted
  in the app stays deleted via `seedgone`.
- Failures must be visible. Say what went wrong rather than showing a number
  that never moves.

## Git

- PowerShell is the shell here: chain with `;`, not `&&`.
- Always end a set of file changes with a commit **and** a push.

## Removed, on purpose

Both dead subsystems are gone as of build 89, and the files with them:

- **Stroke tracing, the writing pad and hand-marking.** `handwritten()`
  returned `false` unconditionally, so none of it could run. `strokes.js`
  (420 KB) and two byte-identical copies of `hanzi-writer.min.js` were never
  fetched. Nothing is written by hand now — 我会写 is answered by tapping the
  character, 听写 by filling the gaps in the sentence.
- **The Progress screen and the PIN-gated marking sheet.** `vResults()` was
  never in `render()`'s view map. Training shows every score and every tricky
  one; the sync panel is what the grown-ups actually open.

If either comes back, it needs a route in `render()`'s view map and a producer
for the item kinds it expects — that is exactly what both were missing.
