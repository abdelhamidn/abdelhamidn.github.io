# abdelhamidn.github.io

Interactive terminal-style portfolio, plain HTML/CSS/JS with no build step.
Live at https://abdelhamidn.github.io

Type `help`, or click the commands in the output.

| command | what it does |
| --- | --- |
| `whoami` | short intro |
| `experience` / `education` | work history / degrees |
| `skills` | tech stack |
| `projects` | things I've built |
| `contributions` | live GitHub contribution heatmap (hover or tap a cell) |
| `streak` | current / longest streak, best day |
| `contact` | how to reach me |
| `photo` | ASCII self-portrait |
| `matrix` | toggle the rain |
| `clear` | clear the terminal |

Extras: `Tab` completes, `↑`/`↓` browse history, `Ctrl+L` clears, plus `banner`, `open <portfolio|linkedin|github|email>`, `echo`, `history`, `date` and a couple of easter eggs.

## Files

| file | purpose |
| --- | --- |
| `index.html` | page shell: banner, terminal window, footer |
| `style.css` | all styles |
| `app.js` | terminal logic **and all content**, edit the constants at the top (`LINKS`, `WHOAMI`, `JOBS`, `EDU`, `SKILLS`, `PROJECTS`) |
| `data.js` | baked fallbacks: a contribution snapshot and the ASCII portrait |

## Data

The stat cards, `streak` and `contributions` come from [github-contributions-api.jogruber.de](https://github-contributions-api.jogruber.de) (public, no token), fetched in the browser on each visit. If that request fails or takes longer than 6 s, the page falls back to the snapshot in `data.js` and says so. Visitors' browsers therefore contact that third-party service; drop the fetch in `loadLive()` if you'd rather ship only the snapshot.

The heatmap only shows what GitHub shows on the public profile. To include private-repo activity, enable *Private contributions* in the profile settings on GitHub.

## Local preview

Open `index.html`, or run `python -m http.server` and visit http://localhost:8000.
