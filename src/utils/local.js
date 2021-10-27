export function baseUrl() {
  return process.env.REACT_APP_API_BASE_URL;
}

export function getLocalUrl(path) {
  return `${baseUrl()}${path}`;
}
