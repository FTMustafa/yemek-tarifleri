import "./Recipes.css";
import React, { useState, useEffect } from "react";
import axios from "axios";

function Recipes() {
  const [arama, setArama] = useState("");
  const [veri, setVeri] = useState([]);

  useEffect(() => {
    const veriCek = async () => {
      try {
        const response = await axios.get(
          "https://www.themealdb.com/api/json/v1/1/categories.php"
        );
        console.log(response.data);
        setVeri(response.data.categories); // Burada categories dizisini setVeri'ye atıyoruz
      } catch (err) {
        console.error("Veri çekme sırasında bir hata oluştu:", err);
      }
    };

    veriCek();
  }, []);

  const filteredData = veri.filter((item) =>
    item.strCategory.toLowerCase().includes(arama.toLowerCase())
  );

  return (
    <div className="recipes">
      <input
        type="text"
        placeholder="Yemek tarifi arama.."
        value={arama}
        onChange={(e) => setArama(e.target.value)}
        className="search-bar"
      />
      <div className="card-section">
        {filteredData.map((item) => (
          <div key={item.idCategory} className="card">
            <img src={item.strCategoryThumb}/>
            {item.strCategory}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Recipes;
