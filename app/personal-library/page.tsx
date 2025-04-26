"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { LayoutGrid, LayoutList, Search, Filter, FileText, Eye, Download, Star, StarOff, Trash2 } from "lucide-react"
import Link from "next/link"

interface Document {
  id: number
  title: string
  type: string
  category: string
  addedDate: string
  lastOpened?: string
  tags: string[]
  notes?: string
  isFavorite: boolean
  image: string
}

export default function PersonalLibraryPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  const [documents, setDocuments] = useState<Document[]>([
    {
      id: 1,
      title: "Tuyển chọn những bài luận văn phát triển sản phẩm du lịch mang tính thực tiễn cao",
      type: "pdf",
      category: "Luận văn & Báo cáo",
      addedDate: "08-05-2024",
      lastOpened: "15-05-2024",
      tags: ["du lịch", "marketing", "phát triển sản phẩm"],
      notes: "Tài liệu hay về phát triển sản phẩm du lịch, có nhiều ví dụ thực tế.",
      isFavorite: true,
      image: "/placeholder.svg?height=100&width=150",
    },
    {
      id: 2,
      title: "Hướng dẫn làm đồ án hệ thống cung cấp điện cho xưởng cơ khí MỚI NHẤT 2020",
      type: "docx",
      category: "Đồ án & Nghiên cứu",
      addedDate: "07-08-2024",
      lastOpened: "10-05-2024",
      tags: ["điện", "cơ khí", "đồ án"],
      notes: "Tài liệu chi tiết về thiết kế hệ thống điện cho xưởng cơ khí.",
      isFavorite: false,
      image: "/placeholder.svg?height=100&width=150",
    },
    {
      id: 3,
      title: "Top 10 tài liệu trắc nghiệm được lý có đáp án - Top Báo Cáo Thực Tập Tốt Nhất",
      type: "pdf",
      category: "Đề thi & Kiểm tra",
      addedDate: "15-10-2024",
      lastOpened: "20-05-2024",
      tags: ["vật lý", "trắc nghiệm", "đề thi"],
      isFavorite: true,
      image: "/placeholder.svg?height=100&width=150",
    },
    {
      id: 4,
      title: "Tổng hợp 10 tài liệu về thực tập động cơ hay nhất - Top Báo Cáo Thực Tập Tốt Nhất",
      type: "pdf",
      category: "Báo cáo thực tập",
      addedDate: "10-03-2024",
      tags: ["động cơ", "thực tập", "cơ khí"],
      isFavorite: false,
      image: "/placeholder.svg?height=100&width=150",
    },
    {
      id: 5,
      title: "Giáo trình Toán cao cấp",
      type: "pdf",
      category: "Giáo trình",
      addedDate: "15-05-2023",
      lastOpened: "01-05-2024",
      tags: ["toán học", "đại học", "giáo trình"],
      isFavorite: false,
      image: "/placeholder.svg?height=100&width=150",
    },
    {
      id: 6,
      title: "Bài tập Vật lý",
      type: "docx",
      category: "Bài tập",
      addedDate: "10-05-2023",
      lastOpened: "05-05-2024",
      tags: ["vật lý", "bài tập", "đại học"],
      isFavorite: false,
      image: "/placeholder.svg?height=100&width=150",
    },
  ])

  // Get all unique categories
  const categories = Array.from(new Set(documents.map((doc) => doc.category)))

  // Get all unique tags
  const allTags = Array.from(new Set(documents.flatMap((doc) => doc.tags)))

  // Filter documents based on search query, category, and tag
  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory ? doc.category === selectedCategory : true
    const matchesTag = selectedTag ? doc.tags.includes(selectedTag) : true
    return matchesSearch && matchesCategory && matchesTag
  })

  const toggleFavorite = (id: number) => {
    setDocuments((prev) => prev.map((doc) => (doc.id === id ? { ...doc, isFavorite: !doc.isFavorite } : doc)))
  }

  const deleteDocument = (id: number) => {
    if (confirm("Bạn có chắc chắn muốn xóa tài liệu này?")) {
      setDocuments((prev) => prev.filter((doc) => doc.id !== id))
    }
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl md:text-3xl font-bold">Thư viện cá nhân</h1>
          <div className="flex items-center space-x-2">
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
            <Button variant="outline" onClick={() => setIsFilterOpen(!isFilterOpen)}>
              <Filter className="h-4 w-4 mr-2" />
              Bộ lọc
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Filters - Desktop */}
          {isFilterOpen && (
            <div className="md:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-20">
                <h2 className="font-bold text-lg mb-4">Bộ lọc tài liệu</h2>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <h3 className="font-medium">Loại tài liệu</h3>
                    <div className="space-y-2">
                      {["pdf", "docx", "pptx", "xlsx"].map((type) => (
                        <div key={type} className="flex items-center space-x-2">
                          <Checkbox id={`type-${type}`} />
                          <Label htmlFor={`type-${type}`} className="text-sm">
                            {type.toUpperCase()}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-medium">Danh mục</h3>
                    <div className="space-y-2">
                      {categories.map((category) => (
                        <div key={category} className="flex items-center space-x-2">
                          <Checkbox
                            id={`category-${category}`}
                            checked={selectedCategory === category}
                            onCheckedChange={(checked) => {
                              setSelectedCategory(checked ? category : null)
                            }}
                          />
                          <Label htmlFor={`category-${category}`} className="text-sm">
                            {category}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-medium">Thẻ</h3>
                    <div className="flex flex-wrap gap-2">
                      {allTags.map((tag) => (
                        <Badge
                          key={tag}
                          variant={selectedTag === tag ? "default" : "outline"}
                          className="cursor-pointer"
                          onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-medium">Trạng thái</h3>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="status-read" />
                        <Label htmlFor="status-read" className="text-sm">
                          Đã đọc
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="status-unread" />
                        <Label htmlFor="status-unread" className="text-sm">
                          Chưa đọc
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="status-favorite" />
                        <Label htmlFor="status-favorite" className="text-sm">
                          Yêu thích
                        </Label>
                      </div>
                    </div>
                  </div>

                  <Button className="w-full bg-green-500 hover:bg-green-600">Áp dụng bộ lọc</Button>
                </div>
              </div>
            </div>
          )}

          {/* Main content */}
          <div className={`${isFilterOpen ? "md:col-span-3" : "md:col-span-4"}`}>
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                <Input
                  type="search"
                  placeholder="Tìm kiếm tài liệu..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <Tabs defaultValue="all" className="mb-6">
              <TabsList>
                <TabsTrigger value="all">Tất cả tài liệu ({documents.length})</TabsTrigger>
                <TabsTrigger value="recent">Gần đây</TabsTrigger>
                <TabsTrigger value="favorites">Yêu thích</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="mt-4">
                {viewMode === "grid" ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredDocuments.map((doc) => (
                      <Card key={doc.id} className="overflow-hidden">
                        <CardContent className="p-0">
                          <div className="relative h-40 w-full bg-gray-100 flex items-center justify-center">
                            {doc.type === "pdf" && <div className="text-red-500 text-4xl font-bold">PDF</div>}
                            {doc.type === "docx" && <div className="text-blue-500 text-4xl font-bold">DOC</div>}
                            {doc.type === "pptx" && <div className="text-orange-500 text-4xl font-bold">PPT</div>}
                            {doc.type === "xlsx" && <div className="text-green-500 text-4xl font-bold">XLS</div>}
                            <Button
                              variant="ghost"
                              size="icon"
                              className="absolute top-2 right-2"
                              onClick={() => toggleFavorite(doc.id)}
                            >
                              {doc.isFavorite ? (
                                <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                              ) : (
                                <StarOff className="h-5 w-5 text-gray-400" />
                              )}
                            </Button>
                          </div>
                          <div className="p-4">
                            <Link href={`/document/${doc.id}`}>
                              <h3 className="font-medium line-clamp-2 hover:text-green-500 transition-colors">
                                {doc.title}
                              </h3>
                            </Link>
                            <p className="text-sm text-gray-500 mt-1">
                              {doc.category} • Thêm ngày: {doc.addedDate}
                            </p>
                            <div className="flex flex-wrap gap-1 mt-2">
                              {doc.tags.map((tag) => (
                                <Badge key={tag} variant="outline" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                            <div className="flex justify-between mt-4">
                              <Button variant="outline" size="sm">
                                <Eye className="h-4 w-4 mr-1" />
                                Xem
                              </Button>
                              <Button variant="outline" size="sm">
                                <Download className="h-4 w-4 mr-1" />
                                Tải xuống
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-red-500"
                                onClick={() => deleteDocument(doc.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredDocuments.map((doc) => (
                      <Card key={doc.id}>
                        <CardContent className="p-4">
                          <div className="flex items-center space-x-4">
                            <div className="h-16 w-16 bg-gray-100 flex items-center justify-center shrink-0 rounded">
                              {doc.type === "pdf" && <div className="text-red-500 text-xl font-bold">PDF</div>}
                              {doc.type === "docx" && <div className="text-blue-500 text-xl font-bold">DOC</div>}
                              {doc.type === "pptx" && <div className="text-orange-500 text-xl font-bold">PPT</div>}
                              {doc.type === "xlsx" && <div className="text-green-500 text-xl font-bold">XLS</div>}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center">
                                <Link href={`/document/${doc.id}`} className="flex-1">
                                  <h3 className="font-medium truncate hover:text-green-500 transition-colors">
                                    {doc.title}
                                  </h3>
                                </Link>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="ml-2"
                                  onClick={() => toggleFavorite(doc.id)}
                                >
                                  {doc.isFavorite ? (
                                    <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                                  ) : (
                                    <StarOff className="h-5 w-5 text-gray-400" />
                                  )}
                                </Button>
                              </div>
                              <p className="text-sm text-gray-500">
                                {doc.category} • Thêm ngày: {doc.addedDate}
                                {doc.lastOpened && ` • Đọc gần đây: ${doc.lastOpened}`}
                              </p>
                              <div className="flex flex-wrap gap-1 mt-2">
                                {doc.tags.map((tag) => (
                                  <Badge key={tag} variant="outline" className="text-xs">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            <div className="flex space-x-2 shrink-0">
                              <Button variant="outline" size="sm">
                                <Eye className="h-4 w-4 mr-1" />
                                Xem
                              </Button>
                              <Button variant="outline" size="sm">
                                <Download className="h-4 w-4 mr-1" />
                                Tải xuống
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-red-500"
                                onClick={() => deleteDocument(doc.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}

                {filteredDocuments.length === 0 && (
                  <div className="text-center py-12">
                    <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">Không tìm thấy tài liệu</h3>
                    <p className="text-gray-500">Không có tài liệu nào phù hợp với tiêu chí tìm kiếm của bạn.</p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="recent">
                {viewMode === "grid" ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredDocuments
                      .filter((doc) => doc.lastOpened)
                      .sort((a, b) => new Date(b.lastOpened || "").getTime() - new Date(a.lastOpened || "").getTime())
                      .slice(0, 6)
                      .map((doc) => (
                        <Card key={doc.id} className="overflow-hidden">
                          <CardContent className="p-0">
                            <div className="relative h-40 w-full bg-gray-100 flex items-center justify-center">
                              {doc.type === "pdf" && <div className="text-red-500 text-4xl font-bold">PDF</div>}
                              {doc.type === "docx" && <div className="text-blue-500 text-4xl font-bold">DOC</div>}
                              {doc.type === "pptx" && <div className="text-orange-500 text-4xl font-bold">PPT</div>}
                              {doc.type === "xlsx" && <div className="text-green-500 text-4xl font-bold">XLS</div>}
                              <Button
                                variant="ghost"
                                size="icon"
                                className="absolute top-2 right-2"
                                onClick={() => toggleFavorite(doc.id)}
                              >
                                {doc.isFavorite ? (
                                  <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                                ) : (
                                  <StarOff className="h-5 w-5 text-gray-400" />
                                )}
                              </Button>
                            </div>
                            <div className="p-4">
                              <Link href={`/document/${doc.id}`}>
                                <h3 className="font-medium line-clamp-2 hover:text-green-500 transition-colors">
                                  {doc.title}
                                </h3>
                              </Link>
                              <p className="text-sm text-gray-500 mt-1">
                                {doc.category} • Đọc gần đây: {doc.lastOpened}
                              </p>
                              <div className="flex flex-wrap gap-1 mt-2">
                                {doc.tags.map((tag) => (
                                  <Badge key={tag} variant="outline" className="text-xs">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                              <div className="flex justify-between mt-4">
                                <Button variant="outline" size="sm">
                                  <Eye className="h-4 w-4 mr-1" />
                                  Xem
                                </Button>
                                <Button variant="outline" size="sm">
                                  <Download className="h-4 w-4 mr-1" />
                                  Tải xuống
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="text-red-500"
                                  onClick={() => deleteDocument(doc.id)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredDocuments
                      .filter((doc) => doc.lastOpened)
                      .sort((a, b) => new Date(b.lastOpened || "").getTime() - new Date(a.lastOpened || "").getTime())
                      .slice(0, 6)
                      .map((doc) => (
                        <Card key={doc.id}>
                          <CardContent className="p-4">
                            <div className="flex items-center space-x-4">
                              <div className="h-16 w-16 bg-gray-100 flex items-center justify-center shrink-0 rounded">
                                {doc.type === "pdf" && <div className="text-red-500 text-xl font-bold">PDF</div>}
                                {doc.type === "docx" && <div className="text-blue-500 text-xl font-bold">DOC</div>}
                                {doc.type === "pptx" && <div className="text-orange-500 text-xl font-bold">PPT</div>}
                                {doc.type === "xlsx" && <div className="text-green-500 text-xl font-bold">XLS</div>}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center">
                                  <Link href={`/document/${doc.id}`} className="flex-1">
                                    <h3 className="font-medium truncate hover:text-green-500 transition-colors">
                                      {doc.title}
                                    </h3>
                                  </Link>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="ml-2"
                                    onClick={() => toggleFavorite(doc.id)}
                                  >
                                    {doc.isFavorite ? (
                                      <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                                    ) : (
                                      <StarOff className="h-5 w-5 text-gray-400" />
                                    )}
                                  </Button>
                                </div>
                                <p className="text-sm text-gray-500">
                                  {doc.category} • Đọc gần đây: {doc.lastOpened}
                                </p>
                                <div className="flex flex-wrap gap-1 mt-2">
                                  {doc.tags.map((tag) => (
                                    <Badge key={tag} variant="outline" className="text-xs">
                                      {tag}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                              <div className="flex space-x-2 shrink-0">
                                <Button variant="outline" size="sm">
                                  <Eye className="h-4 w-4 mr-1" />
                                  Xem
                                </Button>
                                <Button variant="outline" size="sm">
                                  <Download className="h-4 w-4 mr-1" />
                                  Tải xuống
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="text-red-500"
                                  onClick={() => deleteDocument(doc.id)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                  </div>
                )}

                {filteredDocuments.filter((doc) => doc.lastOpened).length === 0 && (
                  <div className="text-center py-12">
                    <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">Không có tài liệu gần đây</h3>
                    <p className="text-gray-500">Bạn chưa đọc tài liệu nào gần đây.</p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="favorites">
                {viewMode === "grid" ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredDocuments
                      .filter((doc) => doc.isFavorite)
                      .map((doc) => (
                        <Card key={doc.id} className="overflow-hidden">
                          <CardContent className="p-0">
                            <div className="relative h-40 w-full bg-gray-100 flex items-center justify-center">
                              {doc.type === "pdf" && <div className="text-red-500 text-4xl font-bold">PDF</div>}
                              {doc.type === "docx" && <div className="text-blue-500 text-4xl font-bold">DOC</div>}
                              {doc.type === "pptx" && <div className="text-orange-500 text-4xl font-bold">PPT</div>}
                              {doc.type === "xlsx" && <div className="text-green-500 text-4xl font-bold">XLS</div>}
                              <Button
                                variant="ghost"
                                size="icon"
                                className="absolute top-2 right-2"
                                onClick={() => toggleFavorite(doc.id)}
                              >
                                {doc.isFavorite ? (
                                  <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                                ) : (
                                  <StarOff className="h-5 w-5 text-gray-400" />
                                )}
                              </Button>
                            </div>
                            <div className="p-4">
                              <Link href={`/document/${doc.id}`}>
                                <h3 className="font-medium line-clamp-2 hover:text-green-500 transition-colors">
                                  {doc.title}
                                </h3>
                              </Link>
                              <p className="text-sm text-gray-500 mt-1">
                                {doc.category} • Thêm ngày: {doc.addedDate}
                              </p>
                              <div className="flex flex-wrap gap-1 mt-2">
                                {doc.tags.map((tag) => (
                                  <Badge key={tag} variant="outline" className="text-xs">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                              <div className="flex justify-between mt-4">
                                <Button variant="outline" size="sm">
                                  <Eye className="h-4 w-4 mr-1" />
                                  Xem
                                </Button>
                                <Button variant="outline" size="sm">
                                  <Download className="h-4 w-4 mr-1" />
                                  Tải xuống
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="text-red-500"
                                  onClick={() => deleteDocument(doc.id)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredDocuments
                      .filter((doc) => doc.isFavorite)
                      .map((doc) => (
                        <Card key={doc.id}>
                          <CardContent className="p-4">
                            <div className="flex items-center space-x-4">
                              <div className="h-16 w-16 bg-gray-100 flex items-center justify-center shrink-0 rounded">
                                {doc.type === "pdf" && <div className="text-red-500 text-xl font-bold">PDF</div>}
                                {doc.type === "docx" && <div className="text-blue-500 text-xl font-bold">DOC</div>}
                                {doc.type === "pptx" && <div className="text-orange-500 text-xl font-bold">PPT</div>}
                                {doc.type === "xlsx" && <div className="text-green-500 text-xl font-bold">XLS</div>}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center">
                                  <Link href={`/document/${doc.id}`} className="flex-1">
                                    <h3 className="font-medium truncate hover:text-green-500 transition-colors">
                                      {doc.title}
                                    </h3>
                                  </Link>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="ml-2"
                                    onClick={() => toggleFavorite(doc.id)}
                                  >
                                    {doc.isFavorite ? (
                                      <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                                    ) : (
                                      <StarOff className="h-5 w-5 text-gray-400" />
                                    )}
                                  </Button>
                                </div>
                                <p className="text-sm text-gray-500">
                                  {doc.category} • Thêm ngày: {doc.addedDate}
                                </p>
                                <div className="flex flex-wrap gap-1 mt-2">
                                  {doc.tags.map((tag) => (
                                    <Badge key={tag} variant="outline" className="text-xs">
                                      {tag}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                              <div className="flex space-x-2 shrink-0">
                                <Button variant="outline" size="sm">
                                  <Eye className="h-4 w-4 mr-1" />
                                  Xem
                                </Button>
                                <Button variant="outline" size="sm">
                                  <Download className="h-4 w-4 mr-1" />
                                  Tải xuống
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="text-red-500"
                                  onClick={() => deleteDocument(doc.id)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                  </div>
                )}

                {filteredDocuments.filter((doc) => doc.isFavorite).length === 0 && (
                  <div className="text-center py-12">
                    <Star className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">Không có tài liệu yêu thích</h3>
                    <p className="text-gray-500">
                      Bạn chưa đánh dấu tài liệu nào là yêu thích. Nhấn vào biểu tượng ngôi sao để thêm vào danh sách
                      yêu thích.
                    </p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
