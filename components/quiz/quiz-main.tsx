"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { useQuiz } from "@/context/quiz-context"

export function QuizMain() {
  const {
    currentQuestion,
    currentQuestionIndex,
    totalQuestions,
    selectedAnswerForCurrentQuestion,
    selectAnswer,
    prevQuestion,
    nextQuestion,
    quizFinished,
    finishQuiz,
  } = useQuiz()

  if (!currentQuestion) {
    return (
      <div className="flex-1 p-6 flex items-center justify-center text-muted-foreground">
        Loading question...
      </div>
    )
  }

  const isFirstQuestion = currentQuestionIndex === 0
  const isLastQuestion = currentQuestionIndex === totalQuestions - 1

  return (
    <main className="flex-1 bg-[#F3F7FC] dark:bg-gray-900 overflow-hidden">
      <div className="h-full bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 flex flex-col">
        <h2 className="text-xl font-bold mb-4 text-primary-dark">
          TRYOUT SKD CPNS PART II
        </h2>

        <div className="flex-1 flex flex-col overflow-hidden border-t border-gray-100 dark:border-gray-70 pt-4">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-primary-blue">
              Soal {currentQuestion.id}
            </h3>
            <div className="inline-block border border-primary-blue text-primary-blue text-xs font-medium px-2.5 py-0.5 rounded-full">
              {currentQuestion.category}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto pr-2 hide-scrollbar">
            <p className="text-primary-dark leading-relaxed mb-6">
              {currentQuestion.stem}
            </p>
            <div className="grid gap-3 mb-6">
              {currentQuestion.options.map((option) => (
                <button
                  key={option.label}
                  onClick={() =>
                    selectAnswer(currentQuestion.id, option.label)
                  }
                  disabled={quizFinished}
                  className={cn(
                    "flex items-center gap-3 p-4 rounded-lg border transition-colors",
                    selectedAnswerForCurrentQuestion === option.label
                      ? "bg-primary-blue text-white border-primary-blue"
                      : "bg-white hover:bg-gray-50 border-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 dark:text-primary-dark"
                  )}
                  aria-pressed={
                    selectedAnswerForCurrentQuestion === option.label
                  }
                >
                  <span
                    className={cn(
                      "flex h-8 w-8 items-center justify-center rounded-full border text-sm font-medium",
                      selectedAnswerForCurrentQuestion === option.label
                        ? "border-white text-primary-blue bg-white"
                        : "border-gray-400 text-primary-dark dark:border-gray-500 dark:text-primary-dark"
                    )}
                  >
                    {option.label}
                  </span>
                  <span
                    className={cn(
                      "text-left flex-1",
                      selectedAnswerForCurrentQuestion === option.label
                        ? "text-white"
                        : "text-primary-dark"
                    )}
                  >
                    {option.text}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-between mt-4 pt-4 dark:border-gray-700">
          <Button
            variant="outline"
            onClick={prevQuestion}
            disabled={isFirstQuestion || quizFinished}
            className="rounded-full px-6 py-2 bg-transparent text-primary-dark border-gray-200 hover:bg-gray-100"
          >
            <ArrowLeft className="mr-2 h-4 w-4 hidden md:block" />
            Sebelumnya
          </Button>
          <Button
            onClick={nextQuestion}
            disabled={isLastQuestion || quizFinished}
            className="rounded-full px-6 py-2 bg-primary-blue hover:bg-primary-blue-dark text-white"
          >
            Selanjutnya
            <ArrowRight className="ml-2 h-4 w-4 hidden md:block" />
          </Button>
        </div>
        <Button
          onClick={finishQuiz}
          disabled={quizFinished}
          className="block md:hidden mt-4 w-full rounded-full py-2 text-primary-blue bg-white border border-primary-blue hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-blue"
        >
          Selesai
        </Button>
      </div>
    </main>
  )
}
