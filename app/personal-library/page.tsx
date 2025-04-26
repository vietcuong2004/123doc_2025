"use client"

import { useState, useEffect } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { LayoutGrid, LayoutList, Search, Filter, FileText, Eye, Download, Star, StarOff, Trash2, Tag, Bell, Plus } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface Document {
  id: number
  title: string
  type: string
  category: string
  subject: string
  addedDate: string
  lastOpened?: string
  tags: string[]
  notes?: string
  isFavorite: boolean
  image: string
  status: "unread" | "in-progress" | "completed"
}

interface CustomTag {
  id: number
  name: string
  color: string
}

export default function PersonalLibraryPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null)
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [newTagName, setNewTagName] = useState("")
  const [newTagColor, setNewTagColor] = useState("#3b82f6")
  const [showNewTagDialog, setShowNewTagDialog] = useState(false)
  const [notifications, setNotifications] = useState<{id: number, message: string, date: string}[]>([])

  const [customTags, setCustomTags] = useState<CustomTag[]>([
    { id: 1, name: "HK2 - Năm 2", color: "#3b82f6" },
    { id: 2, name: "Ôn thi giữa kỳ", color: "#10b981" },
    { id: 3, name: "Bài tập nhóm", color: "#f59e0b" },
  ])

  const [documents, setDocuments] = useState<Document[]>([
    {
      id: 1,
      title: "Tuyển chọn những bài luận văn phát triển sản phẩm du lịch mang tính thực tiễn cao",
      type: "pdf",
      category: "Luận văn & Báo cáo",
      subject: "Quản trị học",
      addedDate: "08-05-2024",
      lastOpened: "15-05-2024",
      tags: ["du lịch", "marketing", "phát triển sản phẩm", "HK2 - Năm 2"],
      notes: "Tài liệu hay về phát triển sản phẩm du lịch, có nhiều ví dụ thực tế.",
      isFavorite: true,
      image: "/placeholder.svg?height=100&width=150",
      status: "in-progress"
    },
    // ... thêm các tài liệu khác
  ])

  // Lọc tài liệu
  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = !selectedCategory || doc.category === selectedCategory
    const matchesSubject = !selectedSubject || doc.subject === selectedSubject
    const matchesTag = !selectedTag || doc.tags.includes(selectedTag)
    return matchesSearch && matchesCategory && matchesSubject && matchesTag
  })

  // Tạo nhãn mới
  const createNewTag = () => {
    if (newTagName.trim()) {
      const newTag: CustomTag = {
        id: Date.now(),
        name: newTagName,
        color: newTagColor
      }
      setCustomTags([...customTags, newTag])
      setNewTagName("")
      setShowNewTagDialog(false)
    }
  }

  // Kiểm tra và tạo thông báo
  useEffect(() => {
    const checkUnreadDocuments = () => {
      const now = new Date()
      const unreadDocs = documents.filter(doc => {
        if (!doc.lastOpened) return true
        const lastOpened = new Date(doc.lastOpened)
        const daysSinceLastOpened = (now.getTime() - lastOpened.getTime()) / (1000 * 60 * 60 * 24)
        return daysSinceLastOpened > 14 // 2 tuần
      })

      if (unreadDocs.length > 0) {
        setNotifications([
          {
            id: Date.now(),
            message: `Bạn có ${unreadDocs.length} tài liệu chưa đọc trong 2 tuần qua`,
            date: new Date().toLocaleDateString()
          }
        ])
      }
    }

    checkUnreadDocuments()
    const interval = setInterval(checkUnreadDocuments, 24 * 60 * 60 * 1000) // Kiểm tra mỗi ngày
    return () => clearInterval(interval)
  }, [documents])

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Thư viện cá nhân</h1>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setViewMode("grid")}>
              <LayoutGrid className="h-4 w-4 mr-2" />
              Lưới
            </Button>
            <Button variant="outline" onClick={() => setViewMode("list")}>
              <LayoutList className="h-4 w-4 mr-2" />
              Danh sách
            </Button>
          </div>
        </div>

        {/* Thông báo */}
        {notifications.length > 0 && (
          <div className="mb-6">
            {notifications.map(notification => (
              <div key={notification.id} className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-center">
                <Bell className="h-5 w-5 text-blue-500 mr-2" />
                <p className="text-blue-700">{notification.message}</p>
              </div>
            ))}
          </div>
        )}

        {/* Bộ lọc và tìm kiếm */}
        <div className="flex gap-4 mb-6">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Tìm kiếm tài liệu..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <Button variant="outline" onClick={() => setIsFilterOpen(!isFilterOpen)}>
            <Filter className="h-4 w-4 mr-2" />
            Bộ lọc
          </Button>
        </div>

        {/* Bộ lọc chi tiết */}
        {isFilterOpen && (
          <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label>Môn học</Label>
                <select
                  className="w-full p-2 border rounded-md"
                  value={selectedSubject || ""}
                  onChange={(e) => setSelectedSubject(e.target.value || null)}
                >
                  <option value="">Tất cả</option>
                  <option value="Quản trị học">Quản trị học</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Kinh tế vĩ mô">Kinh tế vĩ mô</option>
                </select>
              </div>
              <div>
                <Label>Danh mục</Label>
                <select
                  className="w-full p-2 border rounded-md"
                  value={selectedCategory || ""}
                  onChange={(e) => setSelectedCategory(e.target.value || null)}
                >
                  <option value="">Tất cả</option>
                  <option value="Luận văn & Báo cáo">Luận văn & Báo cáo</option>
                  <option value="Đồ án & Nghiên cứu">Đồ án & Nghiên cứu</option>
                  <option value="Đề thi & Kiểm tra">Đề thi & Kiểm tra</option>
                </select>
              </div>
              <div>
                <Label>Nhãn</Label>
                <select
                  className="w-full p-2 border rounded-md"
                  value={selectedTag || ""}
                  onChange={(e) => setSelectedTag(e.target.value || null)}
                >
                  <option value="">Tất cả</option>
                  {customTags.map(tag => (
                    <option key={tag.id} value={tag.name}>{tag.name}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Danh sách nhãn tùy chỉnh */}
        <div className="flex flex-wrap gap-2 mb-6">
          {customTags.map(tag => (
            <Badge
              key={tag.id}
              style={{ backgroundColor: tag.color }}
              className="cursor-pointer"
              onClick={() => setSelectedTag(tag.name)}
            >
              {tag.name}
            </Badge>
          ))}
          <Dialog open={showNewTagDialog} onOpenChange={setShowNewTagDialog}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Thêm nhãn
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Tạo nhãn mới</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label>Tên nhãn</Label>
                  <Input
                    value={newTagName}
                    onChange={(e) => setNewTagName(e.target.value)}
                    placeholder="Nhập tên nhãn..."
                  />
                </div>
                <div>
                  <Label>Màu sắc</Label>
                  <Input
                    type="color"
                    value={newTagColor}
                    onChange={(e) => setNewTagColor(e.target.value)}
                  />
                </div>
                <Button onClick={createNewTag}>Tạo nhãn</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Hiển thị tài liệu */}
        <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
          {filteredDocuments.map(doc => (
            <Card key={doc.id} className={viewMode === "list" ? "flex" : ""}>
              <CardContent className={`p-4 ${viewMode === "list" ? "flex gap-4" : ""}`}>
                <div className={`relative ${viewMode === "list" ? "w-32" : "w-full aspect-[3/4]"}`}>
                  <Image
                    src={doc.image}
                    alt={doc.title}
                    fill
                    className="object-cover rounded"
                  />
                </div>
                <div className={viewMode === "list" ? "flex-1" : "mt-4"}>
                  <h3 className="font-semibold line-clamp-2">{doc.title}</h3>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {doc.tags.map(tag => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center gap-4 mt-4">
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      Xem
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Tải
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setDocuments(docs =>
                          docs.map(d =>
                            d.id === doc.id ? { ...d, isFavorite: !d.isFavorite } : d
                          )
                        )
                      }}
                    >
                      {doc.isFavorite ? (
                        <Star className="h-4 w-4 mr-2 text-yellow-500" />
                      ) : (
                        <StarOff className="h-4 w-4 mr-2" />
                      )}
                      Yêu thích
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <Footer />
    </main>
  )
}