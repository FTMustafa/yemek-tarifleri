import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Home from "./components/Home";
import DefaultContent from "./components/DefaultContent";
import { useEffect, useState } from "react";
import axios from "axios";
import Recipes from "./components/pages/Recipes";
function App() {
  // const [veri, setVeri] = useState([]);

  // useEffect(() => {
  //   const veriCek = async () => {
  //     try {
  //       const response = await axios.get(
  //         "https://www.themealdb.com/api/json/v1/1/categories.php"
  //       );
  //       console.log(response.data);
  //       setVeri(response.data);
  //     } catch (err) {
  //       console.error("Veri çekme sırasında bir hata oluştu:", err);
  //     }
  //   };

  //   veriCek();
  // }, []);

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
            <Route path="recipes" element={<Recipes></Recipes>}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
