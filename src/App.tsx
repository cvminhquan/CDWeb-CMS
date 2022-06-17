import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/css/bootstrap.css';

import { useState } from "react";
import HeaderAdmin from "./pages/Admin/HeaderAdmin/HeaderAdmin.tsx";
import User from "./pages/Admin/User/User.tsx";
import SideBar from "./pages/Admin/SideBar/SideBar.tsx";
import Film from "./pages/Admin/Film/Film.tsx";


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
