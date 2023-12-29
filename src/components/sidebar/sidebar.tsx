import './sidebar.css';
import sport1 from '../../assets/images/sport1.svg';
import sport2 from '../../assets/images/sport2.svg';
import sport3 from '../../assets/images/sport3.svg';
import sport4 from '../../assets/images/sport4.svg';
const SidebarNav = () => {
  return (
    <div id="sidebar_wrapper">
      <div className="icons_part">
        <img src={sport1} alt="icone de sport"></img>
        <img src={sport2} alt="icone de sport"></img>
        <img src={sport3} alt="icone de sport"></img>
        <img src={sport4} alt="icone de sport"></img>
      </div>
      <div className="copyright">
        <p>Copyright, SportSee 2020</p>
      </div>
    </div>
  );
};

export default SidebarNav;
