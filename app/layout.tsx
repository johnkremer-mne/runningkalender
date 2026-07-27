import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://runningkalender.vercel.app/"),

title: {
  default: "Montenegro Running Calendar | Trail, Road & Ultra Races",
  template: "%s | Montenegro Running Calendar",
},

description:
  "The ultimate Montenegro Running Calendar. Discover trail races, road races, mountain runs, ultras and running events across Montenegro.",

robots: {
  index: true,
  follow: true,
},
  keywords: [
    "Montenegro Running Calendar",
    "Montenegro races",
    "Montenegro trail races",
    "Montenegro road races",
    "Montenegro ultra races",
    "Balkan Running Calendar",
    "trail running Montenegro",
    "running events Montenegro",
    "marathons Montenegro",
    "ultra marathon Montenegro",
    "Durmitor Trail Run",
    "Bjelasica Trail",
    "Durmitor Sky Race",
    "Boka Bay Trail",
    "Prokletije Trail",
    "Ostrog Half Marathon",
    "Podgorica Millennium Run",
    "One Run Montenegro",
    "Lovćen Trail Run",
    "Sinjavina Skyrace",
    "Berane Run",
    "Vučje Mountain Run",
    "Boka Marathon",
    "Last One Standing Montenegro",
    "Portonovi New Year's Run",
    "Kapetanov Trail",
    "Ultra-maraton Montenegro",
    "Riverside Run",
    "Fun Run Gorica",
    "Croatia Montenegro Trail Challenge",
    "Peaks of the Balkan",
  ],

  openGraph: {
    title: "Montenegro Running Calendar",
    description:
      "Find every race in Montenegro: trail, road, ultra and mountain running.",
    url: "https://runningkalender.vercel.app/",
    siteName: "Montenegro Running Calendar",
    locale: "en_US",
    type: "website",
  },

  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}

        {/* Google Analytics 4 */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-SH2NS5HZ2K"
        />

        <Script id="ga4-init">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-SH2NS5HZ2K');
          `}
        </Script>
      </body>
    </html>
  );
}