# Pass Ready

Study desk for **Snoqualmie Pass Fire & Rescue** students in the King County EMS EMT Program, Fall 2026.

Live: [https://sz3lp.github.io/pass-ready/](https://sz3lp.github.io/pass-ready/)

## Accounts (free)

Guests can drill, test, and run skills with progress in the browser only.

To keep progress across phones:

1. Open the site and tap **Create account**.
2. Enter a display name, email, and password.
3. You are joined to crew code **SPFR26** automatically.

If signup says to check email, confirm the link, then sign in. If no mail arrives, Confirm email may still be on in the Supabase Auth dashboard (Authentication → Providers → Email).

## Live Jeopardy

1. Host computer: **Jeopardy** → pick the class → **Start live game**. The short code is huge on screen.
2. Phones: **Play** (or `#play/CODE`) → sign in → enter the code → pick **Red** or **Blue**.
3. Host opens a clue and reads it. Phones show a giant **BUZZ** only while the clue (or steal) is open.
4. First successful buzz locks that team. Host judges correct/wrong on the computer. Steal lets the other team buzz.
5. Host keyboard `1`/`A` and `2`/`B` still works as backup.

## Run it locally

Copy `.env.example` to `.env.local`, then:

```bash
npm install
npm run dev
```

Usually [http://localhost:5173](http://localhost:5173).

Progress merge when signed in: max seen/correct/streak per item, higher assessment scores, union of skill/test runs. localStorage stays the offline cache.

The 80% bench (4 blocks + 5 quizzes) still gates the Dec 10 final. 70% on that test still gates the Dec 12 practical.
