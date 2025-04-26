"use client"

import type React from "react"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Progress } from "@/components/ui/progress"
import { FileUp, FileText, Brain, Copy, VolumeIcon, List, AlignLeft, Network } from "lucide-react"
import { useRouter } from "next/navigation"

export default function Summarize() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [summaryType, setSummaryType] = useState<string>("paragraph")
  const [summaryLength, setSummaryLength] = useState<number>(30)
  const [isProcessing, setIsProcessing] = useState(false)
  const [processingProgress, setProcessingProgress] = useState(0)
  const [summary, setSummary] = useState<string>("")
  const [isAudioPlaying, setIsAudioPlaying] = useState(false)
  const mindmapImageUrl = "/mindmap-demo.png" // Đường dẫn ảnh sơ đồ tư duy mẫu

  const router = useRouter()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setSelectedFile(file)
      setSummary("")
    }
  }

  const handleSummarize = () => {
    if (!selectedFile) return

    setIsProcessing(true)
    setProcessingProgress(0)
    setSummary("")

    // Simulate processing with progress
    const interval = setInterval(() => {
      setProcessingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsProcessing(false)

          // Generate mock summary based on file name and selected options
          const mockSummary = generateMockSummary(selectedFile.name, summaryType, summaryLength)
          setSummary(mockSummary)

          return 100
        }
        return prev + 5
      })
    }, 200)
  }

  const generateMockSummary = (fileName: string, type: string, length: number) => {
    // Mock summaries based on type
    if (type === "paragraph") {
      return `Tài liệu "${fileName}" là một nghiên cứu toàn diện về các phương pháp học tập hiện đại và ứng dụng công nghệ trong giáo dục. Tác giả đã phân tích sâu sắc về tác động của công nghệ đối với việc học tập, đặc biệt là trong bối cảnh giáo dục đại học. Nghiên cứu chỉ ra rằng việc tích hợp công nghệ một cách hợp lý có thể cải thiện đáng kể hiệu quả học tập, tăng cường sự tương tác giữa giảng viên và sinh viên, đồng thời phát triển kỹ năng tự học cho người học. Tuy nhiên, tác giả cũng cảnh báo về những thách thức như sự phụ thuộc quá mức vào công nghệ, vấn đề bảo mật thông tin và khoảng cách số giữa các nhóm người học khác nhau. Kết luận của nghiên cứu đề xuất một mô hình học tập kết hợp, trong đó công nghệ đóng vai trò hỗ trợ chứ không thay thế phương pháp giảng dạy truyền thống.`
    } else if (type === "bullets") {
      return `• Tài liệu nghiên cứu về phương pháp học tập hiện đại và ứng dụng công nghệ trong giáo dục.
• Phân tích tác động của công nghệ đối với việc học tập, đặc biệt trong giáo dục đại học.
• Tích hợp công nghệ hợp lý cải thiện hiệu quả học tập và tương tác giảng viên-sinh viên.
• Phát triển kỹ năng tự học thông qua ứng dụng công nghệ.
• Cảnh báo về sự phụ thuộc quá mức vào công nghệ.
• Đề cập đến vấn đề bảo mật thông tin trong học tập trực tuyến.
• Thảo luận về khoảng cách số giữa các nhóm người học.
• Đề xuất mô hình học tập kết hợp (blended learning).
• Công nghệ nên đóng vai trò hỗ trợ, không thay thế phương pháp giảng dạy truyền thống.
• Kết luận nhấn mạnh tầm quan trọng của cân bằng giữa công nghệ và phương pháp truyền thống.`
    } else {
      return `[Tổng quan]
- Nghiên cứu về học tập hiện đại và công nghệ giáo dục

[Phân tích chính]
- Tác động công nghệ trong giáo dục đại học
- Cải thiện hiệu quả học tập
- Tăng cường tương tác
- Phát triển kỹ năng tự học

[Thách thức]
- Phụ thuộc công nghệ
- Bảo mật thông tin
- Khoảng cách số

[Kết luận]
- Đề xuất mô hình học tập kết hợp
- Công nghệ hỗ trợ, không thay thế phương pháp truyền thống`
    }
  }

  const handleCopyToClipboard = () => {
    if (summary) {
      navigator.clipboard.writeText(summary)
      // In a real app, you would show a toast notification here
      alert("Đã sao chép vào clipboard")
    }
  }

  const handleTextToSpeech = () => {
    if (summary && (summaryType === "paragraph" || summaryType === "bullets")) {
      // Lưu summary vào localStorage để có thể truy cập từ trang TTS
      localStorage.setItem("summaryText", summary)
      // Điều hướng đến trang text-to-speech
      router.push("/text-to-speech")
    } else {
      // Nếu là sơ đồ nội dung hoặc không có summary, vẫn sử dụng chức năng đọc to tại chỗ
      setIsAudioPlaying(!isAudioPlaying)

      if (!isAudioPlaying) {
        // Start speech
        const utterance = new SpeechSynthesisUtterance(summary)
        utterance.lang = "vi-VN"
        speechSynthesis.speak(utterance)

        utterance.onend = () => {
          setIsAudioPlaying(false)
        }
      } else {
        // Stop speech
        speechSynthesis.cancel()
      }
    }
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl md:text-3xl font-bold">Tóm tắt tài liệu bằng AI</h1>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <div className="flex items-start space-x-4">
              <div className="bg-purple-100 p-3 rounded-full">
                <Brain className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h2 className="text-lg font-medium mb-2">Tóm tắt thông minh với AI</h2>
                <p className="text-gray-600">
                  Sử dụng trí tuệ nhân tạo để tóm tắt tài liệu dài thành các đoạn văn ngắn gọn, danh sách gạch đầu dòng
                  hoặc sơ đồ nội dung. Tiết kiệm thời gian đọc và dễ dàng nắm bắt ý chính của tài liệu.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Tải lên tài liệu</CardTitle>
                <CardDescription>Chọn tài liệu cần tóm tắt</CardDescription>
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
                      accept=".pdf,.docx,.txt"
                    />
                    <FileUp className="h-10 w-10 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm font-medium">
                      Kéo thả file vào đây hoặc <span className="text-green-500">chọn file</span>
                    </p>
                    <p className="text-xs text-gray-500 mt-1">Hỗ trợ PDF, DOCX, TXT (tối đa 50MB)</p>
                  </div>

                  {selectedFile && (
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center space-x-3">
                        <FileText className="h-10 w-10 text-gray-500" />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">{selectedFile.name}</p>
                          <p className="text-sm text-gray-500">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="space-y-4 pt-4">
                    <div className="space-y-2">
                      <Label>Định dạng tóm tắt</Label>
                      <RadioGroup
                        value={summaryType}
                        onValueChange={setSummaryType}
                        className="flex flex-col space-y-2"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="paragraph" id="format-paragraph" />
                          <Label htmlFor="format-paragraph" className="flex items-center">
                            <AlignLeft className="h-4 w-4 mr-2" />
                            Đoạn văn
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="bullets" id="format-bullets" />
                          <Label htmlFor="format-bullets" className="flex items-center">
                            <List className="h-4 w-4 mr-2" />
                            Danh sách gạch đầu dòng
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="outline" id="format-outline" />
                          <Label htmlFor="format-outline" className="flex items-center">
                            <Network className="h-4 w-4 mr-2" />
                            Sơ đồ nội dung
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label>Độ dài tóm tắt: {summaryLength}%</Label>
                        <span className="text-sm text-gray-500">
                          {summaryLength < 20
                            ? "Rất ngắn"
                            : summaryLength < 40
                              ? "Ngắn"
                              : summaryLength < 60
                                ? "Trung bình"
                                : summaryLength < 80
                                  ? "Dài"
                                  : "Rất dài"}
                        </span>
                      </div>
                      <Slider
                        defaultValue={[30]}
                        max={100}
                        step={5}
                        value={[summaryLength]}
                        onValueChange={(value) => setSummaryLength(value[0])}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Ngôn ngữ tóm tắt</Label>
                      <Select defaultValue="vi">
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn ngôn ngữ" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="vi">Tiếng Việt</SelectItem>
                          <SelectItem value="en">Tiếng Anh</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {isProcessing && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Đang xử lý...</span>
                          <span>{processingProgress}%</span>
                        </div>
                        <Progress value={processingProgress} className="h-2" />
                      </div>
                    )}

                    <Button
                      className="w-full bg-green-500 hover:bg-green-600"
                      disabled={!selectedFile || isProcessing}
                      onClick={handleSummarize}
                    >
                      {isProcessing ? "Đang xử lý..." : "Tóm tắt ngay"}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Kết quả tóm tắt</CardTitle>
                <CardDescription>Nội dung tóm tắt từ tài liệu của bạn</CardDescription>
              </CardHeader>
              <CardContent>
                {summary ? (
                  <div className="space-y-4">
                    <div className="bg-gray-50 rounded-lg p-4 h-80 overflow-y-auto flex items-center justify-center">
                      {summaryType === "outline" ? (
                        <img src={mindmapImageUrl} alt="Sơ đồ tư duy" className="max-h-72 w-auto mx-auto" />
                      ) : (
                        <div className="whitespace-pre-line">{summary}</div>
                      )}
                    </div>
                    <div className="flex space-x-2">
                      {summaryType === "outline" ? (
                        <a
                          href={mindmapImageUrl}
                          download="so-do-tu-duy.png"
                          className="flex-1 inline-flex items-center justify-center border rounded px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                          style={{ textDecoration: "none" }}
                        >
                          <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4" />
                          </svg>
                          Tải xuống
                        </a>
                      ) : (
                        <Button variant="outline" className="flex-1" onClick={handleCopyToClipboard}>
                          <Copy className="h-4 w-4 mr-2" />
                          Sao chép
                        </Button>
                      )}
                      {summaryType !== "outline" && (
                        <Button variant="outline" className="flex-1" onClick={handleTextToSpeech}>
                          <VolumeIcon className="h-4 w-4 mr-2" />
                          {isAudioPlaying ? "Dừng đọc" : "Đọc to"}
                        </Button>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12 h-80 flex flex-col items-center justify-center">
                    <Brain className="h-12 w-12 text-gray-300 mb-4" />
                    <h3 className="text-lg font-medium mb-2">Chưa có tóm tắt</h3>
                    <p className="text-gray-500 mb-4">Tải lên tài liệu và nhấn "Tóm tắt ngay" để xem kết quả.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold mb-4">Cách sử dụng tính năng tóm tắt AI</h2>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="bg-green-100 rounded-full p-2 mt-1">
                  <span className="text-green-600 font-bold">1</span>
                </div>
                <div>
                  <h3 className="font-medium">Tải lên tài liệu</h3>
                  <p className="text-gray-600 mt-1">
                    Tải lên tài liệu PDF, Word hoặc văn bản thuần túy mà bạn muốn tóm tắt. Hệ thống hỗ trợ tài liệu có
                    kích thước tối đa 50MB.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="bg-green-100 rounded-full p-2 mt-1">
                  <span className="text-green-600 font-bold">2</span>
                </div>
                <div>
                  <h3 className="font-medium">Chọn định dạng tóm tắt</h3>
                  <p className="text-gray-600 mt-1">
                    Chọn định dạng tóm tắt phù hợp với nhu cầu của bạn: đoạn văn liền mạch, danh sách gạch đầu dòng hoặc
                    sơ đồ nội dung có cấu trúc.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="bg-green-100 rounded-full p-2 mt-1">
                  <span className="text-green-600 font-bold">3</span>
                </div>
                <div>
                  <h3 className="font-medium">Điều chỉnh độ dài</h3>
                  <p className="text-gray-600 mt-1">
                    Sử dụng thanh trượt để điều chỉnh độ dài của bản tóm tắt. Giá trị thấp hơn sẽ tạo ra bản tóm tắt
                    ngắn gọn hơn, trong khi giá trị cao hơn sẽ bao gồm nhiều chi tiết hơn.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="bg-green-100 rounded-full p-2 mt-1">
                  <span className="text-green-600 font-bold">4</span>
                </div>
                <div>
                  <h3 className="font-medium">Xem và sử dụng kết quả</h3>
                  <p className="text-gray-600 mt-1">
                    Sau khi xử lý, bạn có thể xem bản tóm tắt, sao chép vào clipboard hoặc sử dụng tính năng đọc to để
                    nghe nội dung tóm tắt.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
