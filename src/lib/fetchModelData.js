/**
 * fetchModel - Fetch a model from the web server.
 *
 * @param {string} url      The URL to issue the GET request.
 *
 */

const bUrl = "https://36jyvf-8081.csb.app";

async function fetchModel(url) {
  const models = await fetch(`${bUrl}${url}`, {
    headers: {
      Accept: "application/json"
    }
  })

  if(!models.ok) {
    const errorText = await models.text();
    throw new Error(`Failed to fetch ${url}: ${errorText.status} ${errorText}`);
  }

  return await models.json();
}

export default fetchModel;
