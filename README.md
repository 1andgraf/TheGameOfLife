# The Game of Life

A mobile game built with **React Native** and **Expo**, featuring task management, avatar progression, and a shop system. The app supports **dark mode**, stat tracking, XP, gold rewards, and customizable tasks.

---

## 🎯 Features

- **Task System**: Add, complete, and track tasks with XP and gold rewards.
- **Avatar & Progression**: Avatar grows visually as you complete tasks; equips items from the shop.
- **Stat Bars**: Health, Power, Intelligence bars that level up with task completion.
- **Shop**: Buy items that enhance stats and XP gains.
- **Dark Mode**: Toggle between light and dark themes seamlessly.
- **XP Popup Animation**: Visual feedback when completing tasks.
- **Add Task Modal**: Create new tasks with type, XP, gold, and daily options.
- **Settings Modal**: Customize app preferences including dark theme toggle.
- **Bottom Navigation**: Switch between Tasks, Profile/Avatar, and Shop pages.

---

## 📂 Project Structure

```
TheGameOfLife/
├─ assets/                 # Images, fonts, icons, sprites
├─ components/             # Reusable React Native components
├─ screens/                # Optional: Screens if structured separately
├─ App.js                  # Main app entry point
├─ app.json                # Expo configuration
├─ eas.json                # Expo Application Services build config
├─ package.json
├─ styles.js               # Light & Dark theme styles
└─ README.md
```

---

## 🛠 Installation

1. Clone the repo:

```bash
git clone https://github.com/yourusername/TheGameOfLife.git
cd TheGameOfLife
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Start the Expo development server:

```bash
npx expo start
```

4. Open the app on your device:

- Scan the QR code with **Expo Go** (iOS or Android)
- Or run on simulator/emulator.

---

## 📱 Building the App

### Android APK

```bash
eas build --platform android --profile production
```

- Generates a standalone `.apk` file for testing or distribution.

### iOS (Simulator or Sideload)

```bash
eas build --platform ios --profile simulator
```

- Produces a `.tar.gz` with `.app` bundle for simulator testing.
- Free Apple ID allows sideloading on device via Xcode (expires in 7 days).

---

## ⚡ Screenshots

*(Add some images or GIFs here showcasing Tasks, Avatar, and Shop pages)*

---

## 🌙 Dark Theme

- Toggle dark theme in **Settings**.
- All pages, tasks, and shop items adapt automatically.

---

## 💻 Tech Stack

- **React Native**
- **Expo**
- **React Hooks** for state management
- **Animated API** for smooth stat bars & XP popups
- **Ionicons** for icons

---

## 📦 Contributing

1. Fork the repository
2. Create a new branch: `git checkout -b feature/YourFeature`
3. Make your changes
4. Commit your work: `git commit -m "Add feature"`
5. Push to the branch: `git push origin feature/YourFeature`
6. Open a Pull Request

---

## ⚠ License

*(Add license here, e.g., MIT License)*

---

Made with ❤️ by **[Your Name]**

