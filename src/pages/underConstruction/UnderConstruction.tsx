import './underConstruction.css';
import { Link } from 'react-router-dom';

const UnderConstruction = () => {
  return (
    <div id="under-construction">
      <h1>Cette page est en contruction. 🚧</h1>
      <Link to="/"> Retourner à la page d&apos;accueil 🔙</Link>
    </div>
  );
};

export default UnderConstruction;
