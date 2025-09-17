
# Tourvisto Dashboard

A modern travel dashboard web app built with React, TypeScript, Vite, Tailwind CSS, Appwrite, and Syncfusion UI components.

## Features
- User authentication via Google (Appwrite OAuth)
- Manage destinations, itineraries, and user activity
- Responsive, beautiful UI with Tailwind CSS
- Admin and Auth layouts
- Syncfusion UI for advanced components (buttons, grids, charts, etc.)
- State management with Zustand
- Day.js for date handling
- Google People API integration for profile photos

## Tech Stack
- React 19 + TypeScript
- Vite
- Tailwind CSS
- Appwrite (auth, database)
- Syncfusion React UI
- Day.js

## Getting Started

1. **Install dependencies:**
   ```sh
   npm install
   ```
2. **Run the development server:**
   ```sh
   npm run dev
   ```
3. **Build for production:**
   ```sh
   npm run build
   ```

## Project Structure
```
src/
  appwrite/        # Appwrite API logic (auth, client, trips)
  component/       # Reusable UI components
  constants/       # Static data and config
  layout/          # Layout components (Admin, Auth)
  lib/             # Utilities and types
  pages/           # Page components (login, home, register, etc.)
  routes/          # React Router setup
  services/        # Service logic (e.g., create-trip)
  store/           # Zustand state management
  app.css          # Custom and Tailwind styles
  main.tsx         # App entry point
  App.tsx          # Main app component
```

## Environment Setup
- Configure Appwrite project and update `src/appwrite/client.ts` with your credentials.
- Add Google OAuth credentials in Appwrite dashboard.

## License
MIT

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
