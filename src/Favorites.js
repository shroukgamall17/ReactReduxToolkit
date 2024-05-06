import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFavorite } from './booksSlice';

const Favorites = () => {
  const dispatch = useDispatch();
  const { favorites } = useSelector((state) => state.books);

  return (
    <div className="row row-cols-1 row-cols-md-4 g-4">
      {favorites.map((book) => (
        <div key={book.id} className="col">
          <div className="card h-100">
            <img src={book.cover_image} className="card-img-top"  style={{height:'250px'}} alt={book.title} />
            <div className="card-body">
              <h5 className="card-title">{book.title}</h5>
              <p className="card-text">{book.author}</p>
              <button className="btn btn-danger" onClick={() => dispatch(removeFavorite(book))}>
                Remove from Favorites
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Favorites;
