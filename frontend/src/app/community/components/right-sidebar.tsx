"use client"

import { TrendingUp, Users } from "lucide-react"
import { Card } from "@/components/ui/card"

export function RightSidebar() {
  const trendingTopics = [
    { tag: "#WebDevelopment", posts: 2543 },
    { tag: "#AI", posts: 1892 },
    { tag: "#Design", posts: 1456 },
    { tag: "#Productivity", posts: 987 },
  ]

  const suggestedUsers = [
    { name: "Alex Rivera", handle: "@alexrivera", followers: "12.5K" },
    { name: "Jordan Lee", handle: "@jordanlee", followers: "8.3K" },
    { name: "Casey Morgan", handle: "@caseymorgan", followers: "5.2K" },
  ]

  return (
    <aside className="w-72 border-l border-border bg-card p-6 overflow-y-auto hidden lg:block">
      {/* Trending */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp size={20} className="text-primary" />
          <h3 className="font-bold text-lg">Trending Now</h3>
        </div>
        <div className="space-y-3">
          {trendingTopics.map((topic, idx) => (
            <button key={idx} className="w-full text-left p-3 rounded-lg hover:bg-muted transition-colors">
              <p className="font-semibold text-foreground">{topic.tag}</p>
              <p className="text-xs text-muted-foreground">{topic.posts.toLocaleString()} posts</p>
            </button>
          ))}
        </div>
      </div>

      {/* Suggested Users */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Users size={20} className="text-primary" />
          <h3 className="font-bold text-lg">Suggested Users</h3>
        </div>
        <div className="space-y-3">
          {suggestedUsers.map((user, idx) => (
            <Card key={idx} className="p-3">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="font-semibold text-foreground text-sm">{user.name}</p>
                  <p className="text-xs text-muted-foreground">{user.handle}</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">{user.followers} followers</span>
                <button className="text-xs font-semibold text-primary hover:underline">Follow</button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </aside>
  )
}
