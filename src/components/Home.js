import { Outlet, useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {
  const navigate = useNavigate();
  return (
    <div className="home">
      <nav>
        <div className="logo" onClick={()=>navigate('/home')}></div>
        <div className="nav-button" onClick={()=>navigate('recipes')}>Tarifler</div>
        <div className="nav-button" onClick={()=>navigate()}>Favoriler</div>
        <div className="nav-button" onClick={()=>navigate('profile')}>Profil</div>
        <div className="nav-button" onClick={()=>navigate('contact')}>İletişim</div>
      </nav>
      <div className="var-page">
        <Outlet></Outlet>
      </div>
    </div>
  );
}

export default Home;
