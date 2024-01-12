import './dashboard.css';
import { useState, useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { getUserById } from '../../services/userService';
import { UserData } from '../../interfaces/users';
import Header from '../../components/dashboard/header/Header';
import Activity from '../../components/dashboard/activityChart/Activity';
import Performance from '../../components/dashboard/performanceChart/Performance';
import Session from '../../components/dashboard/sessionsChart/session';
import Score from '../../components/dashboard/scoreChart/score';
import NutritionInfo from '../../components/dashboard/nutritionInfos/NutritionInfo';
import Loader from '../../components/loader/loader';

const Dashboard = () => {
  const { userId } = useParams<{ userId: string }>();
  const [user, setUser] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId) {
      return;
    }
    setIsLoading(true);

    getUserById(parseInt(userId, 10))
      .then((json) => {
        setUser(json);
        setIsLoading(false);
      })
      .catch((e) => {
        console.error(
          'Erreur lors de la récupération des données de l utilisateur:',
          e
        );
        setError(e);
      });
  }, [userId]);

  if (isLoading) {
    return (
      <div className="dashboard-loader">
        <div className="loader-wrapper">
          <p>En chargement..</p>
          <Loader />
        </div>
      </div>
    );
  }
  if (!userId) {
    return <div id="dashboard_error">L&apos;utilisateur est inexistant</div>;
  }

  if (error) {
    return <Navigate to="/error" />;
  }

  if (user) {
    const { userInfos, keyData, todayScore } = user;
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
              {todayScore !== undefined ? (
                <Score todayScore={todayScore} />
              ) : (
                <Loader />
              )}
            </div>
          </div>
          <div className="dashboard_section_right">
            {keyData !== undefined ? (
              <NutritionInfo keyData={keyData} />
            ) : (
              <Loader />
            )}
          </div>
        </div>
      </div>
    );
  }
};

export default Dashboard;
