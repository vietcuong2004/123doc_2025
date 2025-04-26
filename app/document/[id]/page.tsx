import { use } from "react"
import Image from "next/image"
import Link from "next/link"
import { Calendar, Download, Eye, Star, User } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import DocumentActions from "./DocumentActions"

export default function DocumentPage({ params }: { params: Promise<{ id: string }> }) {
  // Lấy params đã resolve
  const resolvedParams = use(params)

  // Mock data for document
  const document = {
    id: resolvedParams.id,
    title: "Tuyển chọn những bài luận văn phát triển sản phẩm du lịch mang tính thực tiễn cao",
    description:
      "Tài liệu này tổng hợp các bài luận văn xuất sắc về phát triển sản phẩm du lịch, bao gồm các nghiên cứu thực tiễn, phân tích thị trường và đề xuất chiến lược phát triển sản phẩm du lịch bền vững.",
    price: 50000,
    date: "08-5-2024",
    views: 1250,
    downloads: 320,
    rating: 4.5,
    reviews: 48,
    pages: 125,
    format: "PDF",
    author: "TS. Nguyễn Văn A",
    preview: "/placeholder.svg?height=600&width=400",
    relatedDocuments: [
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
    ],
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h1 className="text-2xl md:text-3xl font-bold mb-4">{document.title}</h1>

            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-6">
              <div className="flex items-center">
                <User className="h-4 w-4 mr-1" />
                <span>{document.author}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                <span>{document.date}</span>
              </div>
              <div className="flex items-center">
                <Eye className="h-4 w-4 mr-1" />
                <span>{document.views}</span>
              </div>
              <div className="flex items-center">
                <Download className="h-4 w-4 mr-1" />
                <span>{document.downloads}</span>
              </div>
              <div className="flex items-center">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(document.rating)
                          ? "text-yellow-400 fill-yellow-400"
                          : i < document.rating
                            ? "text-yellow-400 fill-yellow-400 opacity-50"
                            : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="ml-1">
                  {document.rating} ({document.reviews} đánh giá)
                </span>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
              <Image
                src={document.preview || "/placeholder.svg"}
                alt={document.title}
                width={800}
                height={600}
                className="w-full h-auto object-cover"
              />
            </div>

            <Tabs defaultValue="description" className="mb-8">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="description">Mô tả</TabsTrigger>
                <TabsTrigger value="details">Chi tiết</TabsTrigger>
                <TabsTrigger value="reviews">Đánh giá</TabsTrigger>
              </TabsList>
              <TabsContent value="description" className="p-4 bg-white rounded-b-lg shadow-sm">
                <p className="text-gray-700 leading-relaxed">{document.description}</p>
                <p className="text-gray-700 leading-relaxed mt-4">
                  Tài liệu này đặc biệt hữu ích cho sinh viên ngành Du lịch, Quản trị Khách sạn, và các nhà nghiên cứu
                  trong lĩnh vực phát triển du lịch bền vững. Nội dung bao gồm:
                </p>
                <ul className="list-disc list-inside mt-2 space-y-1 text-gray-700">
                  <li>Phân tích thị trường du lịch hiện tại</li>
                  <li>Các mô hình phát triển sản phẩm du lịch thành công</li>
                  <li>Chiến lược marketing cho sản phẩm du lịch mới</li>
                  <li>Nghiên cứu trường hợp từ các điểm đến du lịch nổi tiếng</li>
                  <li>Đề xuất giải pháp phát triển bền vững</li>
                </ul>
              </TabsContent>
              <TabsContent value="details" className="p-4 bg-white rounded-b-lg shadow-sm">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-medium text-gray-900">Thông tin cơ bản</h3>
                    <ul className="mt-2 space-y-2">
                      <li className="flex justify-between">
                        <span className="text-gray-500">Số trang:</span>
                        <span className="font-medium">{document.pages}</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-gray-500">Định dạng:</span>
                        <span className="font-medium">{document.format}</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-gray-500">Ngày đăng:</span>
                        <span className="font-medium">{document.date}</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-gray-500">Tác giả:</span>
                        <span className="font-medium">{document.author}</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Thống kê</h3>
                    <ul className="mt-2 space-y-2">
                      <li className="flex justify-between">
                        <span className="text-gray-500">Lượt xem:</span>
                        <span className="font-medium">{document.views}</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-gray-500">Lượt tải:</span>
                        <span className="font-medium">{document.downloads}</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-gray-500">Đánh giá:</span>
                        <span className="font-medium">{document.rating}/5</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-gray-500">Số lượng đánh giá:</span>
                        <span className="font-medium">{document.reviews}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="reviews" className="p-4 bg-white rounded-b-lg shadow-sm">
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="flex mr-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${
                            i < Math.floor(document.rating)
                              ? "text-yellow-400 fill-yellow-400"
                              : i < document.rating
                                ? "text-yellow-400 fill-yellow-400 opacity-50"
                                : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-lg font-medium">{document.rating} trên 5</span>
                  </div>
                  <p className="text-gray-500">Dựa trên {document.reviews} đánh giá</p>

                  <Separator />

                  <div className="space-y-4">
                    {/* Mock reviews */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center mr-2">
                            <User className="h-4 w-4 text-gray-500" />
                          </div>
                          <span className="font-medium">Nguyễn Văn B</span>
                        </div>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${i < 5 ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-700">
                        Tài liệu rất hữu ích, giúp tôi hoàn thành bài tập lớn một cách dễ dàng. Nội dung chi tiết và dễ
                        hiểu.
                      </p>
                      <p className="text-sm text-gray-500">15/04/2024</p>
                    </div>

                    <Separator />

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center mr-2">
                            <User className="h-4 w-4 text-gray-500" />
                          </div>
                          <span className="font-medium">Trần Thị C</span>
                        </div>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${i < 4 ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-700">
                        Nội dung khá đầy đủ, tuy nhiên có một số phần còn thiếu ví dụ minh họa cụ thể. Nhìn chung là tài
                        liệu tốt.
                      </p>
                      <p className="text-sm text-gray-500">02/05/2024</p>
                    </div>

                    <button className="w-full border rounded px-4 py-2 text-gray-700 hover:bg-gray-50">Xem thêm đánh giá</button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4">Tài liệu liên quan</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {document.relatedDocuments.map((doc) => (
                  <Link
                    key={doc.id}
                    href={`/document/${doc.id}`}
                    className="block bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="relative h-32">
                      <Image src={doc.image || "/placeholder.svg"} alt={doc.title} fill className="object-cover" />
                      <div className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
                        {doc.date}
                      </div>
                    </div>
                    <div className="p-3">
                      <h3 className="font-medium text-sm line-clamp-2 hover:text-green-500 transition-colors">
                        {doc.title}
                      </h3>
                      <div className="flex items-center text-xs text-gray-500 mt-2">
                        <div className="flex items-center mr-3">
                          <Eye className="h-3 w-3 mr-1" />
                          <span>{doc.views}</span>
                        </div>
                        <div className="flex items-center">
                          <Download className="h-3 w-3 mr-1" />
                          <span>{doc.downloads}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-20">
              <DocumentActions price={document.price} />

              <Separator className="my-6" />

              <div className="space-y-4">
                <h3 className="font-medium">Thông tin tài liệu</h3>
                <ul className="space-y-2">
                  <li className="flex justify-between text-sm">
                    <span className="text-gray-500">Số trang:</span>
                    <span>{document.pages}</span>
                  </li>
                  <li className="flex justify-between text-sm">
                    <span className="text-gray-500">Định dạng:</span>
                    <span>{document.format}</span>
                  </li>
                  <li className="flex justify-between text-sm">
                    <span className="text-gray-500">Ngày đăng:</span>
                    <span>{document.date}</span>
                  </li>
                  <li className="flex justify-between text-sm">
                    <span className="text-gray-500">Tác giả:</span>
                    <span>{document.author}</span>
                  </li>
                </ul>
              </div>

              <Separator className="my-6" />

              <div>
                <h3 className="font-medium mb-4">Hỗ trợ khách hàng</h3>
                <p className="text-sm text-gray-700 mb-2">
                  Nếu bạn có bất kỳ câu hỏi nào về tài liệu này, vui lòng liên hệ với chúng tôi.
                </p>
                <button className="text-green-500 hover:text-green-600 p-0 h-auto underline">Liên hệ hỗ trợ</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
