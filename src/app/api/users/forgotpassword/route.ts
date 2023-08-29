import dbConnection from "@/dbConfig/dbConfig.js";
import { sendEmail } from "@/helpers/mailer.js";
import User from "@/modals/modal.js";
import { NextRequest, NextResponse } from "next/server";

// *this page is just to verify the email exists or not and if exists send email, once the user clicks on email then redirect to newpassword page
dbConnection();
export async function POST (request:NextRequest){
    try {
        
        const reqBody = await request.json();
        console.log(reqBody);

        const { userEmail } = reqBody;


        // If user is existing
        const user = await User.findOne({email:userEmail});

        console.log(user);

        if(!user){
            return NextResponse.json({error: 'Email not found'}, {status: 400});
        }

    

        await sendEmail({email:userEmail, emailType: "RESET", userId: user._id.toString()});

        return NextResponse.json(
            {message : "user email found!", success: true, user},
            {status:200}
            )

        
    }  catch (error:any) {
       return NextResponse.json({message: error.message}, {status: 500});
    }
}