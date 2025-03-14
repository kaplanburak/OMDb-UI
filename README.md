# OMDb Search

A React application for searching movies and TV shows using the OMDb API.

## Prerequisites

Required Node.js version: v22.14.0 or higher
Required npm version: v11.2.0 or higher

If you have nvm installed, simply run:

```bash
nvm use
```

Otherwise, you'll need to install these versions manually from [Node.js website](https://nodejs.org/).

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory and add your OMDb API key:
   ```
   VITE_OMDB_API_KEY=your_api_key_here
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
