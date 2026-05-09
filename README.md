# EmbedlyAI

AI-powered embeddable customer support chatbot for modern businesses.

Live Demo: [https://embedlyai.vercel.app/](https://embedlyai.vercel.app/)

---

## Overview

EmbedlyAI allows businesses to create and deploy their own AI-powered customer support chatbot using a simple script tag.

Users can:

* Configure their business knowledge base
* Add support information
* Generate a unique embed script
* Integrate the chatbot into any website
* Deliver AI-powered customer assistance 24/7

The chatbot uses Google Gemini to generate responses while strictly following the business-specific knowledge provided by the user.

---

## Features

### AI-Powered Customer Support

* Gemini-powered chatbot responses
* Business-specific AI assistance
* Smart fallback handling for missing information
* Professional customer support style responses

### Website Embedding

* One-line script integration
* Lightweight embeddable chatbot widget
* Dynamic user-specific chatbot instances
* Easy copy-paste installation flow

### Secure Authentication

* Scalekit OAuth authentication
* Protected dashboard routes
* Secure HTTP-only cookie sessions
* Session validation middleware

### Business Knowledge Management

* Configure chatbot knowledge base
* Store support email and business information
* Persistent MongoDB storage
* Per-user chatbot configuration

### Modern UI

* Responsive interface
* Tailwind CSS styling
* Framer Motion animations
* Clean dashboard experience

---

## Tech Stack

### Frontend

* Next.js 16
* React 19
* TypeScript
* Tailwind CSS
* Motion / Framer Motion

### Backend

* Next.js API Routes
* MongoDB
* Mongoose
* Google Gemini API
* Scalekit Authentication

### Deployment

* Vercel

---

## Project Architecture

```text
User Website
      |
      v
Embedded chatBot.js Widget
      |
      v
EmbedlyAI API
      |
      v
Gemini AI + Business Knowledge Base
      |
      v
AI Response Returned To User
```

---

## Authentication Flow

```text
User Login
    ↓
Scalekit OAuth
    ↓
Access Token Generated
    ↓
Secure HTTP-only Cookie
    ↓
Protected Dashboard Access
```

---

## Database Schema

### UserStorage

Stores chatbot configuration for each business.

```ts
{
  ownerId: string
  businessName: string
  supportEmail: string
  knowledge: string
}
```

---

## API Routes

### Authentication

| Route                | Description             |
| -------------------- | ----------------------- |
| `/api/auth/login`    | Starts OAuth login flow |
| `/api/auth/callback` | Handles OAuth callback  |
| `/api/auth/logout`   | Clears session cookie   |

### Chatbot

| Route          | Description                    |
| -------------- | ------------------------------ |
| `/api/chatbot` | Generates AI chatbot responses |

### User Storage

| Route                  | Description                         |
| ---------------------- | ----------------------------------- |
| `/api/userStorage`     | Create/update chatbot configuration |
| `/api/userStorage/get` | Fetch chatbot configuration         |

---

## Embedding The Chatbot

Users can embed the chatbot on any website using:

```html
<script src="https://embedlyai.vercel.app/chatBot.js"
data-owner-id="YOUR_OWNER_ID">
</script>
```

The widget automatically:

* Creates a floating chatbot button
* Opens a live support interface
* Sends messages to the EmbedlyAI backend
* Receives AI-generated responses

---

## Environment Variables

Create a `.env.local` file:

```env
MONGODB_URL=
GEMINI_API_KEY=
NEXT_PUBLIC_APP_URL=
SCALEKIT_ENVIRONMENT_URL=
SCALEKIT_CLIENT_ID=
SCALEKIT_CLIENT_SECRET=
```

---

## Local Setup

### Clone Repository

```bash
git clone https://github.com/mayurramani07/embedlyai.git
```

### Navigate To Project

```bash
cd embedlyai
```

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

---

## Screenshots

### Landing Page

* Modern hero section
* AI chatbot preview
* Responsive layout

### Dashboard

* Business information configuration
* Knowledge base management
* Save/update chatbot settings

### Embed Section

* One-click embed script copy
* Integration instructions
* Live chatbot preview

---

## Key Implementation Details

### Secure Session Handling

* HTTP-only cookies
* Secure production cookie configuration
* Server-side session validation

### Optimized MongoDB Connection

* Global mongoose connection caching
* Prevents multiple DB connections during hot reloads

### AI Prompt Safety

* Strict business information boundaries
* No hallucinated policies or services
* Controlled AI behavior through structured prompts

---

## Future Improvements

* Multi-theme chatbot customization
* Conversation history
* Analytics dashboard
* Multi-language support
* File-based knowledge uploads
* Streaming AI responses

---

## Author

### Mayur Ramani

* GitHub: [https://github.com/mayurramani07](https://github.com/mayurramani07)
* LinkedIn: [https://www.linkedin.com/in/mayur-ramani-0424a9283/](https://www.linkedin.com/in/mayur-ramani-0424a9283/)

---

## License

This project is licensed under the MIT License.

