import React from 'react';
import logo from './logo.svg';
import './App.css';
import BookComponent from './components/BookComponent';

const books = [
   // { file: 'https://server.interactivelibrary.ru/book/dokumental_noe_bogatstvo_kubani_100.pd/b61096c8-185d-40f4-8407-c8c8e0283af4.pdf' },
{file: 'https://server.interactivelibrary.ru/book/zhivopisnaya_rossiya/169afee9-af87-4fa7-9d6c-ab48a01f606e.pdf'},
  // {file: 'https://server.interactivelibrary.ru/book/oruzhie_pervoi_mirovoi/7b8aa8c4-2674-4962-854d-0e12e90b9c00.pdf'},
  //{file: 'https://server.interactivelibrary.ru/book/buklet_sovremennost_/77ae7f98-9297-485f-91c4-69dc933c56a0.pdf'},
   //{file: 'https://server.interactivelibrary.ru/book/oborudovanie/b0fcb883-0a55-466c-be95-08b06ea6ec83.pdf'},
]

function App() {
  return (
    <div className="App">
      <BookComponent
        book={books[0]}
      />
    </div>
  );
}

export default App;
