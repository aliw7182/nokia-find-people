import { getToken } from "../context/auth/authProvider";

export const authURL = "https://family-finding-api.herokuapp.com/api/v1/";

export const request = ({
  endpoint,
  data,
  method,
  meta = false,
  isV1 = true,
  thirdParty = false,
}) => {
  const token = getToken();

  const config = {
    method,
    body: data ? JSON.stringify(data) : null,
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : null,
    },
  };

  return window
    .fetch(
      `${isV1 ? authURL : authURL.substr(0, authURL.length - 6)}/${endpoint}`,
      config
    )
    .then(async (response) => {
      try {
        if (response.ok) {
          const res = await response.json();
          const data = meta ? res : res.data;
          console.log(`Response data from ${endpoint}`, data);
          return data;
        } else {
          return Promise.reject(response);
        }
      } catch (err) {
        console.log(err);
      }
    });
};

export const request2 = ({
  endpoint,
  data,
  method,
  meta = false,
  isV1 = true,
  thirdParty = false,
}) => {
  const token = getToken();

  const config = {
    method,
    body: data ? JSON.stringify(data) : null,
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : null,
    },
  };

  return window
    .fetch(
      `${isV1 ? authURL : authURL.substr(0, authURL.length - 6)}/${endpoint}`,
      config
    )
    .then(async (response) => {
      try {
        if (response.ok) {
          const res = await response.json();
          const data = meta ? res : res;
          console.log(`Response data from ${endpoint}`, data);
          return data;
        } else {
          return Promise.reject(response);
        }
      } catch (err) {
        console.log(err);
      }
    });
};
