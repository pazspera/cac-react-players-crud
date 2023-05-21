import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element="show"/>
          <Route path="/create" element="create"/>
          <Route path="/edit/:id" element="edit"/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
