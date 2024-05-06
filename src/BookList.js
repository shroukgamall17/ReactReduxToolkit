import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchBooks, addFavorite, removeFavorite } from './booksSlice';
import { FaStar, FaRegStar } from 'react-icons/fa';

const BookList = () => {
  const dispatch = useDispatch();
  const { books, favorites, status, error } = useSelector((state) => state.books);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchBooks());
    }
  }, [status, dispatch]);

  const isBookInFavorites = (bookId) => favorites.some((book) => book.id === bookId);

  const handleFavoriteToggle = (book) => {
    if (isBookInFavorites(book.id)) {
      dispatch(removeFavorite(book));
    } else {
      dispatch(addFavorite(book));
    }
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="row row-cols-1 row-cols-md-4 g-4">
      {books.map((book) => (
        <div key={book.id} className="col">
          <div className="card h-100">
            
            <img src={book.cover_image} className="card-img-top" style={{height:'250px'}} alt={book.title} />
            <div className="card-body">
              <h5 className="card-title">{book.title}</h5>
              <p className="card-text">{book.author}  <button className="btn btn-link" onClick={() => handleFavoriteToggle(book)}>
                {isBookInFavorites(book.id) ? <FaStar color="gold" /> : <FaRegStar />}
              </button></p>
             
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BookList;
