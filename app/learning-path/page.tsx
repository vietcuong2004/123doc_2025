"use client"

import type React from "react"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { BookOpen, Calendar, CheckCircle, Clock, GraduationCap, LayoutGrid, LayoutList, Route } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface LearningGoalFormData {
  subject: string
  goal: string
  duration: string
  frequency: string
  level: string
}

export default function LearningPathPage() {
  const [formData, setFormData] = useState<LearningGoalFormData>({
    subject: "",
    goal: "",
    duration: "",
    frequency: "",
    level: "",
  })
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatingProgress, setGeneratingProgress] = useState(0)
  const [learningPath, setLearningPath] = useState<any | null>(null)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const handleInputChange = (field: keyof LearningGoalFormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    setIsGenerating(true)
    setGeneratingProgress(0)
    setLearningPath(null)

    // Simulate API call with progress
    const interval = setInterval(() => {
      setGeneratingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsGenerating(false)

          // Generate mock learning path based on form data
          const mockLearningPath = generateMockLearningPath(formData)
          setLearningPath(mockLearningPath)

          return 100
        }
        return prev + 5
      })
    }, 100)
  }

  const generateMockLearningPath = (data: LearningGoalFormData) => {
    // Mock learning path generation based on form data
    if (data.subject === "ielts") {
      return {
        title: "Lộ trình luyện thi IELTS 7.0+",
        description:
          "Lộ trình này được thiết kế để giúp bạn đạt được mục tiêu IELTS 7.0 hoặc cao hơn trong vòng 3 tháng.",
        duration: "3 tháng",
        totalWeeks: 12,
        currentWeek: 1,
        progress: 8,
        weeks: [
          {
            id: 1,
            title: "Tuần 1: Làm quen và đánh giá năng lực",
            description: "Làm bài test đánh giá năng lực, làm quen với cấu trúc bài thi IELTS",
            isCompleted: true,
            tasks: [
              { id: 1, title: "Làm bài test đánh giá năng lực ban đầu", isCompleted: true },
              { id: 2, title: "Tìm hiểu cấu trúc bài thi IELTS", isCompleted: true },
              { id: 3, title: "Xây dựng kế hoạch học tập cá nhân", isCompleted: true },
            ],
            resources: [
              {
                id: 1,
                title: "IELTS Cambridge Practice Test 1-17",
                price: 120000,
                image: "/placeholder.svg?height=100&width=150",
              },
              {
                id: 2,
                title: "Sách IELTS Trainer - Six Practice Tests",
                price: 85000,
                image: "/placeholder.svg?height=100&width=150",
              },
            ],
          },
          {
            id: 2,
            title: "Tuần 2: Phát triển kỹ năng Listening",
            description: "Tập trung vào kỹ năng nghe, làm quen với các dạng câu hỏi và chiến lược làm bài",
            isCompleted: false,
            tasks: [
              { id: 4, title: "Luyện nghe với các bài nghe IELTS thực tế", isCompleted: false },
              { id: 5, title: "Học từ vựng chủ đề thông dụng trong bài thi Listening", isCompleted: false },
              { id: 6, title: "Thực hành các dạng câu hỏi Listening", isCompleted: false },
            ],
            resources: [
              {
                id: 3,
                title: "IELTS Listening Recent Actual Tests 2023",
                price: 95000,
                image: "/placeholder.svg?height=100&width=150",
              },
              {
                id: 4,
                title: "Từ vựng IELTS theo chủ đề - Listening",
                price: 65000,
                image: "/placeholder.svg?height=100&width=150",
              },
            ],
          },
          {
            id: 3,
            title: "Tuần 3: Phát triển kỹ năng Reading",
            description: "Tập trung vào kỹ năng đọc, chiến lược làm bài và quản lý thời gian",
            isCompleted: false,
            tasks: [
              { id: 7, title: "Luyện đọc với các bài đọc IELTS thực tế", isCompleted: false },
              { id: 8, title: "Học từ vựng học thuật cho Reading", isCompleted: false },
              { id: 9, title: "Thực hành các dạng câu hỏi Reading", isCompleted: false },
            ],
            resources: [
              {
                id: 5,
                title: "IELTS Reading Recent Actual Tests 2023",
                price: 90000,
                image: "/placeholder.svg?height=100&width=150",
              },
              {
                id: 6,
                title: "Chiến lược làm bài Reading đạt điểm cao",
                price: 75000,
                image: "/placeholder.svg?height=100&width=150",
              },
            ],
          },
        ],
      }
    } else if (data.subject === "programming") {
      return {
        title: "Lộ trình học lập trình Python từ cơ bản đến nâng cao",
        description:
          "Lộ trình này giúp bạn học lập trình Python từ người mới bắt đầu đến mức có thể làm dự án thực tế.",
        duration: "4 tháng",
        totalWeeks: 16,
        currentWeek: 1,
        progress: 6,
        weeks: [
          {
            id: 1,
            title: "Tuần 1: Làm quen với Python",
            description: "Cài đặt môi trường, học cú pháp cơ bản và các kiểu dữ liệu",
            isCompleted: true,
            tasks: [
              { id: 1, title: "Cài đặt Python và môi trường phát triển", isCompleted: true },
              { id: 2, title: "Học cú pháp cơ bản: biến, điều kiện, vòng lặp", isCompleted: true },
              { id: 3, title: "Làm bài tập thực hành", isCompleted: true },
            ],
            resources: [
              {
                id: 1,
                title: "Python cơ bản cho người mới bắt đầu",
                price: 150000,
                image: "/placeholder.svg?height=100&width=150",
              },
              {
                id: 2,
                title: "Bài tập Python cơ bản có lời giải",
                price: 85000,
                image: "/placeholder.svg?height=100&width=150",
              },
            ],
          },
          {
            id: 2,
            title: "Tuần 2: Cấu trúc dữ liệu trong Python",
            description: "Học về list, tuple, dictionary, set và các thao tác với chúng",
            isCompleted: false,
            tasks: [
              { id: 4, title: "Học về List và các thao tác", isCompleted: false },
              { id: 5, title: "Học về Dictionary và Set", isCompleted: false },
              { id: 6, title: "Làm bài tập thực hành", isCompleted: false },
            ],
            resources: [
              {
                id: 3,
                title: "Cấu trúc dữ liệu và giải thuật với Python",
                price: 180000,
                image: "/placeholder.svg?height=100&width=150",
              },
              {
                id: 4,
                title: "300 bài tập Python - Từ cơ bản đến nâng cao",
                price: 120000,
                image: "/placeholder.svg?height=100&width=150",
              },
            ],
          },
          {
            id: 3,
            title: "Tuần 3: Hàm và module trong Python",
            description: "Học cách tạo và sử dụng hàm, module và package",
            isCompleted: false,
            tasks: [
              { id: 7, title: "Học về hàm và tham số", isCompleted: false },
              { id: 8, title: "Tìm hiểu về module và package", isCompleted: false },
              { id: 9, title: "Thực hành tạo module riêng", isCompleted: false },
            ],
            resources: [
              {
                id: 5,
                title: "Python nâng cao - OOP và Module",
                price: 200000,
                image: "/placeholder.svg?height=100&width=150",
              },
              {
                id: 6,
                title: "Lập trình hướng đối tượng với Python",
                price: 175000,
                image: "/placeholder.svg?height=100&width=150",
              },
            ],
          },
        ],
      }
    } else {
      return {
        title: `Lộ trình học ${data.subject || "môn học"}`,
        description: `Lộ trình này được thiết kế để giúp bạn đạt được mục tiêu ${data.goal || "học tập"} trong vòng ${data.duration || "3 tháng"}.`,
        duration: data.duration || "3 tháng",
        totalWeeks: 12,
        currentWeek: 1,
        progress: 8,
        weeks: [
          {
            id: 1,
            title: "Tuần 1: Làm quen với môn học",
            description: "Tìm hiểu tổng quan và đánh giá năng lực ban đầu",
            isCompleted: true,
            tasks: [
              { id: 1, title: "Làm bài test đánh giá năng lực ban đầu", isCompleted: true },
              { id: 2, title: "Tìm hiểu tổng quan về môn học", isCompleted: true },
              { id: 3, title: "Xây dựng kế hoạch học tập cá nhân", isCompleted: true },
            ],
            resources: [
              {
                id: 1,
                title: "Giáo trình tổng quan môn học",
                price: 100000,
                image: "/placeholder.svg?height=100&width=150",
              },
              {
                id: 2,
                title: "Bài tập cơ bản có lời giải",
                price: 75000,
                image: "/placeholder.svg?height=100&width=150",
              },
            ],
          },
          {
            id: 2,
            title: "Tuần 2: Học các khái niệm cơ bản",
            description: "Tập trung vào các khái niệm nền tảng của môn học",
            isCompleted: false,
            tasks: [
              { id: 4, title: "Học lý thuyết cơ bản phần 1", isCompleted: false },
              { id: 5, title: "Làm bài tập thực hành", isCompleted: false },
              { id: 6, title: "Ôn tập và củng cố kiến thức", isCompleted: false },
            ],
            resources: [
              { id: 3, title: "Sách bài tập chuyên đề", price: 85000, image: "/placeholder.svg?height=100&width=150" },
              {
                id: 4,
                title: "Video bài giảng chuyên sâu",
                price: 120000,
                image: "/placeholder.svg?height=100&width=150",
              },
            ],
          },
          {
            id: 3,
            title: "Tuần 3: Nâng cao kiến thức",
            description: "Đi sâu vào các chủ đề nâng cao của môn học",
            isCompleted: false,
            tasks: [
              { id: 7, title: "Học lý thuyết nâng cao", isCompleted: false },
              { id: 8, title: "Làm bài tập thực hành nâng cao", isCompleted: false },
              { id: 9, title: "Thực hiện bài tập lớn", isCompleted: false },
            ],
            resources: [
              { id: 5, title: "Giáo trình nâng cao", price: 150000, image: "/placeholder.svg?height=100&width=150" },
              {
                id: 6,
                title: "Bộ đề thi mẫu có lời giải",
                price: 95000,
                image: "/placeholder.svg?height=100&width=150",
              },
            ],
          },
        ],
      }
    }
  }

  const toggleTaskCompletion = (weekId: number, taskId: number) => {
    if (!learningPath) return

    setLearningPath((prev: any) => {
      const updatedWeeks = prev.weeks.map((week: any) => {
        if (week.id === weekId) {
          const updatedTasks = week.tasks.map((task: any) => {
            if (task.id === taskId) {
              return { ...task, isCompleted: !task.isCompleted }
            }
            return task
          })

          // Check if all tasks are completed
          const allTasksCompleted = updatedTasks.every((task: any) => task.isCompleted)

          return {
            ...week,
            tasks: updatedTasks,
            isCompleted: allTasksCompleted,
          }
        }
        return week
      })

      // Calculate new progress
      const totalTasks = updatedWeeks.reduce((acc: number, week: any) => acc + week.tasks.length, 0)
      const completedTasks = updatedWeeks.reduce((acc: number, week: any) => {
        return acc + week.tasks.filter((task: any) => task.isCompleted).length
      }, 0)

      const newProgress = Math.round((completedTasks / totalTasks) * 100)

      return {
        ...prev,
        weeks: updatedWeeks,
        progress: newProgress,
      }
    })
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl md:text-3xl font-bold">Xây dựng lộ trình học tập</h1>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <div className="flex items-start space-x-4">
              <div className="bg-green-100 p-3 rounded-full">
                <Route className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h2 className="text-lg font-medium mb-2">Lộ trình học tập cá nhân hóa</h2>
                <p className="text-gray-600">
                  Xây dựng lộ trình học tập được cá nhân hóa dựa trên mục tiêu, thời gian và trình độ của bạn. AI sẽ tạo
                  kế hoạch chi tiết theo tuần kèm tài liệu học tập phù hợp.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Tạo lộ trình học tập</CardTitle>
                  <CardDescription>Nhập thông tin để tạo lộ trình phù hợp</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="subject">Môn học/Kỹ năng</Label>
                      <Select
                        value={formData.subject}
                        onValueChange={(value) => handleInputChange("subject", value)}
                        required
                      >
                        <SelectTrigger id="subject">
                          <SelectValue placeholder="Chọn môn học hoặc kỹ năng" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ielts">Luyện thi IELTS</SelectItem>
                          <SelectItem value="toeic">Luyện thi TOEIC</SelectItem>
                          <SelectItem value="programming">Lập trình</SelectItem>
                          <SelectItem value="math">Toán học</SelectItem>
                          <SelectItem value="physics">Vật lý</SelectItem>
                          <SelectItem value="chemistry">Hóa học</SelectItem>
                          <SelectItem value="literature">Văn học</SelectItem>
                          <SelectItem value="history">Lịch sử</SelectItem>
                          <SelectItem value="geography">Địa lý</SelectItem>
                          <SelectItem value="english">Tiếng Anh</SelectItem>
                          <SelectItem value="other">Khác</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="goal">Mục tiêu học tập</Label>
                      <Input
                        id="goal"
                        placeholder="Ví dụ: Đạt IELTS 7.0, Học lập trình Python..."
                        value={formData.goal}
                        onChange={(e) => handleInputChange("goal", e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="duration">Thời gian hoàn thành</Label>
                      <Select
                        value={formData.duration}
                        onValueChange={(value) => handleInputChange("duration", value)}
                        required
                      >
                        <SelectTrigger id="duration">
                          <SelectValue placeholder="Chọn thời gian" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1-month">1 tháng</SelectItem>
                          <SelectItem value="2-months">2 tháng</SelectItem>
                          <SelectItem value="3-months">3 tháng</SelectItem>
                          <SelectItem value="6-months">6 tháng</SelectItem>
                          <SelectItem value="1-year">1 năm</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="frequency">Tần suất học</Label>
                      <Select
                        value={formData.frequency}
                        onValueChange={(value) => handleInputChange("frequency", value)}
                        required
                      >
                        <SelectTrigger id="frequency">
                          <SelectValue placeholder="Chọn tần suất học" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="daily">Hàng ngày</SelectItem>
                          <SelectItem value="3-times">3 lần/tuần</SelectItem>
                          <SelectItem value="2-times">2 lần/tuần</SelectItem>
                          <SelectItem value="weekends">Cuối tuần</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="level">Trình độ hiện tại</Label>
                      <Select
                        value={formData.level}
                        onValueChange={(value) => handleInputChange("level", value)}
                        required
                      >
                        <SelectTrigger id="level">
                          <SelectValue placeholder="Chọn trình độ" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="beginner">Người mới bắt đầu</SelectItem>
                          <SelectItem value="intermediate">Trung cấp</SelectItem>
                          <SelectItem value="advanced">Nâng cao</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {isGenerating && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Đang tạo lộ trình...</span>
                          <span>{generatingProgress}%</span>
                        </div>
                        <Progress value={generatingProgress} className="h-2" />
                      </div>
                    )}

                    <Button type="submit" className="w-full bg-green-500 hover:bg-green-600" disabled={isGenerating}>
                      {isGenerating ? "Đang xử lý..." : "Tạo lộ trình"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            <div className="md:col-span-2">
              {learningPath ? (
                <div className="space-y-6">
                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>{learningPath.title}</CardTitle>
                          <CardDescription>{learningPath.description}</CardDescription>
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className={viewMode === "grid" ? "bg-gray-100" : ""}
                            onClick={() => setViewMode("grid")}
                          >
                            <LayoutGrid className="h-4 w-4" />
                            <span className="sr-only">Grid view</span>
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            className={viewMode === "list" ? "bg-gray-100" : ""}
                            onClick={() => setViewMode("list")}
                          >
                            <LayoutList className="h-4 w-4" />
                            <span className="sr-only">List view</span>
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                            <span className="text-sm text-gray-500">{learningPath.duration}</span>
                          </div>
                          <div className="flex items-center">
                            <BookOpen className="h-4 w-4 mr-2 text-gray-500" />
                            <span className="text-sm text-gray-500">{learningPath.totalWeeks} tuần</span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-2 text-gray-500" />
                            <span className="text-sm text-gray-500">Tuần hiện tại: {learningPath.currentWeek}</span>
                          </div>
                        </div>
                        <Button className="bg-green-500 hover:bg-green-600">Lưu lộ trình</Button>
                      </div>

                      <div className="space-y-2 mb-6">
                        <div className="flex justify-between text-sm">
                          <span>Tiến độ</span>
                          <span>{learningPath.progress}%</span>
                        </div>
                        <Progress value={learningPath.progress} className="h-2" />
                      </div>

                      {viewMode === "grid" ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {learningPath.weeks.map((week: any) => (
                            <Card
                              key={week.id}
                              className={`overflow-hidden ${week.isCompleted ? "border-green-500" : ""}`}
                            >
                              <CardHeader className="pb-2">
                                <div className="flex justify-between items-start">
                                  <CardTitle className="text-base">{week.title}</CardTitle>
                                  {week.isCompleted && <CheckCircle className="h-5 w-5 text-green-500" />}
                                </div>
                                <CardDescription>{week.description}</CardDescription>
                              </CardHeader>
                              <CardContent className="pt-0">
                                <div className="space-y-2">
                                  {week.tasks.map((task: any) => (
                                    <div key={task.id} className="flex items-start space-x-2">
                                      <Checkbox
                                        id={`task-${week.id}-${task.id}`}
                                        checked={task.isCompleted}
                                        onCheckedChange={() => toggleTaskCompletion(week.id, task.id)}
                                      />
                                      <Label
                                        htmlFor={`task-${week.id}-${task.id}`}
                                        className={`text-sm ${task.isCompleted ? "line-through text-gray-500" : ""}`}
                                      >
                                        {task.title}
                                      </Label>
                                    </div>
                                  ))}
                                </div>

                                {week.resources && week.resources.length > 0 && (
                                  <div className="mt-4">
                                    <h4 className="text-sm font-medium mb-2">Tài liệu học tập:</h4>
                                    <div className="space-y-2">
                                      {week.resources.map((resource: any) => (
                                        <Link href={`/document/${resource.id}`} key={resource.id}>
                                          <div className="flex items-center bg-gray-50 rounded-lg p-2 hover:bg-gray-100 transition-colors">
                                            <div className="relative h-12 w-16 shrink-0">
                                              <Image
                                                src={resource.image || "/placeholder.svg"}
                                                alt={resource.title}
                                                fill
                                                className="object-cover rounded"
                                              />
                                            </div>
                                            <div className="ml-3 flex-1 min-w-0">
                                              <p className="text-xs font-medium line-clamp-2">{resource.title}</p>
                                              <p className="text-green-500 font-bold text-xs mt-1">
                                                {resource.price.toLocaleString("vi-VN")} VNĐ
                                              </p>
                                            </div>
                                          </div>
                                        </Link>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {learningPath.weeks.map((week: any) => (
                            <Card
                              key={week.id}
                              className={`overflow-hidden ${week.isCompleted ? "border-green-500" : ""}`}
                            >
                              <CardHeader className="pb-2">
                                <div className="flex justify-between items-start">
                                  <CardTitle className="text-base">{week.title}</CardTitle>
                                  {week.isCompleted && <CheckCircle className="h-5 w-5 text-green-500" />}
                                </div>
                                <CardDescription>{week.description}</CardDescription>
                              </CardHeader>
                              <CardContent className="pt-0">
                                <div className="space-y-2">
                                  {week.tasks.map((task: any) => (
                                    <div key={task.id} className="flex items-start space-x-2">
                                      <Checkbox
                                        id={`task-list-${week.id}-${task.id}`}
                                        checked={task.isCompleted}
                                        onCheckedChange={() => toggleTaskCompletion(week.id, task.id)}
                                      />
                                      <Label
                                        htmlFor={`task-list-${week.id}-${task.id}`}
                                        className={`text-sm ${task.isCompleted ? "line-through text-gray-500" : ""}`}
                                      >
                                        {task.title}
                                      </Label>
                                    </div>
                                  ))}
                                </div>

                                {week.resources && week.resources.length > 0 && (
                                  <div className="mt-4">
                                    <h4 className="text-sm font-medium mb-2">Tài liệu học tập:</h4>
                                    <div className="space-y-2">
                                      {week.resources.map((resource: any) => (
                                        <Link href={`/document/${resource.id}`} key={resource.id}>
                                          <div className="flex items-center bg-gray-50 rounded-lg p-2 hover:bg-gray-100 transition-colors">
                                            <div className="relative h-12 w-16 shrink-0">
                                              <Image
                                                src={resource.image || "/placeholder.svg"}
                                                alt={resource.title}
                                                fill
                                                className="object-cover rounded"
                                              />
                                            </div>
                                            <div className="ml-3 flex-1 min-w-0">
                                              <p className="text-xs font-medium line-clamp-2">{resource.title}</p>
                                              <p className="text-green-500 font-bold text-xs mt-1">
                                                {resource.price.toLocaleString("vi-VN")} VNĐ
                                              </p>
                                            </div>
                                          </div>
                                        </Link>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              ) : (
                <Card>
                  <CardContent className="p-8 text-center">
                    <GraduationCap className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">Chưa có lộ trình học tập</h3>
                    <p className="text-gray-500 mb-4">
                      Điền thông tin bên trái và nhấn "Tạo lộ trình" để AI tạo lộ trình học tập phù hợp với bạn.
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold mb-4">Lợi ích của lộ trình học tập cá nhân hóa</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <div className="bg-green-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-3">
                  <Route className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="font-medium">Học tập có hệ thống</h3>
                <p className="text-gray-600">
                  Lộ trình giúp bạn học tập một cách có hệ thống, từ cơ bản đến nâng cao, tránh bỏ sót kiến thức quan
                  trọng.
                </p>
              </div>
              <div className="space-y-2">
                <div className="bg-green-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-3">
                  <Clock className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="font-medium">Quản lý thời gian hiệu quả</h3>
                <p className="text-gray-600">
                  Phân bổ thời gian học tập hợp lý, giúp bạn duy trì động lực và không bị quá tải với khối lượng kiến
                  thức.
                </p>
              </div>
              <div className="space-y-2">
                <div className="bg-green-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-3">
                  <BookOpen className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="font-medium">Tài liệu phù hợp</h3>
                <p className="text-gray-600">
                  Gợi ý tài liệu học tập phù hợp với từng giai đoạn, giúp bạn tiếp cận kiến thức một cách hiệu quả nhất.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
