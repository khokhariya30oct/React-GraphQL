
import { useQuery, useMutation } from '@apollo/client';
import { useState } from 'react';
import { GET_AUTHOR, ADD_BOOK, GET_BOOKS } from '../queries/bookQuery'


export default function AddBook() {

    const initialState = {
        name: '',
        genre: '',
        authorId: '',
    }

    const [book, setBook] = useState(initialState);
    const [addBook] = useMutation(ADD_BOOK, {
        refetchQueries : [
            { query : GET_BOOKS}
        ]
    });


    function submitBook(e) {
        e.preventDefault()
        const { name, genre, authorId } = book;
        addBook(
            {
                variables: { name, genre, authorId }
            }
        )
        .then(result => {
            setBook(initialState)
            e.target.reset()
        })
    }

    function displayAuthor(data, loading) {
        if (!loading) {
            return data.authors.map(({ name, id }) => <option key={id} value={id}>{name}</option>)
        }
        return <option>Loading....</option>
    }

    const { loading, error, data } = useQuery(GET_AUTHOR);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error.message}</p>;
    return (
        <>
            <form id="add-book" onSubmit={(e) => submitBook(e)} >
                <div className="field">
                    <label>Book name:</label>
                    <input type="text" onChange={(e) => setBook({ ...book, name: e.target.value })} />
                </div>
                <div className="field">
                    <label>Genre:</label>
                    <input type="text" onChange={(e) => setBook({ ...book, genre: e.target.value })} />
                </div>
                <div className="field">
                    <label>Author:</label>
                    <select onChange={(e) => setBook({ ...book, authorId: e.target.value })}>
                        <option>Select author</option>
                        {displayAuthor(data, loading)}
                    </select>
                </div>
                <button>+</button>
            </form>
        </>
    )
}
