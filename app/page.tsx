import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { FeaturedDocuments } from "@/components/featured-documents"
import { Categories } from "@/components/categories"
import { Footer } from "@/components/footer"
import { Library, BookOpen, FileText, Bot, AudioLines, Repeat, ListChecks, Sparkles } from "lucide-react"

const tools = [
  {
    name: "Thư viện cá nhân",
    icon: <Library className="h-8 w-8 text-purple-500" />,
    description: "Quản lý, phân loại và truy xuất tài liệu của bạn.",
    href: "/personal-library",
  },
  {
    name: "Lộ trình học tập",
    icon: <BookOpen className="h-8 w-8 text-blue-500" />,
    description: "Tạo và theo dõi lộ trình học tập cá nhân hóa.",
    href: "/learning-path",
  },
  {
    name: "Tóm tắt tài liệu",
    icon: <FileText className="h-8 w-8 text-green-500" />,
    description: "Tóm tắt nhanh nội dung tài liệu bằng AI.",
    href: "/summarize",
  },
  {
    name: "Chuyển đổi định dạng",
    icon: <Repeat className="h-8 w-8 text-orange-500" />,
    description: "Chuyển đổi giữa các định dạng PDF, Word, PowerPoint.",
    href: "/convert",
  },
  {
    name: "Chatbot Tutor",
    icon: <Bot className="h-8 w-8 text-pink-500" />,
    description: "Trợ lý AI hỗ trợ học tập, giải đáp thắc mắc.",
    href: "/chatbot",
  },
  {
    name: "Text to Speech",
    icon: <AudioLines className="h-8 w-8 text-yellow-500" />,
    description: "Chuyển tóm tắt thành audio để nghe mọi lúc.",
    href: "/text-to-speech",
  },
  {
    name: "Quiz tự động",
    icon: <ListChecks className="h-8 w-8 text-cyan-500" />,
    description: "Tạo bài kiểm tra trắc nghiệm từ tài liệu.",
    href: "/quiz",
  },
  {
    name: "Đề xuất tài liệu",
    icon: <Sparkles className="h-8 w-8 text-emerald-500" />,
    description: "Gợi ý tài liệu phù hợp với bạn.",
    href: "/recommendations",
  },
]

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <div className="container mx-auto px-4 py-8">
        <Categories />

        {/* Danh mục công cụ */}
        <section className="my-10">
          <h2 className="text-2xl font-bold mb-6 text-center">Danh mục công cụ học tập</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {tools.map((tool) => (
              <Link href={tool.href} key={tool.name} className="group">
                <div className="border rounded-xl p-6 flex flex-col items-center bg-white shadow-sm hover:shadow-lg transition cursor-pointer h-full">
                  {tool.icon}
                  <h3 className="text-lg font-semibold mt-4 group-hover:text-primary">{tool.name}</h3>
                  <p className="text-gray-500 mt-2 text-center text-sm">{tool.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <FeaturedDocuments title="Tài liệu nổi bật" />
        <FeaturedDocuments title="Tài liệu mới nhất" />
        <FeaturedDocuments title="Tài liệu phổ biến" />
      </div>
      <Footer />
    </main>
  )
}
