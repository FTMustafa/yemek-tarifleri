import "./Login.css";
import { useState } from "react";
import KisiListesi from "./KisiListesi";
import Signin from "./Signin";

function Login({ setIsLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignIn, setIsSignIn] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const onFinish = (event) => {
    event.preventDefault();

    const kisi = KisiListesi.find(
      (x) => x.email === email && x.password === password
    );

    if (kisi) {
      kisi.durum = true;
      setIsLogin(false); // Kullanıcı giriş yaptı, profil sayfasına dön
    } else {
      showModal();
    }
  };

  if (isSignIn) {
    return <Signin setIsSignIn={setIsSignIn} />;
  }

  return (
    <div className="login">
      <div className="bg">
        <form onSubmit={onFinish}>
          <div className="form">
            <div className="girdi">
              <label>E-mail</label>
              <input
                type="email"
                placeholder="E-mailinizi giriniz"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="girdi">
              <label>Şifre</label>
              <input
                type="password"
                placeholder="Şifrenizi giriniz"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="girdi-bottom">
              <button type="button" onClick={() => setIsSignIn(true)}>
                Profil oluştur
              </button>
              <button type="submit">Giriş Yap</button>
            </div>
          </div>
        </form>
        {isModalVisible && (
          <div className="modal">
            <p>Yanlış email veya şifre</p>
            <button onClick={handleOk}>Tamam</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Login;
