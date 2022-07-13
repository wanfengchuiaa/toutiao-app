export function getToken(key) {
  let data = localStorage.getItem(key);
  try {
    data = JSON.parse(data);
  } catch (error) {
    console.log(error);
  }
  return data;
}
export function setToken(token, data) {
  localStorage.setItem(
    token,
    typeof data === "object" ? JSON.stringify(data) : data
  );
}
