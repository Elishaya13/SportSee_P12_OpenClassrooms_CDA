// Fonction pour récupérer les informations d'un utilisateur par ID en utilisant soit l'API soit les données mock

export const getUserById = async (userId: number) => {
  const useAPI = localStorage.getItem('useApi') === 'true';

  const endpoint = useAPI
    ? `http://localhost:3000/user/${userId}`
    : `/src/mocksData/userData.json`;

  const response = await fetch(endpoint);

  // if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

  const { data } = await response.json();
  return data;
};

// Récupérer les données de performance pour un utilisateur depuis le fichier JSON correspondant
// export const getUserPerformanceById = async (userId, useAPI) => {
//       response = await fetch(
//         `http://localhost:3000/user/${userId}/performance`
//       );

//       response = await fetch(`/src/mocks/userPerformanceData.json`);
//   const response = await fetch(`/userPerformanceData.json`);

// Récupérer les données d'activité pour un utilisateur depuis le fichier JSON correspondant
// export const getActivityById = async (userId) => {}
//     const response = await fetch(`/userActivityData.json`);

// Récupérer les sessions moyennes pour un utilisateur depuis le fichier JSON correspondant
// export const getAverageSessionsById = async (userId) => {
//     const response = await fetch(`/userAverageSessionsData.json`);
