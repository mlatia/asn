export type Question = {
  id: number
  category: string
  stem: string
  options: {
    label: string
    text: string
  }[]
}

export const MOCK_QUESTIONS: Question[] = Array.from({ length: 40 }, (_, i) => ({
  id: i + 1,
  category: "Tes Wawasan Kebangsaan",
  stem: `Indonesia adalah negara dengan keberagaman suku, etnik, budaya, agama, serta karakteristik dan keunikan di setiap wilayahnya. Pada dasarnya keberagaman masyarakat Indonesia menjadi modal dalam pembangunan bangsa. Oleh karena itu, sangat diperlukan sikap atau perilaku yang menunjang terciptanya kondisi tersebut, salah satunya .. (Soal ${i + 1})`,
  options: [
    { label: "A", text: "Memperkuat posisi kebudayaan daerah di atas kebudayaan nasional" },
    { label: "B", text: "Memperkuat kedudukan pemerintah pusat sebagai pemegang kedaulatan rakyat" },
    { label: "C", text: "Menghilangkan perbedaan antarsuku bangsa dalam berbangsa dan bernegara" },
    { label: "D", text: "Memperkecil segala hal yang berpotensi menimbulkan konflik masyarakat" },
    { label: "E", text: "Memperkuat kedudukan bahasa daerah sebagai salah satu simbol persatuan" },
  ],
}))

export const QUIZ_DURATION_SECONDS = 60 * 60 + 40 * 60 // 1 hour 40 minutes
