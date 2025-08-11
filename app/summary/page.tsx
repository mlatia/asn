"use client"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { CheckCircle } from "lucide-react"

export default function QuizSummaryPage() {
  const router = useRouter()

  const handleBackToTryout = () => {
    router.push("/tryout-saya")
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4 dark:bg-gray-950">
      <div className="w-full max-w-md rounded-lg bg-white p-8 text-center shadow-lg dark:bg-gray-800">
        <CheckCircle className="mx-auto mb-6 h-20 w-20 text-primary-blue" />
        <h1 className="mb-4 text-3xl font-bold text-primary-dark">Selamat!</h1>
        <p className="mb-6 text-lg text-primary-dark">
          {" "}
          Anda telah berhasil menyelesaikan
          <br />
          <span className="font-semibold text-primary-blue">TRYOUT SKD CPNS PART II</span>.
        </p>
        <p className="mb-8 text-gray-600 dark:text-gray-400">
          Kerja keras Anda membuahkan hasil. Mari lihat ringkasan performa Anda atau kembali ke daftar tryout untuk
          persiapan lebih lanjut.
        </p>
        <Button
          onClick={handleBackToTryout}
          className="w-full rounded-full bg-primary-blue py-3 text-lg text-white hover:bg-primary-blue-dark" // Use primary-blue and primary-blue-dark
        >
          Kembali ke Tryout Saya
        </Button>
      </div>
    </div>
  )
}
