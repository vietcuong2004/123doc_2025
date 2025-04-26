"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { VolumeIcon, Pause, Play, SkipBack, SkipForward, Download, FileText, Mic, Volume2 } from "lucide-react"

export default function TextToSpeech() {
  const [text, setText] = useState<string>("")
  const [voice, setVoice] = useState<string>("female")
  const [speed, setSpeed] = useState<number>(1)
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatingProgress, setGeneratingProgress] = useState(0)
  const [audioUrl, setAudioUrl] = useState<string | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)

  const audioRef = useRef<HTMLAudioElement | null>(null)

  // Thêm vào sau các khai báo state
  useEffect(() => {
    // Kiểm tra xem có dữ liệu tóm tắt được chuyển từ trang summarize không
    const summaryText = localStorage.getItem("summaryText")
    if (summaryText) {
      setText(summaryText)
      // Xóa dữ liệu từ localStorage sau khi đã sử dụng
      localStorage.removeItem("summaryText")
    }
  }, [])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.playbackRate = speed
    }
  }, [speed])

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value)
  }

  const handleGenerate = () => {
    if (!text.trim()) return

    setIsGenerating(true)
    setGeneratingProgress(0)
    setAudioUrl(null)

    // Simulate TTS generation with progress
    const interval = setInterval(() => {
      setGeneratingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsGenerating(false)

          // In a real app, you would get the audio URL from the API
          // For this demo, we'll use a mock audio URL
          setAudioUrl("https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3")

          return 100
        }
        return prev + 5
      })
    }, 100)
  }

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime)
    }
  }

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration)
    }
  }

  const handleSeek = (value: number[]) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value[0]
      setCurrentTime(value[0])
    }
  }

  const handleRestart = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0
      setCurrentTime(0)
      if (!isPlaying) {
        audioRef.current.play()
        setIsPlaying(true)
      }
    }
  }

  const handleForward = () => {
    if (audioRef.current) {
      const newTime = Math.min(audioRef.current.currentTime + 10, duration)
      audioRef.current.currentTime = newTime
      setCurrentTime(newTime)
    }
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl md:text-3xl font-bold">Chuyển tóm tắt sang audio (TTS)</h1>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <div className="flex items-start space-x-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <VolumeIcon className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h2 className="text-lg font-medium mb-2">Nghe tài liệu mọi lúc, mọi nơi</h2>
                <p className="text-gray-600">
                  Chuyển văn bản thành giọng nói tự nhiên với nhiều tùy chọn giọng đọc. Lý tưởng cho việc học tập khi di
                  chuyển, luyện nghe ngoại ngữ hoặc hỗ trợ người có vấn đề về thị lực.
                </p>
              </div>
            </div>
          </div>

          <Tabs defaultValue="text" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="text">Văn bản sang giọng nói</TabsTrigger>
              <TabsTrigger value="history">Lịch sử của tôi</TabsTrigger>
            </TabsList>

            <TabsContent value="text">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Nhập văn bản</CardTitle>
                    <CardDescription>Nhập hoặc dán văn bản bạn muốn chuyển thành giọng nói</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <Textarea
                        placeholder="Nhập hoặc dán văn bản vào đây..."
                        className="min-h-[200px] resize-none"
                        value={text}
                        onChange={handleTextChange}
                      />

                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label>Giọng đọc</Label>
                          <Select value={voice} onValueChange={setVoice}>
                            <SelectTrigger>
                              <SelectValue placeholder="Chọn giọng đọc" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="female">Nữ - Miền Bắc</SelectItem>
                              <SelectItem value="male">Nam - Miền Bắc</SelectItem>
                              <SelectItem value="female-south">Nữ - Miền Nam</SelectItem>
                              <SelectItem value="male-south">Nam - Miền Nam</SelectItem>
                              <SelectItem value="female-central">Nữ - Miền Trung</SelectItem>
                              <SelectItem value="male-central">Nam - Miền Trung</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <Label>Tốc độ đọc: {speed}x</Label>
                          </div>
                          <Slider
                            defaultValue={[1]}
                            min={0.5}
                            max={2}
                            step={0.1}
                            value={[speed]}
                            onValueChange={(value) => setSpeed(value[0])}
                          />
                          <div className="flex justify-between text-xs text-gray-500">
                            <span>0.5x</span>
                            <span>1x</span>
                            <span>1.5x</span>
                            <span>2x</span>
                          </div>
                        </div>

                        {isGenerating && (
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>Đang tạo audio...</span>
                              <span>{generatingProgress}%</span>
                            </div>
                            <Progress value={generatingProgress} className="h-2" />
                          </div>
                        )}

                        <Button
                          className="w-full bg-green-500 hover:bg-green-600"
                          disabled={!text.trim() || isGenerating}
                          onClick={handleGenerate}
                        >
                          {isGenerating ? "Đang xử lý..." : "Tạo audio"}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Trình phát audio</CardTitle>
                    <CardDescription>Nghe và tải xuống file audio đã tạo</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {audioUrl ? (
                      <div className="space-y-6">
                        <div className="bg-gray-50 rounded-lg p-6 flex flex-col items-center justify-center min-h-[200px]">
                          <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                            <Volume2 className="h-12 w-12 text-blue-500" />
                          </div>
                          <p className="text-center text-gray-500 mb-2">
                            {isPlaying ? "Đang phát..." : "Sẵn sàng phát"}
                          </p>
                          <audio
                            ref={audioRef}
                            src={audioUrl}
                            onTimeUpdate={handleTimeUpdate}
                            onLoadedMetadata={handleLoadedMetadata}
                            onEnded={() => setIsPlaying(false)}
                            className="hidden"
                          />
                        </div>

                        <div className="space-y-4">
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>{formatTime(currentTime)}</span>
                              <span>{formatTime(duration)}</span>
                            </div>
                            <Slider
                              value={[currentTime]}
                              max={duration || 100}
                              step={0.1}
                              onValueChange={handleSeek}
                              className="cursor-pointer"
                            />
                          </div>

                          <div className="flex items-center justify-center space-x-4">
                            <Button variant="outline" size="icon" onClick={handleRestart}>
                              <SkipBack className="h-4 w-4" />
                            </Button>
                            <Button
                              className="h-12 w-12 rounded-full bg-blue-500 hover:bg-blue-600"
                              onClick={handlePlayPause}
                            >
                              {isPlaying ? (
                                <Pause className="h-6 w-6 text-white" />
                              ) : (
                                <Play className="h-6 w-6 text-white" />
                              )}
                            </Button>
                            <Button variant="outline" size="icon" onClick={handleForward}>
                              <SkipForward className="h-4 w-4" />
                            </Button>
                          </div>

                          <Button variant="outline" className="w-full">
                            <Download className="h-4 w-4 mr-2" />
                            Tải xuống MP3
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center min-h-[300px] text-center">
                        <Mic className="h-12 w-12 text-gray-300 mb-4" />
                        <h3 className="text-lg font-medium mb-2">Chưa có audio</h3>
                        <p className="text-gray-500 mb-4">Nhập văn bản và nhấn "Tạo audio" để bắt đầu.</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="history">
              <Card>
                <CardHeader>
                  <CardTitle>Lịch sử audio của tôi</CardTitle>
                  <CardDescription>Các file audio bạn đã tạo gần đây</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">Chưa có lịch sử</h3>
                    <p className="text-gray-500 mb-4">
                      Bạn chưa tạo file audio nào. Hãy tạo file audio đầu tiên của bạn.
                    </p>
                    <Button
                      className="bg-green-500 hover:bg-green-600"
                      onClick={() => document.querySelector('[data-value="text"]')?.click()}
                    >
                      Tạo audio mới
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold mb-4">Ứng dụng của Text-to-Speech</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <div className="bg-blue-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-3">
                  <FileText className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-medium">Học tập linh hoạt</h3>
                <p className="text-gray-600">
                  Nghe tài liệu học tập khi di chuyển, tập thể dục hoặc làm việc nhà, giúp tận dụng thời gian hiệu quả.
                </p>
              </div>
              <div className="space-y-2">
                <div className="bg-blue-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-3">
                  <VolumeIcon className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-medium">Luyện nghe ngoại ngữ</h3>
                <p className="text-gray-600">
                  Chuyển văn bản sang giọng nói để luyện nghe và phát âm, đặc biệt hữu ích cho việc học ngoại ngữ.
                </p>
              </div>
              <div className="space-y-2">
                <div className="bg-blue-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-3">
                  <Mic className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-medium">Hỗ trợ người khiếm thị</h3>
                <p className="text-gray-600">
                  Giúp người có vấn đề về thị lực tiếp cận thông tin và tài liệu học tập dễ dàng hơn.
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
