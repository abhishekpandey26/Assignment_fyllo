import { useState } from "react";
import ProductList from "./Pages/ProductList";
import Sidebar from "./Components/Sidebar";
import Topbar from "./Components/Topbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Pages/Home";
import "./App.css";
import { Assignment } from "@mui/icons-material";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <div className={`App ${darkMode ? "dark" : ""}`}>
      <Router>
        <Topbar toggleDarkMode={toggleDarkMode} />
        <div className="container">
          <Sidebar />
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/product">
              <ProductList />
            </Route>
            <Route exact path="/Assignment">
              <Assignment></Assignment>
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
