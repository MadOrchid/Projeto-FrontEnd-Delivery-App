const url = 'http://localhost:3001';

async function fetchRegister(data) {
  try {
    const response = await fetch(`${url}/register`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
    const { status } = response;
    const responseData = await response.json();
    return { status, responseData };
  } catch (er) {
    const responseData = await response.json();
    return { responseData };
  }
}

module.exports = { fetchRegister };

/*

ola

*/
