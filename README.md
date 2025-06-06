
## 📝 Personal Diary App

A React-based diary application built with Vite and styled using TailwindCSS.  
This solo project allows users to create, view, and manage personal diary entries stored in localStorage.  

## Live Demo: [Personal Diary App](https://wbspersonaldiary.netlify.app/)

## 🚀 Tech Stack

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [TailwindCSS](https://tailwindcss.com/)

## 📦 Features

- Add diary entries via a modal form (Title, Date, Image, Content)
- One entry per day validation
- Entries saved to `localStorage`
- Modal to view full entry
- Entries displayed as cards sorted by newest-first
- Deployed as a static site (Netlify or Render)

## 🧠 Component Structure

```
App
├── Header
│   └── AddEntryButton
├── EntryList
│   └── EntryCard (repeated)
├── AddEntryModal
│   └── EntryForm
└── ViewEntryModal
    └── EntryDetails
```

## 📂 Project Setup

1. Clone the repo  
2. Run `npm install`  
3. Start dev server: `npm run dev`

## 📁 Folder Structure

```
/src
  ├── components/
  ├── modals/
  ├── utils/
  └── App.jsx
```

## 🌐 Deployment

Will be deployed as a static site using **Netlify**.

## 📜 Changelog

### 1.0.1 

- Live demo link added

### 1.0.0

- Installed Vite + React  
- Installed TailwindCSS via npm  
- Basic folder structure prepared
