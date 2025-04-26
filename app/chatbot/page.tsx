"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Send, Bot, FileText, ThumbsUp, ThumbsDown, Sparkles, BookOpen, Search, Clock } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
  documents?: {
    id: number
    title: string
    price: number
    image: string
  }[]
}

export default function ChatbotPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content:
        "Xin chào! Tôi là trợ lý AI của 123doc. Tôi có thể giúp bạn tìm kiếm tài liệu học tập, giải thích khái niệm, hoặc hỗ trợ bạn trong quá trình học tập. Bạn cần giúp đỡ gì?",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [recentSearches, setRecentSearches] = useState<string[]>([
    "Đề cương ôn thi THPT Quốc gia môn Toán",
    "Luận văn về marketing online",
    "Bài giảng kinh tế vĩ mô",
  ])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // Simulate API call delay
    setTimeout(() => {
      const botResponse = generateBotResponse(input)
      setMessages((prev) => [...prev, botResponse])
      setIsLoading(false)
    }, 1500)
  }

  const generateBotResponse = (userInput: string): Message => {
    // Mock responses based on user input
    const lowerInput = userInput.toLowerCase()

    if (lowerInput.includes("xin chào") || lowerInput.includes("hello")) {
      return {
        id: Date.now().toString(),
        role: "assistant",
        content: "Xin chào! Rất vui được gặp bạn. Tôi có thể giúp gì cho bạn hôm nay?",
        timestamp: new Date(),
      }
    } else if (lowerInput.includes("ielts") || lowerInput.includes("toeic")) {
      return {
        id: Date.now().toString(),
        role: "assistant",
        content:
          "Tôi có một số tài liệu về luyện thi IELTS/TOEIC có thể giúp bạn. Dưới đây là một số tài liệu phổ biến nhất:",
        timestamp: new Date(),
        documents: [
          {
            id: 1,
            title: "Bộ đề IELTS Writing Task 2 mới nhất kèm bài mẫu band 8.0+",
            price: 120000,
            image: "/placeholder.svg?height=100&width=150",
          },
          {
            id: 2,
            title: "Tổng hợp từ vựng IELTS theo chủ đề - Phiên bản 2024",
            price: 85000,
            image: "/placeholder.svg?height=100&width=150",
          },
          {
            id: 3,
            title: "Sách luyện thi TOEIC 850+ (ETS 2023) kèm giải chi tiết",
            price: 150000,
            image: "/placeholder.svg?height=100&width=150",
          },
        ],
      }
    } else if (lowerInput.includes("kinh tế") || lowerInput.includes("quản trị")) {
      return {
        id: Date.now().toString(),
        role: "assistant",
        content: "Về lĩnh vực kinh tế và quản trị, tôi có thể giới thiệu cho bạn một số tài liệu sau:",
        timestamp: new Date(),
        documents: [
          {
            id: 4,
            title: "Giáo trình Kinh tế vĩ mô - ĐH Kinh tế Quốc dân (2023)",
            price: 95000,
            image: "/placeholder.svg?height=100&width=150",
          },
          {
            id: 5,
            title: "Bộ case study Quản trị chiến lược - Harvard Business Review",
            price: 180000,
            image: "/placeholder.svg?height=100&width=150",
          },
        ],
      }
    } else if (lowerInput.includes("đề thi") || lowerInput.includes("đề cương")) {
      return {
        id: Date.now().toString(),
        role: "assistant",
        content: "Tôi tìm thấy một số đề thi và đề cương có thể phù hợp với nhu cầu của bạn:",
        timestamp: new Date(),
        documents: [
          {
            id: 6,
            title: "Bộ đề thi thử THPT Quốc gia 2024 - Môn Toán (có lời giải chi tiết)",
            price: 65000,
            image: "/placeholder.svg?height=100&width=150",
          },
          {
            id: 7,
            title: "Đề cương ôn tập học kỳ 2 lớp 12 - Tất cả các môn",
            price: 50000,
            image: "/placeholder.svg?height=100&width=150",
          },
        ],
      }
    } else if (lowerInput.includes("hiệu ứng mỏ neo")) {
      return {
        id: Date.now().toString(),
        role: "assistant",
        content:
          'Hiệu ứng mỏ neo (Anchoring Effect) là một thiên kiến nhận thức trong tâm lý học, đề cập đến xu hướng con người phụ thuộc quá mức vào thông tin đầu tiên được cung cấp ("mỏ neo") khi đưa ra quyết định.\n\nVí dụ: Khi một cửa hàng niêm yết giá gốc cao, sau đó giảm giá 50%, người tiêu dùng có xu hướng cảm thấy đó là một ưu đãi tốt, ngay cả khi giá sau giảm vẫn cao hơn giá thị trường.\n\nTrong marketing, hiệu ứng mỏ neo được sử dụng rộng rãi để định hướng quyết định mua hàng của khách hàng. Dưới đây là một số tài liệu chuyên sâu về chủ đề này:',
        timestamp: new Date(),
        documents: [
          {
            id: 8,
            title: "Hành vi người tiêu dùng: Các yếu tố tâm lý ảnh hưởng đến quyết định mua hàng",
            price: 110000,
            image: "/placeholder.svg?height=100&width=150",
          },
          {
            id: 9,
            title: "Nghiên cứu về thiên kiến nhận thức trong marketing và kinh doanh",
            price: 135000,
            image: "/placeholder.svg?height=100&width=150",
          },
        ],
      }
    } else {
      return {
        id: Date.now().toString(),
        role: "assistant",
        content:
          "Cảm ơn câu hỏi của bạn. Tôi đang tìm kiếm thông tin liên quan. Bạn có thể cung cấp thêm chi tiết về loại tài liệu bạn đang tìm kiếm không? Ví dụ: môn học cụ thể, cấp độ học tập, hoặc chủ đề bạn quan tâm?",
        timestamp: new Date(),
      }
    }
  }

  const handleQuickQuestion = (question: string) => {
    setInput(question)
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl md:text-3xl font-bold">Chatbot Tutor</h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="md:col-span-1">
              <Card className="sticky top-20">
                <CardContent className="p-4">
                  <Tabs defaultValue="suggestions">
                    <TabsList className="grid w-full grid-cols-2 mb-4">
                      <TabsTrigger value="suggestions">Gợi ý</TabsTrigger>
                      <TabsTrigger value="history">Lịch sử</TabsTrigger>
                    </TabsList>

                    <TabsContent value="suggestions" className="space-y-4">
                      <div className="space-y-2">
                        <h3 className="text-sm font-medium flex items-center">
                          <Sparkles className="h-4 w-4 mr-2 text-orange-500" />
                          Câu hỏi gợi ý
                        </h3>
                        <div className="space-y-2">
                          <Button
                            variant="outline"
                            className="w-full justify-start text-sm h-auto py-2 px-3 break-words text-left whitespace-normal"
                            onClick={() => handleQuickQuestion("Có đề cương ôn thi THPT Quốc gia môn Toán không?")}
                          >
                            <span className="break-words whitespace-normal text-left block">
                              Có đề cương ôn thi THPT Quốc gia môn Toán không?
                            </span>
                          </Button>
                          <Button
                            variant="outline"
                            className="w-full justify-start text-sm h-auto py-2 px-3 break-words text-left whitespace-normal"
                            onClick={() => handleQuickQuestion("Giúp tôi tìm tài liệu về IELTS Writing Task 2")}
                          >
                            <span className="break-words whitespace-normal text-left block">
                              Giúp tôi tìm tài liệu về IELTS Writing Task 2
                            </span>
                          </Button>
                          <Button
                            variant="outline"
                            className="w-full justify-start text-sm h-auto py-2 px-3 break-words text-left whitespace-normal"
                            onClick={() => handleQuickQuestion("Hiệu ứng mỏ neo trong hành vi tiêu dùng là gì?")}
                          >
                            <span className="break-words whitespace-normal text-left block">
                              Hiệu ứng mỏ neo trong hành vi tiêu dùng là gì?
                            </span>
                          </Button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h3 className="text-sm font-medium flex items-center">
                          <BookOpen className="h-4 w-4 mr-2 text-green-500" />
                          Chủ đề phổ biến
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          <Badge
                            variant="outline"
                            className="cursor-pointer hover:bg-gray-100"
                            onClick={() => handleQuickQuestion("Tài liệu về kinh tế vĩ mô")}
                          >
                            Kinh tế vĩ mô
                          </Badge>
                          <Badge
                            variant="outline"
                            className="cursor-pointer hover:bg-gray-100"
                            onClick={() => handleQuickQuestion("Tài liệu về lập trình Python")}
                          >
                            Lập trình Python
                          </Badge>
                          <Badge
                            variant="outline"
                            className="cursor-pointer hover:bg-gray-100"
                            onClick={() => handleQuickQuestion("Đề thi IELTS mới nhất")}
                          >
                            IELTS
                          </Badge>
                          <Badge
                            variant="outline"
                            className="cursor-pointer hover:bg-gray-100"
                            onClick={() => handleQuickQuestion("Luận văn tốt nghiệp ngành marketing")}
                          >
                            Luận văn Marketing
                          </Badge>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="history">
                      <div className="space-y-2">
                        <h3 className="text-sm font-medium flex items-center">
                          <Clock className="h-4 w-4 mr-2 text-blue-500" />
                          Tìm kiếm gần đây
                        </h3>
                        <div className="space-y-2">
                          {recentSearches.map((search, index) => (
                            <div
                              key={index}
                              className="flex items-center text-sm p-2 hover:bg-gray-100 rounded-md cursor-pointer"
                              onClick={() => handleQuickQuestion(search)}
                            >
                              <Search className="h-4 w-4 mr-2 text-gray-400" />
                              <span className="truncate">{search}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>

            <div className="md:col-span-3">
              <Card className="h-[calc(100vh-200px)] flex flex-col">
                <CardContent className="flex-1 p-4 overflow-hidden flex flex-col">
                  <div className="flex-1 overflow-y-auto pr-2 space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`flex ${message.role === "user" ? "flex-row-reverse" : "flex-row"} max-w-[80%] gap-3`}
                        >
                          {message.role === "assistant" && (
                            <Avatar className="h-8 w-8">
                              <AvatarImage src="/placeholder.svg" alt="AI" />
                              <AvatarFallback className="bg-green-100 text-green-600">
                                <Bot className="h-4 w-4" />
                              </AvatarFallback>
                            </Avatar>
                          )}
                          <div className="space-y-2">
                            <div
                              className={`p-3 rounded-lg ${
                                message.role === "user" ? "bg-green-500 text-white" : "bg-gray-100 text-gray-800"
                              }`}
                            >
                              <p className="whitespace-pre-line break-words">{message.content}</p>
                            </div>

                            {message.documents && (
                              <div className="space-y-2 mt-2">
                                <p className="text-sm text-gray-500 ml-1">Tài liệu liên quan:</p>
                                <div className="space-y-2">
                                  {message.documents.map((doc) => (
                                    <Link href={`/document/${doc.id}`} key={doc.id}>
                                      <div className="flex items-center bg-white border rounded-lg p-2 hover:shadow-sm transition-shadow">
                                        <div className="relative h-16 w-24 shrink-0">
                                          <Image
                                            src={doc.image || "/placeholder.svg"}
                                            alt={doc.title}
                                            fill
                                            className="object-cover rounded"
                                          />
                                        </div>
                                        <div className="ml-3 flex-1 min-w-0">
                                          <p className="font-medium text-sm line-clamp-2">{doc.title}</p>
                                          <p className="text-green-500 font-bold text-sm mt-1">
                                            {doc.price.toLocaleString("vi-VN")} VNĐ
                                          </p>
                                        </div>
                                      </div>
                                    </Link>
                                  ))}
                                </div>
                              </div>
                            )}

                            <div
                              className={`flex ${message.role === "user" ? "justify-start" : "justify-end"} text-xs text-gray-500`}
                            >
                              <span>{formatTime(message.timestamp)}</span>
                            </div>

                            {message.role === "assistant" && (
                              <div className="flex space-x-2">
                                <Button variant="ghost" size="sm" className="h-8 w-8 rounded-full p-0">
                                  <ThumbsUp className="h-4 w-4" />
                                  <span className="sr-only">Hữu ích</span>
                                </Button>
                                <Button variant="ghost" size="sm" className="h-8 w-8 rounded-full p-0">
                                  <ThumbsDown className="h-4 w-4" />
                                  <span className="sr-only">Không hữu ích</span>
                                </Button>
                                <Button variant="ghost" size="sm" className="h-8 w-8 rounded-full p-0">
                                  <FileText className="h-4 w-4" />
                                  <span className="sr-only">Lưu</span>
                                </Button>
                              </div>
                            )}
                          </div>

                          {message.role === "user" && (
                            <Avatar className="h-8 w-8">
                              <AvatarFallback className="bg-green-500 text-white">UN</AvatarFallback>
                            </Avatar>
                          )}
                        </div>
                      </div>
                    ))}

                    {isLoading && (
                      <div className="flex justify-start">
                        <div className="flex flex-row max-w-[80%] gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src="/placeholder.svg" alt="AI" />
                            <AvatarFallback className="bg-green-100 text-green-600">
                              <Bot className="h-4 w-4" />
                            </AvatarFallback>
                          </Avatar>
                          <div className="p-3 rounded-lg bg-gray-100 text-gray-800">
                            <div className="flex space-x-2">
                              <div
                                className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"
                                style={{ animationDelay: "0ms" }}
                              ></div>
                              <div
                                className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"
                                style={{ animationDelay: "300ms" }}
                              ></div>
                              <div
                                className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"
                                style={{ animationDelay: "600ms" }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>

                  <form onSubmit={handleSendMessage} className="mt-4 flex items-end gap-2">
                    <Input
                      placeholder="Nhập câu hỏi của bạn..."
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      className="flex-1"
                    />
                    <Button
                      type="submit"
                      size="icon"
                      disabled={!input.trim() || isLoading}
                      className="bg-green-500 hover:bg-green-600"
                    >
                      <Send className="h-4 w-4" />
                      <span className="sr-only">Gửi</span>
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
