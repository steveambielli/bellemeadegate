export async function GET() {
  /*const res = await fetch('https://data.mongodb-api.com/...', {
    headers: {
      'Content-Type': 'application/json',
      'API-Key': process.env.DATA_API_KEY,
    },
  })

  const data = await res.json()*/

  const data = {
    mainGate: {
      status: "Active",
      arm: "Active",
      lastIncident: "2023-10-16",
    },
    residentGate: {
      status: "Active",
      arm: "Active",
      lastIncident: "2022-10-01",
    },
  }

  return Response.json({ data })
}
