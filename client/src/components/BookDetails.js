import { useQuery } from "@apollo/client"
import { GET_BOOK } from '../queries/bookQuery'


function displayBookDetails({book}) {
    if (book) {
        return (
            <div>
                <h2>Name : {book.name}</h2>
                <p>Genre : {book.genre}</p>
                <p>Author Name : {book.author.name}</p>
                <p>Author Age : {book.author.age}</p>
                <br/>
                <p>Other Books by Author</p>
                <ul className="other-books">
                {
                    book.author.books.map((item) => {
                        return <li key={item.id}>{item.name}</li>
                    })
                }
                </ul>
            </div>
        )
    }
    else {
        return <div>No Book Selected</div>
    }
}

export default function BookDetails({bookId}) {
  const { loading, error, data } = useQuery(GET_BOOK, {
    variables: { bookId },
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;
    return (
        <>
            <div id="book-details">
                {displayBookDetails(data)}
            </div>
        </>
    )
}

