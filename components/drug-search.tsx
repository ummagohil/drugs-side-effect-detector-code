"use client"

import type React from "react"
import { useState } from "react"
import { Search, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { DrugResults } from "@/components/drug-results"
import { LoadingSpinner } from "@/components/loading-spinner"

export function DrugSearch() {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return

    setLoading(true)
    setError("")
    setResults(null)

    try {
      console.log("Searching for UK drug:", query)
      const response = await fetch(`/api/drug-search?query=${encodeURIComponent(query)}`)

      console.log("Response status:", response.status)

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to fetch drug information")
      }

      const data = await response.json()
      console.log("Received UK drug data:", data)
      setResults(data)
    } catch (err) {
      console.error("Error fetching UK drug data:", err)
      setError(err instanceof Error ? err.message : "Failed to fetch drug information. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const ukDrugSuggestions = ["paracetamol", "ibuprofen", "aspirin", "codeine", "simvastatin", "amoxicillin"]

  return (
    <div className="space-y-6">
      <form onSubmit={handleSearch} className="flex w-full max-w-lg items-center space-x-2">
        <Input
          type="text"
          placeholder="Enter UK medication name (e.g., paracetamol, ibuprofen)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1"
        />
        <Button type="submit" disabled={loading}>
          {loading ? <LoadingSpinner /> : <Search className="h-4 w-4 mr-2" />}
          Search
        </Button>
      </form>

      {/* UK drug suggestions */}
      <div className="text-sm text-muted-foreground">
        <p className="mb-2">Try searching for common UK medications:</p>
        <div className="flex flex-wrap gap-2">
          {ukDrugSuggestions.map((drug) => (
            <button
              key={drug}
              type="button"
              className="text-blue-600 hover:underline bg-blue-50 px-2 py-1 rounded text-xs"
              onClick={() => setQuery(drug)}
            >
              {drug}
            </button>
          ))}
        </div>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {loading && (
        <Alert>
          <LoadingSpinner />
          <AlertDescription className="ml-2">Searching for UK drug information...</AlertDescription>
        </Alert>
      )}

      {results && <DrugResults results={results} />}
    </div>
  )
}
