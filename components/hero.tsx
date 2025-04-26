"use client"

import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import { useRouter } from "next/navigation"
import { useRef, useState, useEffect } from "react"

const slides = [
  {
    image: "/slider1.png",
    title: "Luận văn trong tay, nhận ngay tiền thưởng",
    desc: "Tham gia cuộc thi, nhận thưởng lên tới 5 triệu/tuần!"
  },
  {
    image: "/slider2.png",
    title: "Tài liệu mới cập nhật liên tục",
    desc: "Hàng ngàn tài liệu mới mỗi ngày, đa dạng lĩnh vực."
  },
  {
    image: "/slider3.png",
    title: "Chia sẻ tài liệu, nhận hoa hồng hấp dẫn",
    desc: "Đăng tài liệu, nhận tiền về tài khoản dễ dàng."
  }
];

export function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  const handleNext = () => setCurrent((prev) => (prev + 1) % slides.length);

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
          {/* Slider */}
          <div className="w-full max-w-2xl mx-auto mt-6 relative">
            <div className="rounded-xl overflow-hidden shadow flex flex-col md:flex-row items-center bg-white">
              <img src={slides[current].image} alt={slides[current].title} className="w-full md:w-1/2 h-48 object-cover" />
              <div className="flex-1 p-6 text-left">
                <h3 className="text-xl font-bold mb-2 text-orange-600">{slides[current].title}</h3>
                <p className="text-gray-600">{slides[current].desc}</p>
              </div>
            </div>
            <button onClick={handlePrev} className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 shadow hover:bg-orange-100 transition hidden md:block">
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
            </button>
            <button onClick={handleNext} className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 shadow hover:bg-orange-100 transition hidden md:block">
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
            </button>
            <div className="flex justify-center mt-2 gap-2">
              {slides.map((_, idx) => (
                <button key={idx} onClick={() => setCurrent(idx)} className={`w-2 h-2 rounded-full ${current === idx ? "bg-orange-500" : "bg-gray-300"}`}></button>
              ))}
            </div>
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
