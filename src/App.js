import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { Show } from "./components/Show";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Show />} />
          <Route path="/create" element="create" />
          <Route path="/edit/:id" element="edit" />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
