"use client"

import { useState } from "react"

type Race = {
  name: string
  date: string
  displayDate?: string
  location: string
  type: "road" | "trail" | "ultra"
  distance?: string
  link?: string
}

export default function Home() {
  const [search, setSearch] = useState("")
  const [filter, setFilter] =
    useState<"all" | "road" | "trail" | "ultra">("all")
  const [lang, setLang] = useState<"en" | "rs">("en")
  const [message, setMessage] = useState("")

  const handleSend = () => {
    const subject = encodeURIComponent("Balkan Running Calendar Inquiry")
    const body = encodeURIComponent(message)
    window.location.href = `mailto:johnkremer93@gmail.com?subject=${subject}&body=${body}`
  }

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
      discover: "Discover trail, road & ultra races across Montenegro",
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
      discover: "Otkrij trail, drumske i ultra trke na Balkanu",
    },
  }

  const races: Race[] = [
    { name: "Kapetanov Trail", date: "2026-01-17", location: "Montenegro", type: "trail", distance: "8k", link: "https://live.3hercegnovi.me/event/CPT26/register" },
    { name: "Durmitor Winter Run", date: "2026-02-28", location: "Žabljak", type: "trail", distance: "11K", link: "https://durmitorsky.run/course/winter-race" },
    { name: "Ultra-maraton Montenegro 2026", date: "2026-03-29", displayDate: "29 Mar 2026 (10:00)", location: "Montenegro", type: "ultra", distance: "3K / 5K / 10K / 21K / 50K", link: "https://live.3hercegnovi.me/event/PUM26/register" },
    { name: "Riverside Run", date: "2026-04-05", location: "Danilovgrad", type: "road", distance: "21k", link: "https://live.3hercegnovi.me/event/DG26/register" },
    { name: "Ostrog Half Marathon", date: "2026-04-11", location: "Nikšić", type: "road", distance: "21K", link: "https://ostroskipolumaraton.com/" },
    { name: "BU2 Island Mini Trail", date: "2026-04-19", location: "Budva", type: "trail", distance: "2.88k / 5.8k", link: "https://budva3.me/bu2-island-mini-trail-2026/" },
    { name: "Boka Bay Trail", date: "2026-04-25", displayDate: "25–26 Apr 2026", location: "Kotor", type: "trail", distance: "7K / 17K / 33K / 60K / 83K", link: "https://www.bokabaytrail.com" },
    { name: "Last One Standing", date: "2026-05-09", location: "Podgorica", type: "ultra", distance: "Backyard", link: "https://lastonestanding.run/" },
    { name: "Plav Run", date: "2026-05-30", displayDate: "30–31 May 2026", location: "Plav", type: "road", distance: "5K / 10K / 21K", link: "https://plav.run/" },
    { name: "Lovćen Trail Run", date: "2026-05-30", displayDate: "30–31 May 2026", location: "Cetinje", type: "trail", distance: "6K / 20K / 38K", link: "https://cetinjetravel.wixstudio.com/website-24/blank" },
    { name: "Durmitor Trail Run", date: "2026-07-10", displayDate: "10–12 Jul 2026", location: "Žabljak", type: "trail", distance: "21K / 42K / 64K", link: "https://www.durmitortrail.run/" },
    { name: "Bjelasica Trail", date: "2026-08-08", location: "Kolašin", type: "trail", distance: "12K / 23K / 45K / 60K", link: "https://bjelasicatrail.me" },
    { name: "Durmitor Sky Race", date: "2026-09-05", location: "Žabljak", type: "trail", distance: "16k / 33k", link: "https://durmitorsky.run/" },
    { name: "Prokletije Trail 29K", date: "2026-09-19", location: "Plav", type: "trail", distance: "29K", link: "https://itra.run/Races/RaceDetails/114422" },
    { name: "Podgorica Millennium Run", date: "2026-10-04", location: "Podgorica", type: "road", distance: "5K / 10K / 21K / 42K", link: "https://www.podgorica.run/" },
    { name: "Boka Marathon", date: "2026-12-12", displayDate: "12–13 Dec 2026", location: "Tivat–Kotor", type: "road", distance: "21K / 42K", link: "https://bokamarathon.com/" },
  ]

  const today = new Date()
  today.setHours(0,0,0,0)

  const badgeColor = (type: string) => {
    if (type === "road") return "#2563eb"
    if (type === "trail") return "#16a34a"
    if (type === "ultra") return "#dc2626"
    return "#999"
  }

  const getCountdown = (date: string) => {
    const today = new Date()
    const target = new Date(date)

    today.setHours(0, 0, 0, 0)
    target.setHours(0, 0, 0, 0)

    const diff = target.getTime() - today.getTime()
    const days = Math.round(diff / (1000 * 60 * 60 * 24))

    if (days < 0) return "Happening now / passed"
    if (days === 0) return "Today"
    if (days === 1) return "Tomorrow"
    return `In ${days} days`
  }

  const filtered = races
    .filter(r => r.name.toLowerCase().includes(search.toLowerCase()))
    .filter(r => filter === "all" || r.type === filter)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

  const upcomingAll = filtered.filter(r => {
    const d = new Date(r.date)
    d.setHours(0,0,0,0)
    return d >= today
  })

  const nextRace = upcomingAll.length > 0 ? upcomingAll[0] : null
  const upcoming = nextRace ? upcomingAll.filter(r => r.date !== nextRace.date) : upcomingAll

  const past = filtered.filter(r => {
    const d = new Date(r.date)
    d.setHours(0,0,0,0)
    return d < today
  })

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
    <div style={{ marginBottom: 50 }}>
      <h2 style={{ fontSize: 32, fontWeight: 700, textAlign: "center", marginBottom: 30 }}>
        {title}
      </h2>

      {Object.entries(data).map(([month, races]) => (
        <div key={month} style={{ marginBottom: 30 }}>
          <h3 style={{ textAlign: "center", color: "#666", marginBottom: 15 }}>
            {month}
          </h3>

          <div style={{ display: "grid", gap: 14 }}>
            {races.map((race, i) => (
              <a key={i} href={race.link || "#"} target="_blank" style={{ textDecoration: "none", color: "inherit" }}>
                <div
                  style={{
                    background: "white",
                    padding: 18,
                    borderRadius: 14,
                    border: "1px solid #eee",
                    cursor: "pointer",
                    textAlign: "center",
                    transition: "all 0.2s ease",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-4px)"
                    e.currentTarget.style.boxShadow = "0 10px 25px rgba(0,0,0,0.12)"
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)"
                    e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.04)"
                  }}
                >
                  <div style={{ fontWeight: 700 }}>{race.name}</div>
                  <div>📍 {race.location}</div>
                  <div>📅 {race.displayDate || new Date(race.date).toLocaleDateString("en-GB")}</div>
                  <div>📏 {race.distance || "TBA"}</div>

                  <div style={{
                    marginTop: 10,
                    display: "inline-block",
                    padding: "4px 10px",
                    borderRadius: 999,
                    background: badgeColor(race.type),
                    color: "white",
                    fontSize: 12,
                  }}>
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

        <div style={{ textAlign: "right" }}>
          <button onClick={() => setLang(lang === "en" ? "rs" : "en")}>
            {lang === "en" ? "SR" : "EN"}
          </button>
        </div>

        <h1 style={{ fontSize: 42, textAlign: "center" }}>
           Montenegro Running Calendar 🏃‍♂️
        </h1>

        <p style={{ textAlign: "center", color: "#666" }}>
          {langPack.discover}
        </p>

        {nextRace && (
          <a href={nextRace.link || "#"} target="_blank">
            <div style={{
              background: "linear-gradient(135deg,#ff4d4d,#ff7a00)",
              color: "white",
              padding: 20,
              borderRadius: 16,
              marginTop: 20,
              textAlign: "center"
            }}>
              <div>{langPack.next}</div>
              <h2>{nextRace.name}</h2>
              <div>📍 {nextRace.location}</div>
              <div>📅 {nextRace.displayDate || new Date(nextRace.date).toLocaleDateString("en-GB")}</div>
              <div>📏 {nextRace.distance || "TBA"}</div>
              <div>⏳ {getCountdown(nextRace.date)}</div>
              <div style={{
                marginTop: 10,
                display: "inline-block",
                padding: "4px 10px",
                borderRadius: 999,
                background: badgeColor(nextRace.type),
                fontSize: 12,
              }}>
                {nextRace.type}
              </div>
            </div>
          </a>
        )}

        <input
          placeholder={langPack.search}
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ width: "100%", padding: 10, marginTop: 20 }}
        />

        <div style={{ textAlign: "right", marginTop: 10 }}>
          <select value={filter} onChange={e => setFilter(e.target.value as any)}>
            <option value="all">{langPack.all}</option>
            <option value="road">{langPack.road}</option>
            <option value="trail">{langPack.trail}</option>
            <option value="ultra">{langPack.ultra}</option>
          </select>
        </div>

        {renderSection(langPack.upcoming, groupByMonth(upcoming))}
        {renderSection(langPack.past, groupByMonth(past))}

        <div style={{
          background: "white",
          padding: 20,
          borderRadius: 16,
          marginTop: 40,
          border: "1px solid #eee"
        }}>
          <h2 style={{ textAlign: "center" }}>💬 Add a race or advertise</h2>

          <textarea
            placeholder="Send your message here..."
            value={message}
            onChange={e => setMessage(e.target.value)}
            style={{
              width: "100%",
              minHeight: 120,
              padding: 10,
              marginTop: 10
            }}
          />

          <button
            onClick={handleSend}
            style={{
              marginTop: 10,
              width: "100%",
              padding: 12,
              background: "#111",
              color: "white",
              borderRadius: 10,
              cursor: "pointer"
            }}
          >
            Send Message
          </button>
        </div>

      </div>
    </div>
  )
}