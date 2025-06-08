import { useState, useEffect } from "react";
import ProductList from "./Pages/ProductList";
import Sidebar from "./Components/Sidebar";
import Topbar from "./Components/Topbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Pages/Home";
import "./App.css";

import Assisments from "./Pages/Assisments";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div className="App">
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
              <Assisments></Assisments>
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
