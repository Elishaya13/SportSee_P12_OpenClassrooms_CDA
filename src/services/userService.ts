import { ActivityData, ActivitySession } from '../interfaces/activity';
import { PerformanceData } from '../interfaces/performance';
import { UserSession, UserSessionsData } from '../interfaces/sessions';
import { User, UserData } from '../interfaces/users';
import { get } from './api';

// formatUserData function is used to format the user data to match the User interface structure.
const formatUserData = (userData: UserData): User => {
  return {
    ...userData,
    todayScore: userData.score ?? userData.todayScore ?? 0,
  };
};

export const getUserById = async (userId: number): Promise<User> => {
  const useAPI = localStorage.getItem('useApi') === 'true';

  const endpoint = useAPI
    ? `http://localhost:3000/user/${userId}`
    : `/src/mocksData/${userId}/userData.json`;

  const userData = await get<UserData>(endpoint);

  return formatUserData(userData);
};

export const getActivityById = async (
  userId: number
): Promise<ActivitySession[]> => {
  const useAPI = localStorage.getItem('useApi') === 'true';

  const endpoint = useAPI
    ? `http://localhost:3000/user/${userId}/activity`
    : `/src/mocksData/${userId}/userActivityData.json`;

  const activityData = await get<ActivityData>(endpoint);

  return activityData.sessions;
};

export const getSessionsById = async (
  userId: number
): Promise<UserSession[]> => {
  const useAPI = localStorage.getItem('useApi') === 'true';

  const endpoint = useAPI
    ? `http://localhost:3000/user/${userId}/average-sessions`
    : `/src/mocksData/${userId}/userAverageSessionsData.json`;

  const sessionsData = await get<UserSessionsData>(endpoint);

  return sessionsData.sessions;
};

export const getPerformanceById = async (
  userId: number
): Promise<PerformanceData> => {
  const useAPI = localStorage.getItem('useApi') === 'true';

  const endpoint = useAPI
    ? `http://localhost:3000/user/${userId}/performance`
    : `/src/mocksData/${userId}/userPerformanceData.json`;

  const performanceData = await get<PerformanceData>(endpoint);

  return performanceData;
};
