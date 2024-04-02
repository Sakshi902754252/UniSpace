import React from 'react';
import {Routes,Route} from 'react-router-dom';
import './css/style.css';


// Import pages
import Dashboard from './pages/Dashboard';
import Syllabus from './pages/syllabus';
import Paper from './pages/paper';
import Book from './pages/books';
import Notes from './pages/notes';
import Upload from './pages/upload';

function App() {
  

  return (
    <>
      <Routes>
        <Route exact path="/" element={<Dashboard />} />
        <Route exact  path="/paper" element={<Paper />} />
        <Route exact  path="/book" element={<Book />} />
        <Route exact  path="/syllabus" element={<Syllabus />} />
        <Route exact  path="/notes" element={<Notes />} />
        <Route exact  path="/upload" element={<Upload />} />
      </Routes>
    </>
  );
}

export default App;
