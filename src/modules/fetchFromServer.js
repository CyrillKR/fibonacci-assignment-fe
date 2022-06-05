export const BASE_URL = "http://localhost:5050/fibonacci/";

export async function fetchFromServer(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
  }
}

export async function getHistory(limit) {
  let url = `${BASE_URL}/history`;
  if (limit && typeof limit === "number") {
    url = `${BASE_URL}/history?limit=${limit}`;
  }
  const response = await fetchFromServer(url);
  return response.results.map((result) => JSON.parse(result));
}
