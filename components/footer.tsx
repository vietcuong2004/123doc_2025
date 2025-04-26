import Link from "next/link"
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gray-100 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <span className="text-2xl font-bold text-orange-500">123</span>
              <span className="text-2xl font-bold text-green-500">doc</span>
            </Link>
            <p className="text-gray-600 mb-4">
              Nền tảng chia sẻ và bán tài liệu học tập hàng đầu Việt Nam với hàng triệu tài liệu chất lượng cao.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-green-500">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="text-gray-600 hover:text-green-500">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="text-gray-600 hover:text-green-500">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className="text-gray-600 hover:text-green-500">
                <Youtube className="h-5 w-5" />
                <span className="sr-only">Youtube</span>
              </a>
            </div>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Liên kết nhanh</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-600 hover:text-green-500">
                  Giới thiệu
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-600 hover:text-green-500">
                  Điều khoản sử dụng
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-600 hover:text-green-500">
                  Chính sách bảo mật
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-600 hover:text-green-500">
                  Câu hỏi thường gặp
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-green-500">
                  Liên hệ
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Danh mục</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/category/de-thi" className="text-gray-600 hover:text-green-500">
                  Đề thi & Kiểm tra
                </Link>
              </li>
              <li>
                <Link href="/category/luan-van" className="text-gray-600 hover:text-green-500">
                  Luận văn & Báo cáo
                </Link>
              </li>
              <li>
                <Link href="/category/bai-giang" className="text-gray-600 hover:text-green-500">
                  Bài giảng & Slide
                </Link>
              </li>
              <li>
                <Link href="/category/giao-trinh" className="text-gray-600 hover:text-green-500">
                  Giáo trình
                </Link>
              </li>
              <li>
                <Link href="/category/bieu-mau" className="text-gray-600 hover:text-green-500">
                  Biểu mẫu & Hợp đồng
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Liên hệ</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 text-green-500 shrink-0 mt-0.5" />
                <span className="text-gray-600">Tòa nhà 123Doc, Số 123 Đường ABC, Quận XYZ, Hà Nội</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-green-500" />
                <a href="tel:+84123456789" className="text-gray-600 hover:text-green-500">
                  (84) 123 456 789
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-green-500" />
                <a href="mailto:info@123doc.com" className="text-gray-600 hover:text-green-500">
                  info@123doc.com
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t mt-12 pt-8 text-center text-gray-600">
          <p>© {new Date().getFullYear()} 123Doc. Tất cả các quyền được bảo lưu.</p>
        </div>
      </div>
    </footer>
  )
}
