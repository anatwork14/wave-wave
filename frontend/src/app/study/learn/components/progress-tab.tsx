"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts"

const weeklyData = [
  { day: "Thứ 2", points: 120 },
  { day: "Thứ 3", points: 150 },
  { day: "Thứ 4", points: 100 },
  { day: "Thứ 5", points: 180 },
  { day: "Thứ 6", points: 200 },
  { day: "Thứ 7", points: 160 },
  { day: "Chủ Nhật", points: 140 },
]

const progressData = [
  { week: "Tuần 1", completed: 5 },
  { week: "Tuần 2", completed: 8 },
  { week: "Tuần 3", completed: 12 },
  { week: "Tuần 4", completed: 15 },
  { week: "Tuần 5", completed: 18 },
  { week: "Tuần 6", completed: 22 },
]

const stats = [
  { label: "Chuỗi Ngày Liên Tiếp", value: "7 ngày", color: "text-accent" },
  { label: "Tổng Điểm", value: "2,450", color: "text-primary" },
  { label: "Bài Học Hoàn Thành", value: "45", color: "text-green-500" },
  { label: "Cấp Độ Hiện Tại", value: "12", color: "text-blue-500" },
]

export default function ProgressTab() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">Tiến Độ Học Tập</h2>
        <p className="text-muted-foreground">Theo dõi sự phát triển của bạn</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-2">{stat.label}</p>
                <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Weekly Points Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Điểm Trong Tuần</CardTitle>
          <CardDescription>Điểm kiếm được mỗi ngày</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="points" fill="var(--color-primary)" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Progress Over Time */}
      <Card>
        <CardHeader>
          <CardTitle>Bài Học Hoàn Thành Theo Tuần</CardTitle>
          <CardDescription>Số bài học bạn đã hoàn thành</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={progressData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="completed"
                stroke="var(--color-accent)"
                strokeWidth={2}
                dot={{ fill: "var(--color-accent)", r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
