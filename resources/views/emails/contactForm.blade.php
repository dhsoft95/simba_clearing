@component('mail::message')
    <div style="background-color: #f8f9fa; padding: 30px;">
        <h2 style="color: #333; margin-bottom: 20px;">New Contact Form Submission</h2>
        <p><strong>Name:</strong> {{ $data['name'] }}</p>
        <p><strong>Email:</strong> {{ $data['email'] }}</p>
        <p><strong>Subject:</strong> {{ $data['msg_subject'] }}</p>
        <p><strong>Phone Number:</strong> {{ $data['phone_number'] }}</p>
        <p><strong>Message:</strong></p>
        <p>{{ $data['message'] }}</p>
    </div>
@endcomponent
