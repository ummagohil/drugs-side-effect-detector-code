import { NextResponse } from "next/server"

// Sample data for testing and fallback
const SAMPLE_DRUGS = {
  ibuprofen: {
    brand_name: "Advil",
    generic_name: "Ibuprofen",
    drug_class: ["Nonsteroidal Anti-inflammatory Drug"],
    purpose: "Pain reliever/fever reducer",
    route: "Oral",
    side_effects: {
      common: [
        "Stomach upset or pain",
        "Nausea",
        "Vomiting",
        "Headache",
        "Diarrhea",
        "Constipation",
        "Dizziness",
        "Drowsiness",
      ],
      serious: [
        "Severe stomach pain",
        "Black or bloody stools",
        "Coughing up blood",
        "Unusual weight gain",
        "Swelling of hands/feet",
        "Hearing problems",
        "Mental/mood changes",
      ],
    },
    warnings: [
      "May increase risk of serious cardiovascular events",
      "Can cause serious gastrointestinal bleeding",
      "Do not exceed recommended dose",
      "Consult doctor if pregnant or breastfeeding",
    ],
    contraindications: [
      "Allergy to NSAIDs",
      "Active peptic ulcer disease",
      "Severe heart failure",
      "Third trimester of pregnancy",
    ],
  },
  aspirin: {
    brand_name: "Bayer Aspirin",
    generic_name: "Aspirin",
    drug_class: ["Nonsteroidal Anti-inflammatory Drug", "Antiplatelet Agent"],
    purpose: "Pain reliever/fever reducer/anti-inflammatory",
    route: "Oral",
    side_effects: {
      common: ["Stomach irritation", "Nausea", "Vomiting", "Heartburn", "Drowsiness"],
      serious: [
        "Gastrointestinal bleeding",
        "Allergic reactions",
        "Reye's syndrome (in children)",
        "Hearing problems with high doses",
        "Severe stomach pain",
      ],
    },
    warnings: [
      "Not recommended for children under 16 due to Reye's syndrome risk",
      "Can increase bleeding risk",
      "May interact with blood thinners",
      "Consult doctor before surgery",
    ],
    contraindications: [
      "Children under 16 years",
      "Allergy to salicylates",
      "Active bleeding disorders",
      "Severe liver or kidney disease",
    ],
  },
}

// UK-specific drug data with common UK medications
const UK_DRUGS = {
  paracetamol: {
    brand_name: "Panadol",
    generic_name: "Paracetamol",
    drug_class: ["Analgesic", "Antipyretic"],
    purpose: "Pain relief and fever reduction",
    route: "Oral",
    side_effects: {
      common: [
        "Generally well tolerated at recommended doses",
        "Rare: skin rash",
        "Rare: blood disorders with long-term use",
      ],
      serious: [
        "Liver damage with overdose",
        "Severe skin reactions (very rare)",
        "Blood disorders (very rare)",
        "Kidney damage with long-term high doses",
      ],
    },
    warnings: [
      "Do not exceed 4g (8 tablets) in 24 hours",
      "Risk of liver damage with overdose",
      "Avoid alcohol when taking paracetamol",
      "Check other medicines don't contain paracetamol",
    ],
    contraindications: ["Severe liver disease", "Known hypersensitivity to paracetamol"],
    uk_specific: {
      nhs_info: "Available over-the-counter and on prescription",
      pom_status: "P (Pharmacy Medicine) / GSL (General Sale List)",
    },
  },
  ibuprofen: {
    brand_name: "Nurofen",
    generic_name: "Ibuprofen",
    drug_class: ["NSAID", "Anti-inflammatory"],
    purpose: "Pain relief, inflammation reduction, fever reduction",
    route: "Oral",
    side_effects: {
      common: ["Stomach upset", "Nausea", "Indigestion", "Headache", "Dizziness"],
      serious: [
        "Stomach ulcers or bleeding",
        "Increased risk of heart attack or stroke",
        "Kidney problems",
        "Severe allergic reactions",
        "Liver problems",
      ],
    },
    warnings: [
      "Take with food to reduce stomach irritation",
      "Not suitable for people with heart conditions",
      "Avoid in pregnancy, especially third trimester",
      "Can interact with blood thinners",
    ],
    contraindications: [
      "Active peptic ulcer",
      "Severe heart failure",
      "Severe liver or kidney disease",
      "Pregnancy (third trimester)",
      "Allergy to NSAIDs",
    ],
    uk_specific: {
      nhs_info: "Available over-the-counter and on prescription",
      pom_status: "P (Pharmacy Medicine)",
    },
  },
  aspirin: {
    brand_name: "Disprin",
    generic_name: "Aspirin",
    drug_class: ["NSAID", "Antiplatelet"],
    purpose: "Pain relief, fever reduction, blood thinning",
    route: "Oral",
    side_effects: {
      common: ["Stomach irritation", "Nausea", "Indigestion", "Easy bruising"],
      serious: [
        "Gastrointestinal bleeding",
        "Reye's syndrome in children",
        "Severe allergic reactions",
        "Increased bleeding risk",
      ],
    },
    warnings: [
      "Not for children under 16 (Reye's syndrome risk)",
      "Increases bleeding risk",
      "Take with food",
      "Inform doctors before surgery",
    ],
    contraindications: [
      "Children under 16 years",
      "Active bleeding",
      "Severe liver or kidney disease",
      "Allergy to salicylates",
    ],
    uk_specific: {
      nhs_info: "Available over-the-counter and on prescription",
      pom_status: "P (Pharmacy Medicine) / POM (Prescription Only Medicine) for higher doses",
    },
  },
  codeine: {
    brand_name: "Various",
    generic_name: "Codeine",
    drug_class: ["Opioid analgesic"],
    purpose: "Moderate pain relief, cough suppression",
    route: "Oral",
    side_effects: {
      common: ["Constipation", "Drowsiness", "Nausea", "Dizziness", "Dry mouth"],
      serious: ["Respiratory depression", "Dependence and addiction", "Severe constipation", "Allergic reactions"],
    },
    warnings: [
      "Risk of dependence with prolonged use",
      "Can cause drowsiness - avoid driving",
      "Not suitable for children under 12",
      "Avoid alcohol",
    ],
    contraindications: ["Children under 12 years", "Respiratory depression", "Acute asthma", "Known codeine allergy"],
    uk_specific: {
      nhs_info: "Prescription only medicine",
      pom_status: "POM (Prescription Only Medicine)",
      controlled_drug: "Schedule 5 Controlled Drug",
    },
  },
  simvastatin: {
    brand_name: "Zocor",
    generic_name: "Simvastatin",
    drug_class: ["Statin", "HMG-CoA reductase inhibitor"],
    purpose: "Cholesterol reduction, cardiovascular disease prevention",
    route: "Oral",
    side_effects: {
      common: ["Muscle aches", "Headache", "Stomach pain", "Nausea", "Constipation"],
      serious: ["Muscle breakdown (rhabdomyolysis)", "Liver problems", "Memory problems", "Diabetes (increased risk)"],
    },
    warnings: [
      "Regular liver function tests required",
      "Report muscle pain immediately",
      "Avoid grapefruit juice",
      "Can interact with many medications",
    ],
    contraindications: ["Active liver disease", "Pregnancy and breastfeeding", "Concurrent use of certain antibiotics"],
    uk_specific: {
      nhs_info: "Prescription only medicine - commonly prescribed by NHS",
      pom_status: "POM (Prescription Only Medicine)",
    },
  },
  amoxicillin: {
    brand_name: "Amoxil",
    generic_name: "Amoxicillin",
    drug_class: ["Penicillin antibiotic"],
    purpose: "Bacterial infection treatment",
    route: "Oral",
    side_effects: {
      common: ["Diarrhea", "Nausea", "Vomiting", "Stomach pain", "Skin rash"],
      serious: [
        "Severe allergic reactions (anaphylaxis)",
        "Clostridioides difficile infection",
        "Severe skin reactions",
        "Liver problems",
      ],
    },
    warnings: [
      "Complete the full course even if feeling better",
      "Can reduce effectiveness of oral contraceptives",
      "Report any allergic reactions immediately",
    ],
    contraindications: ["Penicillin allergy", "Previous severe reaction to beta-lactam antibiotics"],
    uk_specific: {
      nhs_info: "Prescription only medicine - first-line antibiotic",
      pom_status: "POM (Prescription Only Medicine)",
    },
  },
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get("query")

  console.log("Drug search API called with query:", query)

  if (!query) {
    return NextResponse.json({ error: "Query parameter is required" }, { status: 400 })
  }

  const normalizedQuery = query.toLowerCase().trim()

  // Check UK drugs database first
  if (UK_DRUGS[normalizedQuery]) {
    console.log("Returning UK drug data for:", normalizedQuery)
    return NextResponse.json({ drug: UK_DRUGS[normalizedQuery] })
  }

  // Try to find partial matches in UK drugs
  const partialMatch = Object.keys(UK_DRUGS).find(
    (key) => key.includes(normalizedQuery) || normalizedQuery.includes(key),
  )

  if (partialMatch) {
    console.log("Found partial match for UK drug:", partialMatch)
    return NextResponse.json({ drug: UK_DRUGS[partialMatch] })
  }

  // Check if we have sample data for this drug
  if (SAMPLE_DRUGS[normalizedQuery]) {
    console.log("Returning sample data for:", normalizedQuery)
    return NextResponse.json({ drug: SAMPLE_DRUGS[normalizedQuery] })
  }

  try {
    // Try UK MHRA API or other UK sources
    // Note: This is a placeholder for actual UK API integration
    const ukApiResult = await tryUKAPIs(query)
    if (ukApiResult) {
      return NextResponse.json({ drug: ukApiResult })
    }

    // Fallback to OpenFDA for international drugs
    const searchTerm = encodeURIComponent(query)
    const url = `https://api.fda.gov/drug/label.json?search=(openfda.brand_name:"${searchTerm}"+openfda.generic_name:"${searchTerm}")&limit=1`

    console.log("Trying OpenFDA as fallback:", url)

    const response = await fetch(url, {
      headers: {
        "User-Agent": "DrugSideEffectDetector/1.0",
      },
    })

    if (response.ok) {
      const data = await response.json()
      const processedData = processOpenFdaResponse(data)
      if (processedData.drug) {
        // Add note that this is US data
        processedData.drug.uk_note =
          "This information is from US FDA data and may not reflect UK licensing or recommendations"
        return NextResponse.json(processedData)
      }
    }

    // If all else fails, return generic UK response
    console.log("No specific data found, returning generic UK response")
    return NextResponse.json({
      drug: createGenericUKDrugResponse(query),
    })
  } catch (error) {
    console.error("Error fetching drug data:", error)

    // Return a generic response instead of failing completely
    return NextResponse.json({
      drug: createGenericUKDrugResponse(query),
    })
  }
}

async function tryUKAPIs(query: string) {
  // Placeholder for UK-specific API integrations
  // In a real implementation, you might integrate with:
  // - MHRA Yellow Card API
  // - NHS API
  // - BNF API (if available)

  console.log("UK API integration not yet implemented for:", query)
  return null
}

function createGenericUKDrugResponse(drugName: string) {
  return {
    brand_name: drugName,
    generic_name: drugName,
    drug_class: ["Information not available"],
    purpose: "Please consult the NHS website, your GP, or pharmacist for detailed information about this medication",
    route: "Not specified",
    side_effects: {
      common: [
        "Side effect information not available in our database",
        "Check the patient information leaflet (PIL) in your medication box",
        "Consult your pharmacist or GP for specific information",
      ],
      serious: [
        "Serious side effects information not available",
        "Contact your GP or call NHS 111 if you experience unusual symptoms",
        "In an emergency, call 999",
      ],
    },
    warnings: [
      "Always follow dosing instructions on the medication label",
      "Read the patient information leaflet carefully",
      "Consult your GP or pharmacist before starting any new medication",
      "Report any adverse effects via the Yellow Card Scheme",
    ],
    contraindications: [
      "Contraindication information not available in our database",
      "Consult your healthcare provider for complete safety information",
    ],
    uk_specific: {
      nhs_info: "For NHS information, visit nhs.uk or consult your local pharmacy",
      yellow_card: "Report side effects via the MHRA Yellow Card Scheme",
      pom_status: "Check with pharmacist for legal classification",
    },
  }
}

function processOpenFdaResponse(data: any) {
  if (!data.results || data.results.length === 0) {
    return { error: "No drug information found" }
  }

  const result = data.results[0]
  const openfda = result.openfda || {}

  const drug = {
    brand_name: openfda.brand_name ? openfda.brand_name[0] : null,
    generic_name: openfda.generic_name ? openfda.generic_name[0] : null,
    drug_class: openfda.pharm_class_cs || openfda.pharm_class_epc || ["Not specified"],
    purpose: result.purpose ? result.purpose[0] : "Not specified",
    route: openfda.route ? openfda.route[0] : "Not specified",
    side_effects: {
      common: extractTextArray(result.adverse_reactions) || ["Information not available"],
      serious: extractTextArray(result.boxed_warning) ||
        extractTextArray(result.warnings_and_cautions) || ["Information not available"],
    },
    warnings: extractTextArray(result.warnings) ||
      extractTextArray(result.warnings_and_precautions) || ["No specific warnings listed"],
    contraindications: extractTextArray(result.contraindications) || ["No contraindications listed"],
  }

  return { drug }
}

// Helper function to extract text from OpenFDA response arrays
function extractTextArray(dataArray: any) {
  if (!dataArray || dataArray.length === 0) return null

  // Some responses contain HTML tags, so we'll do basic cleaning
  const text = dataArray[0]

  // Split by common section markers to create an array of points
  const splitText = text
    .replace(/<\/?[^>]+(>|$)/g, "") // Remove HTML tags
    .split(/•|\n\s*\n|\.\s+(?=[A-Z])/)
    .map((item: string) => item.trim())
    .filter((item: string) => item.length > 10) // Filter out very short items

  return splitText.length > 0 ? splitText.slice(0, 8) : [text] // Limit to 8 items
}
