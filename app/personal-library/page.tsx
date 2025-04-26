"use client"

import { useState } from "react"

interface Document {
  id: number
  title: string
  type: string
  category: string
  addedDate: string
  lastOpened?: string
  tags: string[]
  notes?: string
  isFavorite: boolean
  image: string
}

export default function PersonalLibraryPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: 1,
      title: "Tuyển chọn những bài luận văn phát triển sản phẩm du lịch mang tính thực tiễn cao",
      type: "pdf",
      category: "Luận văn & Báo cáo",
      addedDate: "08-05-2024",
      lastOpened: "15-05-2024",
      tags: ["du lịch", "marketing", "phát triển sản phẩm"],
      notes: "Tài liệu hay về phát triển sản phẩm du lịch, có nhiều ví dụ thực tế.",
      isFavorite: true,


\
