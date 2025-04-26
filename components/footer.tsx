import Link from "next/link"
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-white border-t">
      <div className="container mx-auto px-4 pt-12 pb-4">
        {/* Logo 123doc ở trên, căn giữa */}
        <div className="flex justify-center mb-8">
          <span className="text-4xl font-bold italic">
            <span className="text-orange-500">123</span>
            <span className="text-green-500">doc</span>
          </span>
        </div>
        {/* 3 cột nội dung */}
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row md:justify-between md:items-start text-center md:text-left gap-8">
          {/* Hỗ trợ khách hàng */}
          <div className="flex-1 mb-8 md:mb-0">
            <h3 className="font-bold text-gray-500 mb-4 uppercase">Hỗ trợ khách hàng</h3>
            <ul className="space-y-3">
              <li className="flex items-center justify-center md:justify-start">
                <Mail className="h-5 w-5 text-green-500 mr-2" />
                <span className="text-gray-600">info@123doc.org</span>
              </li>
              <li className="flex items-center justify-center md:justify-start">
                <svg className="h-5 w-5 mr-2" viewBox="0 0 32 32"><circle cx="16" cy="16" r="16" fill="#6001d2"/><path fill="#fff" d="M23.1 21.6c-.3-.2-1.7-.8-2-1-1.1-.4-1.3-.6-1.8.3-.2.3-.7 1-1 1.2-.2.1-.5.1-.8-.1-.2-.1-.9-.3-1.7-1-.6-.5-1-1.1-1.1-1.3-.1-.2 0-.5.1-.6.1-.1.2-.3.4-.5.1-.2.2-.3.3-.5.1-.2.1-.4 0-.6-.1-.2-.8-2-1.1-2.7-.3-.7-.6-.6-.8-.6h-.6c-.2 0-.5.1-.7.3-.2.2-1 1-1 2.4 0 1.4 1 2.7 1.1 2.9.1.2 2.1 3.2 5.1 4.1.7.2 1.2.3 1.6.3.7 0 1.3-.3 1.5-.7.2-.4.2-1.1.1-1.2z"/></svg>
                <span className="text-gray-600">Yahoo</span>
              </li>
              <li className="flex items-center justify-center md:justify-start">
                <svg className="h-5 w-5 mr-2" viewBox="0 0 32 32"><circle cx="16" cy="16" r="16" fill="#00aff0"/><path fill="#fff" d="M23.5 20.7c-.3-.2-1.7-.8-2-1-1.1-.4-1.3-.6-1.8.3-.2.3-.7 1-1 1.2-.2.1-.5.1-.8-.1-.2-.1-.9-.3-1.7-1-.6-.5-1-1.1-1.1-1.3-.1-.2 0-.5.1-.6.1-.1.2-.3.4-.5.1-.2.2-.3.3-.5.1-.2.1-.4 0-.6-.1-.2-.8-2-1.1-2.7-.3-.7-.6-.6-.8-.6h-.6c-.2 0-.5.1-.7.3-.2.2-1 1-1 2.4 0 1.4 1 2.7 1.1 2.9.1.2 2.1 3.2 5.1 4.1.7.2 1.2.3 1.6.3.7 0 1.3-.3 1.5-.7.2-.4.2-1.1.1-1.2z"/></svg>
                <span className="text-gray-600">Skype</span>
              </li>
            </ul>
          </div>
          {/* Giúp đỡ */}
          <div className="flex-1 mb-8 md:mb-0">
            <h3 className="font-bold text-gray-500 mb-4 uppercase">Giúp đỡ</h3>
            <ul className="space-y-3">
              <li>
                <Link href="#" className="text-gray-600 hover:text-green-500">Câu hỏi thường gặp</Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-green-500">Điều khoản sử dụng</Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-green-500">Quy định chính sách bán tài liệu</Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-green-500">Hướng dẫn thanh toán</Link>
              </li>
            </ul>
          </div>
          {/* Giới thiệu */}
          <div className="flex-1">
            <h3 className="font-bold text-gray-500 mb-4 uppercase">Giới thiệu</h3>
            <ul className="space-y-3">
              <li>
                <Link href="#" className="text-gray-600 hover:text-green-500">123doc là gì?</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t mt-8 pt-4 text-center text-gray-500 text-sm">
          Copyright © 2020 123DOC. Designed by 123DOC
        </div>
      </div>
    </footer>
  )
}
