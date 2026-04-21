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
      discover:
        "Discover trail, road & ultra races across the Balkans",
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
      discover:
        "Otkrij trail, drumske i ultra trke na Balkanu",
    },
  }

  const races: Race[] = [
    {
      name: "Kapetanov Trail",
      date: "2026-01-17",
      location: "Montenegro",
      type: "trail",
      link: "https://live.3hercegnovi.me/event/CPT26/register",
    },
    {
      name: "Durmitor Winter Run",
      date: "2026-02-28",
      location: "Žabljak",
      type: "trail",
    },
    {
      name: "Ultra-maraton Montenegro 2026",
      date: "2026-03-29",
      displayDate: "29 March 2026",
      location: "Montenegro",
      type: "ultra",
      link: "https://live.3hercegnovi.me/event/PUM26/register",
    },
    {
      name: "Riverside Run",
      date: "2026-04-05",
      displayDate: "5 April 2026",
      location: "Danilovgrad",
      type: "road",
      link: "https://live.3hercegnovi.me/event/DG26/register",
    },
    {
      name: "Ostrog Half Marathon",
      date: "2026-04-11",
      location: "Nikšić",
      type: "road",
      link: "https://ostroskipolumaraton.com/",
    },
    {
      name: "BU2 Island Mini Trail",
      date: "2026-04-19",
      location: "Budva",
      type: "trail",
      link:
        "https://budva3.me/bu2-island-mini-trail-2026/",
    },
    {
      name: "Boka Bay Trail",
      date: "2026-04-25",
      displayDate: "25–26 Apr 2026",
      location: "Kotor",
      type: "trail",
      link: "https://www.bokabaytrail.com",
    },
    {
      name: "Last One Standing",
      date: "2026-05-09",
      location: "Podgorica",
      type: "ultra",
      link: "https://lastonestanding.run/",
    },
    {
      name: "Plav Run",
      date: "2026-05-30",
      displayDate: "30–31 May 2026",
      location: "Plav",
      type: "road",
      link: "https://plav.run/",
    },
    {
      name: "Lovćen Trail Run",
      date: "2026-05-30",
      displayDate: "30–31 May 2026",
      location: "Cetinje",
      type: "trail",
      link: "https://cetinjetravel.wixstudio.com/website-24/blank",
    },
    {
      name: "Durmitor Trail Run",
      date: "2026-07-10",
      displayDate: "10–12 Jul 2026",
      location: "Žabljak",
      type: "trail",
      link: "https://www.durmitortrail.run/",
    },
    {
      name: "Bjelasica Trail",
      date: "2026-08-08",
      location: "Kolašin",
      type: "trail",
      link: "https://bjelasicatrail.me",
    },
    {
      name: "Durmitor Sky Race",
      date: "2026-09-05",
      location: "Žabljak",
      type: "trail",
      link: "https://durmitorsky.run/",
    },
    {
      name: "Prokletije Trail 29K",
      date: "2026-09-19",
      location: "Plav",
      type: "trail",
      link:
        "https://itra.run/Races/RaceDetails/114422",
    },
    {
      name: "Podgorica Millennium Run",
      date: "2026-10-04",
      location: "Podgorica",
      type: "road",
      link: "https://www.podgorica.run/",
    },
  ]

  const today = new Date()

  const badgeColor = (type: string) => {
    if (type === "road") return "#2563eb"
    if (type === "trail") return "#16a34a"
    if (type === "ultra") return "#dc2626"
    return "#999"
  }

  const getCountdown = (date: string) => {
    const diff = new Date(date).getTime() - new Date().getTime()
    if (diff <= 0) return "Happening now / passed"

    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    if (days === 0) return "Today"
    if (days === 1) return "Tomorrow"
    return `In ${days} days`
  }

  const filtered = races
    .filter(r =>
      r.name.toLowerCase().includes(search.toLowerCase())
    )
    .filter(r => filter === "all" || r.type === filter)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

  const upcomingAll = filtered.filter(r => new Date(r.date) >= today)
  const nextRace = upcomingAll.length > 0 ? upcomingAll[0] : null
  const upcoming = nextRace ? upcomingAll.filter(r => r.date !== nextRace.date) : upcomingAll
  const past = filtered.filter(r => new Date(r.date) < today)

  const groupByMonth = (list: Race[]) => {
    const grouped: Record<string, Race[]> = {}

    list.forEach(r => {
      const month = new Date(r.date).toLocaleString("en-GB", {
        month: "long",
        year: "numeric",
      })

      if (!grouped[month]) grouped[month] = []
      grouped[month].push(r)
    })

    return grouped
  }

  const renderSection = (title: string, data: Record<string, Race[]>) => (
    <div style={{ marginBottom: 40 }}>
      <h2 style={{ fontSize: 22, textAlign: "center" }}>
        {title}
      </h2>

      {Object.entries(data).map(([month, races]) => (
        <div key={month} style={{ marginBottom: 20 }}>
          <h3 style={{ color: "#666", textAlign: "center" }}>
            {month}
          </h3>

          <div style={{ display: "grid", gap: 14 }}>
            {races.map((race, i) => (
              <a
                key={i}
                href={race.link || "#"}
                target="_blank"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <div
                  style={{
                    background: "white",
                    padding: 18,
                    borderRadius: 14,
                    border: "1px solid #eee",
                    textAlign: "center",
                  }}
                >
                  <strong>{race.name}</strong>
                  <div>📍 {race.location}</div>
                  <div>
                    📅{" "}
                    {race.displayDate ||
                      new Date(race.date).toLocaleDateString("en-GB")}
                  </div>
                  <div
                    style={{
                      marginTop: 8,
                      display: "inline-block",
                      padding: "4px 10px",
                      borderRadius: 999,
                      background: badgeColor(race.type),
                      color: "white",
                      fontSize: 12,
                    }}
                  >
                    {race.type}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      ))}
    </div>
  )

  const langPack = t[lang]

  return (
    <div style={{ background: "#f4f5f7", minHeight: "100vh", padding: 20 }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>

        <h1 style={{ fontSize: 42, textAlign: "center" }}>
          🏃 Balkan Running Calendar
        </h1>

        <p style={{ textAlign: "center", color: "#666" }}>
          {langPack.discover}
        </p>

        {nextRace && (
          <a href={nextRace.link || "#"} target="_blank">
            <div style={{
              background: "linear-gradient(135deg,#2563eb,#1e40af)",
              color: "white",
              padding: 20,
              borderRadius: 16,
              marginTop: 20,
              textAlign: "center"
            }}>
              <div>{langPack.next}</div>
              <h2>{nextRace.name}</h2>
              <div>📍 {nextRace.location}</div>
              <div>⏳ {getCountdown(nextRace.date)}</div>
              <div>
                📅 {nextRace.displayDate || new Date(nextRace.date).toLocaleDateString("en-GB")}
              </div>
            </div>
          </a>
        )}

        {renderSection(langPack.upcoming, groupByMonth(upcoming))}
        {renderSection(langPack.past, groupByMonth(past))}
      </div>
    </div>
  )
}