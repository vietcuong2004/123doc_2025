"use client"

import type React from "react"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { SearchResults } from "@/components/search-results"
import { Search, SlidersHorizontal, X } from "lucide-react"

export default function AdvancedSearchPage() {
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [pageRange, setPageRange] = useState([0, 500])
  const [selectedRating, setSelectedRating] = useState("any")

  // Mock search function
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()

    // Simulate API call with mock data
    setTimeout(() => {
      setSearchResults([
        {
          id: 1,
          title: "Tuyển chọn những bài luận văn phát triển sản phẩm du lịch mang tính thực tiễn cao",
          date: "08-5-2024",
          views: 1250,
          downloads: 320,
          rating: 4.5,
          price: 50000,
          image: "/placeholder.svg?height=200&width=300",
        },
        {
          id: 2,
          title: "Hướng dẫn làm đồ án hệ thống cung cấp điện cho xưởng cơ khí MỚI NHẤT 2020",
          date: "07-8-2024",
          views: 980,
          downloads: 245,
          rating: 4.2,
          price: 45000,
          image: "/placeholder.svg?height=200&width=300",
        },
        {
          id: 3,
          title: "Top 10 tài liệu trắc nghiệm được lý có đáp án - Top Báo Cáo Thực Tập Tốt Nhất",
          date: "15-10-2024",
          views: 1560,
          downloads: 410,
          rating: 4.8,
          price: 60000,
          image: "/placeholder.svg?height=200&width=300",
        },
        {
          id: 4,
          title: "Tổng hợp 10 tài liệu về thực tập động cơ hay nhất - Top Báo Cáo Thực Tập Tốt Nhất",
          date: "10-3-2024",
          views: 890,
          downloads: 210,
          rating: 4.0,
          price: 35000,
          image: "/placeholder.svg?height=200&width=300",
        },
        {
          id: 5,
          title: "10 Mẫu lý do chọn đề tài nghiên cứu - Hướng dẫn cách viết lý do chọn đề tài",
          date: "08-8-2024",
          views: 1200,
          downloads: 350,
          rating: 4.6,
          price: 55000,
          image: "/placeholder.svg?height=200&width=300",
        },
        {
          id: 6,
          title: "Đề cương ôn tập môn Kinh tế vĩ mô - Đại học Kinh tế Quốc dân",
          date: "12-4-2024",
          views: 780,
          downloads: 190,
          rating: 4.3,
          price: 40000,
          image: "/placeholder.svg?height=200&width=300",
        },
      ])
    }, 500)
  }

  const clearFilters = () => {
    setPageRange([0, 500])
    setSelectedRating("any")
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl md:text-3xl font-bold">Tìm kiếm nâng cao</h1>
          <Button variant="outline" className="md:hidden" onClick={() => setIsFilterOpen(!isFilterOpen)}>
            <SlidersHorizontal className="h-4 w-4 mr-2" />
            Bộ lọc
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Filters - Desktop */}
          <div className="hidden md:block">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-20">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-lg">Bộ lọc tìm kiếm</h2>
                <Button variant="ghost" size="sm" onClick={clearFilters}>
                  <X className="h-4 w-4 mr-1" />
                  Xóa
                </Button>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <Label>Ngành học</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Tất cả ngành học" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tất cả ngành học</SelectItem>
                      <SelectItem value="economics">Kinh tế</SelectItem>
                      <SelectItem value="engineering">Kỹ thuật</SelectItem>
                      <SelectItem value="education">Giáo dục</SelectItem>
                      <SelectItem value="medicine">Y học</SelectItem>
                      <SelectItem value="it">Công nghệ thông tin</SelectItem>
                      <SelectItem value="law">Luật</SelectItem>
                      <SelectItem value="arts">Nghệ thuật</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Môn học</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Tất cả môn học" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tất cả môn học</SelectItem>
                      <SelectItem value="math">Toán học</SelectItem>
                      <SelectItem value="physics">Vật lý</SelectItem>
                      <SelectItem value="chemistry">Hóa học</SelectItem>
                      <SelectItem value="biology">Sinh học</SelectItem>
                      <SelectItem value="literature">Văn học</SelectItem>
                      <SelectItem value="history">Lịch sử</SelectItem>
                      <SelectItem value="geography">Địa lý</SelectItem>
                      <SelectItem value="english">Tiếng Anh</SelectItem>
                      <SelectItem value="informatics">Tin học</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Loại tài liệu</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="doc-type-1" />
                      <Label htmlFor="doc-type-1" className="text-sm">
                        Đề thi & Kiểm tra
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="doc-type-2" />
                      <Label htmlFor="doc-type-2" className="text-sm">
                        Luận văn & Báo cáo
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="doc-type-3" />
                      <Label htmlFor="doc-type-3" className="text-sm">
                        Bài giảng & Slide
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="doc-type-4" />
                      <Label htmlFor="doc-type-4" className="text-sm">
                        Giáo trình
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="doc-type-5" />
                      <Label htmlFor="doc-type-5" className="text-sm">
                        Biểu mẫu & Hợp đồng
                      </Label>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Định dạng</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="format-1" />
                      <Label htmlFor="format-1" className="text-sm">
                        PDF
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="format-2" />
                      <Label htmlFor="format-2" className="text-sm">
                        DOCX
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="format-3" />
                      <Label htmlFor="format-3" className="text-sm">
                        PPTX
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="format-4" />
                      <Label htmlFor="format-4" className="text-sm">
                        XLSX
                      </Label>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>
                    Số trang: {pageRange[0]} - {pageRange[1]}
                  </Label>
                  <Slider defaultValue={[0, 500]} max={500} step={10} value={pageRange} onValueChange={setPageRange} />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>0</span>
                    <span>500+</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Đánh giá</Label>
                  <RadioGroup value={selectedRating} onValueChange={setSelectedRating}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="any" id="rating-any" />
                      <Label htmlFor="rating-any" className="text-sm">
                        Tất cả
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="4+" id="rating-4" />
                      <Label htmlFor="rating-4" className="text-sm">
                        4 sao trở lên
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="3+" id="rating-3" />
                      <Label htmlFor="rating-3" className="text-sm">
                        3 sao trở lên
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="2+" id="rating-2" />
                      <Label htmlFor="rating-2" className="text-sm">
                        2 sao trở lên
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label>Thời gian cập nhật</Label>
                  <RadioGroup defaultValue="any">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="any" id="time-any" />
                      <Label htmlFor="time-any" className="text-sm">
                        Tất cả
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="week" id="time-week" />
                      <Label htmlFor="time-week" className="text-sm">
                        Trong tuần
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="month" id="time-month" />
                      <Label htmlFor="time-month" className="text-sm">
                        Trong tháng
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="year" id="time-year" />
                      <Label htmlFor="time-year" className="text-sm">
                        Trong năm
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <Button className="w-full bg-green-500 hover:bg-green-600">Áp dụng bộ lọc</Button>
              </div>
            </div>
          </div>

          {/* Filters - Mobile */}
          {isFilterOpen && (
            <div className="fixed inset-0 bg-white z-50 overflow-auto p-4 md:hidden">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-lg">Bộ lọc tìm kiếm</h2>
                <Button variant="ghost" size="sm" onClick={() => setIsFilterOpen(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <Label>Ngành học</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Tất cả ngành học" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tất cả ngành học</SelectItem>
                      <SelectItem value="economics">Kinh tế</SelectItem>
                      <SelectItem value="engineering">Kỹ thuật</SelectItem>
                      <SelectItem value="education">Giáo dục</SelectItem>
                      <SelectItem value="medicine">Y học</SelectItem>
                      <SelectItem value="it">Công nghệ thông tin</SelectItem>
                      <SelectItem value="law">Luật</SelectItem>
                      <SelectItem value="arts">Nghệ thuật</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Môn học</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Tất cả môn học" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tất cả môn học</SelectItem>
                      <SelectItem value="math">Toán học</SelectItem>
                      <SelectItem value="physics">Vật lý</SelectItem>
                      <SelectItem value="chemistry">Hóa học</SelectItem>
                      <SelectItem value="biology">Sinh học</SelectItem>
                      <SelectItem value="literature">Văn học</SelectItem>
                      <SelectItem value="history">Lịch sử</SelectItem>
                      <SelectItem value="geography">Địa lý</SelectItem>
                      <SelectItem value="english">Tiếng Anh</SelectItem>
                      <SelectItem value="informatics">Tin học</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Loại tài liệu</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="m-doc-type-1" />
                      <Label htmlFor="m-doc-type-1" className="text-sm">
                        Đề thi & Kiểm tra
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="m-doc-type-2" />
                      <Label htmlFor="m-doc-type-2" className="text-sm">
                        Luận văn & Báo cáo
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="m-doc-type-3" />
                      <Label htmlFor="m-doc-type-3" className="text-sm">
                        Bài giảng & Slide
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="m-doc-type-4" />
                      <Label htmlFor="m-doc-type-4" className="text-sm">
                        Giáo trình
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="m-doc-type-5" />
                      <Label htmlFor="m-doc-type-5" className="text-sm">
                        Biểu mẫu & Hợp đồng
                      </Label>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label>Định dạng</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="m-format-1" />
                      <Label htmlFor="m-format-1" className="text-sm">
                        PDF
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="m-format-2" />
                      <Label htmlFor="m-format-2" className="text-sm">
                        DOCX
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="m-format-3" />
                      <Label htmlFor="m-format-3" className="text-sm">
                        PPTX
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="m-format-4" />
                      <Label htmlFor="m-format-4" className="text-sm">
                        XLSX
                      </Label>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>
                    Số trang: {pageRange[0]} - {pageRange[1]}
                  </Label>
                  <Slider defaultValue={[0, 500]} max={500} step={10} value={pageRange} onValueChange={setPageRange} />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>0</span>
                    <span>500+</span>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label>Đánh giá</Label>
                  <RadioGroup value={selectedRating} onValueChange={setSelectedRating}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="any" id="m-rating-any" />
                      <Label htmlFor="m-rating-any" className="text-sm">
                        Tất cả
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="4+" id="m-rating-4" />
                      <Label htmlFor="m-rating-4" className="text-sm">
                        4 sao trở lên
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="3+" id="m-rating-3" />
                      <Label htmlFor="m-rating-3" className="text-sm">
                        3 sao trở lên
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="2+" id="m-rating-2" />
                      <Label htmlFor="m-rating-2" className="text-sm">
                        2 sao trở lên
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label>Thời gian cập nhật</Label>
                  <RadioGroup defaultValue="any">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="any" id="m-time-any" />
                      <Label htmlFor="m-time-any" className="text-sm">
                        Tất cả
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="week" id="m-time-week" />
                      <Label htmlFor="m-time-week" className="text-sm">
                        Trong tuần
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="month" id="m-time-month" />
                      <Label htmlFor="m-time-month" className="text-sm">
                        Trong tháng
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="year" id="m-time-year" />
                      <Label htmlFor="m-time-year" className="text-sm">
                        Trong năm
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="flex space-x-4 pt-4">
                  <Button
                    variant="outline"
                    className="w-1/2"
                    onClick={() => {
                      clearFilters()
                      setIsFilterOpen(false)
                    }}
                  >
                    Xóa bộ lọc
                  </Button>
                  <Button className="w-1/2 bg-green-500 hover:bg-green-600" onClick={() => setIsFilterOpen(false)}>
                    Áp dụng
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Search and Results */}
          <div className="md:col-span-3">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <form onSubmit={handleSearch} className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                  <Input
                    type="search"
                    placeholder="Nhập từ khóa tìm kiếm..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button type="submit" className="w-full bg-green-500 hover:bg-green-600">
                  Tìm kiếm
                </Button>
              </form>
            </div>

            {searchResults.length > 0 ? (
              <SearchResults results={searchResults} />
            ) : (
              <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                <Search className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">Chưa có kết quả tìm kiếm</h3>
                <p className="text-gray-500 mb-4">
                  Hãy nhập từ khóa và sử dụng bộ lọc để tìm kiếm tài liệu phù hợp với nhu cầu của bạn.
                </p>
                <p className="text-sm text-gray-500">
                  Gợi ý: Thử tìm kiếm với từ khóa ngắn hơn hoặc sử dụng từ khóa khác.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
