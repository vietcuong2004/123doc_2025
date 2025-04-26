"use client"

import type React from "react"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  FileUp,
  FileDown,
  FileText,
  FileImage,
  FileIcon as FilePresentationIcon,
  FileSpreadsheet,
  ArrowRight,
  Check,
  AlertCircle,
} from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function ConvertPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [targetFormat, setTargetFormat] = useState<string>("pdf")
  const [isConverting, setIsConverting] = useState(false)
  const [conversionProgress, setConversionProgress] = useState(0)
  const [conversionComplete, setConversionComplete] = useState(false)
  const [conversionError, setConversionError] = useState<string | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setSelectedFile(file)
      setConversionComplete(false)
      setConversionError(null)
    }
  }

  const handleConvert = () => {
    if (!selectedFile) return

    setIsConverting(true)
    setConversionProgress(0)
    setConversionComplete(false)
    setConversionError(null)

    // Simulate conversion process
    const interval = setInterval(() => {
      setConversionProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsConverting(false)
          setConversionComplete(true)
          return 100
        }
        return prev + 10
      })
    }, 300)

    // Simulate potential error (10% chance)
    if (Math.random() < 0.1) {
      setTimeout(() => {
        clearInterval(interval)
        setIsConverting(false)
        setConversionError("Có lỗi xảy ra trong quá trình chuyển đổi. Vui lòng thử lại.")
        setConversionProgress(0)
      }, 1500)
    }
  }

  const getFileIcon = (fileType: string) => {
    switch (fileType) {
      case "pdf":
        return <FileText className="h-12 w-12 text-red-500" />
      case "docx":
        return <FileText className="h-12 w-12 text-blue-500" />
      case "pptx":
        return <FilePresentationIcon className="h-12 w-12 text-orange-500" />
      case "xlsx":
        return <FileSpreadsheet className="h-12 w-12 text-green-500" />
      case "jpg":
      case "png":
        return <FileImage className="h-12 w-12 text-purple-500" />
      default:
        return <FileText className="h-12 w-12 text-gray-500" />
    }
  }

  const getFileExtension = (filename: string) => {
    return filename.split(".").pop()?.toLowerCase() || ""
  }

  const getCompatibleFormats = (fileType: string) => {
    switch (fileType) {
      case "pdf":
        return ["docx", "pptx", "jpg", "png"]
      case "docx":
        return ["pdf", "txt"]
      case "pptx":
        return ["pdf", "jpg"]
      case "xlsx":
        return ["pdf", "csv"]
      case "jpg":
      case "png":
        return ["pdf"]
      default:
        return []
    }
  }

  const fileExtension = selectedFile ? getFileExtension(selectedFile.name) : ""
  const compatibleFormats = selectedFile ? getCompatibleFormats(fileExtension) : []

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl md:text-3xl font-bold">Chuyển đổi định dạng tài liệu</h1>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <div className="flex items-start space-x-4">
              <div className="bg-orange-100 p-3 rounded-full">
                <FileUp className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <h2 className="text-lg font-medium mb-2">Chuyển đổi tài liệu dễ dàng</h2>
                <p className="text-gray-600">
                  Chuyển đổi tài liệu giữa các định dạng khác nhau như PDF, Word, PowerPoint, Excel và hình ảnh. Công cụ
                  này giúp bạn dễ dàng chỉnh sửa, trình bày hoặc chia sẻ tài liệu học tập.
                </p>
              </div>
            </div>
          </div>

          <Tabs defaultValue="upload" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="upload">Tải lên & Chuyển đổi</TabsTrigger>
              <TabsTrigger value="history">Lịch sử chuyển đổi</TabsTrigger>
            </TabsList>

            <TabsContent value="upload">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Tải lên tài liệu</CardTitle>
                    <CardDescription>Chọn tài liệu từ thiết bị của bạn</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div
                        className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:bg-gray-50 transition-colors"
                        onClick={() => document.getElementById("file-upload")?.click()}
                      >
                        <input
                          type="file"
                          id="file-upload"
                          className="hidden"
                          onChange={handleFileChange}
                          accept=".pdf,.docx,.pptx,.xlsx,.jpg,.png,.txt,.csv"
                        />
                        <FileUp className="h-10 w-10 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm font-medium">
                          Kéo thả file vào đây hoặc <span className="text-green-500">chọn file</span>
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          Hỗ trợ PDF, DOCX, PPTX, XLSX, JPG, PNG (tối đa 50MB)
                        </p>
                      </div>

                      {selectedFile && (
                        <div className="bg-gray-50 rounded-lg p-4">
                          <div className="flex items-center space-x-3">
                            {getFileIcon(fileExtension)}
                            <div className="flex-1 min-w-0">
                              <p className="font-medium truncate">{selectedFile.name}</p>
                              <p className="text-sm text-gray-500">
                                {(selectedFile.size / 1024 / 1024).toFixed(2)} MB • {fileExtension.toUpperCase()}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Chọn định dạng đầu ra</CardTitle>
                    <CardDescription>Chọn định dạng bạn muốn chuyển đổi sang</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {selectedFile ? (
                      <div className="space-y-4">
                        <div className="flex items-center justify-center space-x-4">
                          {getFileIcon(fileExtension)}
                          <ArrowRight className="h-6 w-6 text-gray-400" />
                          {getFileIcon(targetFormat)}
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-4">
                          {compatibleFormats.map((format) => (
                            <Button
                              key={format}
                              variant={targetFormat === format ? "default" : "outline"}
                              className={targetFormat === format ? "bg-green-500 hover:bg-green-600" : ""}
                              onClick={() => setTargetFormat(format)}
                            >
                              {format.toUpperCase()}
                            </Button>
                          ))}
                        </div>

                        {compatibleFormats.length === 0 && (
                          <Alert variant="destructive">
                            <AlertCircle className="h-4 w-4" />
                            <AlertTitle>Không hỗ trợ</AlertTitle>
                            <AlertDescription>
                              Định dạng file này không hỗ trợ chuyển đổi. Vui lòng chọn file khác.
                            </AlertDescription>
                          </Alert>
                        )}

                        {isConverting && (
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>Đang chuyển đổi...</span>
                              <span>{conversionProgress}%</span>
                            </div>
                            <Progress value={conversionProgress} className="h-2" />
                          </div>
                        )}

                        {conversionComplete && (
                          <Alert className="bg-green-50 border-green-200">
                            <Check className="h-4 w-4 text-green-500" />
                            <AlertTitle className="text-green-500">Chuyển đổi thành công</AlertTitle>
                            <AlertDescription>
                              Tài liệu của bạn đã được chuyển đổi thành công. Bạn có thể tải xuống ngay bây giờ.
                            </AlertDescription>
                          </Alert>
                        )}

                        {conversionError && (
                          <Alert variant="destructive">
                            <AlertCircle className="h-4 w-4" />
                            <AlertTitle>Lỗi</AlertTitle>
                            <AlertDescription>{conversionError}</AlertDescription>
                          </Alert>
                        )}

                        <div className="flex space-x-4 pt-4">
                          <Button
                            className="w-full bg-green-500 hover:bg-green-600"
                            disabled={isConverting || compatibleFormats.length === 0 || !targetFormat}
                            onClick={handleConvert}
                          >
                            {isConverting ? "Đang chuyển đổi..." : "Chuyển đổi ngay"}
                          </Button>
                        </div>

                        {conversionComplete && (
                          <Button className="w-full" variant="outline">
                            <FileDown className="h-4 w-4 mr-2" />
                            Tải xuống
                          </Button>
                        )}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-lg font-medium mb-2">Chưa có tài liệu</h3>
                        <p className="text-gray-500 mb-4">Vui lòng tải lên tài liệu để bắt đầu chuyển đổi.</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="history">
              <Card>
                <CardHeader>
                  <CardTitle>Lịch sử chuyển đổi</CardTitle>
                  <CardDescription>Các tài liệu bạn đã chuyển đổi gần đây</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">Chưa có lịch sử chuyển đổi</h3>
                    <p className="text-gray-500 mb-4">
                      Bạn chưa thực hiện chuyển đổi nào. Hãy chuyển đổi tài liệu đầu tiên của bạn.
                    </p>
                    <Button
                      className="bg-green-500 hover:bg-green-600"
                      onClick={() => document.querySelector('[data-value="upload"]')?.click()}
                    >
                      Bắt đầu chuyển đổi
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold mb-4">Câu hỏi thường gặp</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium">Tôi có thể chuyển đổi những định dạng nào?</h3>
                <p className="text-gray-600 mt-1">
                  Hệ thống hỗ trợ chuyển đổi giữa các định dạng phổ biến như PDF, DOCX (Word), PPTX (PowerPoint), XLSX
                  (Excel), JPG, PNG và các định dạng văn bản khác.
                </p>
              </div>
              <div>
                <h3 className="font-medium">Có giới hạn kích thước file không?</h3>
                <p className="text-gray-600 mt-1">
                  Kích thước file tối đa là 50MB. Nếu file của bạn lớn hơn, bạn có thể chia nhỏ file hoặc nén file trước
                  khi tải lên.
                </p>
              </div>
              <div>
                <h3 className="font-medium">Tài liệu của tôi có an toàn không?</h3>
                <p className="text-gray-600 mt-1">
                  Chúng tôi đảm bảo an toàn cho tài liệu của bạn. Tất cả các file được mã hóa trong quá trình tải lên và
                  xử lý, và sẽ bị xóa khỏi hệ thống sau 24 giờ.
                </p>
              </div>
              <div>
                <h3 className="font-medium">Chất lượng chuyển đổi có bị giảm không?</h3>
                <p className="text-gray-600 mt-1">
                  Chúng tôi sử dụng các công cụ chuyển đổi chất lượng cao để đảm bảo tài liệu sau khi chuyển đổi giữ
                  nguyên định dạng và chất lượng tốt nhất có thể. Tuy nhiên, một số định dạng phức tạp có thể có sự khác
                  biệt nhỏ.
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
