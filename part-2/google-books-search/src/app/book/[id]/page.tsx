import { DEFAULT_BOOK_IMAGE } from "@/app/lib/constants";
import { Book } from "@/app/lib/types";
import Image from "next/image";
import Link from "next/link";

// This function fetches book details from the Google Books API using the provided book ID.
async function getBook(id: string): Promise<Book | null> {
  try {
    const res = await fetch(
      `https://www.googleapis.com/books/v1/volumes/${id}`,
      { cache: "no-store" },
    );

    if (!res.ok) {
      throw new Error("Failed to fetch book");
    }

    return res.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}

// This component fetches and displays the details of a specific book based on the provided ID in the URL.
export default async function BookPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const book = await getBook(resolvedParams.id);
  // If the book is not found, display a message to the user.
  if (!book) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-6 text-center dark:bg-gray-900">
        <h1 className="mb-4 text-2xl font-semibold text-gray-700 dark:text-gray-300">
          Book Not Found
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          The book you are looking for does not exist or could not be retrieved.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-offset-gray-900"
        >
          ← Back to Search
        </Link>
      </div>
    );
  }
  // If the book is found, extract relevant information from the book object.
  // The thumbnail image URL is modified to use HTTPS if it starts with HTTP.
  // The authors are joined into a single string, and the description is set as HTML if available.
  // The book's title, subtitle, publisher, published date, page count, and categories are also extracted.
  const thumbnail =
    book.volumeInfo.imageLinks?.thumbnail?.replace("http://", "https://") ||
    DEFAULT_BOOK_IMAGE;
  const authors = book.volumeInfo.authors?.join(", ");
  const descriptionHtml = book.volumeInfo.description
    ? { __html: book.volumeInfo.description }
    : null;

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8 dark:bg-gray-900">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/"
          className="mb-6 inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mr-2 h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to search
        </Link>

        <div className="overflow-hidden rounded-lg bg-white shadow-xl dark:bg-gray-800">
          <div className="flex flex-col gap-6 p-6 sm:flex-row sm:gap-8 sm:p-8">
            <div className="mx-auto w-full max-w-[250px] flex-shrink-0 sm:mx-0 sm:w-1/3 md:max-w-[300px]">
              <Image
                src={thumbnail}
                alt={`Cover of ${book.volumeInfo.title}`}
                width={300}
                height={450}
                className="h-auto w-full rounded-md object-cover shadow-lg"
                priority
              />
            </div>

            <div className="flex-grow">
              <h1 className="mb-1 text-3xl font-bold text-gray-900 sm:text-4xl dark:text-white">
                {book.volumeInfo.title}
              </h1>
              {book.volumeInfo.subtitle && (
                <p className="mb-3 text-lg text-gray-600 dark:text-gray-400">
                  {book.volumeInfo.subtitle}
                </p>
              )}
              {authors && (
                <p className="text-md mb-6 font-medium text-gray-700 dark:text-gray-300">
                  By {authors}
                </p>
              )}

              <div className="space-y-3 text-sm">
                {book.volumeInfo.publisher && (
                  <p>
                    <strong className="font-semibold text-gray-700 dark:text-gray-300">
                      Publisher:
                    </strong>{" "}
                    <span className="text-gray-600 dark:text-gray-400">
                      {book.volumeInfo.publisher}
                    </span>
                  </p>
                )}
                {book.volumeInfo.publishedDate && (
                  <p>
                    <strong className="font-semibold text-gray-700 dark:text-gray-300">
                      Published:
                    </strong>{" "}
                    <span className="text-gray-600 dark:text-gray-400">
                      {book.volumeInfo.publishedDate}
                    </span>
                  </p>
                )}
                {book.volumeInfo.pageCount && (
                  <p>
                    <strong className="font-semibold text-gray-700 dark:text-gray-300">
                      Pages:
                    </strong>{" "}
                    <span className="text-gray-600 dark:text-gray-400">
                      {book.volumeInfo.pageCount}
                    </span>
                  </p>
                )}
                {book.volumeInfo.categories &&
                  book.volumeInfo.categories.length > 0 && (
                    <p>
                      <strong className="font-semibold text-gray-700 dark:text-gray-300">
                        Categories:
                      </strong>{" "}
                      <span className="text-gray-600 dark:text-gray-400">
                        {book.volumeInfo.categories.join(", ")}
                      </span>
                    </p>
                  )}
              </div>

              {descriptionHtml && (
                <div className="mt-6">
                  <h2 className="mb-2 text-xl font-semibold text-gray-800 dark:text-white">
                    Description
                  </h2>
                  <div
                    className="prose prose-sm dark:prose-invert max-w-none text-gray-600 dark:text-gray-400"
                    dangerouslySetInnerHTML={descriptionHtml}
                  />
                </div>
              )}

              {book.volumeInfo.infoLink && (
                <a
                  href={book.volumeInfo.infoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 inline-flex items-center rounded-md bg-blue-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-colors duration-150 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-offset-gray-800"
                >
                  View on Google Books
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
