"use client"

import { AlertCircle, Info, ExternalLink } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"

interface DrugResultsProps {
  results: {
    drug?: any
    error?: string
  }
}

export function DrugResults({ results }: DrugResultsProps) {
  if (!results || results.error || !results.drug) {
    return (
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>No results found</AlertTitle>
        <AlertDescription>
          {results?.error ||
            "We couldn't find information for this medication. Please check the spelling or try another drug name."}
        </AlertDescription>
      </Alert>
    )
  }

  const { drug } = results

  return (
    <div className="space-y-6">
      {/* UK-specific notice */}
      {drug.uk_note && (
        <Alert>
          <Info className="h-4 w-4" />
          <AlertDescription>{drug.uk_note}</AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">{drug.brand_name || drug.generic_name}</CardTitle>
          {drug.brand_name && drug.generic_name && drug.brand_name !== drug.generic_name && (
            <CardDescription>Generic name: {drug.generic_name}</CardDescription>
          )}
          {drug.uk_specific?.pom_status && (
            <div className="flex gap-2 mt-2">
              <Badge variant="secondary">{drug.uk_specific.pom_status}</Badge>
              {drug.uk_specific.controlled_drug && (
                <Badge variant="destructive">{drug.uk_specific.controlled_drug}</Badge>
              )}
            </div>
          )}
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="side-effects">Side Effects</TabsTrigger>
              <TabsTrigger value="warnings">Warnings</TabsTrigger>
              <TabsTrigger value="uk-info">UK Info</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">Drug Class</h3>
                <div className="flex flex-wrap gap-2">
                  {drug.drug_class && drug.drug_class.length > 0 ? (
                    drug.drug_class.map((cls: string, i: number) => (
                      <Badge key={i} variant="outline">
                        {cls}
                      </Badge>
                    ))
                  ) : (
                    <p className="text-muted-foreground">No class information available</p>
                  )}
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-2">Purpose</h3>
                <p>{drug.purpose || "No purpose information available"}</p>
              </div>

              <div>
                <h3 className="font-medium mb-2">Route of Administration</h3>
                <p>{drug.route || "No route information available"}</p>
              </div>
            </TabsContent>

            <TabsContent value="side-effects" className="space-y-4">
              <Alert>
                <Info className="h-4 w-4" />
                <AlertTitle>Medical Disclaimer</AlertTitle>
                <AlertDescription>
                  This information is not comprehensive and should not replace professional medical advice. Always read
                  the patient information leaflet (PIL) provided with your medication.
                </AlertDescription>
              </Alert>

              <div>
                <h3 className="font-medium mb-2">Common Side Effects</h3>
                {drug.side_effects?.common && drug.side_effects.common.length > 0 ? (
                  <ul className="list-disc pl-5 space-y-1">
                    {drug.side_effects.common.map((effect: string, i: number) => (
                      <li key={i}>{effect}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-muted-foreground">No common side effects listed</p>
                )}
              </div>

              <div>
                <h3 className="font-medium mb-2">Serious Side Effects</h3>
                {drug.side_effects?.serious && drug.side_effects.serious.length > 0 ? (
                  <ul className="list-disc pl-5 space-y-1">
                    {drug.side_effects.serious.map((effect: string, i: number) => (
                      <li key={i} className="text-red-600">
                        {effect}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-muted-foreground">No serious side effects listed</p>
                )}
              </div>
            </TabsContent>

            <TabsContent value="warnings" className="space-y-4">
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Important Safety Information</AlertTitle>
                <AlertDescription>
                  Always consult with your GP, pharmacist, or healthcare professional before taking any medication.
                </AlertDescription>
              </Alert>

              <div>
                <h3 className="font-medium mb-2">Warnings & Precautions</h3>
                {drug.warnings && drug.warnings.length > 0 ? (
                  <ul className="list-disc pl-5 space-y-2">
                    {drug.warnings.map((warning: string, i: number) => (
                      <li key={i}>{warning}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-muted-foreground">No specific warnings listed</p>
                )}
              </div>

              <div>
                <h3 className="font-medium mb-2">Contraindications</h3>
                {drug.contraindications && drug.contraindications.length > 0 ? (
                  <ul className="list-disc pl-5 space-y-1">
                    {drug.contraindications.map((item: string, i: number) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-muted-foreground">No contraindications listed</p>
                )}
              </div>
            </TabsContent>

            <TabsContent value="uk-info" className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">UK Regulatory Information</h3>
                {drug.uk_specific?.pom_status && (
                  <p>
                    <strong>Legal Classification:</strong> {drug.uk_specific.pom_status}
                  </p>
                )}
                {drug.uk_specific?.controlled_drug && (
                  <p>
                    <strong>Controlled Drug Status:</strong> {drug.uk_specific.controlled_drug}
                  </p>
                )}
                {drug.uk_specific?.nhs_info && (
                  <p>
                    <strong>NHS Information:</strong> {drug.uk_specific.nhs_info}
                  </p>
                )}
              </div>

              <div className="space-y-3">
                <h3 className="font-medium">Useful UK Resources</h3>
                <div className="space-y-2">
                  <Button variant="outline" size="sm" asChild>
                    <a href="https://www.nhs.uk/medicines/" target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      NHS Medicines Information
                    </a>
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <a href="https://yellowcard.mhra.gov.uk/" target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Report Side Effects (Yellow Card)
                    </a>
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <a href="https://www.medicines.org.uk/" target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Electronic Medicines Compendium
                    </a>
                  </Button>
                </div>
              </div>

              <Alert>
                <Info className="h-4 w-4" />
                <AlertTitle>Emergency Information</AlertTitle>
                <AlertDescription>
                  <p>For urgent medical advice: Call NHS 111</p>
                  <p>In a medical emergency: Call 999</p>
                </AlertDescription>
              </Alert>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
