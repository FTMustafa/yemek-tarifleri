import "./Meal.css";
import { useLocation, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";

function Meal() {
  const location = useLocation();
  const navigate = useNavigate();
  const [mealDetails, setMealDetails] = useState(null);
  const { filteredMeal } = location.state;

  useEffect(() => {
    const fetchMealDetails = async () => {
      try {
        const response = await axios.get(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${filteredMeal[0].idMeal}`
        );
        setMealDetails(response.data.meals[0]);
      } catch (err) {
        console.error("Yemek detaylarını çekerken bir hata oluştu:", err);
      }
    };

    fetchMealDetails();
  }, [filteredMeal]);

  if (!mealDetails) {
    return <div>Yükleniyor...</div>;
  }

  return (
    <div className="meal">
      <div className="meal-navbar">
        <button
          className="meal-navButton"
          onClick={() => navigate("/home/recipes")}
        >
          Geri Dön
        </button>
      </div>
      <div className="meal-details">
        <div className="title">
          <h1>{mealDetails.strMeal}</h1>
          <img src={mealDetails.strMealThumb} alt={mealDetails.strMeal} />
        </div>
        <div className="bottom">
          <div className="yapilis">
            <h2>Yapılışı</h2>
            <p>{mealDetails.strInstructions}</p>
          </div>
          <div className="icerik">
            <h2>İçerikler</h2>
            <ul>
              {Object.keys(mealDetails)
                .filter(
                  (key) => key.startsWith("strIngredient") && mealDetails[key]
                )
                .map((key) => (
                  <li key={key}>
                    {mealDetails[key]} -{" "}
                    {mealDetails[`strMeasure${key.slice(13)}`]}
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Meal;
