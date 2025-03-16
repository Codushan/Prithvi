import { NextResponse } from "next/server";
import { google } from "googleapis";
import { uploadImageToCloudinary } from "@/lib/cloudinary";

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(request, { params }) {
  try {
    const { topic } = params;

    if (!topic) {
      return NextResponse.json(
        { message: "Topic parameter is required", success: false },
        { status: 400 }
      );
    }

    let id;
    if (topic === "Model Masters") {
      id = process.env.GOOGLE_SHEET_ID;
    } else if (topic === "THE SKY'S THE LIMIT: DRONE IN ACTION") {
      id = process.env.WORKSHOP_SHEET_ID;
    } else if (topic === "Treasure Hunt"){
      id = process.env.GOOGLE_SHEET_ID2;
    }else if (topic === "Infranova"){
      id = process.env.GOOGLE_SHEET_ID3;
    }
    else if (topic === "Civil Engineering: New Horizons and Trends"){
      id = process.env.LECTURE_SHEET_ID1;
    }

    const formData = await request.formData();
    const name = formData.get("name");
    const email = formData.get("email");
    const mobileNumber = formData.get("mobileNumber");
    const whatsappNumber = formData.get("whatsappNumber");
    const instituteId = formData.get("instituteId");
    const instituteName = formData.get("instituteName");
    const paymentProof = formData.get("paymentProof");
    const referalCode = formData.get("referalCode");

  
   
    const members = formData.getAll("members");
    if (!paymentProof) {
      return NextResponse.json(
        { message: "Payment proof upload is required", success: false },
        { status: 400 }
      );
    }

    const submissionDate = new Date().toLocaleString();
    const bytes = await paymentProof.arrayBuffer();
    const buffer = Buffer.from(bytes);

    
    const imageUrl = await uploadImageToCloudinary(buffer, paymentProof.name);
    console.log("Image uploaded to Cloudinary:", imageUrl);

   
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
      },
      scopes: [
        "https://www.googleapis.com/auth/spreadsheets",
      ],
    });
    

    const sheets = google.sheets({ auth, version: "v4" });
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: id,
      range: "A1:J1",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [
          [
            name,
            email,
            mobileNumber,
            whatsappNumber,
            instituteId,
            instituteName,
            imageUrl,
            submissionDate,
            referalCode,
            members.join(", ")
            
          ],
        ],
      },
    });

    return NextResponse.json({
      status: 200,
      success: true,
      data: response.data,
    });
  } catch (error) {
    console.error("Error in POST function:", error);
    return NextResponse.json(
      { status: 500, success: false, message: "Something went wrong" },
      { status: 500 }
    );
  }
}