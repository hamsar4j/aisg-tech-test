# Google Books Search

A simple web application to search for books using the Google Books API, built with Next.js, TypeScript, and Tailwind CSS. Users can search for books and view details for each book.

## Features

* Search for books by title, author, or other keywords.
* View a list of search results with book covers, titles, and authors.
* Click on a book to see a detailed page with more information, including description, publisher, publication date, and a link to Google Books.
* Responsive design for various screen sizes.

## Tech Stack

* [Next.js](https://nextjs.org/) (v15.3.2)
* [React](https://reactjs.org/) (v19)
* [TypeScript](https://www.typescriptlang.org/)
* [Tailwind CSS](https://tailwindcss.com/)
* [Axios](https://axios-http.com/) (for server-side API calls)
* Google Books API

## Project Structure

Key directories and files:

* `src/app/page.tsx`: The main page for searching books
* `src/app/book/[id]/page.tsx`: The page for displaying individual book details
* `src/app/api/books/route.ts`: The API route that proxies requests to the Google Books API
* `src/app/components/`: Contains reusable React components like [`BookCard.tsx`](src/app/components/BookCard.tsx) and [`SearchBar.tsx`](src/app/components/SearchBar.tsx).
* `src/app/lib/`: Contains utility files like type definitions ([`types.ts`](src/app/lib/types.ts)) and constants ([`constants.ts`](src/app/lib/constants.ts)).
* `public/`: Contains static assets like the [`default-book.png`](public/default-book.png).

## Getting Started

### Prerequisites

* Node.js (LTS version recommended)
* [pnpm](https://pnpm.io/) package manager
* A Google Books API Key. You can obtain one from the [Google Cloud Console](https://console.cloud.google.com/apis/library/books.googleapis.com).

### Installation

1. Clone the repository:

    ```bash
    git clone <repository-url>
    cd google-books-search
    ```

2. Install dependencies using pnpm:

    ```bash
    pnpm install
    ```

3. Create a `.env.local` file in the root of the project and add your Google Books API key and the base URL for the application:

    ```env
    GOOGLE_BOOKS_API_KEY=YOUR_GOOGLE_BOOKS_API_KEY
    NEXT_PUBLIC_BASE_URL=http://localhost:3000
    ```

    Replace `YOUR_GOOGLE_BOOKS_API_KEY` with your actual API key. `NEXT_PUBLIC_BASE_URL` is used by the client-side to call your Next.js API route.

### Running the Development Server

To start the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Available Scripts

In the project directory, you can run the following scripts (defined in [`package.json`](package.json)):

* `pnpm dev`: Runs the app in development mode.
* `pnpm build`: Builds the app for production.
* `pnpm start`: Starts the production server.
* `pnpm lint`: Lints the codebase using Next.js's built-in ESLint configuration.

## API Routes

The application uses a Next.js API route to fetch data from the Google Books API. This helps to keep the API key secure on the server-side.

* **`GET /api/books`**
  * Proxies search requests to the Google Books API.
  * **Query Parameters:**
    * `q`: The search query string.
    * `startIndex` (optional): The starting index for pagination (default: `0`).
    * `maxResults` (optional): The maximum number of results to return (default: `10`).
  * Implemented in: [`src/app/api/books/route.ts`](src/app/api/books/route.ts)
