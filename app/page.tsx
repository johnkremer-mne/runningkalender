"use client"

import { useState } from "react"

export default function Home() {

  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState("all")

  const races = [
    {
      name: "Kapetanov Trail",
      date: "2026-01-17",
      location: "Montenegro",
      type: "trail"
    },
    {
      name: "Durmitor Winter Run",
      date: "2026-02-28",
      location: "Žabljak",
      type: "trail"
    },
    {
      name: "Ostrog Half Marathon",
      date: "2026-04-11",
      location: "Nikšić",
      type: "road",
      link: "https://ostroskipolumaraton.com/"
    },
    {
      name: "Boka Bay Trail",
      date: "2026-04-25",
      displayDate: "25–26 Apr 2026",
      location: "Kotor",
      type: "trail",
      link: "https://www.bokabaytrail.com"
    },
    {
      name: "Last One Standing",
      date: "2026-05-09",
      location: "Podgorica",
      type: "ultra",
      link: "https://lastonestanding.run/"
    },
    {
      name: "Plav Run",
      date: "2026-05-31",
      location: "Plav",
      type: "road"
    },
    {
      name: "Durmitor Skyrace",
      date: "2026-07-11",
      location: "Žabljak",
      type: "trail",
      link: "https://www.durmitortrail.run/"
    },
    {
      name: "Bjelasica Trail",
      date: "2026-08-08",
      location: "Kolašin",
      type: "trail",
      link: "https://bjelasicatrail.me"
    },
    {
      name: "Prokletije Trail 29K",
      date: "2026-09-19",
      displayDate: "19 Sep 2026",
      location: "Plav",
      type: "trail",
      link: "https://itra.run/Races/RaceDetails/Prokletije.Trail.BLUE.29K/2026/114423"
    }
  ]

  const filtered = races.filter(r =>
    r.name.toLowerCase().includes(search.toLowerCase()) &&
    (filter === "all" || r.type === filter)
  )

  const grouped: Record<string, any[]> = {}

  filtered.forEach(r => {
    const dateObj = new Date(r.date)

    // safety check (THIS fixes your issue)
    const validDate = !isNaN(dateObj.getTime())

    const month = validDate
      ? dateObj.toLocaleString("en-GB", { month: "long", year: "numeric" })
      : "Unknown"

    if (!grouped[month]) grouped[month] = []
    grouped[month].push(r)
  })

  return (
    <div style={{ padding: 30, fontFamily: "Arial", maxWidth: 900, margin: "auto" }}>
      
      <h1>🏃 Balkan Running Calendar</h1>

      {/* Controls */}
      <div style={{ marginBottom: 20 }}>
        <input
          placeholder="Search race..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ padding: 10, marginRight: 10 }}
        />

        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All</option>
          <option value="road">Road</option>
          <option value="trail">Trail</option>
          <option value="ultra">Ultra</option>
        </select>
      </div>

      {/* Monthly groups */}
      {Object.keys(grouped).map(month => (
        <div key={month} style={{ marginBottom: 30 }}>
          
          <h2 style={{ borderBottom: "2px solid #ddd", paddingBottom: 5 }}>
            {month}
          </h2>

          {grouped[month].map((race, index) => (
            <div key={index} style={{
              background: "white",
              padding: 15,
              margin: "10px 0",
              borderRadius: 10,
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
            }}>
              
              <strong>{race.name}</strong><br />
              {race.location}<br />

              {/* SAFE DATE DISPLAY */}
              {race.displayDate || new Date(race.date).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short",
                year: "numeric"
              })}<br />

              <span style={{ fontSize: 12 }}>{race.type}</span>

              {/* LINK */}
              {race.link && (
                <div style={{ marginTop: 8 }}>
                  <a
                    href={race.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "#0077cc" }}
                  >
                    👉 Official race website
                  </a>
                </div>
              )}

            </div>
          ))}

        </div>
      ))}
    </div>
  )
}