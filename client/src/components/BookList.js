
import { useQuery } from '@apollo/client';
import { useState } from 'react';
import { GET_BOOKS } from '../queries/bookQuery'

// Components
import BookDetails from './BookDetails';

export default function BookList() {
  // selected Book
  const [selectedBook, setSelectedBook] = useState(null);

  const { loading, error, data } = useQuery(GET_BOOKS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;
  const bookList = data.books.map(({ name, genre, id }) =>
    <li key={id} onClick={(e) => setSelectedBook(id)}>
      <h3>{name}</h3>
    </li>
  )

  return (
    <div>
      <ul id="book-list">
        {bookList}
      </ul>
      {selectedBook && <BookDetails bookId={selectedBook} />}
    </div>
  )
}
