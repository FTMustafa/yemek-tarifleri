import "./Recipes.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Recipes() {
  const [arama, setArama] = useState("");
  const [veri, setVeri] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const veriCek = async () => {
      try {
        const categoriesResponse = await axios.get(
          "https://www.themealdb.com/api/json/v1/1/categories.php"
        );

        const categories = categoriesResponse.data.categories;
        let allMeals = [];

        for (let category of categories) {
          const mealsResponse = await axios.get(
            `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category.strCategory}`
          );
          allMeals = [...allMeals, ...mealsResponse.data.meals];
        }

        setVeri(allMeals);
        setLoading(false);
      } catch (err) {
        console.error("Veri çekme sırasında bir hata oluştu:", err);
        setLoading(false);
      }
    };

    veriCek();
  }, []);

  const navigate = useNavigate();

  const filteredData = veri.filter(
    (item) =>
      item.strMeal && item.strMeal.toLowerCase().includes(arama.toLowerCase())
  );

  const goIngredientPage = (itemIndex) => {
    const filteredMeal = veri.filter((item) => (itemIndex == item.idMeal));
    navigate("/meal", { state: { filteredMeal } });
  };

  return (
    <div className="recipes">
      <input
        type="text"
        placeholder="Yemek tarifi arama.."
        value={arama}
        onChange={(e) => setArama(e.target.value)}
        className="search-bar"
      />
      {loading ? (
        <div className="loading">Yükleniyor...</div>
      ) : (
        <div className="card-section">
          {filteredData.map((item) => (
            // navigate("/question-page", { state: {ders} })
            <div
              key={item.idMeal}
              className="card"
              onClick={() => goIngredientPage(item.idMeal)}
            >
              <img src={item.strMealThumb} alt={item.strMeal} />
              {item.strMeal}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Recipes;
