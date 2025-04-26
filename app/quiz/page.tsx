"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Upload, ListChecks, CheckCircle2, XCircle } from "lucide-react"

interface QuizQuestion {
  id: number
  question: string
  options: string[]
  answer: number // index của đáp án đúng
  explanation?: string
}

const mockQuiz: QuizQuestion[] = [
  {
    id: 1,
    question: "Which of the following is a prime number?",
    options: ["4", "6", "7", "9"],
    answer: 2,
    explanation: "7 là số nguyên tố duy nhất trong các lựa chọn.",
  },
  {
    id: 2,
    question: "What is the capital of France?",
    options: ["Berlin", "London", "Paris", "Madrid"],
    answer: 2,
    explanation: "Paris là thủ đô của Pháp.",
  },
  // Thêm các câu hỏi khác nếu muốn
]

export default function QuizPage() {
  const [file, setFile] = useState<File | null>(null)
  const [quiz, setQuiz] = useState<QuizQuestion[] | null>(null)
  const [userAnswers, setUserAnswers] = useState<number[]>([])
  const [submitted, setSubmitted] = useState(false)

  // Xử lý upload file (mock)
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
      // Giả lập gọi AI backend, ở đây chỉ dùng mockQuiz
      setQuiz(mockQuiz)
      setUserAnswers(Array(mockQuiz.length).fill(-1))
      setSubmitted(false)
    }
  }

  // Chọn đáp án
  const handleSelect = (qIdx: number, optIdx: number) => {
    if (submitted) return
    setUserAnswers((prev) => {
      const next = [...prev]
      next[qIdx] = optIdx
      return next
    })
  }

  // Nộp bài
  const handleSubmit = () => {
    setSubmitted(true)
  }

  // Tính điểm
  const score = quiz
    ? quiz.reduce((acc, q, idx) => acc + (userAnswers[idx] === q.answer ? 1 : 0), 0)
    : 0

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <ListChecks className="h-6 w-6 text-cyan-500" />
          Quiz tự động từ tài liệu
        </h1>

        {/* Bước 1: Upload file */}
        {!quiz && (
          <Card className="max-w-xl mx-auto">
            <CardContent className="p-6 flex flex-col items-center">
              <Upload className="h-10 w-10 text-gray-400 mb-4" />
              <p className="mb-4 text-gray-600 text-center">
                Tải lên file đề cương, đề thi hoặc giáo trình để tạo quiz tự động.
              </p>
              <Input type="file" accept=".pdf,.docx,.txt" onChange={handleFileChange} />
            </CardContent>
          </Card>
        )}

        {/* Bước 2: Hiển thị quiz */}
        {quiz && (
          <div className="max-w-2xl mx-auto">
            {quiz.map((q, idx) => (
              <Card key={q.id} className="mb-6">
                <CardContent className="p-4">
                  <div className="font-semibold mb-2">
                    Câu {idx + 1}: {q.question}
                  </div>
                  <div className="space-y-2">
                    {q.options.map((opt, optIdx) => (
                      <div
                        key={optIdx}
                        className={`flex items-center gap-2 p-2 rounded cursor-pointer
                          ${userAnswers[idx] === optIdx ? "bg-cyan-100" : ""}
                          ${submitted && q.answer === optIdx ? "border border-green-500" : ""}
                        `}
                        onClick={() => handleSelect(idx, optIdx)}
                      >
                        <input
                          type="radio"
                          checked={userAnswers[idx] === optIdx}
                          readOnly
                        />
                        <span>{opt}</span>
                        {submitted && userAnswers[idx] === optIdx && (
                          userAnswers[idx] === q.answer ? (
                            <CheckCircle2 className="h-4 w-4 text-green-500" />
                          ) : (
                            <XCircle className="h-4 w-4 text-red-500" />
                          )
                        )}
                      </div>
                    ))}
                  </div>
                  {/* Hiển thị giải thích nếu đã nộp bài */}
                  {submitted && (
                    <div className="mt-2 text-sm text-gray-500">
                      <b>Giải thích:</b> {q.explanation}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}

            {/* Nộp bài & kết quả */}
            {!submitted ? (
              <Button className="w-full" onClick={handleSubmit}>
                Nộp bài
              </Button>
            ) : (
              <div className="text-center mt-4">
                <div className="text-lg font-bold text-cyan-600">
                  Kết quả: {score}/{quiz.length} câu đúng
                </div>
                <Button className="mt-4" onClick={() => setQuiz(null)}>
                  Làm lại quiz khác
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
      <Footer />
    </main>
  )
}