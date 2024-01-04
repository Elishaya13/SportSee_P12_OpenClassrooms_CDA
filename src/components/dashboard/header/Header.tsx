import './header.css';
import { UserInfos } from '../../../interfaces/users';

const Header = ({ firstName }: Pick<UserInfos, 'firstName'>) => {
  return (
    <div className="header_wrapper">
      <h2>
        Bonjour <span className="firstname">{firstName}</span>{' '}
      </h2>
      <p>Félicitations ! Vous avez explosé vos objectifs hier 👏</p>
    </div>
  );
};

export default Header;
