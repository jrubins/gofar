/* A modal for users to submit feedback or issues with the calculator. -->
<div id="feedback-modal" class="modal fade">
  <div class="modal-dialog">
    <div class="modal-content">
      <!-- This is a hidden iFrame that is used to submit the feedback form data to the Google spreadsheet -->
      <iframe name="feedback-iframe" id="feedback-iframe" class="hidden"></iframe>

      <form id="feedback-form"
      action="https://docs.google.com/forms/d/1ji9XNn0RiJzuaRAtCObXhVi5_Pe54K2dHafOVytTpJ0/formResponse" method="POST"
      target="feedback-iframe">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
          <h4 class="modal-title">Feedback</h4>
        </div>
        <div class="modal-body">
          <div id="form-content">
            <p class="bg-info padding">If you have any improvements or suggestions for the GO-FAR calculator or
            are experiencing any issues, please submit your feedback using the form below. If you supply your
            name and email, I will be sure to get back to you in a timely manner. Thanks!</p>
            <div class="form-group">
              <label for="feedback-name" class="control-label">Name:</label>
              <input type="text" name="entry.468931824" id="feedback-name" class="form-control">
            </div>
            <div class="form-group">
              <label for="feedback-email" class="control-label">Email:</label>
              <input type="text" name="entry.455716436" id="feedback-email" class="form-control">
            </div>
            <div class="form-group">
              <label for="feedback-text" class="control-label">Feedback:</label>
              <textarea rows="6" name="entry.612948227" id="feedback-text" class="form-control"></textarea>
              <p class="form-invalid-text hidden">Please add some feedback or a description of the error
              you're seeing before submitting.</p>
            </div>
          </div>

          <p id="form-submitted" class="bg-success padding hidden">Thanks for your feedback! If you have
          provided contact information, I will get back to you as soon as possible.</p>
        </div>
        <div class="modal-footer">
          <button type="submit" id="feedback-form-submit" class="btn btn-primary">Submit</button>
          <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
        </div>
      </form>
    </div>
  </div>
</div>

    // Bind to when the feedback form is submitted.
    $("#feedback-form").on("submit", function() {
      // Hide the message that our form was submitted successfully.
      $("#form-submitted").addClass("hidden");

      var feedbackTextArea = $("textarea[name='entry.612948227']");

      // Check to see if the value entered into the feedback field is empty.
      if(s(feedbackTextArea.val()).trim().isBlank()) {
        // Show our error message to the user that they need some value for the feedback field.
        feedbackTextArea.siblings(".form-invalid-text").removeClass("hidden");
        feedbackTextArea.parents(".form-group").addClass("has-error has-feedback");

        // Since we don't have a valid value for the feedback textarea, return false
        // so the user can fill in some feedback.
        return false;
      } else { // The textarea value is valid.
        // Hide the error message since the feedback field is valid.
        feedbackTextArea.siblings(".form-invalid-text").addClass("hidden");
        feedbackTextArea.parents(".form-group").removeClass("has-error has-feedback");

        // Show the user the message that the form was submitted successfully.
        $("#form-submitted").removeClass("hidden");

        // Slide up the content of the form so the user can no longer interact with it.
        $("#form-content").slideUp("fast");

        // Disable the submit button so they can't submit more than once.
        $("#feedback-form-submit").addClass("disabled");
      }
    });

    // Bind to when the feedback modal is about to be shown.
    $("#feedback-modal").on("show.bs.modal", function() {
      // Clear the value out of the "name" field.
      $("input[name='entry.468931824']").val("");

      // Clear the value out of the "email" field.
      $("input[name='entry.455716436']").val("");

      // Clear the value out of the feedback textarea.
      $("textarea[name='entry.612948227']").val("");

    });

    // Bind to when the feedback modal has been hidden.
    $("#feedback-modal").on("hidden.bs.modal", function() {
      // Hide our message that the form was submitted successfully.
      $("#form-submitted").addClass("hidden");

      // Re-show the main content of the feedback form so the user can
      // submit more feedback if needed.
      $("#form-content").show();

      // Re-enable the submit button for our feedback form.
      $("#feedback-form-submit").removeClass("disabled");

      // Hide the error message that the feedback textarea is invalid.
      $("textarea[name='entry.612948227']").parents(".form-group").removeClass("has-error has-feedback");
      $(".form-invalid-text").addClass("hidden");
    });*/
