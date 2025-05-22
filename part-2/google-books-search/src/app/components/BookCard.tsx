import { DEFAULT_BOOK_IMAGE } from "@/app/lib/constants";
import Image from "next/image";
import Link from "next/link";
import { Book } from "@/app/lib/types";

interface BookCardProps {
  book: Book;
}

export default function BookCard({ book }: BookCardProps) {
  // Handle image URL
  const getImageUrl = () => {
    if (!book.volumeInfo.imageLinks?.thumbnail) return DEFAULT_BOOK_IMAGE;

    // Replace http with https and remove edge=curl if present
    let url = book.volumeInfo.imageLinks.thumbnail
      .replace("http://", "https://")
      .replace("&edge=curl", "");

    // Ensure we're getting a reasonable size image
    if (!url.includes("zoom=")) {
      url += url.includes("?") ? "&zoom=1" : "?zoom=1";
    }

    return url;
  };

  const imageUrl = getImageUrl();
  const authors = book.volumeInfo.authors?.join(", ");
  const title = book.volumeInfo.title;
  const subtitle = book.volumeInfo.subtitle;

  return (
    <Link
      href={`/book/${book.id}`}
      className="group flex w-full flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-md transition-all duration-300 ease-in-out hover:shadow-xl dark:border-gray-700 dark:bg-gray-800 dark:hover:border-gray-600"
    >
      {/* Image section */}
      <div className="relative h-48 w-full overflow-hidden sm:h-56">
        <Image
          src={imageUrl}
          alt={`Cover of ${title}`}
          fill
          className="object-fill transition-transform duration-300 ease-in-out group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
        />
      </div>

      {/* Text content */}
      <div className="flex flex-1 flex-col p-4">
        <h3 className="mb-1 line-clamp-2 text-lg font-semibold text-gray-900 dark:text-white">
          {title}
        </h3>
        {subtitle && (
          <p className="mb-2 line-clamp-2 text-sm text-gray-600 dark:text-gray-400">
            {subtitle}
          </p>
        )}
        {authors && (
          <p className="mt-auto line-clamp-1 text-xs text-gray-500 dark:text-gray-300">
            By {authors}
          </p>
        )}
      </div>
    </Link>
  );
}
