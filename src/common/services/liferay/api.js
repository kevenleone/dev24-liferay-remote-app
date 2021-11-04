const { REACT_APP_LIFERAY_API = window.location.origin } = process.env;

export const getLiferayAuthenticationToken = () => {
  try {
    // eslint-disable-next-line no-undef
    const token = Liferay.authToken;

    return token;
  } catch (error) {
    console.warn("Not able to find Liferay auth token\n", error);

    return "";
  }
};

const baseFetch = async (url, { body, method = "GET" } = {}) => {
  const response = await fetch(REACT_APP_LIFERAY_API + "/" + url, {
    ...(body && { body: JSON.stringify(body) }),
    headers: {
      "Content-Type": "application/json",
      "x-csrf-token": getLiferayAuthenticationToken(),
    },
    method,
  });

  if (method !== "DELETE") {
    const data = await response.json();

    return data;
  }
};

export { REACT_APP_LIFERAY_API };

export default baseFetch;
