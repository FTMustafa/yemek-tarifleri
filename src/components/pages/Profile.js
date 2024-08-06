import "./Profile.css";
import { useState, useEffect } from "react";
import KisiListesi from "../Login/KisiListesi";
import Login from "../Login/Login";

function Profile() {
  const [user, setUser] = useState(null);
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const aktifKullanici = KisiListesi.find((k) => k.durum === true);
    if (aktifKullanici) {
      setUser(aktifKullanici);
      setIsLogin(false);
    } else {
      setIsLogin(true); // Aktif kullanıcı yoksa login sayfasını göster
    }
  }, [isLogin]);

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
            <p>
              <strong>Ad:</strong> {user.ad}
            </p>
            <p>
              <strong>Soyad:</strong> {user.soyad}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Favori Yemekler:</strong> {user.favoriYemekler.join(", ")}
            </p>
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
