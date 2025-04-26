import Link from "next/link"
import Image from "next/image"
import { Download, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

interface FeaturedDocumentsProps {
  title: string
}

export function FeaturedDocuments({ title }: FeaturedDocumentsProps) {
  // Mock data for documents
  const documents = [
    {
      id: 1,
      title: "Tuyển chọn những bài luận văn phát triển sản phẩm du lịch mang tính thực tiễn cao",
      date: "08-5-2024",
      views: 1250,
      downloads: 320,
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 2,
      title: "Hướng dẫn làm đồ án hệ thống cung cấp điện cho xưởng cơ khí MỚI NHẤT 2020",
      date: "07-8-2024",
      views: 980,
      downloads: 245,
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 3,
      title: "Top 10 tài liệu trắc nghiệm được lý có đáp án - Top Báo Cáo Thực Tập Tốt Nhất",
      date: "15-10-2024",
      views: 1560,
      downloads: 410,
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 4,
      title: "Tổng hợp 10 tài liệu về thực tập động cơ hay nhất - Top Báo Cáo Thực Tập Tốt Nhất",
      date: "10-3-2024",
      views: 890,
      downloads: 210,
      image: "/placeholder.svg?height=200&width=300",
    },
  ]

  return (
    <section className="py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">{title}</h2>
        <Button variant="link" className="text-green-500 hover:text-green-600">
          Xem tất cả
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {documents.map((doc) => (
          <Card key={doc.id} className="overflow-hidden border hover:shadow-md transition-shadow">
            <Link href={`/document/${doc.id}`}>
              <div className="relative h-40 w-full">
                <Image src={doc.image || "/placeholder.svg"} alt={doc.title} fill className="object-cover" />
                <div className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
                  {doc.date}
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="font-medium line-clamp-2 hover:text-green-500 transition-colors">{doc.title}</h3>
              </CardContent>
              <CardFooter className="p-4 pt-0 flex items-center text-sm text-gray-500">
                <div className="flex items-center mr-4">
                  <Eye className="h-4 w-4 mr-1" />
                  <span>{doc.views}</span>
                </div>
                <div className="flex items-center">
                  <Download className="h-4 w-4 mr-1" />
                  <span>{doc.downloads}</span>
                </div>
              </CardFooter>
            </Link>
          </Card>
        ))}
      </div>
    </section>
  )
}
