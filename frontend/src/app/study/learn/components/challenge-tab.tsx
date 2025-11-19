"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Trophy, Users } from "lucide-react"

const challenges = [
  {
    id: 1,
    title: "Thách Đấu Hàng Ngày",
    description: "Hoàn thành 5 bài tập để nhận phần thưởng",
    reward: 50,
    participants: 1234,
    timeLeft: "18 giờ",
    status: "active",
  },
  {
    id: 2,
    title: "Thách Đấu Tuần",
    description: "Đạt điểm cao nhất trong tuần này",
    reward: 200,
    participants: 5678,
    timeLeft: "4 ngày",
    status: "active",
  },
  {
    id: 3,
    title: "Thách Đấu Tháng",
    description: "Trở thành người học hàng đầu của tháng",
    reward: 500,
    participants: 12345,
    timeLeft: "15 ngày",
    status: "active",
  },
  {
    id: 4,
    title: "Thách Đấu Đặc Biệt",
    description: "Hoàn thành tất cả bài học cấp độ cao",
    reward: 300,
    participants: 234,
    timeLeft: "Sắp tới",
    status: "coming",
  },
]

export default function ChallengeTab() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">Thách Đấu</h2>
        <p className="text-muted-foreground">Cạnh tranh với những người học khác và giành phần thưởng</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {challenges.map((challenge) => (
          <Card
            key={challenge.id}
            className={`overflow-hidden hover:shadow-lg transition-all ${
              challenge.status === "coming" ? "opacity-60" : ""
            }`}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <CardTitle className="text-lg">{challenge.title}</CardTitle>
                  <CardDescription className="mt-1">{challenge.description}</CardDescription>
                </div>
                <Trophy className="h-5 w-5 text-accent flex-shrink-0" />
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Users className="h-4 w-4" />
                  <span>{challenge.participants.toLocaleString()} người tham gia</span>
                </div>
                <Badge variant="outline">{challenge.timeLeft}</Badge>
              </div>

              <div className="flex items-center justify-between p-3 bg-accent/10 rounded-lg">
                <span className="text-sm font-semibold text-foreground">Phần Thưởng</span>
                <div className="flex items-center gap-1 text-accent font-bold">
                  <Trophy className="h-4 w-4" />
                  {challenge.reward}
                </div>
              </div>

              <Button
                className="w-full"
                disabled={challenge.status === "coming"}
                variant={challenge.status === "coming" ? "outline" : "default"}
              >
                {challenge.status === "coming" ? "Sắp Tới" : "Tham Gia Ngay"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
