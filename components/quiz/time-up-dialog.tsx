"use client"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useQuiz } from "@/context/quiz-context"

export function TimeUpDialog() {
  const { quizFinished, timeLeft } = useQuiz()

  return (
    <AlertDialog open={quizFinished && timeLeft <= 0}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Waktu Habis!</AlertDialogTitle>
          <AlertDialogDescription>
            Waktu pengerjaan tryout telah berakhir. Silakan lihat ringkasan hasil Anda.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction className="bg-lolos-blue hover:bg-lolos-blue-dark">Lihat Ringkasan</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
