"use client"

import { useState } from "react"

type Race = {
  name: string
  date: string
  displayDate?: string
  location: string
  type: "road" | "trail" | "ultra"
  link?: string
}

export default function Home() {
  const [search, setSearch] = useState("")
  const [filter, setFilter] =
    useState<"all" | "road" | "trail" | "ultra">("all")
  const [lang, setLang] = useState<"en" | "rs">("en")

  const t = {
    en: {
      upcoming: "🔥 Upcoming Races",
      past: "📦 Past Races",
      search: "Search races...",
      all: "All",
      road: "Road",
      trail: "Trail",
      ultra: "Ultra",
      next: "🔥 Next Race",
      discover: "Discover trail, road & ultra races across the Balkans"
    },
    rs: {
      upcoming: "🔥 Predstojeće trke",
      past: "📦 Prošle trke",
      search: "Pretraži trke...",
      all: "Sve",
      road: "Cesta",
      trail: "Trail",
      ultra: "Ultra",
      next: "🔥 Sledeća trka",
      discover: "Otkrij trail, drumske i ultra trke na Balkanu"
    }
  }

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
      name: "BU2 Island Mini Trail",
      date: "2026-04-19",
      location: "Budva",
      type: "trail",
      link: "https://budva3.me/bu2-island-mini-trail-2026/"
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
    }
  ]

  const today = new Date()

  const badgeColor = (type: string) => {
    if (type === "road") return "#2563eb"
    if (type === "trail") return "#16a34a"
    if (type === "ultra") return "#dc2626"
    return "#999"
  }

  const getCountdown = (date: string) => {
    const diff = new Date(date).getTime() - Date.now()
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    if (days < 0) return "Passed"
    if (days === 0) return "Today"
    if (days === 1) return "Tomorrow"
    return `In ${days} days`
  }

  const filtered = races
    .filter(r => r.name.toLowerCase().includes(search.toLowerCase()))
    .filter(r => filter === "all" || r.type === filter)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

  const upcomingAll = filtered.filter(r => new Date(r.date) >= today)
  const nextRace = upcomingAll[0]

  const upcoming = upcomingAll.filter(r => r !== nextRace)
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

  const langPack = t[lang]

  return (
    <div style={{ background: "#f4f5f7", minHeight: "100vh", padding: 20 }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>

        {/* LANGUAGE */}
        <div style={{ textAlign: "right" }}>
          <button onClick={() => setLang(lang === "en" ? "rs" : "en")}>
            {lang === "en" ? "SR" : "EN"}
          </button>
        </div>

        {/* HEADER */}
        <h1 style={{ fontSize: 42, fontWeight: 800 }}>
          🏃 Balkan Running Calendar
        </h1>

        <p>{langPack.discover}</p>

        {/* FEATURED */}
        {nextRace && (
          <a href={nextRace.link || "#"} target="_blank">
            <div style={{
              background: "linear-gradient(135deg,#2563eb,#1e40af)",
              color: "white",
              padding: 20,
              borderRadius: 16,
              marginTop: 20
            }}>
              <div>{langPack.next}</div>
              <h2>{nextRace.name}</h2>
              <div>📍 {nextRace.location}</div>
              <div>📅 {getCountdown(nextRace.date)}</div>

              <div style={{
                marginTop: 10,
                display: "inline-block",
                padding: "4px 10px",
                borderRadius: 999,
                background: badgeColor(nextRace.type)
              }}>
                {nextRace.type}
              </div>
            </div>
          </a>
        )}

        {/* SEARCH */}
        <input
          placeholder={langPack.search}
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ width: "100%", padding: 10, marginTop: 20 }}
        />

        {/* FILTER */}
        <select
          value={filter}
          onChange={e => setFilter(e.target.value as any)}
        >
          <option value="all">{langPack.all}</option>
          <option value="road">{langPack.road}</option>
          <option value="trail">{langPack.trail}</option>
          <option value="ultra">{langPack.ultra}</option>
        </select>

        {/* UPCOMING */}
        <h2 style={{ marginTop: 30 }}>{langPack.upcoming}</h2>

        {Object.entries(groupByMonth(upcoming)).map(([month, races]) => (
          <div key={month}>
            <h3>{month}</h3>

            {races.map((r, i) => (
              <a key={i} href={r.link || "#"} target="_blank">
                <div style={{
                  background: "white",
                  padding: 15,
                  margin: "10px 0",
                  borderRadius: 12,
                  border: "1px solid #eee"
                }}>
                  <strong>{r.name}</strong>
                  <div>📍 {r.location}</div>
                  <div>📅 {getCountdown(r.date)}</div>
                  <span style={{
                    background: badgeColor(r.type),
                    color: "white",
                    padding: "3px 8px",
                    borderRadius: 999,
                    fontSize: 12
                  }}>
                    {r.type}
                  </span>
                </div>
              </a>
            ))}
          </div>
        ))}

        {/* PAST */}
        <h2 style={{ marginTop: 40 }}>{langPack.past}</h2>
        {Object.entries(groupByMonth(past)).map(([month, races]) => (
          <div key={month}>
            <h3>{month}</h3>
            {races.map((r, i) => (
              <div key={i} style={{ padding: 10, opacity: 0.6 }}>
                {r.name}
              </div>
            ))}
          </div>
        ))}

      </div>
    </div>
  )
}