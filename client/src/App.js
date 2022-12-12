import {BrowserRouter, Routes, Route} from "react-router-dom";
import Campaigns from "./pages/Campaigns";
import Edit from "./pages/Edit";
import Preview from "./pages/Preview";
import "./style.css"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Campaigns/>}/>
          <Route path="/edit/:id" element={<Edit/>}/>
          <Route path="/preview/:id" element={<Preview/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
