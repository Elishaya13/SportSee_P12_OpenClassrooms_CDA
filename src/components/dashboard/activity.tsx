import { ActivitySessionsProps } from '../../interfaces/users';
import './activity.css';

const Activity = ({ sessions }: { sessions: ActivitySessionsProps[] }) => {
  return (
    <div className="activity_wrapper">
      <h2>Activity Component</h2>
      {/* {sessions.map((session, index) => (
        <div key={index} className="activity_session">
          <p>Jour : {session.day}</p>
          <p>Poids : {session.kilogram} kg</p>
          <p>Calories brûlées : {session.calories} cal</p>
        </div>
      ))} */}
    </div>
  );
};

export default Activity;
