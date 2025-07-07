# Personal Portfolio Site

This is a full-stack personal portfolio site built with a **React + Vite frontend** and an **Express backend**, using a **Google Sheet** as the CMS. The frontend is hosted on **Netlify**, and the backend is deployed on **Heroku**.

## Features

- Responsive single-page application (SPA)
- Project spotlight modal with URL routing
- Tag filtering for projects
- Fully customizable theme (colors, fonts, layout style)
- Google Sheet as CMS (read-only)
- Image preloading and graceful fallback
- Custom 404 page
- Dynamic routing to `/project_xxx`

## Tech Stack

### Frontend
- [Vite](https://vitejs.dev/)
- [React](https://reactjs.org/)
- [MUI (Material UI)](https://mui.com/)
- [React Router v6](https://reactrouter.com/en/main)
- TypeScript

### Backend
- [Express.js](https://expressjs.com/)
- Google Sheets API (via service account)
- Deployed on Heroku

## File Structure

```
├── backend
│   ├── controllers
│   ├── routes
│   ├── services
│   ├── config
│   └── index.ts
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── layout
│   │   ├── pages
│   │   ├── theme
│   │   ├── types
│   │   └── utils
```

## Setup

### 1. Clone the repo

```bash
git clone https://github.com/your-username/portfolio-app.git
cd portfolio-app
```

### 2. Install dependencies

```bash
# Frontend
cd frontend
npm install

# Backend
cd ../backend
npm install
```

### 3. Set up environment variables

#### Backend

Create a `.env` file in `backend/` with:

```env
PORT=5000
GOOGLE_SERVICE_ACCOUNT_JSON=./config/service-account.json
```

Make sure your `service-account.json` file is in `backend/config`.

#### Frontend

Create a `.env` file in `frontend/` with:

```env
VITE_API_BASE=localhost:3001
```

### 4. Run locally

```bash
# Backend
cd backend
npm run dev

# Frontend
cd frontend
npm run dev
```

### 5. Build for production

```bash
# Frontend
cd frontend
npm run build
```

## Deployment

- **Frontend** is deployed via Netlify using the `frontend/dist` folder.
- **Backend** is deployed to Heroku using the `Procfile`.

## To-Do

- [ ] SEO optimization and meta tags
- [ ] Sitemap and robots.txt
- [ ] Code-splitting / lazy loading for modal views
- [ ] Unit + integration tests
- [ ] Form for contact / email (optional)
- [ ] Admin panel for editing Google Sheet (future)

## License

MIT © [Your Name]
