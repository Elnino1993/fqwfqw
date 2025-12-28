"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const links = [
  {
    title: "OnlyFans - Exclusive Content",
    url: "https://onlyfans.com/...",
    icon: "💎",
  },
  {
    title: "Instagram",
    url: "https://instagram.com/username",
    icon: "📸",
  },
  {
    title: "Telegram",
    url: "https://t.me/username",
    icon: "✈️",
  },
]

export default function LandingPage() {
  const [isTelegramBrowser, setIsTelegramBrowser] = useState(false)
  const [copied, setCopied] = useState(false)

  // Ссылка, которую нужно открыть во внешнем браузере
  const targetUrl = "https://example.com"

  useEffect(() => {
    // Проверка, открыт ли сайт во встроенном браузере Telegram
    const userAgent = navigator.userAgent || navigator.vendor
    setIsTelegramBrowser(userAgent.includes("Telegram"))
  }, [])

  const openInExternalBrowser = (url: string) => {
    if (typeof window !== "undefined") {
      if (window.Telegram?.WebApp) {
        window.Telegram.WebApp.openLink(url)
      } else {
        const link = document.createElement("a")
        link.href = url
        link.target = "_blank"
        link.rel = "noopener noreferrer"
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      }
    }
  }

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(targetUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }

  return (
    <main className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-2xl mx-auto py-8">
        <div className="flex flex-col items-center mb-6">
          <Avatar className="h-24 w-24 mb-4">
            <AvatarImage src="/abstract-profile.png" alt="Profile" />
            <AvatarFallback>АВ</AvatarFallback>
          </Avatar>

          <h1 className="text-2xl font-bold mb-2 text-center">@username</h1>
          <p className="text-muted-foreground text-center max-w-md mb-2">
            Добро пожаловать! Все мои ссылки в одном месте
          </p>

          {isTelegramBrowser && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-accent/10 text-accent rounded-full text-xs font-medium mt-2">
              ✈️ Telegram браузер обнаружен
            </div>
          )}
        </div>

        <div className="space-y-3 px-4">
          {links.map((link, index) => (
            <Button
              key={index}
              onClick={() => openInExternalBrowser(link.url)}
              variant="outline"
              className="w-full h-auto py-4 px-6 text-base font-medium hover:scale-[1.02] transition-transform duration-200 bg-card hover:bg-accent/5"
            >
              <span className="mr-3 text-xl">{link.icon}</span>
              <span className="flex-1 text-center">{link.title}</span>
              <ExternalLink className="h-4 w-4 ml-3 opacity-50" />
            </Button>
          ))}
        </div>

        {isTelegramBrowser && (
          <p className="text-xs text-muted-foreground text-center mt-8 px-4">
            Ссылки откроются во внешнем браузере для лучшего опыта
          </p>
        )}
      </div>
    </main>
  )
}
