/* const url = 'http//localhost:3001';

async function fetchLogin(data) {
  try {
    const response = await fetch(`${url}/login`, {
      method: 'POST',
      body: JSON.stringify(data),
    });

    const { status } = response;
    const responseData = await response.json();
    return { status, responseData };
  } catch (e) {
    throw e.message;
  }
}

module.exports = { fetchLogin };
 */
