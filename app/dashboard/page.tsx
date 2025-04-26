"use client"

import { Label } from "@/components/ui/label"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Download, FileText, BarChart3, Upload, Wallet, Settings, LogOut, Plus, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")

  // Mock data
  const stats = {
    balance: 1250000,
    uploads: 12,
    downloads: 345,
    earnings: 850000,
  }

  const recentDocuments = [
    {
      id: 1,
      title: "Tuyển chọn những bài luận văn phát triển sản phẩm du lịch mang tính thực tiễn cao",
      date: "08-5-2024",
      downloads: 32,
      earnings: 450000,
      image: "/placeholder.svg?height=100&width=150",
    },
    {
      id: 2,
      title: "Hướng dẫn làm đồ án hệ thống cung cấp điện cho xưởng cơ khí MỚI NHẤT 2020",
      date: "07-8-2024",
      downloads: 18,
      earnings: 250000,
      image: "/placeholder.svg?height=100&width=150",
    },
    {
      id: 3,
      title: "Top 10 tài liệu trắc nghiệm được lý có đáp án - Top Báo Cáo Thực Tập Tốt Nhất",
      date: "15-10-2024",
      downloads: 24,
      earnings: 150000,
      image: "/placeholder.svg?height=100&width=150",
    },
  ]

  const purchasedDocuments = [
    {
      id: 4,
      title: "Tổng hợp 10 tài liệu về thực tập động cơ hay nhất - Top Báo Cáo Thực Tập Tốt Nhất",
      date: "10-3-2024",
      price: 50000,
      image: "/placeholder.svg?height=100&width=150",
    },
    {
      id: 5,
      title: "10 Mẫu lý do chọn đề tài nghiên cứu - Hướng dẫn cách viết lý do chọn đề tài",
      date: "08-8-2024",
      price: 35000,
      image: "/placeholder.svg?height=100&width=150",
    },
  ]

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full md:w-64 shrink-0">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-20">
              <div className="flex items-center space-x-3 mb-6">
                <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                  <span className="font-bold text-green-600">NV</span>
                </div>
                <div>
                  <p className="font-medium">Nguyễn Văn A</p>
                  <p className="text-sm text-gray-500">user@example.com</p>
                </div>
              </div>

              <nav className="space-y-1">
                <Button
                  variant={activeTab === "overview" ? "default" : "ghost"}
                  className={`w-full justify-start ${activeTab === "overview" ? "bg-green-500 hover:bg-green-600" : ""}`}
                  onClick={() => setActiveTab("overview")}
                >
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Tổng quan
                </Button>
                <Button
                  variant={activeTab === "uploads" ? "default" : "ghost"}
                  className={`w-full justify-start ${activeTab === "uploads" ? "bg-green-500 hover:bg-green-600" : ""}`}
                  onClick={() => setActiveTab("uploads")}
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Tài liệu đã đăng
                </Button>
                <Button
                  variant={activeTab === "purchases" ? "default" : "ghost"}
                  className={`w-full justify-start ${activeTab === "purchases" ? "bg-green-500 hover:bg-green-600" : ""}`}
                  onClick={() => setActiveTab("purchases")}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Tài liệu đã mua
                </Button>
                <Button
                  variant={activeTab === "wallet" ? "default" : "ghost"}
                  className={`w-full justify-start ${activeTab === "wallet" ? "bg-green-500 hover:bg-green-600" : ""}`}
                  onClick={() => setActiveTab("wallet")}
                >
                  <Wallet className="h-4 w-4 mr-2" />
                  Ví của tôi
                </Button>
                <Button
                  variant={activeTab === "settings" ? "default" : "ghost"}
                  className={`w-full justify-start ${activeTab === "settings" ? "bg-green-500 hover:bg-green-600" : ""}`}
                  onClick={() => setActiveTab("settings")}
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Cài đặt
                </Button>
              </nav>

              <div className="pt-6 mt-6 border-t">
                <Button
                  variant="ghost"
                  className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Đăng xuất
                </Button>
              </div>
            </div>
          </div>

          {/* Main content */}
          <div className="flex-1">
            {activeTab === "overview" && (
              <div className="space-y-6">
                <h1 className="text-2xl font-bold">Tổng quan tài khoản</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-gray-500">Số dư</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{stats.balance.toLocaleString("vi-VN")} VNĐ</div>
                      <Button variant="link" className="p-0 h-auto text-green-500 hover:text-green-600">
                        Rút tiền
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-gray-500">Tài liệu đã đăng</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{stats.uploads}</div>
                      <Button variant="link" className="p-0 h-auto text-green-500 hover:text-green-600">
                        Xem tất cả
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-gray-500">Lượt tải</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{stats.downloads}</div>
                      <p className="text-xs text-gray-500">Tổng số lượt tải</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-gray-500">Doanh thu</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{stats.earnings.toLocaleString("vi-VN")} VNĐ</div>
                      <p className="text-xs text-gray-500">Tổng doanh thu</p>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Tài liệu gần đây</CardTitle>
                    <CardDescription>Các tài liệu bạn đã đăng gần đây và thống kê của chúng</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentDocuments.map((doc) => (
                        <div key={doc.id} className="flex items-center space-x-4">
                          <div className="relative h-16 w-24 shrink-0">
                            <Image
                              src={doc.image || "/placeholder.svg"}
                              alt={doc.title}
                              fill
                              className="object-cover rounded"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <Link
                              href={`/document/${doc.id}`}
                              className="text-sm font-medium hover:text-green-500 line-clamp-2"
                            >
                              {doc.title}
                            </Link>
                            <p className="text-xs text-gray-500">
                              Ngày đăng: {doc.date} • Lượt tải: {doc.downloads}
                            </p>
                          </div>
                          <div className="text-right shrink-0">
                            <p className="text-sm font-medium">{doc.earnings.toLocaleString("vi-VN")} VNĐ</p>
                            <p className="text-xs text-gray-500">Doanh thu</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 text-center">
                      <Button variant="outline" className="w-full">
                        Xem tất cả tài liệu
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === "uploads" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h1 className="text-2xl font-bold">Tài liệu đã đăng</h1>
                  <Link href="/upload">
                    <Button className="bg-green-500 hover:bg-green-600">
                      <Plus className="h-4 w-4 mr-2" />
                      Đăng tài liệu mới
                    </Button>
                  </Link>
                </div>

                <div className="flex items-center space-x-2">
                  <Search className="h-4 w-4 text-gray-500" />
                  <Input placeholder="Tìm kiếm tài liệu..." className="max-w-sm" />
                </div>

                <Tabs defaultValue="all">
                  <TabsList>
                    <TabsTrigger value="all">Tất cả</TabsTrigger>
                    <TabsTrigger value="published">Đã xuất bản</TabsTrigger>
                    <TabsTrigger value="draft">Bản nháp</TabsTrigger>
                  </TabsList>
                  <TabsContent value="all" className="space-y-4 mt-4">
                    {recentDocuments.map((doc) => (
                      <Card key={doc.id}>
                        <CardContent className="p-4">
                          <div className="flex items-center space-x-4">
                            <div className="relative h-16 w-24 shrink-0">
                              <Image
                                src={doc.image || "/placeholder.svg"}
                                alt={doc.title}
                                fill
                                className="object-cover rounded"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <Link
                                href={`/document/${doc.id}`}
                                className="text-sm font-medium hover:text-green-500 line-clamp-2"
                              >
                                {doc.title}
                              </Link>
                              <p className="text-xs text-gray-500">
                                Ngày đăng: {doc.date} • Lượt tải: {doc.downloads}
                              </p>
                            </div>
                            <div className="text-right shrink-0">
                              <p className="text-sm font-medium">{doc.earnings.toLocaleString("vi-VN")} VNĐ</p>
                              <div className="flex space-x-2 mt-2">
                                <Button variant="outline" size="sm">
                                  Chỉnh sửa
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="text-red-500 hover:text-red-600 hover:bg-red-50"
                                >
                                  Xóa
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </TabsContent>
                  <TabsContent value="published" className="space-y-4 mt-4">
                    {recentDocuments.map((doc) => (
                      <Card key={doc.id}>
                        <CardContent className="p-4">
                          <div className="flex items-center space-x-4">
                            <div className="relative h-16 w-24 shrink-0">
                              <Image
                                src={doc.image || "/placeholder.svg"}
                                alt={doc.title}
                                fill
                                className="object-cover rounded"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <Link
                                href={`/document/${doc.id}`}
                                className="text-sm font-medium hover:text-green-500 line-clamp-2"
                              >
                                {doc.title}
                              </Link>
                              <p className="text-xs text-gray-500">
                                Ngày đăng: {doc.date} • Lượt tải: {doc.downloads}
                              </p>
                            </div>
                            <div className="text-right shrink-0">
                              <p className="text-sm font-medium">{doc.earnings.toLocaleString("vi-VN")} VNĐ</p>
                              <div className="flex space-x-2 mt-2">
                                <Button variant="outline" size="sm">
                                  Chỉnh sửa
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="text-red-500 hover:text-red-600 hover:bg-red-50"
                                >
                                  Xóa
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </TabsContent>
                  <TabsContent value="draft" className="mt-4">
                    <div className="text-center py-12">
                      <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-medium">Không có bản nháp</h3>
                      <p className="text-gray-500 mb-4">Bạn chưa có tài liệu nào ở dạng bản nháp</p>
                      <Link href="/upload">
                        <Button className="bg-green-500 hover:bg-green-600">
                          <Plus className="h-4 w-4 mr-2" />
                          Tạo tài liệu mới
                        </Button>
                      </Link>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            )}

            {activeTab === "purchases" && (
              <div className="space-y-6">
                <h1 className="text-2xl font-bold">Tài liệu đã mua</h1>

                <div className="flex items-center space-x-2">
                  <Search className="h-4 w-4 text-gray-500" />
                  <Input placeholder="Tìm kiếm tài liệu..." className="max-w-sm" />
                </div>

                <div className="space-y-4">
                  {purchasedDocuments.map((doc) => (
                    <Card key={doc.id}>
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-4">
                          <div className="relative h-16 w-24 shrink-0">
                            <Image
                              src={doc.image || "/placeholder.svg"}
                              alt={doc.title}
                              fill
                              className="object-cover rounded"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <Link
                              href={`/document/${doc.id}`}
                              className="text-sm font-medium hover:text-green-500 line-clamp-2"
                            >
                              {doc.title}
                            </Link>
                            <p className="text-xs text-gray-500">
                              Ngày mua: {doc.date} • Giá: {doc.price.toLocaleString("vi-VN")} VNĐ
                            </p>
                          </div>
                          <div className="shrink-0">
                            <Button variant="outline" size="sm">
                              <Download className="h-4 w-4 mr-2" />
                              Tải xuống
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "wallet" && (
              <div className="space-y-6">
                <h1 className="text-2xl font-bold">Ví của tôi</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Số dư hiện tại</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-green-500">
                        {stats.balance.toLocaleString("vi-VN")} VNĐ
                      </div>
                      <div className="flex space-x-4 mt-4">
                        <Button className="bg-green-500 hover:bg-green-600">Rút tiền</Button>
                        <Button variant="outline">Nạp tiền</Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Thống kê doanh thu</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-500">Tổng doanh thu:</span>
                          <span className="font-medium">{stats.earnings.toLocaleString("vi-VN")} VNĐ</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Đã rút:</span>
                          <span className="font-medium">0 VNĐ</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Số dư khả dụng:</span>
                          <span className="font-medium">{stats.balance.toLocaleString("vi-VN")} VNĐ</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Lịch sử giao dịch</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-12">
                      <Wallet className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-medium">Chưa có giao dịch nào</h3>
                      <p className="text-gray-500">Lịch sử giao dịch của bạn sẽ xuất hiện ở đây</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === "settings" && (
              <div className="space-y-6">
                <h1 className="text-2xl font-bold">Cài đặt tài khoản</h1>

                <Card>
                  <CardHeader>
                    <CardTitle>Thông tin cá nhân</CardTitle>
                    <CardDescription>Cập nhật thông tin cá nhân của bạn</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Họ và tên</Label>
                          <Input id="name" defaultValue="Nguyễn Văn A" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input id="email" defaultValue="user@example.com" disabled />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Số điện thoại</Label>
                          <Input id="phone" placeholder="Nhập số điện thoại" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="address">Địa chỉ</Label>
                          <Input id="address" placeholder="Nhập địa chỉ" />
                        </div>
                      </div>
                      <Button className="bg-green-500 hover:bg-green-600">Lưu thay đổi</Button>
                    </form>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Đổi mật khẩu</CardTitle>
                    <CardDescription>Cập nhật mật khẩu của bạn để bảo mật tài khoản</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="current-password">Mật khẩu hiện tại</Label>
                        <Input id="current-password" type="password" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="new-password">Mật khẩu mới</Label>
                        <Input id="new-password" type="password" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirm-password">Xác nhận mật khẩu mới</Label>
                        <Input id="confirm-password" type="password" />
                      </div>
                      <Button className="bg-green-500 hover:bg-green-600">Đổi mật khẩu</Button>
                    </form>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Thông tin thanh toán</CardTitle>
                    <CardDescription>Cập nhật thông tin thanh toán để nhận tiền từ việc bán tài liệu</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="bank-name">Tên ngân hàng</Label>
                          <Input id="bank-name" placeholder="Ví dụ: Vietcombank" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="account-number">Số tài khoản</Label>
                          <Input id="account-number" placeholder="Nhập số tài khoản" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="account-name">Tên chủ tài khoản</Label>
                          <Input id="account-name" placeholder="Nhập tên chủ tài khoản" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="branch">Chi nhánh</Label>
                          <Input id="branch" placeholder="Nhập chi nhánh ngân hàng" />
                        </div>
                      </div>
                      <Button className="bg-green-500 hover:bg-green-600">Lưu thông tin</Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
