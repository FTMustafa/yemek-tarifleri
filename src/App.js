import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Home from "./components/Home";
import DefaultContent from "./components/DefaultContent";
import Recipes from "./components/pages/Recipes";
import Meal from "./components/pages/Meal";
import Contact from "./components/pages/Contact";
import Profile from "./components/pages/Profile";
import Favorites from "./components/pages/Favorites";

function App() {
  {
    /* {veri.categories?.map((item, index) => (
        <div key={index}>
          {item.strCategory}
        </div>
      ))} */
  }

  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<Home />}>
            <Route index element={<DefaultContent />} />
            <Route path="recipes" element={<Recipes />} />
            <Route path="contact" element={<Contact />} />
            <Route path="profile" element={<Profile />} />
            <Route path="favorites" element={<Favorites/>} />
          </Route>
          <Route path="/meal" element={<Meal />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
