# Chewtopia

A home-school app for two boys in Singapore: TC (Nanyang Primary, P2) and SC
(Nanyang Kindergarten, K2). Upcoming dates, the school timetable, meals, a
reading log, the spelling / 华文 / maths practice that gets sat on an iPad, the
nine quiz ladders they play for fun, and the words to whatever they are singing
this month.

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
| `training.js` | The Training tab: test list, maths generators, the quiz engine (`start` → `quizHTML` → `grade` → `next`), and the four quiz ladders — `LADDERS`, then `startClimb` → `climbGrade` → `climbNext`, whose panels are drawn on the Quiz tab by `app.js`. |
| `app.js` | `render()`, the tab router, and Upcoming / Meals / Berries / Quiz / Fun / School, plus the reading log that Training draws. Loads last and boots the app. |

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

- **Berries is TC's 看图作文 sheets**, one panel each, out of `BERRIES` in
  `data.js`. Three parts, each marked and each with a pass line at `BE_PASS`
  (80%): 词语 taps the sheet's own 参考词语 back into a sentence (the `bd`
  mechanic, one mark a character), 好句 is the plain sentence beside the lively
  one, and 结构 is which picture goes in which paragraph and which 开头法 and
  结尾法 the sheet uses. Under the line the button says 再做一次.
  The 参考词语 are off his sheet, the way `TC_TINGXIE` holds the school's own
  lists. **The 好句 pairs are not** — Berries' own stay on the paper he ticked
  them on, and these are written for the app about the same four pictures using
  the same 好词. Keep it that way for any sheet added.
  The composition itself is not marked and must not be: he writes it on paper
  and his teacher marks it, the same reason the 默写 sheet is a reading list.
  A missed 词语 joins the tricky-ones bank like any other test; a 好句 does not,
  because a sentence he chose wrongly is not a word he keeps missing.
  `k:"pick"` is the quiz engine's tapped-answer kind, added for these — the tap
  is the answer, so there is no Check button until it is marked, and `it.kind`
  is what the card calls the question.

- **The nine quiz ladders are not curriculum**, and each says so at the top of
  its own bank. They are the Quiz tab, a card each, built by `quizCards()` out
  of the `LADDERS` array in `training.js`:
  `spell` (`CLIMB_WORDS`, English words 3 to 20 letters), `ma` (generated by
  `maRungGen()`, rungs 1–9 P2 and 10–15 beyond it), `sci` (`SCI_LADDER`, ten
  topics) and `body` (`BODY_LADDER`, ten rungs from the outside in) — MOE starts
  science in P3, so there is no sheet either of those could come off — and five
  languages: `zh` (`ZH_LADDER`), `id` (`ID_LADDER`), `ja` (`JA_LADDER`), `tl`
  (`TL_LADDER`) and `ko` (`KO_LADDER`), which nobody teaches at either school.
  Two factories build six of them. `qzLad()` takes a bank of questions with
  their answers written out; `langLad()` takes a bank of `[word, how it sounds,
  what it means]` and asks which one means the English. A new subject or a new
  language is a bank in `data.js` and one line in `LADDERS`.
  **Everything but spelling is tapped, not typed** — a keyboard was only ever in
  the way, and on an iPad it covers half the card. Spelling stays typed because
  tapping a word somebody else has spelt is not spelling it. The maths ladder
  makes its own wrong answers in `maOpts()`, and they have to be near misses:
  one out, two out, ten out, or two digits the wrong way round.
  A ladder asks the opposite question to a test: three right in a row climbs a
  rung, three wrong on the same rung ends the run, the lives refill on the way
  up, and the score is the rung cleared. The rung a run starts on is picked
  behind the card's **Levels** button and sticks per ladder on the device
  (`qfrom:<id>`, not synced); rungs below it are never asked, so they never
  count as cleared — the ladder draws them faded and the run records where it
  began. A rung's wrong answers always come from that same rung, so nothing on
  screen is a giveaway; two words on one rung must never share a meaning, or the
  question has two right answers.
  A language question is asked **in English and out loud** — "what is thank you
  in Tagalog?" — and never reads its own answer, which used to hand the game to
  anyone who knew the sound of it and left the other three words on screen
  unsaid. Instead every answer on a tapped ladder carries its own speaker, in
  the language it is written in, and they go on working after the answer is in:
  the moment he most wants to hear the right one is the moment he has just got
  it wrong. The English quizzes have them too, because SC is in K2 and cannot
  read the answers yet.
  Nothing missed on a ladder joins the weak-items bank, none of them have a
  practice code or appear in `allCodes()`, and none of them feed the daily set
  — a P2 boy handed "extracurricular" has run out of ladder, not found a word
  he needs to drill. None are split by boy either: the card shows the best
  anyone has cleared, and the saved row carries `who()` only because the results
  table needs a child.
  `say()` refuses to speak any non-English language in an English voice — a
  tablet with no Japanese voice reads ねこ like a lesson in how not to say it —
  so the card warns when a voice is missing and the game runs silent off the
  meaning on screen.

- **Fun is the song words, and it is where SC practises reading.** Every line is
  its own button: tap it and it is read out slowly, and it stays marked so he can
  look up from the screen and find his place again. "Read it to me" walks down a
  line at a time and wraps back to the top. A boy of five decodes what he already
  knows by heart — which is why the five traditional rhymes are on there, all of
  them singable from memory and short enough to hold in one line.
- **The words to anything still in copyright are not in the repo.** `SEED_SONGS`
  in `data.js` carries a title and who it is by; only the out-of-copyright ones
  carry words, in `lx` — five traditional nursery rhymes, old enough that there
  is no author to have taken them from. For everything else the screen builds a
  YouTube *search* out of the title, never a video id — ids rot and land a
  seven-year-old on somebody else's upload. A song still in copyright is pasted
  in on the device by whoever has a copy, and the read-along then works on it the
  same as on the rhymes. **Do not ship copyrighted lyrics in `data.js`, do not
  fetch them, and do not paste them in out of a chat either — the box on the
  device is the way in, and it is one tap.**
  Typed-in words live in `lyr:<id>`, deliberately *not* inside the song record:
  `mergeSeed()` replaces a seeded record whenever `data.js` changes it, so
  anything typed into one would be wiped by the next release. Nothing on this
  screen syncs — like the meal plan, each iPad has its own copy, and the panel
  says so. A deleted song is tombstoned in `seedgone` like every other seeded
  list, and its words are deleted with it.

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
check catches most marking regressions in under a second.

Drive the ladders the same way, every one of them from every legal start rung:
a perfect run must reach the top rung in exactly three questions a rung, the
right answer must always be among the ones offered and never twice, a spelling
word must be exactly as long as its rung and appear in its own sentence, and a
maths sum must read out in words rather than as × and ÷. Three wrong answers
must end a run wherever it started and save one row with the rung it cleared.

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
