"use client"

import { Sidebar } from "@/components/layout/sidebar"
import { Header } from "@/components/layout/header"
import { QuizMain } from "@/components/quiz/quiz-main"
import { QuizPanel } from "@/components/quiz/quiz-panel"
import { TimeUpDialog } from "@/components/quiz/time-up-dialog"
import { QuizProvider } from "@/context/quiz-context"

export default function QuizPage() {
  return (
    <QuizProvider>
      <div className="flex min-h-screen bg-[#F3F7FC] dark:bg-gray-950">
        <Sidebar />
        <div className="flex flex-col flex-1 min-h-screen">
          <Header />
          <div className="flex flex-col md:flex-row flex-1 p-4 gap-4 min-h-0">
            <QuizMain />
            <QuizPanel />
          </div>
        </div>
        <TimeUpDialog />
      </div>
    </QuizProvider>
  )
}