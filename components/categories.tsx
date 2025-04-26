import Link from "next/link"
import { Book, FileText, Presentation, FileSpreadsheet, FileQuestion, Award, BookOpen } from "lucide-react"

export function Categories() {
  const categories = [
    { name: "Đề thi & Kiểm tra", icon: FileQuestion, color: "bg-blue-100 text-blue-600" },
    { name: "Luận văn & Báo cáo", icon: Book, color: "bg-green-100 text-green-600" },
    { name: "Bài giảng & Slide", icon: Presentation, color: "bg-orange-100 text-orange-600" },
    { name: "Giáo trình", icon: BookOpen, color: "bg-purple-100 text-purple-600" },
    { name: "Biểu mẫu & Hợp đồng", icon: FileText, color: "bg-pink-100 text-pink-600" },
    { name: "Đồ án & Nghiên cứu", icon: Award, color: "bg-yellow-100 text-yellow-600" },
    { name: "Tài liệu khác", icon: FileSpreadsheet, color: "bg-gray-100 text-gray-600" },
  ]

  return (
    <section className="py-8">
      <h2 className="text-2xl font-bold mb-6">Danh mục tài liệu</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
        {categories.map((category, index) => (
          <Link
            key={index}
            href={`/category/${category.name.toLowerCase().replace(/\s+/g, "-")}`}
            className="flex flex-col items-center p-4 rounded-lg hover:shadow-md transition-shadow text-center"
          >
            <div className={`p-3 rounded-full ${category.color} mb-3`}>
              <category.icon className="h-6 w-6" />
            </div>
            <span className="text-sm font-medium">{category.name}</span>
          </Link>
        ))}
      </div>
    </section>
  )
}
