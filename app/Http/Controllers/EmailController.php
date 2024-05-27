<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Mail\ContactFormMail;

class EmailController extends Controller
{
    public function sendEmail(Request $request)
    {
        // Validate the form data
        $validatedData = $request->validate([
            'name' => 'required',
            'email' => 'required|email',
            'msg_subject' => 'required',
            'phone_number' => 'required',
            'message' => 'required',
        ]);

        // Prepare data to be sent to the email template
        $data = [
            'name' => $request->input('name'),
            'email' => $request->input('email'),
            'msg_subject' => $request->input('msg_subject'),
            'phone_number' => $request->input('phone_number'),
            'message' => $request->input('message'),
        ];
        try {
            // Send email
            Mail::to('david.haule@simbamoney.com')->send(new ContactFormMail($data));

            // Handle success
            return response()->json(['success' => 'Your message has been sent successfully!']);
        } catch (\Exception $e) {
            // Handle error
            return response()->json(['error' => 'Failed to send email. Please try again later.'], 500);
        }
    }
}
