import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import About from './About.js'
import AdminDash from './admin/AdminDash'
import Homepage from './components/homepage/Homepage'
import Files from './components/files/Files'
import Content from './components/content/Content'
import axios from 'axios';
import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";

// function App() {
//   const [obj, setObj] = useState({});

//   useEffect(() => {
//     axios.get("http://localhost:3200")
//     .then((resp) => {
//       setObj(resp.data)
//     })
//   }, [])

//   return (

//   )
//}
function App() {
  return (
    <BrowserRouter>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/files">Files</Link>
            </li>
            <li>
              <Link to="/content">Content</Link>
            </li>
            <li>
              <Link to="/admin">Admin</Link>
            </li>
          </ul>
        </nav>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="content/*" element={<Content />} />
        <Route path="files/*" element={<Files />} />
        <Route path="admin/*" element={<AdminDash />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
