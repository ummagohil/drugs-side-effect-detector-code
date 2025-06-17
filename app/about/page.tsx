import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1 container max-w-4xl mx-auto px-4 py-8">
        <div className="space-y-6">
          <h1 className="text-3xl font-bold">About Drug Side Effect Detector</h1>

          <Card>
            <CardHeader>
              <CardTitle>Our Mission</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                The Drug Side Effect Detector aims to provide accessible information about medication side effects and
                warnings. Our goal is to help users make informed decisions about their medications by providing clear,
                easy-to-understand information sourced from the FDA database.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Data Sources</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                All drug information is sourced from the OpenFDA API, which provides public access to data from the U.S.
                Food and Drug Administration. This includes drug labeling information, adverse events, and more.
              </p>
              <p className="mt-4">
                The OpenFDA API is a reliable source of information, but it may not include all medications or the most
                up-to-date information for every drug.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Medical Disclaimer</CardTitle>
              <CardDescription>Important information about using this service</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p>
                  <strong>
                    This application is for informational purposes only and is not a substitute for professional medical
                    advice.
                  </strong>
                </p>
                <p>
                  Always consult with a qualified healthcare provider before starting, stopping, or changing any
                  medication. The information provided by this application may not be comprehensive or up-to-date for
                  all medications.
                </p>
                <p>In case of a medical emergency, contact your doctor or emergency services immediately.</p>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-center pt-6">
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90"
            >
              Return to Search
            </Link>
          </div>
        </div>
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
