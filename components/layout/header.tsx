import { Bell } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="flex h-16 items-center justify-end gap-4 border-b bg-white px-4 dark:bg-gray-950 md:px-6">
      <Button
        variant="ghost"
        size="icon"
        className="rounded-full border border-gray-200 p-4 bg-transparent"
      >
        <Bell className="h-5 w-5 text-[#3D607B]" fill="#3D607B" stroke="#3D607B" />
        <span className="sr-only">Toggle notifications</span>
      </Button>
      <div className="flex items-center gap-2">
        <Avatar className="h-8 w-8">
          <AvatarImage src="/placeholder-user.png?height=32&width=32" alt="John Doe" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <span className="font-medium text-sm">John Doe</span>
      </div>
    </header>
  )
}
