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
  name: "Lovćen Trail Run",
  date: "2026-05-30",
  location: "Cetinje",
  type: "trail",
  link: "https://cetinjetravel.wixstudio.com/website-24/blank-4-1-2-1"
},
{
  name: "BU2 Island Mini Trail",
  date: "2026-04-19",
  location: "Budva",
  type: "trail",
  link: "https://budva3.me/bu2-island-mini-trail-2026/"
}
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
    },

    // 🆕 NEW RACES
    {
      name: "Podgorica Millennium Run",
      date: "2026-10-04",
      location: "Podgorica",
      type: "road"
    },
    {
      name: "Lovćen Trail",
      date: "2026-11-15",
      location: "Cetinje",
      type: "trail"
    }
  ]

  const today = new Date()

  const filtered = races
    .filter(r =>
      r.name.toLowerCase().includes(search.toLowerCase())
    )
    .filter(r => filter === "all" || r.type === filter)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

  const upcoming = filtered.filter(r => new Date(r.date) >= today)
  const past = filtered.filter(r => new Date(r.date) < today)

  const groupByMonth = (list: Race[]) => {
    const grouped: Record<string, Race[]> = {}

    list.forEach(r => {
      const month = new Date(r.date).toLocaleString("en-GB", {
        month: "long",
        year: "numeric"
      })

      if (!grouped[month]) grouped[month] = []
      grouped[month].push(r)
    })

    return grouped
  }

  const upcomingGrouped = groupByMonth(upcoming)
  const pastGrouped = groupByMonth(past)

  const badgeColor = (type: string) => {
    if (type === "road") return "#2563eb"
    if (type === "trail") return "#16a34a"
    if (type === "ultra") return "#dc2626"
    return "#999"
  }

  const renderSection = (title: string, data: Record<string, Race[]>) => (
    <div style={{ marginBottom: 40 }}>
      <h2 style={{ fontSize: 22, marginBottom: 10 }}>{title}</h2>

      {Object.entries(data).map(([month, races]) => (
        <div key={month} style={{ marginBottom: 20 }}>
          <h3 style={{ color: "#555", marginBottom: 8 }}>{month}</h3>

          <div style={{ display: "grid", gap: 12 }}>
            {races.map((race, i) => (
              <a
                key={i}
                href={race.link || "#"}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <div
                  style={{
                    background: "white",
                    padding: 16,
                    borderRadius: 12,
                    border: "1px solid #eee"
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <strong>{race.name}</strong>
                    <span
                      style={{
                        fontSize: 12,
                        padding: "4px 8px",
                        borderRadius: 999,
                        background: badgeColor(race.type),
                        color: "white"
                      }}
                    >
                      {race.type}
                    </span>
                  </div>

                  <div style={{ color: "#666", marginTop: 6 }}>
                    📍 {race.location}
                  </div>

                  <div style={{ marginTop: 4 }}>
                    📅{" "}
                    {new Date(race.date).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric"
                    })}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      ))}
    </div>
  )

  return (
    <div style={{ background: "#f4f5f7", minHeight: "100vh", padding: 20 }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <h1>🏃 Balkan Running Calendar</h1>

        <div style={{ margin: "20px 0", display: "flex", gap: 10 }}>
          <input
            placeholder="Search races..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ flex: 1, padding: 10 }}
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

        {renderSection("🔥 Upcoming Races", upcomingGrouped)}

        {past.length > 0 && renderSection("📦 Past Races", pastGrouped)}
      </div>
    </div>
  )
}