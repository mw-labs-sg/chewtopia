# Chewtopia

A home-school app for two boys in Singapore: TC (Nanyang Primary, P2) and SC
(Nanyang Kindergarten, K2). Upcoming dates, the school timetable, meals, a
reading log, and the spelling / 华文 / maths practice that gets sat on an iPad.

## Stack

Vanilla ES5 in five plain `<script>` tags. **No build step, no bundler, no npm,
no framework, no TypeScript.** Open `index.html` and it runs.

- `@supabase/supabase-js@2` — the only runtime dependency, from jsdelivr.
- `hanzi-writer` + `strokes.js` — vendored, currently unused (see Dead weight).
- Google Fonts: Baloo 2, Lexend, Noto Sans SC.

State lives in `localStorage` under the `chew:` prefix; the cloud is a mirror,
never the source of truth.

## Layout

Load order matters and is fixed in `index.html`:

| File | What it holds |
|---|---|
| `data.js` | **The only file you normally edit.** Kids, word banks, timetables, meals, seed events, Supabase keys. |
| `core.js` | Storage helpers (`S/W/SJ/WJ`), dates, scores, streaks, all Supabase sync, sound, speech, the weak-items bank, mascot SVGs. |
| `timetable.js` | The Timetable tab: the weekly grid, school hours, after-school activities. |
| `training.js` | The Training tab: test list, maths generators, and the quiz engine (`start` → `quizHTML` → `grade` → `next`). |
| `app.js` | `render()`, the tab router, and Upcoming / Meals / Reading / School. Loads last and boots the app. |

`render()` redraws the whole `#view` from scratch on every state change. There
is no diffing and no component model — a `v*()` function returns an HTML string
and the matching `w*()` function wires its handlers. Keep that pairing.

## Supabase

Two tables, both row-level-secured to `auth.uid() = user_id`. One family
account; sign-in takes a bare name and `asEmail()` appends `@chewtopia.family`.

- **`results`** — one row per completed test (`id, user_id, child_id,
  test_code, test_name, score, total, completed_at`).
- **`state`** — key/value for everything else, one row per `(user_id, k)`.
  See `supabase-state.sql`. Keys are in `STATE_KEYS`: `weak:tc`, `weak:sc`,
  `books:tc`, `books:sc`, `events`, `acts`, `seedgone`.

Sync model: **merge, never overwrite.** `cloudSync()` pulls then pushes.
`mergeList()` unions by id (or by `k` for weak items), taking `max(n)` and
letting the newer `ts` win other fields. Deletions need a tombstone —
`seedgone` — because a union alone hands a deleted row straight back.
`pulledOnce` gates every push: nothing goes up until something has come down,
or a stale device's lists replace a fresh one's.

Meals, groceries, names and streaks are deliberately **not** synced.

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

## Local dev

No install, no test suite. Serve the folder over http (`file://` breaks
`localStorage` scoping and the CDN):

```bash
python -m http.server 8899
```

Bump the `?v=` on any script you change in `index.html`, and bump the build
number in `.foot` — the boys' iPads cache aggressively.

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

## Dead weight (known)

`handwritten()` returns `false`, so the stroke-tracing and handwriting-marking
subsystem is unreachable — `strokes.js`, both copies of `hanzi-writer.min.js`,
`wireTrace`, `wirePad*`, `wireMarks`. `vResults()` in `app.js` is orphaned, so
the whole Progress screen and PIN-gated marking flow are unreachable too. Don't
extend either until they're revived or removed.
