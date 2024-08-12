import "./Profile.css";
import { useState, useEffect } from "react";
import KisiListesi from "../Login/KisiListesi";
import Login from "../Login/Login";
import axios from "axios";

function Profile() {
  const [user, setUser] = useState(null);
  const [isLogin, setIsLogin] = useState(false);
  const [favoriteMeals, setFavoriteMeals] = useState([]);

  useEffect(() => {
    const aktifKullanici = KisiListesi.find((k) => k.durum === true);
    if (aktifKullanici) {
      setUser(aktifKullanici);
      setIsLogin(false);
      fetchFavoriteMeals(aktifKullanici.favoriYemekler);
    } else {
      setIsLogin(true); // Aktif kullanıcı yoksa login sayfasını göster
    }
  }, [isLogin]);

  const fetchFavoriteMeals = async (mealIds) => {
    try {
      const mealPromises = mealIds.map((id) =>
        axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
      );
      const mealResponses = await Promise.all(mealPromises);
      const meals = mealResponses.map(
        (response) => response.data.meals[0].strMeal
      );
      setFavoriteMeals(meals);
    } catch (err) {
      console.error("Favori yemekleri çekerken bir hata oluştu:", err);
    }
  };

  const handleLogout = () => {
    if (user) {
      user.durum = false;
      setUser(null);
      setIsLogin(true);
    }
  };

  if (isLogin) {
    return <Login setIsLogin={setIsLogin} />;
  }

  return (
    <div className="profile">
      {user ? (
        <div className="profile-container">
          <div className="profile-mid">
            <h2>Profil Bilgileri</h2>
            <div>
              <p>
                <strong>Ad:</strong> {user.ad}
              </p>
              <p>
                <strong>Soyad:</strong> {user.soyad}
              </p>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
            </div>
            <strong>Favori Yemekler:</strong>
            <div className="favorite-meals">
              <ul>
                {favoriteMeals.length > 0 ? (
                  favoriteMeals.map((meal, index) => (
                    <li key={index}>{meal}</li>
                  ))
                ) : (
                  <p>Favori yemek bulunmuyor.</p>
                )}
              </ul>
            </div>
            <button onClick={handleLogout}>Çıkış yap</button>
          </div>
        </div>
      ) : (
        <p>Yükleniyor...</p>
      )}
    </div>
  );
}

export default Profile;
