import { DrugSearch } from "@/components/drug-search"
import { SiteHeader } from "@/components/site-header"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1 container max-w-5xl mx-auto px-4 py-8">
        <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-16">
          <div className="flex max-w-[980px] flex-col items-start gap-2">
            <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:text-6xl">
              UK Drug Side Effect Detector
            </h1>
            <p className="max-w-[700px] text-lg text-muted-foreground">
              Search for UK medications and discover their potential side effects using NHS and MHRA guidance.
            </p>
          </div>
          <DrugSearch />
        </section>
      </main>
      <footer className="border-t py-6">
        <div className="container flex flex-col items-center justify-center gap-4">
          <p className="text-center text-sm text-muted-foreground">
            Information sourced from NHS and MHRA guidance. Not for medical advice.
          </p>
        </div>
      </footer>
    </div>
  )
}
