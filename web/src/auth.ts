let accessToken = "";

export const setAccessToken = (token: string) => {
  accessToken = token;
};

export const getAccessToken = () => {
  return accessToken;
};

export const fetchToken = (): Promise<any> => {
  return fetch("http://localhost:4000/refresh_token", {
    method: "post",
    credentials: "include",
  });
};

export const refreshToken = (): Promise<any> => {
  return fetchToken().then(async (res) => {
    const { accessToken } = await res.json();
    setAccessToken(accessToken);
  });
};
