import { Button } from "@/components/ui/button"
import { Sidebar } from "@/components/layout/sidebar"
import { Header } from "@/components/layout/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const tryoutHistory = [
  {
    id: 1,
    title: "TRYOUT SKD CPNS PART II",
    submittedAt: "11 Agustus 2025, 10:30 WIB",
    timeTaken: "01:35:20",
    score: "-",
    answeredQuestions: "85/100",
    status: "Selesai",
  },
  {
    id: 2,
    title: "TRYOUT TIU CPNS 2024",
    submittedAt: "05 Agustus 2025, 14:00 WIB",
    timeTaken: "00:50:15",
    score: "-",
    answeredQuestions: "70/100",
    status: "Selesai",
  },
  {
    id: 3,
    title: "TRYOUT TWK CPNS Dasar",
    submittedAt: "Belum Selesai",
    timeTaken: "-",
    score: "-",
    answeredQuestions: "15/100",
    status: "Berlangsung",
  },
]

export default function TryoutSayaPage() {
  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-950">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Header />
        <main className="flex-1 p-6 overflow-auto">
          <h1 className="text-3xl font-bold mb-6 text-primary-dark">Tryout Saya</h1>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {tryoutHistory.map((tryout) => (
              <Card key={tryout.id} className="shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-lg font-semibold text-primary-dark">{tryout.title}</CardTitle>{" "}
                  <Badge
                    className={`px-2 py-1 text-xs font-medium ${
                      tryout.status === "Selesai"
                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                        : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                    }`}
                  >
                    {tryout.status}
                  </Badge>
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-primary-dark ">
                  {" "}
                  <p>
                    <span className="font-medium">Waktu Submit:</span> {tryout.submittedAt}
                  </p>
                  <p>
                    <span className="font-medium">Waktu Dikerjakan:</span> {tryout.timeTaken}
                  </p>
                  <p>
                    <span className="font-medium">Skor:</span> {tryout.score}
                  </p>
                  <p>
                    <span className="font-medium">Soal Dijawab:</span> {tryout.answeredQuestions}
                  </p>
                  {tryout.status === "Berlangsung" && (
                    <Button className="w-full mt-4 bg-primary-blue hover:bg-primary-blue-dark text-white">
                      Lanjutkan Tryout
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}
