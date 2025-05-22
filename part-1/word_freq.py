# This function reads a text file, removes punctuation and converts it to lowercase.
def get_words(filename):
    with open(filename, "r", encoding="utf-8") as f:
        text = f.read().lower()
    for char in "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~":
        text = text.replace(char, " ")
    words = text.split()
    return words


# This function counts the frequency of each word in the list.
# It returns a dictionary where the keys are words and the values are their counts.
def word_frequencies(words):
    freq = {}
    for word in words:
        freq[word] = freq.get(word, 0) + 1
    return freq


# This function reads the words from the file, counts their frequencies,
# sorts them by frequency and alphabetically, and prints the 10th to 20th most common words.
# It uses the get_words and word_frequencies functions defined above.
def main():
    words = get_words("pg16317.txt")
    freq = word_frequencies(words)
    # Sort by frequency, then alphabetically
    sorted_words = sorted(freq.items(), key=lambda x: (-x[1], x[0]))
    # Print 10th to 20th most common words
    print("Words ranked from 10th to 20th by frequency:")
    for word, count in sorted_words[9:20]:
        print(f"{word}: {count}")


if __name__ == "__main__":
    main()
