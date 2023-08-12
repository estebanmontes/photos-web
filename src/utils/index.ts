export const addQueryParams = (url, queryParams) => {
  const validQueryParams = {};
  for (const key in queryParams) {
    const value = queryParams[key];
    if (value !== undefined && value !== null && value !== "") {
      validQueryParams[key] = value;
    }
  }
  const queryString = Object.keys(validQueryParams)
    .map(
      (key) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(
          validQueryParams[key]
        )}`
    )
    .join("&");
  if (queryString) {
    return `${url}${url.includes("?") ? "&" : "?"}${queryString}`;
  } else {
    return url;
  }
};
