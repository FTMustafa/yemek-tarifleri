import "./Signin.css";
import { useState } from "react";
import KisiListesi from "./KisiListesi";

let currentID = 0;

class Kisi {
  constructor(
    email,
    password,
    ad = "-------",
    soyad = "-------",
    favoriYemekler = []
  ) {
    this.email = email;
    this.password = password;
    this.durum = false;
    this.id = currentID++;
    this.ad = ad;
    this.soyad = soyad;
    this.favoriYemekler = favoriYemekler;
  }
}

function Signin({ setIsSignIn }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const showModal = (message) => {
    setModalMessage(message);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const onFinish = (event) => {
    event.preventDefault();

    const form = event.target;
    const email = form.email.value;
    const password1 = form.password1.value;
    const password2 = form.password2.value;

    if (email && password1 && password2) {
      if (password1 === password2) {
        const existingUser = KisiListesi.find((user) => user.email === email);

        if (!existingUser) {
          const newUser = new Kisi(email, password1);
          KisiListesi.push(newUser);
          setIsSignIn(false); // Kayıt başarılı, login sayfasına dön
        } else {
          showModal("Kişi zaten kayıtlı!");
        }
      } else {
        showModal("Şifreler farklı!");
      }
    } else {
      showModal("Tüm alanları doldurunuz!");
    }
  };

  return (
    <div className="signin">
      <div className="signin-bg">
        <form onSubmit={onFinish}>
          <div className="signin-form">
            <div className="girdi">
              <label>E-mail</label>
              <input
                name="email"
                type="email"
                placeholder="E-mailinizi giriniz"
              />
            </div>
            <div className="girdi">
              <label>Şifre</label>
              <input
                name="password1"
                type="password"
                placeholder="Şifrenizi giriniz"
              />
            </div>
            <div className="girdi">
              <label>Şifre tekrarı</label>
              <input
                name="password2"
                type="password"
                placeholder="Şifrenizi tekrar giriniz"
              />
            </div>

            <div className="girdi-bottom">
              <button type="button" onClick={() => setIsSignIn(false)}>
                Geri dön
              </button>
              <button type="submit">Kayıt Ol</button>
            </div>
          </div>
        </form>
        {isModalVisible && (
          <div className="modal">
            <p>{modalMessage}</p>
            <button onClick={handleOk}>Tamam</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Signin;
