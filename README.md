# Reaction Timer Challenge

## Overview
The **Reaction Timer Challenge** is a fun and interactive game built with **React.js and Vite**. It tests users' reaction speed by measuring the time taken to click after a random delay. The game includes features such as a **leaderboard**, **dark mode**, **sound effects**, and a **"Too Soon!" detection** to ensure accurate timing.

This game is also deployed on telegram : https://t.me/reaction_timerr_bot/reaction_timer_game

## Features
- 🎯 **Reaction Time Measurement** – Click as fast as possible once the screen turns green!
- 🏆 **Leaderboard** – Tracks the best 5 reaction times.
- 🌙 **Dark Mode** – Toggle between light and dark themes.
- 🔊 **Sound Effects** – Click sounds, too soon warnings, and success sounds.
- ❌ **"Too Soon!" Detection** – Prevents early clicks before the green screen.
- 🐆 **New Best Time Celebration** – Displays a special animal when a new best time is achieved.

## Technologies Used
- **React.js** (Frontend)
- **Vite** (Bundler)
- **CSS** (Animations, Styling)
- **LocalStorage** (Leaderboard Persistence)

## Installation
### 1️⃣ Clone the Repository
```bash
git clone https://github.com/yourusername/reaction-timer-game.git
cd reaction-timer-game
```

### 2️⃣ Install Dependencies
```bash
npm install
```

### 3️⃣ Run the Application
```bash
npm run dev
```

## How to Play
1. Click **Start Game**.
2. Wait for the screen to turn **green**.
3. Click as fast as possible!
4. If you click **too soon**, a warning appears.
5. Try to beat your **best time**!

## Folder Structure
```
/reaction-timer-game
│── /src
│   ├── App.jsx          # Main React Component
│   ├── App.css          # Styling and Animations
│   ├── sounds/          # Sound effects folder
│   │   ├── click.mp3
│   │   ├── too-soon.mp3
│   │   ├── success.mp3
│   │   ├── best-time.mp3
│   ├── main.jsx         # Entry Point
│── index.html           # Main HTML File
│── package.json         # Dependencies & Scripts
│── vite.config.js       # Vite Configuration
```

## Customization
- **Modify Sound Effects** – Replace `.mp3` files in `src/sounds/`.
- **Change Styling** – Edit `App.css` for UI adjustments.
- **Customize Messages** – Modify `App.jsx` to change texts.

## Credits
Developed by **[Priyanav]** ✨

## License
This project is open-source and free to use. 🚀

