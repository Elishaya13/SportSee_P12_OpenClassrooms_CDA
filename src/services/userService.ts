// Fonction pour récupérer les informations d'un utilisateur par ID en utilisant soit l'API soit les données mock

import { ActivityData, ActivitySession } from '../interfaces/activity';
import { UserSession, UserSessionsData } from '../interfaces/sessions';
import { User, UserData } from '../interfaces/users';
import { get } from './api';

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
    : `/src/mocksData/userData.json`;

  const userData = await get<UserData>(endpoint);

  // if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

  return formatUserData(userData);
};

// Récupérer les données d'activité pour un utilisateur depuis le fichier JSON correspondant
export const getActivityById = async (
  userId: number
): Promise<ActivitySession[]> => {
  const useAPI = localStorage.getItem('useApi') === 'true';

  const endpoint = useAPI
    ? `http://localhost:3000/user/${userId}/activity`
    : `/src/mocksData/userActivityData.json`;

  const activityData = await get<ActivityData>(endpoint);

  return activityData.sessions;
};

export const getSessionsById = async (
  userId: number
): Promise<UserSession[]> => {
  const useAPI = localStorage.getItem('useApi') === 'true';

  const endpoint = useAPI
    ? `http://localhost:3000/user/${userId}/average-sessions`
    : `/src/mocksData/userAverageSessionsData.json`;

  const sessionsData = await get<UserSessionsData>(endpoint);

  return sessionsData.sessions;
};
//     const response = await fetch(`/userActivityData.json`);

// Récupérer les données de performance pour un utilisateur depuis le fichier JSON correspondant
// export const getUserPerformanceById = async (userId, useAPI) => {
//       response = await fetch(
//         `http://localhost:3000/user/${userId}/performance`
//       );

//       response = await fetch(`/src/mocks/userPerformanceData.json`);
//   const response = await fetch(`/userPerformanceData.json`);

// Récupérer les sessions moyennes pour un utilisateur depuis le fichier JSON correspondant
// export const getAverageSessionsById = async (userId) => {
//     const response = await fetch(`/userAverageSessionsData.json`);
