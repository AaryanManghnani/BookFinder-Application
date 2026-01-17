import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './Components/Login';
import Signup from './Components/Signup';
import HomePage from './Components/HomePage';
import ErrorPage from './Components/ErrorPage';
import PrivateRoute from './Components/PrivateRoute';

import BookForm from './BookRecommenderComponents/BookForm';
import ViewBook from './BookRecommenderComponents/ViewBook';

import BookReaderViewBook from './BookReaderComponents/BookReaderViewBook';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Signup />} />
          
          <Route element={<PrivateRoute allowedRoles={['BookRecommender', 'BookReader']} />}>
            <Route path="/" element={<HomePage />} />
          </Route>

          <Route element={<PrivateRoute allowedRoles={['BookRecommender']} />}>
            <Route path="/books" element={<ViewBook />} />
            <Route path="/add-book" element={<BookForm mode="add" />} />
            <Route path="/edit-book/:id" element={<BookForm mode="edit" />} />
          </Route>

          <Route element={<PrivateRoute allowedRoles={['BookReader']} />}>
            <Route path="/reader-books" element={<BookReaderViewBook />} />
          </Route>

          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;