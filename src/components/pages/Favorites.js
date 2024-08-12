import "./Favorites.css";
import React, { useState, useEffect } from "react";
import KisiListesi from "../Login/KisiListesi";
import axios from "axios";
import { useNavigate } from "react-router-dom";


function Favorites() {
  const [favoriYemekler, setFavoriYemekler] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const aktifKullanici = KisiListesi.find((k) => k.durum === true);
    if (aktifKullanici) {
      setUser(aktifKullanici);
      fetchFavoriteMeals(aktifKullanici.favoriYemekler);
    } else {
      setLoading(false);
    }
  }, []);

  const fetchFavoriteMeals = async (favoriYemeklerIds) => {
    try {
      const mealRequests = favoriYemeklerIds.map((mealId) =>
        axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
      );

      const mealResponses = await Promise.all(mealRequests);
      const mealsData = mealResponses.map((response) => response.data.meals[0]);

      setFavoriYemekler(mealsData);
      setLoading(false);
    } catch (err) {
      console.error("Favori yemekleri çekerken bir hata oluştu:", err);
      setLoading(false);
    }
  };

  const goMealPage = (mealId) => {
    const selectedMeal = favoriYemekler.filter((meal) => meal.idMeal === mealId);
    navigate("/meal", { state: { filteredMeal: selectedMeal } });
  };

  if (loading) {
    return <div>Yükleniyor...</div>;
  }

  if (favoriYemekler.length === 0) {
    return (
        <div className="favorites" style={{justifyContent:'center'}}>
            <h1 style={{color:'red'}}>Favori yemeğiniz bulunmamaktadır.</h1>
        </div>
    );
  }

  return (
    <div className="favorites">
      <h2>Favori Yemekleriniz</h2>
      <div className="card-section">
        {favoriYemekler.map((meal) => (
          <div
            key={meal.idMeal}
            className="card"
            onClick={() => goMealPage(meal.idMeal)}
          >
            <img src={meal.strMealThumb} alt={meal.strMeal} />
            {meal.strMeal}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Favorites;
