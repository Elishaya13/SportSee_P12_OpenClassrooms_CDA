import { Link } from 'react-router-dom';
import logo from './../../assets/images/logo.png';
import './topbar.css';

const Topbar = () => {
  return (
    <>
      <div id="topbar">
        <div className="topbar_left">
          <img src={logo} alt="logo"></img>SportSee
        </div>
        <div className="topbar_right">
          <ul>
            <Link to={`/`}>Accueil</Link>
            <Link to={`/`}>Profil</Link>
            <Link to={`/`}>Réglages</Link>
            <Link to={`/`}>Communauté</Link>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Topbar;
