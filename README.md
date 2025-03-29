# Sifra: Your Advanced Virtual Assistant

This project introduces Sifra, an intelligent virtual assistant designed to enhance productivity and assist users in various tasks. Sifra leverages advanced technologies to provide seamless interactions and support.

## Project Description

Sifra is built to be your go-to virtual assistant, capable of understanding natural language, managing tasks, and integrating with various tools to streamline your workflow. Whether you need help with scheduling, reminders, or information retrieval, Sifra is here to assist you.

## Features

- 🌟 **Real-time AI interaction** powered by the Gemini API
- ⚛️ **React-based front-end** for smooth and dynamic UI
- 🚀 **Fast and responsive** design
- 🔒 **API integration** with secure key handling
- 🗣️ **Natural Language Processing** understands and responds to user queries in natural language.
- ✅ **Task Management** helps you manage your tasks and reminders efficiently.

## Technologies Used
- React
- Vite
- ESLint
- AI frameworks for natural language processing

## Installation Instructions

To get started with Sifra, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/niladri17dutta/Advanced-Virtual-Assitant-Shifra.git
   ```
2. Navigate to the project directory:
   ```bash
   cd shifra 2.0
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```
4. **Create a `apikey.js` file in `src` directory and add your Gemini API key:**

```
const API_KEY = "YOUR-API-KEY";

export default API_KEY;
```
5. Install the Generative AI Library:
   ```bash
   npm install @google/genai
   ```
6. **Start the development server**

```bash
npm run dev
```

The app should now be running at `http://localhost:3000`

## Project Structure

```
.
├── public
├── src
|   ├── assets
│   ├── context
│   |   └── UserContext.jsx
│   ├── api.js
│   ├── app.css
│   ├── App.jsx
│   ├── gemini.js
│   ├── index.css
│   └── main.jsx
├── .eslintrc.cjs
├── .gitignore
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── vite.config.js
└── README.md
```

## API Integration

The API requests are handled in `src/gemini.js`:

```javascript
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai';
import API_KEY from './apikey.js';

const genAI = new GoogleGenerativeAI(API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-8b" });

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 20,
    responseMimeType: "text/plain",
};

async function run(prompt) {
    const chatSession = model.startChat({
        generationConfig,
        history: [],
    });

    const result = await chatSession.sendMessage(prompt);
    return result.response.text();
}

export default run;
```

## Contributing

Feel free to fork this repository, open an issue, or submit a pull request if you'd like to enhance the app!

---

### ✨ Happy Coding! ✨