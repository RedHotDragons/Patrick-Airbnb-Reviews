import React from 'react';
import Reviews from './Reviews.jsx';

const App = () => {
  let listingId = Math.floor(Math.random() * 100) + 1;

  return (
     <Reviews listingId={listingId} />
  );
};

export default App;