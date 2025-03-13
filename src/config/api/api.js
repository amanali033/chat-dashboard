import axios from 'axios';

export const createAPIEndPoint = (endpoint) => {
  const BASE_URL = import.meta.env.VITE_APP_BASE_URL;
  const X_API_Key = import.meta.env.VITE_APP_X_API_Key;

  let token = typeof localStorage !== 'undefined' && localStorage.getItem('access_token');

  let url = `${BASE_URL}/${endpoint}`;
  return {
    fetchAll: () =>
      axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          'X-API-Key': X_API_Key,
          "ngrok-skip-browser-warning": "true",
        },

      }),
    create: (newRecord) =>
      axios.post(url, newRecord, {
        headers: {
          Authorization: `Bearer ${token}`,
          'X-API-Key': X_API_Key, // Ensure this is correctly defined
          "ngrok-skip-browser-warning": "true",
        },
        withCredentials: true, // Ensure this is allowed by the backend
      }),

    fetchById: (id) =>
      axios.get(url + id, {
        headers: {
          Authorization: `Bearer ${token}`,
          'X-API-Key': X_API_Key,
          "ngrok-skip-browser-warning": "true",
        }
      }),
    delete: (id) =>
      axios.delete(url + id, {
        headers: {
          Authorization: `Bearer ${token}`,
          'X-API-Key': X_API_Key,
          "ngrok-skip-browser-warning": "true",
        }
      }),
    fetchFiltered: (params) =>
      axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          'X-API-Key': X_API_Key,
          "ngrok-skip-browser-warning": "true",
        },
        params
      }),

    update: (id, updatedRecord) =>
      axios.put(
        url + id,
        updatedRecord,
        token !== null && {
          headers: {
            Authorization: `Bearer ${token}`,
            'X-API-Key': X_API_Key,
            "ngrok-skip-browser-warning": "true",
          },
        }
      ),

  };
};
