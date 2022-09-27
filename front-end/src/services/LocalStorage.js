function getKey(key) {
  const json = localStorage.getItem(key);
  const data = JSON.parse(json);
  // console.log(data);
  return data;
}

function setKey(key, value) {
  const json = JSON.stringify(value);
  localStorage.setItem(key, json);
}

module.exports = { getKey, setKey };
