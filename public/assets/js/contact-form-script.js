$(document).ready(function () {
    $('#emailForm').on('submit', function (event) { // Updated form ID to match the new ID
        event.preventDefault(); // Prevent the default form submission
        // Show loading indicator
        $('#loadingIndicator').removeClass('hidden');

        // Get the URL from the form's data attribute
        var url = $(this).data('url');

        // Get CSRF token from the meta tag
        var csrfToken = $('meta[name="csrf-token"]').attr('content');
        // Serialize form data
        var formData = $(this).serialize();

        // Send AJAX request
        $.ajax({
            type: 'POST',
            url: url, // Use the URL retrieved from the form's data attribute
            data: formData,
            headers: {
                'X-CSRF-TOKEN': csrfToken // Include CSRF token in the request header
            },
            success: function (response) {
                $('#msgSubmit').removeClass('hidden').text(response.success);
                // You can clear the form fields here if needed
            },
            error: function (xhr, status, error) {
                $('#msgSubmit').removeClass('hidden').addClass('alert-danger').text('Error occurred while sending email.');
            },
            complete: function () {
                // Hide loading indicator
                $('#loadingIndicator').addClass('hidden');
            }
        });
    });
});
