import BookCard from "@/app/components/BookCard";
import SearchBar from "@/app/components/SearchBar";
import CircularProgress from "@mui/material/CircularProgress";
import { Book, BooksResponse } from "@/app/lib/types";
import BookIcon from "@mui/icons-material/Book";
import { Suspense } from "react";

async function getBooks(query: string): Promise<BooksResponse | null> {
  // Check if the query is empty
  if (!query) return null;

  // Fetch books from the Google Books API
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/books?q=${encodeURIComponent(
        query,
      )}`,
      { cache: "no-store" },
    );

    // Check if the response is ok
    if (!res.ok) {
      throw new Error("Failed to fetch books");
    }

    return res.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  // Get the search query from the URL
  const { q = "" } = await searchParams;
  const data = q ? await getBooks(q) : null;

  return (
    <main className="flex min-h-screen flex-col items-center bg-gray-50 p-4 sm:p-8 dark:bg-gray-900">
      <div className="w-full max-w-4xl">
        <header className="my-8 text-center sm:my-12">
          <div className="flex items-center justify-center gap-x-2">
            <h1 className="text-4xl font-bold text-gray-800 sm:text-5xl dark:text-white">
              Google Books Search
            </h1>
            <BookIcon className="h-8 w-8 text-gray-700 sm:h-10 sm:w-10 dark:text-gray-300" />
          </div>
        </header>

        <div className="mb-8 sm:mb-12">
          <SearchBar />
        </div>

        <Suspense fallback={<CircularProgress />}>
          <div className="mt-8 w-full rounded-lg bg-white p-6 shadow-md sm:p-8 dark:bg-gray-800">
            {data ? (
              <>
                <p className="mb-6 text-lg text-gray-700 dark:text-gray-300">
                  Found <span className="font-semibold">{data.totalItems}</span>{" "}
                  results for "<span className="font-semibold">{q}</span>"
                </p>
                {data.items && data.items.length > 0 ? (
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {data.items.map((book: Book) => (
                      <BookCard key={book.id} book={book} />
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-gray-600 dark:text-gray-400">
                    No books found for "{q}". Please try a different search.
                  </p>
                )}
              </>
            ) : q ? (
              <p className="text-center text-lg text-gray-600 dark:text-gray-400">
                Searching for books related to "{q}"...
              </p>
            ) : (
              <p className="text-center text-lg text-gray-600 dark:text-gray-400">
                Please enter a search term above to find books
              </p>
            )}
          </div>
        </Suspense>
      </div>
    </main>
  );
}
