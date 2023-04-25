import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css';
import NoteWall from "./components/NoteWall";
import Write from "./components/Write";
import Edit from "./components/Edit";
import Random from "./components/Random";


function App() {
  return (
    <div className="App">
      <BrowserRouter>

        <Routes>
          <Route path="/" element={<NoteWall />} />
          <Route path="/write" element={<Write />} />
          <Route path="/edit/:id" element={<Edit />} />
          <Route path="/random" element={<Random />} />
        </Routes>

      </BrowserRouter>
    </div>
  );
}

export default App;