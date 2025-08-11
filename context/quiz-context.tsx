"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect, useCallback } from "react"
import { MOCK_QUESTIONS, QUIZ_DURATION_SECONDS, type Question } from "@/lib/data"
import { formatTime } from "@/lib/utils"
import { useRouter } from "next/navigation" // Import useRouter

type Answer = {
  [questionId: number]: string // questionId: optionLabel (e.g., 1: 'A')
}

interface QuizContextType {
  currentQuestionIndex: number
  currentQuestion: Question | undefined
  answers: Answer
  timeLeft: number
  quizFinished: boolean
  answeredCount: number
  totalQuestions: number
  progressPercentage: number
  selectedAnswerForCurrentQuestion: string | undefined
  goToQuestion: (index: number) => void
  selectAnswer: (questionId: number, optionLabel: string) => void
  prevQuestion: () => void
  nextQuestion: () => void
  finishQuiz: () => void
  formattedTime: string
}

const QuizContext = createContext<QuizContextType | undefined>(undefined)

export const QuizProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0) // 0-indexed
  const [answers, setAnswers] = useState<Answer>({})
  const [timeLeft, setTimeLeft] = useState<number>(QUIZ_DURATION_SECONDS)
  const [quizFinished, setQuizFinished] = useState<boolean>(false)
  const router = useRouter() // Initialize useRouter

  const totalQuestions = MOCK_QUESTIONS.length
  const answeredCount = Object.keys(answers).length
  const progressPercentage = totalQuestions > 0 ? (answeredCount / totalQuestions) * 100 : 0

  const currentQuestion = MOCK_QUESTIONS[currentQuestionIndex]
  const selectedAnswerForCurrentQuestion = currentQuestion ? answers[currentQuestion.id] : undefined

  // Load state from localStorage on initial render
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedIndex = localStorage.getItem("currentQuestionIndex")
      const savedAnswers = localStorage.getItem("quizAnswers")
      const savedTime = localStorage.getItem("quizTimeLeft")

      if (savedIndex) {
        setCurrentQuestionIndex(Number.parseInt(savedIndex, 10))
      }
      if (savedAnswers) {
        setAnswers(JSON.parse(savedAnswers))
      }
      if (savedTime) {
        setTimeLeft(Number.parseInt(savedTime, 10))
      }
    }
  }, [])

  // Save state to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("currentQuestionIndex", currentQuestionIndex.toString())
      localStorage.setItem("quizAnswers", JSON.stringify(answers))
      localStorage.setItem("quizTimeLeft", timeLeft.toString())
    }
  }, [currentQuestionIndex, answers, timeLeft])

  // Timer logic
  useEffect(() => {
    if (quizFinished || timeLeft <= 0) {
      if (timeLeft <= 0 && !quizFinished) {
        setQuizFinished(true) // Time's up
      }
      return
    }

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          // Use 1 to ensure it hits 0 and triggers finish
          clearInterval(timer)
          setQuizFinished(true)
          return 0
        }
        return prevTime - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [timeLeft, quizFinished])

  const goToQuestion = useCallback(
    (index: number) => {
      if (index >= 0 && index < totalQuestions) {
        setCurrentQuestionIndex(index)
      }
    },
    [totalQuestions],
  )

  const selectAnswer = useCallback((questionId: number, optionLabel: string) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: optionLabel,
    }))
  }, [])

  const prevQuestion = useCallback(() => {
    setCurrentQuestionIndex((prevIndex) => Math.max(0, prevIndex - 1))
  }, [])

  const nextQuestion = useCallback(() => {
    setCurrentQuestionIndex((prevIndex) => Math.min(totalQuestions - 1, prevIndex + 1))
  }, [totalQuestions])

  const finishQuiz = useCallback(() => {
    setQuizFinished(true)
    // Clear localStorage
    if (typeof window !== "undefined") {
      localStorage.removeItem("currentQuestionIndex")
      localStorage.removeItem("quizAnswers")
      localStorage.removeItem("quizTimeLeft")
    }
    // Redirect to summary page
    router.push("/summary")
  }, [router])

  const formattedTime = formatTime(timeLeft)

  const value = {
    currentQuestionIndex,
    currentQuestion,
    answers,
    timeLeft,
    quizFinished,
    answeredCount,
    totalQuestions,
    progressPercentage,
    selectedAnswerForCurrentQuestion,
    goToQuestion,
    selectAnswer,
    prevQuestion,
    nextQuestion,
    finishQuiz,
    formattedTime,
  }

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>
}

export const useQuiz = () => {
  const context = useContext(QuizContext)
  if (context === undefined) {
    throw new Error("useQuiz must be used within a QuizProvider")
  }
  return context
}
