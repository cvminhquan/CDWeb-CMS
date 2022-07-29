import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/css/bootstrap.css';

import { useState } from "react";
import HeaderAdmin from "./pages/Admin/HeaderAdmin/HeaderAdmin";
import User from "./pages/Admin/User/User";
import SideBar from "./pages/Admin/SideBar/SideBar";
import Film from "./pages/Admin/Film/Film";


function App() {
  const [active, setState] = useState<string>("");
  const auth = localStorage.getItem("userInfo")
  return (
    <div className="App">
      <Router>
        <HeaderAdmin />
        <SideBar />
        <Routes>
          <Route path="/user" element={<User />}></Route>
          <Route path="/" element={<Film />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
