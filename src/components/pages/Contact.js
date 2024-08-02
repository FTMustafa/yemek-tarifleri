import "./Contact.css";

function Contact() {
  return (
    <div className="contact">
      <div className="contact-block">
        <h1>Bizimle iletişime geçin</h1>
        <h3>Görüşleriniz bizim için çok değerli!</h3>
        <p>
          Her türlü öneri, şikayet ve istediğinizi yazabilirsiniz. Cevap e-posta
          adresinize gönderilecektir. E-posta adresinizin güncel olduğundan emin
          olun.
        </p>
        <form action="https://formsubmit.co/36885ee2cd28d336671bfedd433e4997" method="POST">
          <input type="text" name="name" placeholder="Ad" required />
          <input type="email" name="email" placeholder="E-mail" required />
          <select name="kategoriler" required>
            <option value="" disabled selected>Kategori seçiniz</option>
            <option value="teknik">Teknik problemler</option>
            <option value="reklam">Reklam talepleri</option>
            <option value="uyelik">Üyelik işlemleri</option>
            <option value="diger">Diğer</option>
          </select>
          <textarea name="mesaj" placeholder="Mesaj" id="text-field" required></textarea>
          <button type="submit">Gönder</button>
        </form>
      </div>
    </div>
  );
}

export default Contact;
