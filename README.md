# NoAnswerAI

NoAnswerAI is a humorous AI that refuses to answer properly.
It sarcastically mocks obvious questions instead of giving serious responses.

It uses Google's **Gemini API** behind the scenes to process the prompts.

---

## Features

- 🤖 Frontend and backend architecture
- 🧐 Powered by Google Gemini API
- 🛠️ Full development and production setup (Docker ready)
- 🎮 Special prompt to create a lazy, sarcastic assistant

---

## Development Installation

### 1. Clone the repository

```bash
git clone https://github.com/ShaiHey/NoAnswerAi.git
cd noanswerai
```

### 2. Set up your environment variable

You must provide your Google Gemini API key.

Example of running the backend with your secret:

```bash
GOOGLEAI_SECRET=your_google_gemini_api_key npm run dev
```

### 3. Start the frontend and backend

In two separate terminals:

Start backend:

```bash
cd backend
npm install
GOOGLEAI_SECRET=your_google_gemini_api_key npm run dev
```

Start frontend:

```bash
cd frontend
npm install
npm run dev
```

- Frontend available at: [http://localhost:5173](http://localhost:5173)
- Backend available at: [http://localhost:3000](http://localhost:3000)

---

## Production Installation (Docker Compose)

### 1. Configure your `docker-compose.yaml`

Before running Docker Compose, edit the `docker-compose.yaml` to set your API key:

```yaml
version: '3.8'

services:
  backend:
    container_name: backend
    ports:
      - 3000:3000
    environment:
      - NODE_ENV=compose
      - GOOGLEAI_SECRET=your_google_gemini_api_key
    build: ./backend

  frontend:
    container_name: frontend
    ports:
      - 5173:80
    build: ./frontend
```

Replace `your_google_gemini_api_key` with your real key.

### 2. Start services

At the root of the project (where `docker-compose.yaml` is located):

```bash
docker compose up --build
```

- Frontend available at: [http://localhost:5173](http://localhost:5173)
- Backend available at: [http://localhost:3000](http://localhost:3000)

---

## Notes

- Ensure your Google Gemini API key is active and valid.
- This AI is intentionally sarcastic and lazy — it's designed not to be helpful!

---

## License

This project is open-source and available under the [MIT License](LICENSE).