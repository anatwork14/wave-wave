"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Trophy, Zap } from "lucide-react"

const achievements = [
  {
    id: 1,
    title: "Người Bắt Đầu",
    description: "Hoàn thành bài học đầu tiên",
    icon: "🎯",
    unlocked: true,
  },
  {
    id: 2,
    title: "Người Học Chăm Chỉ",
    description: "Duy trì chuỗi 7 ngày",
    icon: "🔥",
    unlocked: true,
  },
  {
    id: 3,
    title: "Thợ Thủ Công",
    description: "Hoàn thành 10 bài học",
    icon: "🛠️",
    unlocked: true,
  },
  {
    id: 4,
    title: "Bậc Thầy",
    description: "Hoàn thành 50 bài học",
    icon: "👑",
    unlocked: false,
  },
  {
    id: 5,
    title: "Chiến Binh Thách Đấu",
    description: "Thắng 10 thách đấu",
    icon: "⚔️",
    unlocked: false,
  },
  {
    id: 6,
    title: "Huyền Thoại",
    description: "Đạt cấp độ 50",
    icon: "⭐",
    unlocked: false,
  },
]

export default function ProfileTab() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">Hồ Sơ Của Tôi</h2>
        <p className="text-muted-foreground">Xem thông tin và thành tích của bạn</p>
      </div>

      {/* Profile Card */}
      <Card>
        <CardHeader>
          <CardTitle>Thông Tin Hồ Sơ</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="h-20 w-20 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="text-4xl">👤</span>
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-foreground">Người Học Kí Hiệu</h3>
              <p className="text-muted-foreground">Tham gia từ 3 tháng trước</p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="p-4 bg-primary/10 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="h-5 w-5 text-accent" />
                <span className="font-semibold text-foreground">Chuỗi Hiện Tại</span>
              </div>
              <p className="text-3xl font-bold text-accent">7 ngày</p>
            </div>
            <div className="p-4 bg-accent/10 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Trophy className="h-5 w-5 text-primary" />
                <span className="font-semibold text-foreground">Tổng Điểm</span>
              </div>
              <p className="text-3xl font-bold text-primary">2,450</p>
            </div>
          </div>

          <Button className="w-full">Chỉnh Sửa Hồ Sơ</Button>
        </CardContent>
      </Card>

      {/* Achievements */}
      <Card>
        <CardHeader>
          <CardTitle>Thành Tích</CardTitle>
          <CardDescription>Những huy hiệu bạn đã kiếm được</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className={`p-4 rounded-lg border-2 transition-all ${
                  achievement.unlocked ? "border-primary bg-primary/5" : "border-muted bg-muted/30 opacity-50"
                }`}
              >
                <div className="text-4xl mb-2">{achievement.icon}</div>
                <h4 className="font-semibold text-foreground mb-1">{achievement.title}</h4>
                <p className="text-sm text-muted-foreground">{achievement.description}</p>
                {achievement.unlocked && (
                  <Badge className="mt-3" variant="default">
                    Đã Mở Khóa
                  </Badge>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Cài Đặt</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button variant="outline" className="w-full justify-start bg-transparent">
            Thay Đổi Mật Khẩu
          </Button>
          <Button variant="outline" className="w-full justify-start bg-transparent">
            Thông Báo
          </Button>
          <Button variant="outline" className="w-full justify-start bg-transparent">
            Ngôn Ngữ
          </Button>
          <Button variant="destructive" className="w-full justify-start">
            Đăng Xuất
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
