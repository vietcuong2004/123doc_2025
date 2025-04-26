"use client"

import { useState, useEffect } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, ThumbsUp, ThumbsDown, Sparkles } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function RecommendationsPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [recommendations, setRecommendations] = useState<any[]>([])

  useEffect(() => {
    // Simulate API call to get personalized recommendations
    const fetchRecommendations = async () => {
      setIsLoading(true)
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Mock data
      const mockRecommendations = [
        {
          id: 1,
          title: "Tuyển chọn những bài luận văn phát triển sản phẩm du lịch mang tính thực tiễn cao",
          category: "Luận văn & Báo cáo",
          subject: "Du lịch",
          price: 50000,
          rating: 4.5,
          image: "/placeholder.svg?height=200&width=300",
          reason: "Dựa trên lịch sử tìm kiếm của bạn về ngành du lịch",
        },
        {
          id: 2,
          title: "Hướng dẫn làm đồ án hệ thống cung cấp điện cho xưởng cơ khí MỚI NHẤT 2020",
          category: "Đồ án & Nghiên cứu",
          subject: "Kỹ thuật điện",
          price: 45000,
          rating: 4.2,
          image: "/placeholder.svg?height=200&width=300",
          reason: "Phù hợp với chuyên ngành kỹ thuật của bạn",
        },
        {
          id: 3,
          title: "Top 10 tài liệu trắc nghiệm được lý có đáp án - Top Báo Cáo Thực Tập Tốt Nhất",
          category: "Đề thi & Kiểm tra",
          subject: "Vật lý",
          price: 60000,
          rating: 4.8,
          image: "/placeholder.svg?height=200&width=300",
          reason: "Người dùng xem tài liệu vật lý cũng thích tài liệu này",
        },
        {
          id: 4,
          title: "Tổng hợp 10 tài liệu về thực tập động cơ hay nhất - Top Báo Cáo Thực Tập Tốt Nhất",
          category: "Báo cáo thực tập",
          subject: "Kỹ thuật cơ khí",
          price: 35000,
          rating: 4.0,
          image: "/placeholder.svg?height=200&width=300",
          reason: "Dựa trên tài liệu bạn đã xem gần đây",
        },
        {
          id: 5,
          title: "10 Mẫu lý do chọn đề tài nghiên cứu - Hướng dẫn cách viết lý do chọn đề tài",
          category: "Hướng dẫn",
          subject: "Phương pháp nghiên cứu",
          price: 55000,
          rating: 4.6,
          image: "/placeholder.svg?height=200&width=300",
          reason: "Xu hướng phổ biến trong tháng này",
        },
        {
          id: 6,
          title: "Đề cương ôn tập môn Kinh tế vĩ mô - Đại học Kinh tế Quốc dân",
          category: "Đề cương",
          subject: "Kinh tế",
          price: 40000,
          rating: 4.3,
          image: "/placeholder.svg?height=200&width=300",
          reason: "Người dùng có cùng ngành học với bạn thường xem tài liệu này",
        },
      ]

      setRecommendations(mockRecommendations)
      setIsLoading(false)
    }

    fetchRecommendations()
  }, [])

  const handleFeedback = (id: number, isPositive: boolean) => {
    // In a real app, this would send feedback to the recommendation system
    console.log(`Feedback for document ${id}: ${isPositive ? "positive" : "negative"}`)

    // Remove the item from recommendations if feedback is negative
    if (!isPositive) {
      setRecommendations((prev) => prev.filter((item) => item.id !== id))
    }
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl md:text-3xl font-bold">Đề xuất tài liệu cá nhân hóa</h1>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex items-start space-x-4">
            <div className="bg-green-100 p-3 rounded-full">
              <Sparkles className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h2 className="text-lg font-medium mb-2">Đề xuất thông minh dành riêng cho bạn</h2>
              <p className="text-gray-600">
                Hệ thống AI của chúng tôi phân tích hành vi và sở thích học tập của bạn để đề xuất những tài liệu phù
                hợp nhất. Càng tương tác nhiều với nền tảng, đề xuất càng chính xác hơn.
              </p>
            </div>
          </div>
        </div>

        <Tabs defaultValue="all">
          <TabsList className="mb-6">
            <TabsTrigger value="all">Tất cả đề xuất</TabsTrigger>
            <TabsTrigger value="subject">Theo môn học</TabsTrigger>
            <TabsTrigger value="trending">Xu hướng</TabsTrigger>
            <TabsTrigger value="similar">Tương tự đã xem</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-6">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, index) => (
                  <Card key={index} className="overflow-hidden">
                    <CardContent className="p-0">
                      <div className="h-40 bg-gray-200 animate-pulse" />
                      <div className="p-4 space-y-3">
                        <div className="h-6 bg-gray-200 animate-pulse rounded w-3/4" />
                        <div className="h-4 bg-gray-200 animate-pulse rounded w-1/2" />
                        <div className="h-4 bg-gray-200 animate-pulse rounded w-full" />
                        <div className="flex justify-between">
                          <div className="h-6 bg-gray-200 animate-pulse rounded w-1/4" />
                          <div className="h-8 bg-gray-200 animate-pulse rounded w-1/3" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recommendations.map((doc) => (
                  <Card key={doc.id} className="overflow-hidden">
                    <CardContent className="p-0">
                      <div className="relative h-40 w-full">
                        <Image src={doc.image || "/placeholder.svg"} alt={doc.title} fill className="object-cover" />
                        <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                          AI đề xuất
                        </div>
                      </div>
                      <div className="p-4">
                        <Link href={`/document/${doc.id}`}>
                          <h3 className="font-medium line-clamp-2 hover:text-green-500 transition-colors mb-2">
                            {doc.title}
                          </h3>
                        </Link>
                        <div className="flex items-center text-sm text-gray-500 mb-2">
                          <BookOpen className="h-4 w-4 mr-1" />
                          <span>
                            {doc.category} • {doc.subject}
                          </span>
                        </div>
                        <div className="text-xs text-gray-500 italic mb-3">"{doc.reason}"</div>
                        <div className="flex items-center justify-between">
                          <div className="text-lg font-bold text-green-500">
                            {doc.price.toLocaleString("vi-VN")} VNĐ
                          </div>
                          <div className="flex space-x-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-green-500"
                              onClick={() => handleFeedback(doc.id, true)}
                            >
                              <ThumbsUp className="h-4 w-4" />
                              <span className="sr-only">Thích</span>
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-gray-500"
                              onClick={() => handleFeedback(doc.id, false)}
                            >
                              <ThumbsDown className="h-4 w-4" />
                              <span className="sr-only">Không thích</span>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="subject">
            <div className="text-center py-12">
              <BookOpen className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">Đăng nhập để xem đề xuất theo môn học</h3>
              <p className="text-gray-500 mb-4">
                Đăng nhập để chúng tôi có thể đề xuất tài liệu phù hợp với các môn học bạn quan tâm.
              </p>
              <Button className="bg-green-500 hover:bg-green-600">Đăng nhập ngay</Button>
            </div>
          </TabsContent>

          <TabsContent value="trending">
            <div className="text-center py-12">
              <Sparkles className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">Xu hướng tài liệu đang được quan tâm</h3>
              <p className="text-gray-500 mb-4">
                Đăng nhập để xem các tài liệu đang được nhiều người quan tâm trong lĩnh vực của bạn.
              </p>
              <Button className="bg-green-500 hover:bg-green-600">Đăng nhập ngay</Button>
            </div>
          </TabsContent>

          <TabsContent value="similar">
            <div className="text-center py-12">
              <BookOpen className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">Tài liệu tương tự với tài liệu bạn đã xem</h3>
              <p className="text-gray-500 mb-4">
                Đăng nhập và xem một số tài liệu để chúng tôi có thể đề xuất các tài liệu tương tự.
              </p>
              <Button className="bg-green-500 hover:bg-green-600">Đăng nhập ngay</Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      <Footer />
    </>
  )
}
