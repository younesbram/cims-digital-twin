export default async function getJson(path) {
  const response = await fetch(path);
  const json = await response.json();
  return json;
}
