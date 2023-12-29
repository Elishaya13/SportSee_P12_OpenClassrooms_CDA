import './dashboard.css';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getUserById } from '../services/userService';
import { UserData } from '../interfaces/users';
import Header from '../components/dashboard/header';
import Activity from '../components/dashboard/activity';
import Performance from '../components/dashboard/performance';
import Session from '../components/dashboard/session';
import Score from '../components/dashboard/score';
import NutritionInfo from '../components/dashboard/nutritionInfo';

const Dashboard = () => {
  const { userId } = useParams<{ userId: string }>();
  const [user, setUser] = useState<UserData | null>(null);
  // const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId) {
      return;
    }
    getUserById(parseInt(userId, 10)).then((json) => {
      setUser(json);
    });
    //  .catch((e) => setError(e));
  }, [userId]);

  if (user == undefined) {
    return <div id="dashboard_error">L&apos;utilisateur est inexistant</div>;
  }

  if (user) {
    const { userInfos } = user;
    return (
      <div id="dashboard_wrapper">
        <div className="dashboard_header">
          <Header firstName={userInfos.firstName} />
        </div>
        <div className="dashboard_content">
          <div className="dashboard_section_left">
            <div className="dashboard_section_left_first">
              <Activity />
            </div>
            <div className="dashboard_section_left_second">
              <Session />
              <Performance />
              <Score />
            </div>
          </div>
          <div className="dashboard_section_right">
            <NutritionInfo />
          </div>
        </div>
      </div>
    );
  }
};

export default Dashboard;
