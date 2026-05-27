import { NextRequest, NextResponse } from "next/server";
import { uploadToGCS } from "@/lib/gcs";
import { getDatabase } from "@/lib/mongodb";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const form = await req.formData();

    const name     = (form.get("name")     as string | null)?.trim();
    const mobile   = (form.get("mobile")   as string | null)?.trim();
    const drName   = (form.get("drName")   as string | null)?.trim();
    const clinic   = (form.get("clinic")   as string | null)?.trim() ?? "";
    const whatsapp = (form.get("whatsapp") as string | null) === "true";
    const poster   = form.get("poster")    as File | null;

    if (!name || !mobile || !drName || !poster) {
      return NextResponse.json(
        { success: false, error: "All fields including poster are required." },
        { status: 400 }
      );
    }

    // Upload poster to GCS
    const buffer   = Buffer.from(await poster.arrayBuffer());
    const posterUrl = await uploadToGCS(buffer, poster.name, poster.type);

    // Save submission to MongoDB
    const db = await getDatabase();
    await db.collection("submissions").insertOne({
      name,
      mobile,
      drName,
      clinic,
      whatsappConsent: whatsapp,
      posterUrl,
      submittedAt: new Date(),
    });

    return NextResponse.json({ success: true, posterUrl });
  } catch (err) {
    console.error("Submit error:", err);
    return NextResponse.json(
      { success: false, error: "Submission failed. Please try again." },
      { status: 500 }
    );
  }
}
