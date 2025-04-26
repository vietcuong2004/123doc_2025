import Link from "next/link"
import Image from "next/image"
import { Download, Eye, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface SearchResult {
  id: number
  title: string
  date: string
  views: number
  downloads: number
  rating: number
  price: number
  image: string
}

interface SearchResultsProps {
  results: SearchResult[]
}

export function SearchResults({ results }: SearchResultsProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <p className="text-gray-500">Hiển thị {results.length} kết quả</p>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">Sắp xếp theo:</span>
          <select className="text-sm border rounded-md px-2 py-1">
            <option value="relevance">Độ phù hợp</option>
            <option value="newest">Mới nhất</option>
            <option value="price-asc">Giá: Thấp đến cao</option>
            <option value="price-desc">Giá: Cao đến thấp</option>
            <option value="rating">Đánh giá</option>
            <option value="downloads">Lượt tải</option>
          </select>
        </div>
      </div>

      {results.map((result) => (
        <Card key={result.id} className="overflow-hidden">
          <CardContent className="p-0">
            <div className="flex flex-col sm:flex-row">
              <div className="relative h-48 sm:h-auto sm:w-48 shrink-0">
                <Image src={result.image || "/placeholder.svg"} alt={result.title} fill className="object-cover" />
              </div>
              <div className="p-4 flex flex-col flex-1">
                <div className="flex-1">
                  <Link href={`/document/${result.id}`} className="hover:text-green-500">
                    <h3 className="font-medium text-lg mb-2">{result.title}</h3>
                  </Link>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-500 mb-3">
                    <div className="flex items-center">
                      <Eye className="h-4 w-4 mr-1" />
                      <span>{result.views}</span>
                    </div>
                    <div className="flex items-center">
                      <Download className="h-4 w-4 mr-1" />
                      <span>{result.downloads}</span>
                    </div>
                    <div className="flex items-center">
                      <div className="flex mr-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < Math.floor(result.rating)
                                ? "text-yellow-400 fill-yellow-400"
                                : i < result.rating
                                  ? "text-yellow-400 fill-yellow-400 opacity-50"
                                  : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span>{result.rating}</span>
                    </div>
                    <div>Ngày đăng: {result.date}</div>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <div className="text-lg font-bold text-green-500">{result.price.toLocaleString("vi-VN")} VNĐ</div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      Xem chi tiết
                    </Button>
                    <Button size="sm" className="bg-green-500 hover:bg-green-600">
                      Mua ngay
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
