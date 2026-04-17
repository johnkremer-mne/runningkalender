"use client"

import { useState } from "react"

type Race = {
  name: string
  date: string
  location: string
  type: "road" | "trail" | "ultra"
  link?: string
}

export default function Home() {
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState<"all" | "road" | "trail" | "ultra">("all")

  const races: Race[] = [
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
      location: "Plav",
      type: "trail",
      link:
        "https://itra.run/Races/RaceDetails/Prokletije.Trail.BLUE.29K/2026/114423"
    }
  ]

  // FILTER
  const filtered = races
    .filter((r) =>
      r.name.toLowerCase().includes(search.toLowerCase())
    )
    .filter((r) => filter === "all" || r.type === filter)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

  // GROUP BY MONTH
  const grouped: Record<string, Race[]> = {}

  filtered.forEach((r) => {
    const date = new Date(r.date)

    const month = date.toLocaleString("en-GB", {
      month: "long",
      year: "numeric"
    })

    if (!grouped[month]) grouped[month] = []
    grouped[month].push(r)
  })

  return (
    <div
      style={{
        padding: 30,
        fontFamily: "Arial",
        maxWidth: 900,
        margin: "auto"
      }}
    >
      <h1>🏃 Balkan Running Calendar</h1>

      {/* CONTROLS */}
      <div style={{ marginBottom: 20 }}>
        <input
          placeholder="Search race..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ padding: 10, marginRight: 10 }}
        />

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value as any)}
        >
          <option value="all">All</option>
          <option value="road">Road</option>
          <option value="trail">Trail</option>
          <option value="ultra">Ultra</option>
        </select>
      </div>

      {/* LIST */}
      {Object.entries(grouped).map(([month, races]) => (
        <div key={month} style={{ marginBottom: 30 }}>
          <h2 style={{ borderBottom: "2px solid #ddd", paddingBottom: 5 }}>
            {month}
          </h2>

          {races.map((race, i) => (
            <div
              key={i}
              style={{
                background: "white",
                padding: 15,
                margin: "10px 0",
                borderRadius: 10,
                boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
              }}
            >
              <strong>{race.name}</strong>
              <br />
              {race.location}
              <br />

              {new Date(race.date).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short",
                year: "numeric"
              })}

              <br />

              <span style={{ fontSize: 12 }}>{race.type}</span>

              <div style={{ marginTop: 8 }}>
                {race.link ? (
                  <a
                    href={race.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "#0077cc" }}
                  >
                    👉 Official race website
                  </a>
                ) : (
                  <span style={{ color: "#999" }}>
                    No official link
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}