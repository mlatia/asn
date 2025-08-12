"use client"

import { Clock } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useQuiz } from "@/context/quiz-context"
import Image from "next/image";

export function QuizPanel() {
  const {
    formattedTime,
    progressPercentage,
    answeredCount,
    totalQuestions,
    currentQuestionIndex,
    answers,
    goToQuestion,
    finishQuiz,
    quizFinished,
  } = useQuiz()

  const getQuestionStatusClass = (questionId: number) => {
    const isCurrent = questionId - 1 === currentQuestionIndex
    const isAnswered = answers[questionId] !== undefined

    if (isCurrent) {
      return "border border-2 text-primary-blue border-primary-blue"
    } else if (isAnswered) {
      return "bg-primary-blue text-white border-primary-blue"
    } else {
      return "bg-[#F3F7FC] text-primary-dark border-gray-200 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-600"
    }
  }

  return (
    <aside className="w-full md:w-[320px] flex flex-col gap-4">
      <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg">
        <div className="p-6">
          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-2 text-2xl font-bold text-primary-blue">
              <Image src="/timer.png" alt="Clock" width={24} height={24} className="h-6 w-6"/>
              <span>{formattedTime}</span>
            </div>
            <div className="w-full text-sm text-[#4D4D4B] dark:text-gray-400">
              <div className="flex justify-between mb-1">
                <span>Progres Soal</span>
                <span>{Math.round(progressPercentage)}%</span>
              </div>
              <Progress
                value={progressPercentage}
                className="h-2 bg-[#E7E7E9] [&>div]:bg-primary-blue"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg flex-1">
        <div className="px-6 py-6 overflow-y-auto quiz-content-scroll max-h-screen">
          <h3 className="text-lg font-semibold mb-4 text-primary-dark sticky top-0 bg-white dark:bg-gray-800 z-10">Daftar Soal</h3>
          <div className="grid grid-cols-5 gap-3">
            {Array.from({ length: totalQuestions }, (_, i) => (
              <Button
                key={i + 1}
                variant="outline"
                size="icon"
                onClick={() => goToQuestion(i)}
                disabled={quizFinished}
                className={cn("h-10 w-10 rounded-md text-sm font-medium border", getQuestionStatusClass(i + 1))}
              >
                {i + 1}
              </Button>
            ))}
          </div>
        </div>
      </div>
        <Button
          onClick={finishQuiz}
          disabled={quizFinished}
          className="w-full rounded-full py-2 text-primary-blue bg-white border border-primary-blue hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-blue"
        >
          Selesai
        </Button>
    </aside>
  )
}