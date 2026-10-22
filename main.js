
const quoteForm = document.getElementById("quote-form");
const formStatus = document.getElementById("form-status");
const submitButton = quoteForm.querySelector('button[type="submit"]');

quoteForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const formData = new FormData(quoteForm);
    const message = formData.get("message").trim();

    if (message.length < 10) {
        formStatus.textContent =
            "Please provide at least 10 characters about your project.";
        return;
    }

    submitButton.disabled = true;
    submitButton.textContent = "Sending...";
    formStatus.textContent = "Sending your enquiry...";

    try {
        const response = await fetch(quoteForm.action, {
            method: "POST",
            body: formData,
            headers: {
                Accept: "application/json"
            }
        });

        if (!response.ok) {
            throw new Error("Submission failed");
        }

        formStatus.textContent =
            "Your enquiry was submitted successfully!";
        quoteForm.reset();

    } catch (error) {
        console.error("Form submission error:", error);

        formStatus.textContent =
            "Sorry, your enquiry could not be sent. Please try again.";

    } finally {
        submitButton.disabled = false;
        submitButton.textContent = "Send Enquiry";
    }
});
