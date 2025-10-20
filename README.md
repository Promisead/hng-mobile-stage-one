# 🧠 Tech Trivia Quiz App

A fun and interactive **React Native (Expo)** quiz app that challenges users with **technology-related questions** — from programming languages and frameworks to computer science history and tools.

This project was built as part of the **HNG Internship 13 - Stage 1 Mobile Track Task**.

---

## 🚀 Features

- 🎯 **10 Tech Trivia Questions** — covering programming, frameworks, and tech history.  
- 📱 **One Question Per Screen** — clean layout with `Next` and `Previous` navigation.  
- ⏱ **Timer for Each Question** — automatically moves to the next question when time runs out.  
- 📊 **Progress Bar** — visually tracks your progress through all questions.  
- 🧮 **Result Modal** — shows:
  - Total Score  
  - Number of Correct, Incorrect, and Unanswered Questions  
- 🔍 **Review Screen** — displays all questions, correct answers, and user’s selected options.  
- 🔁 **Restart Quiz Option** — allows users to retake the quiz instantly.  
- 💡 **Responsive and Simple UI** — smooth transitions and clear structure.

---

## 🛠️ Tech Stack

- **React Native (Expo)**
- **JavaScript (ES6+)**
- **React Hooks (useState, useEffect)**
- **Expo Progress Bar**
- **React Native Modal**

---

## 🧩 App Flow

1. The user starts the quiz — the **first question** is displayed with 4 options.  
2. Each question has a **15-second timer**.  
3. When time expires or the user clicks **Next**, the app proceeds automatically.  
4. Users can navigate back using the **Previous** button.  
5. After answering all 10 questions, a **Result Modal** pops up showing the score summary.  
6. On pressing **OK**, the user is taken to the **Review Screen**, showing all answers.  
7. The user can scroll through all questions and click **Restart Quiz** to try again.

---

## ⚙️ Installation and Setup

### 1️⃣ Clone the repository
```bash
git clone https://github.com/Promisead/hng-mobile-stage-one.git
cd hng-stage1-quiz-app
```

### 2️⃣ Install dependencies
```bash
yarn install
# or
npm install
```

### 3️⃣ Run the app
```bash
yarn start
# or
npx expo start
```

Scan the QR code with **Expo Go** on your phone to open the app.

---

## 📦 Building the APK

To generate an installable `.apk` file:

```bash
npx expo build:android -t apk
```

When done, upload the `.apk` file to [Appetize.io](https://appetize.io/upload)  
and generate a **public preview link** for submission.

---

## 🔗 Submission Links

- **GitHub Repository:** [https://github.com/<your-username>/hng-stage1-quiz-app](https://github.com/<your-username>/hng-stage1-quiz-app)  
- **Appetize.io Preview:** [https://appetize.io/app/<your-app-id>](https://appetize.io/app/<your-app-id>)

---

## 🧑‍💻 Author

**Promise Duke**  
Mobile Developer — HNG Internship 13  
📧 [promiseduke@gmail.com](mailto:promiseduke@gmail.com)  
🌐 [https://ai-promise.vercel.app](https://ai-promise.vercel.app)

---

## 📜 License

This project is licensed under the **MIT License** — feel free to modify and improve.

---
