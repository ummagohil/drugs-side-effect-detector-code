import Link from "next/link"
import { Pill } from "lucide-react"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center">
        <div className="flex items-center gap-2">
          <Pill className="h-6 w-6" />
          <Link href="/" className="font-bold">
            MedSideEffects
          </Link>
        </div>
      </div>
    </header>
  )
}
