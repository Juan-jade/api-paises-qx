// Lógica de la API pública Countries (GraphQL): https://countries.trevorblades.com
// Se usa fetch con POST y el cuerpo en JSON; la respuesta también llega en JSON.

const URL_API = 'https://countries.trevorblades.com/graphql';

async function consulta(query, variables = {}) {
  const respuesta = await fetch(URL_API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables })
  });
  if (!respuesta.ok) {
    throw new Error(`La API respondió con el error ${respuesta.status}`);
  }
  const { data, errors } = await respuesta.json();
  if (errors?.length) {
    throw new Error(errors[0].message);
  }
  return data;
}

export async function getAllCountries() {
  const data = await consulta(`{
    countries { code name native capital currency continent { code name } }
  }`);
  return data.countries;
}

export async function getCountryByCode(codigo) {
  const data = await consulta(`
    query Pais($code: ID!) {
      country(code: $code) {
        code name native capital currency
        continent { code name }
        languages { code name native }
        states { name }
      }
    }`, { code: codigo });
  if (!data.country) throw new Error('País no encontrado');
  return data.country;
}
