# AISG Technical Test

This repository contains the solutions for the AISG technical assessment.

## Part 1: Word Frequency Analysis

### Description

This part consists of a Python script (`word_freq.py`) that reads a text file, counts the frequency of each word, and then prints the 10th to 20th most common words, sorted by frequency (descending) and then alphabetically (ascending).

### Setup

1. **Prerequisites:**
   * Python 3.x

2. **Clone the repository (if you haven's already):**

   ```bash
   git clone <repository-url>
   cd aisg-tech-test
   ```

3. **Navigate to the `part-1` directory:**

   ```bash
   cd part-1
   ```

4. **Ensure the text file is present:**
   The script expects a text file named `pg16317.txt` in the same directory.

### Usage

To run the script, execute the following command from within the `part-1` directory:

```bash
python word_freq.py
```

The script will output the 10th to 20th most frequent words and their counts to the console.

## Part 2: Google Books Search Web Application

### Application Description

This is a Next.js web application built with the App Router that allows users to search for books using the Google Books API. It displays search results and provides detailed information for each book.

### Features

* **Search Functionality:** Users can enter keywords in a search bar to find relevant books.
* **Search Results:** The application displays a clear and concise list of search results.
* **Book Details:** Clicking on a book in the list navigates the user to a detailed page with information such as title, author(s), description, and cover image.
* **Responsive UI:** The application features a clean, responsive, and user-friendly interface that works seamlessly across different screen sizes.

### Tech Stack

* **Framework:** Next.js (with App Router)
* **Language:** TypeScript
* **Styling:** Tailwind CSS
* **API:** Google Books API
* **Package Manager:** pnpm
* **Linting/Formatting:** ESLint

### Setup and Running Locally

1. **Prerequisites:**
   * Node.js (version 18.x or later recommended)
   * pnpm (or npm/yarn)

2. **Navigate to the `google-books-search` directory:**

   ```bash
   cd part-2/google-books-search
   ```

3. **Environment Variables:**
   Create a `.env.local` file in the `part-2/google-books-search` directory and add your Google Books API key:

   ```env
   GOOGLE_BOOKS_API_KEY=your_google_books_api_key_here
   NEXT_PUBLIC_BASE_URL=http://localhost:3000
   ```

   * You can obtain a Google Books API key from the [Google Cloud Console](https://console.cloud.google.com/apis/library/books.googleapis.com).
   * `NEXT_PUBLIC_BASE_URL` should be the URL where your application is running. For local development, this is typically `http://localhost:3000`.

4. **Install Dependencies:**
   Using pnpm:

   ```bash
   pnpm install
   ```

   Or using npm:

   ```bash
   npm install
   ```

   Or using yarn:

   ```bash
   yarn install
   ```

5. **Run the Development Server:**
   Using pnpm:

   ```bash
   pnpm dev
   ```

   Or using npm:

   ```bash
   npm run dev
   ```

   Or using yarn:

   ```bash
   yarn dev
   ```

   The application will typically be available at `http://localhost:3000`.

### API Route

The application uses an internal API route to fetch data from the Google Books API:

* `GET /api/books?q=<query>&startIndex=<startIndex>&maxResults=<maxResults>`: Fetches a list of books.

## Overall Project Structure

```text
aisg-tech-test/
├── part-1/
│   ├── pg16317.txt         # Sample text file for word frequency
│   └── word_freq.py        # Python script for word frequency analysis
├── part-2/
│   └── google-books-search/  # Next.js application
│       ├── public/           # Static assets
│       ├── src/              # Source code (components, pages, api routes)
│       ├── next.config.ts    # Next.js configuration
│       ├── package.json
│       ├── tsconfig.json
│       └── ... (other configuration files)
├── README.md                 # This file
└── ... (other root files like .gitignore, pyproject.toml, etc.)
```

---
