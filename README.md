# Mini GitHub User Explorer

A simple single-page application built with **Vanilla JavaScript** that allows users to search for a GitHub username and view profile details along with the latest repositories.

## Features
- Search GitHub users by username
- Display user profile information
- Show latest 5 repositories
- Loading and error handling states
- Clean and modular JavaScript structure

## Tech Stack
- HTML
- CSS (minimal)
- Vanilla JavaScript
- GitHub Public REST API

## How It Works
1. Enter a GitHub username.
2. App fetches user data using GitHub API.
3. Profile details and repositories are displayed.

## Project Structure
```
Mini-GitHub-User-Explorer/                ← root
├── public/               ← contains all static files
│   ├── src/
│   |    ├── scripts/script.js
│   |    ├── styles/style.css
|   |
│   ├── images/
|
│   index.html
```

## Setup & Run
1. Clone the repository
2. Open `index.html` in a browser

No build tools or frameworks required.

## API Used
- `https://api.github.com/users/{username}`
- `https://api.github.com/users/{username}/repos`

## Future Improvements
- Dark/light theme
- Save last searched user
- UI improvements

---

Built for learning async JavaScript, API handling, and clean coding practices.
