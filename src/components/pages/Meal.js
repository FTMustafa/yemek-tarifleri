import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import './Meal.css';
import KisiListesi from "../Login/KisiListesi";

function Meal() {
  const location = useLocation();
  const navigate = useNavigate();
  const [mealDetails, setMealDetails] = useState(null);
  const [user, setUser] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false); // Favori durumu
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const { filteredMeal } = location.state;

  useEffect(() => {
    const aktifKullanici = KisiListesi.find((k) => k.durum === true);
    setUser(aktifKullanici); // Giriş yapmış kullanıcıyı al

    if (aktifKullanici && filteredMeal.length > 0) {
      setIsFavorite(aktifKullanici.favoriYemekler.includes(filteredMeal[0].idMeal));
    }
  }, [filteredMeal]);

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

  useEffect(() => {
    fetchMealDetails();
  }, [filteredMeal]);

  const handleAddFavorite = () => {
    if (user) {
      if (!isFavorite) {
        user.favoriYemekler.push(mealDetails.idMeal);
        setIsFavorite(true);
        setModalMessage(`${mealDetails.strMeal} favorilere eklendi!`);
      } else {
        user.favoriYemekler = user.favoriYemekler.filter(
          (id) => id !== mealDetails.idMeal
        );
        setIsFavorite(false);
        setModalMessage(`${mealDetails.strMeal} favorilerden çıkarıldı!`);
      }
    } else {
      setModalMessage("Öncelikle giriş yapın!");
    }
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setModalMessage("");
  };

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
        <button className="meal-navButton" onClick={handleAddFavorite}>
          {isFavorite ? "Favorilerden çıkar" : "Favorilere ekle"}
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
      {isModalVisible && (
        <div className="modal">
          <p>{modalMessage}</p>
          <button onClick={closeModal}>Tamam</button>
        </div>
      )}
    </div>
  );
}

export default Meal;
