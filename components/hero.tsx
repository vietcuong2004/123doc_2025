import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

export function Hero() {
  return (
    <section className="w-full py-12 md:py-16 lg:py-20 bg-gradient-to-r from-green-50 to-orange-50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Kho tài liệu học tập lớn nhất Việt Nam
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
              Hàng triệu tài liệu học tập, đề thi, bài giảng chất lượng cao từ các trường đại học và chuyên gia hàng
              đầu.
            </p>
          </div>
          <div className="w-full max-w-md space-y-2">
            <form className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Tìm kiếm tài liệu, đề thi, bài giảng..."
                className="w-full bg-white pl-8 pr-4 py-6 rounded-lg shadow-sm"
              />
              <Button type="submit" className="absolute right-1.5 top-1.5 bg-green-500 hover:bg-green-600">
                Tìm kiếm
              </Button>
            </form>
          </div>
          <div className="flex flex-wrap justify-center gap-2 text-sm text-gray-500">
            <span>Xu hướng tìm kiếm:</span>
            <a href="#" className="hover:text-green-500">
              Đề thi THPT
            </a>
            <span>•</span>
            <a href="#" className="hover:text-green-500">
              Luận văn
            </a>
            <span>•</span>
            <a href="#" className="hover:text-green-500">
              Bài giảng đại học
            </a>
            <span>•</span>
            <a href="#" className="hover:text-green-500">
              Đề cương ôn thi
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
