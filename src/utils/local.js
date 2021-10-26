function getWindowOrigin() {
  const loc = window.location;
  const port = loc.port ? `:${loc.port}` : '';
  return `${loc.protocol}//${loc.hostname}${port}`;
}

export function baseUrl() {
  return process.env.REACT_APP_API_BASE_URL;
}

export function getLocalUrl(path) {
  return `${baseUrl()}${path}`;
}
