function getWindowOrigin() {
  const loc = window.location;
  const port = loc.port ? `:${loc.port}` : '';
  return `${loc.protocol}//${loc.hostname}${port}`;
}

export function baseUrl() {
  const loc = window.location;
  const isHostingLocally = loc.hostname === 'localhost';
  return isHostingLocally ? 'http://localhost:4000' : getWindowOrigin();
}

export function getLocalUrl(path) {
  return `${baseUrl()}${path}`;
}
