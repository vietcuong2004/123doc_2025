"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Upload, File, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function UploadPage() {
  const router = useRouter()
  const [files, setFiles] = useState<File[]>([])
  const [price, setPrice] = useState(0)
  const [isFree, setIsFree] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files)
      setFiles((prev) => [...prev, ...newFiles])
    }
  }

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle upload logic here
    router.push("/dashboard")
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Tải tài liệu lên</h1>
          <div className="bg-white p-6 rounded-lg shadow">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Tiêu đề tài liệu</Label>
                <Input id="title" placeholder="Nhập tiêu đề tài liệu" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Mô tả tài liệu</Label>
                <Textarea id="description" placeholder="Mô tả chi tiết về nội dung tài liệu" rows={4} required />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="category">Danh mục</Label>
                  <Select required>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn danh mục" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="exam">Đề thi & Kiểm tra</SelectItem>
                      <SelectItem value="thesis">Luận văn & Báo cáo</SelectItem>
                      <SelectItem value="slide">Bài giảng & Slide</SelectItem>
                      <SelectItem value="textbook">Giáo trình</SelectItem>
                      <SelectItem value="form">Biểu mẫu & Hợp đồng</SelectItem>
                      <SelectItem value="project">Đồ án & Nghiên cứu</SelectItem>
                      <SelectItem value="other">Tài liệu khác</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Môn học</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn môn học" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="math">Toán học</SelectItem>
                      <SelectItem value="physics">Vật lý</SelectItem>
                      <SelectItem value="chemistry">Hóa học</SelectItem>
                      <SelectItem value="biology">Sinh học</SelectItem>
                      <SelectItem value="literature">Văn học</SelectItem>
                      <SelectItem value="history">Lịch sử</SelectItem>
                      <SelectItem value="geography">Địa lý</SelectItem>
                      <SelectItem value="english">Tiếng Anh</SelectItem>
                      <SelectItem value="informatics">Tin học</SelectItem>
                      <SelectItem value="other">Khác</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="tags">Từ khóa (cách nhau bởi dấu phẩy)</Label>
                <Input id="tags" placeholder="Ví dụ: đại học, kinh tế, marketing" />
              </div>

              <div className="space-y-4">
                <Label>Tài liệu</Label>
                <div className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:bg-gray-50 transition-colors">
                  <input type="file" id="file-upload" className="hidden" multiple onChange={handleFileChange} />
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <Upload className="h-10 w-10 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm font-medium">
                      Kéo thả file vào đây hoặc <span className="text-green-500">chọn file</span>
                    </p>
                    <p className="text-xs text-gray-500 mt-1">Hỗ trợ PDF, DOCX, PPTX, XLSX (tối đa 50MB)</p>
                  </label>
                </div>

                {files.length > 0 && (
                  <div className="mt-4 space-y-2">
                    {files.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center">
                          <File className="h-5 w-5 text-gray-500 mr-2" />
                          <div>
                            <p className="text-sm font-medium truncate max-w-xs">{file.name}</p>
                            <p className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                          </div>
                        </div>
                        <Button type="button" variant="ghost" size="icon" onClick={() => removeFile(index)}>
                          <X className="h-4 w-4" />
                          <span className="sr-only">Xóa file</span>
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <Separator />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="price-switch">Tài liệu miễn phí</Label>
                  <Switch id="price-switch" checked={isFree} onCheckedChange={setIsFree} />
                </div>

                {!isFree && (
                  <div className="space-y-4">
                    <Label>Giá bán: {price.toLocaleString("vi-VN")} VNĐ</Label>
                    <Slider defaultValue={[0]} max={500000} step={5000} onValueChange={(value) => setPrice(value[0])} />
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>0 VNĐ</span>
                      <span>500.000 VNĐ</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex justify-end space-x-4">
                <Button type="button" variant="outline" onClick={() => router.back()}>
                  Hủy
                </Button>
                <Button type="submit" className="bg-green-500 hover:bg-green-600">
                  Đăng tải
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
