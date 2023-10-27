import { sql } from "@vercel/postgres"

async function getData() {
  const { rows } = await sql`SELECT * from belle_meade_gate_status`
  return rows
}

const daysDiff = (date: string) => {
  const inputDate = new Date(date)
  const currentDate = new Date()
  const time_difference = inputDate.getTime() - currentDate.getTime()
  const days_difference = Math.abs(time_difference / (1000 * 60 * 60 * 24))
  return Math.floor(days_difference)
}

export default async function Home() {
  const data = await getData()
  console.log(data)
  return (
    <main className="min-h-screen flex-col text-center p-24 bg-gradient-to-r from-slate-900 from-10% to-slate-800 to-90%">
      <h1 className="text-5xl font-black mb-10">Belle Meade Gate</h1>
      {data.map((gate, index) => (
        <div
          key={index}
          className="mt-10"
        >
          <h3 className="mt-5 font-bold text-4xl">{gate.name}</h3>

          <div>
            {gate.gatestatus === "Active" && (
              <span
                className={`inline-block rounded font-bold bg-green-700 p-1 px-4 mx-2 mt-4`}
              >
                Gate: {gate.gatestatus}
              </span>
            )}
            {gate.gatestatus === "Down" && (
              <span
                className={`inline-block rounded font-bold bg-red-700 p-1 px-4 mx-2 mt-4`}
              >
                Gate: {gate.gatestatus}
              </span>
            )}
            {gate.armstatus === "Active" && (
              <span
                className={`inline-block rounded font-bold bg-green-700 p-1 px-4 mx-2 mt-4`}
              >
                Arm: {gate.armstatus}
              </span>
            )}
            {gate.armstatus === "Down" && (
              <span
                className={`inline-block rounded font-bold bg-red-700 p-1 px-4 mx-2 mt-4`}
              >
                Arm: {gate.armstatus}
              </span>
            )}
          </div>

          <div>
            <h3 className="mt-5 font-bold text-1xl">
              Days since the last incident:
            </h3>
            <span
              className={`mt-3 rounded font-bold p-12 text-6xl inline-block border border-blue-900 bg-gradient-to-b from-blue-900 from-10% to-slate-800 to-90%`}
            >
              {daysDiff(gate.lastincident)}
            </span>
          </div>
        </div>
      ))}
    </main>
  )
}
