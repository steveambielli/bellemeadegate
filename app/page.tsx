async function getData() {
  const res = await fetch("http://127.0.0.1:3000/api", { cache: "no-store" })
  if (!res.ok) {
    throw new Error("Failed to fetch data")
  }
  //TODO add logic here to set days and colors
  return res.json()
}

const statusColor = (date: string, status: string) => {
  if (date) {
    if (daysDiff(date) === 0) {
      return "red"
    } else {
      return "green"
    }
  }
  if (status === "Active") {
    return "green"
  } else {
    return "red"
  }
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

  return (
    <main className="flex min-h-screen flex-col items-center p-24 bg-gradient-to-r from-slate-900 from-10% to-slate-800 to-90%">
      <h1 className="text-5xl font-black mb-4">Belle Meade Gate</h1>
      <h3 className="mt-5 font-bold text-4xl">Main Gate</h3>
      <div className="flex flex-row mt-4">
        <span
          className={`rounded font-bold bg-${statusColor(
            "",
            data.data.mainGate.status
          )}-500 p-1 px-4`}
        >
          Gate: {data.data.mainGate.status}
        </span>
        <span
          className={`rounded font-bold bg-${statusColor(
            "",
            data.data.mainGate.arm
          )}-500 p-1 px-4 mx-2`}
        >
          Arm: {data.data.mainGate.arm}
        </span>
      </div>
      <div className="flex flex-row gap-10 text-center">
        <div>
          <h3 className="mt-5 font-bold text-1xl">
            Days since the last incident:
          </h3>
          <div
            className={`mt-3 rounded font-bold bg-${statusColor(
              data.data.mainGate.lastIncident,
              ""
            )}-700 p-12 text-6xl`}
          >
            {daysDiff(data.data.mainGate.lastIncident)}
          </div>
        </div>
      </div>

      <h3 className="mt-10 font-bold text-4xl">Resident Gate</h3>
      <div className="flex flex-row mt-4">
        <span
          className={`rounded font-bold bg-${statusColor(
            "",
            data.data.residentGate.status
          )}-500 p-1 px-4`}
        >
          Gate: {data.data.residentGate.status}
        </span>
        <span
          className={`rounded font-bold bg-${statusColor(
            "",
            data.data.residentGate.arm
          )}-500 p-1 px-4 mx-2`}
        >
          Arm: {data.data.residentGate.arm}
        </span>
      </div>
      <div className="flex flex-row gap-10 text-center">
        <div>
          <h3 className="mt-5 font-bold text-1xl">
            Days since the last incident:
          </h3>
          <div
            className={`mt-3 rounded font-bold bg-${statusColor(
              data.data.residentGate.lastIncident,
              ""
            )}-700 p-12 text-6xl`}
          >
            {daysDiff(data.data.residentGate.lastIncident)}
          </div>
        </div>
      </div>
    </main>
  )
}
