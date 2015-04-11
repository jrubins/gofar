/* global ko, s */

(function(GO_FAR) {

	/**
	 * Represents an individual component that has some value towards the calculation.
	 * @constructor
	 * @param {String} label - The label for the component.
	 * @param {int} points - The number of points to add to the total when the component
	 *		is selected.
	 * @param {String} helpText - The help text that defines the component to display as
	 *		the HTML "title" attribute to the user.
	 */
	GO_FAR.Component = function(label, points, helpText) {
		this.label = label;
		this.points = points;
		this.helpText = helpText;

		// This is whether or not the component is currently selected. All components
		// start out as not selected.
		this.selected = ko.observable(false);
	};

	/**
	 * Our view model for our data for the calculator.
	 * @constructor
	 */
	GO_FAR.ViewModel = function() {
		var self = this;

		// The initial points that the calculator should start at.
		var initialPoints = -15;

		// All the static components we'll display as checkboxes for the user to select for
		// the calculation.
		this.staticComponents = [
			{
				label: "Moderate or Severe cognitive/neurologic disability",
				points: 15,
				helpText: "Moderate = able to live independently with disabilities which may include hemiplegia, seizures, ataxia, dysphagia, or permanent memory or mental changes"
			},
			{
				label: "Admission from a skilled nursing facility",
				points: 6
			},
			{
				label: "Metastatic or hematologic cancer",
				points: 7,
				helpText: "Any solid tissue malignancy with evidence of metastasis or any blood-borne malignancy"
			},
			{
				label: "Major trauma",
				points: 10,
				helpText: "Evidence of multisystem injury or single-system injury associated with shock or altered mental status during the current hospitalization"
			},
			{
				label: "Pneumonia",
				points: 1,
				helpText: "Documented diagnosis of active pneumonia, in which antibiotic therapy has not yet been started or is still ongoing"
			},
			{
				label: "Septicemia",
				points: 7,
				helpText: "Documented bloodstream infection in which anti-biotic therapy has not yet been started or is still ongoing"
			},
			{
				label: "Hypotension or hypoperfusion",
				points: 5,
				helpText: "Any evidence of hypotension within 4 h of the event, defined as any of the following: SBP <90 or MAP <60 mm Hg; vasopressor or inotropic requirement after volume expansion (except for dopamine <= 3 microgram/kg/min); or intra-aortic balloon pump"
			},
			{
				label: "Acute stroke",
				points: 8,
				helpText: "Documented diagnosis of an intracranial or intra-ventricular hemorrhage or thrombosis during the current admission"
			},
			{
				label: "Respiratory insufficiency",
				points: 4,
				helpText: "Evidence of acute or chronic respiratory insufficiency within 4 h of the event, defined as any of the following: PaO2/FiO2 ratio <300, PaO2 <60 mm Hg, or SaO2 <90% (without preexisting cyanotic heartdisease); PaCO2, ETCO2, or TcCO2 >50 mm Hg; spontaneous respiratory rate >40/min or <5/min; requirement for noninvasive ventilation (eg, bag-valve mask, mask CPAP or BiPAP, nasal CPAP or BiPAP), or negative pressure ventilation; or requirement for ventilation via invasive airway"
			},
			{
				label: "Hepatic insufficiency",
				points: 6,
				helpText: "Evidence of hepatic insufficiency within 24 h of the event, defined by total bilirubin >2 mg/dL (to convert to micromoles per liter, multiply by 17.104) and AST > 2 times the upper limit of normal or cirrhosis"
			},
			{
				label: "Renal insufficiency or dialysis",
				points: 4,
				helpText: "Requiring ongoing dialysis or extracorporeal filtration therapies, or serum creatinine >2 mg/dL (to convert to micromoles per liter, multiply by 88.4) within 24 h of the event"
			},
			{
				label: "Medical noncardiac diagnosis",
				points: 7
			}
		];

		// True if any of the components are currently selected, false otherwise.
		this.anySelected = ko.observable(false);

		// The total number of points from adding up all the currently selected components.
		this.componentPoints = ko.observable(initialPoints);

		// The total number of points for the currently entered age group.
		this.agePoints = ko.observable(0);

		// The total number of points. This is a combination of the component points and the age points.
		this.totalPoints = ko.computed(function() {
			return self.componentPoints() + self.agePoints();
		});

		// The probability for the calculation, depending on the total number of points.
		this.probability = ko.computed(function() {
			if(self.totalPoints() >= 24) {
				return "0.9%";
			} else if(self.totalPoints() <= 23 && self.totalPoints() >= 14) {
				return "1.7%";
			} else if(self.totalPoints() <= 13 && self.totalPoints() >= -5) {
				return "9.4%";
			} else if(self.totalPoints() >= -15 && self.totalPoints() <= -6) {
				return "27%";
			}
		});

		/**
		 * Adds or subtracts points for the selected component when its state changes.
		 * @param {Object} component - The component that has either been selected or de-selected.
		 */
		this.addComponentPoints = function(component) {
			// We want to either add or subtract points depending on whether or not the component
			// is now selected or de-selected.
			var newPoints = component.selected() ? -1 * component.points : component.points;
			
			// Add our new points to our point total so far.
			self.componentPoints(self.componentPoints() + newPoints);

			// Our component is now the opposite of its previously selected state.
			component.selected(!component.selected());

			// Update whether or not we have any components or age value selected / entered.
			self.updateAnySelected();

			// Return true to perform the default behavior - otherwise our checkbox will not get
			// checked.
			return true;
		};

		/**
		 * Updates our internal indicator if we have any selected components or entered
		 * value in the patient age input box so that we can either enable or disable
		 * the "Clear All" button.
		 */
		this.updateAnySelected = function() {
			// Find any component that is currently selected.
			var selectedComponent = _.find(self.components(), function(component) {
				return component.selected();
			});

			// Check if we have any components selected now or if we have a value for the
			// age of the patient.
			if(selectedComponent || self.patientAge()) {
				self.anySelected(true);
			} else {
				self.anySelected(false);
			}
		};

		/**
		 * Clears all checked components and clears the patient age and resets our calculated point total 
		 * back to zero.
		 */
		this.clearAll = function() {
			// Loop over all of our components and mark them as no longer checked.
			_.each(self.components(), function(component) {
				component.selected(false);
			});

			// Reset our component point total back to its initial value.
			self.componentPoints(initialPoints);

			// Get rid of any value that was entered for the patient age.
			self.patientAge("");

			// Reset our age points total back to zero.
			self.agePoints(0);

			// We no longer have any more checked components.
			self.anySelected(false);
		};

		// An array of components that we'll allow the user to interact with to create their calculation.
		this.components = ko.observableArray([]);

		// The patient age input value.
		this.patientAge = ko.observable();

		// Subscribe to when a user enters a value for the patient's age.
		this.patientAge.subscribe(function(newPatientAge) {
			// Attempt to parse our entered age as a number.
			var parsedAge = parseInt(newPatientAge, 10);

			// Check if the entered number could be parsed as a number or not.
			if(!isNaN(parsedAge)) {
				if(newPatientAge >= 70 && newPatientAge < 75) {
					self.agePoints(2);
				} else if(newPatientAge >= 75 && newPatientAge < 80) {
					self.agePoints(5);
				} else if(newPatientAge >= 80 && newPatientAge < 85) {
					self.agePoints(6);
				} else if(newPatientAge >= 85) {
					self.agePoints(11);
				} else { // If the user types any other number range.
					self.agePoints(0);
				}
			} else { // The user typed something that can't be a number.
				self.agePoints(0);
			}

			// Update whether or not we have any components or age value entered.
			self.updateAnySelected();
		});

		// Loop over each of our static components so we can build up our components objects.
		_.each(this.staticComponents, function(component) {
			// Add a new component to our array for each static one we have.
			this.components.push(new GO_FAR.Component(component.label, component.points, component.helpText));
		}, this);

		return this;
	};

	$(document).on("ready", function() {
		// Bind our view model to our view.
		ko.applyBindings(new GO_FAR.ViewModel(), $("#content")[0]);

		// Initialize our Bootstrap tooltips.
		$("[data-toggle='tooltip']").tooltip({
			trigger: "hover focus click",
			delay: {
				"show": 300,
				"hide": 100
			}
		});

		// Add our mouseover listener so we can change the background color of the
		// component that is being hovered over to inform the user they can select 
		// the component. (We also remove all other "active" components because they
		// can no longer be selected.)
		$("#components .component").on("mouseover", function() {
			$(".component").removeClass("active");
			$(this).addClass("active");
		});

		// Bind to user keypresses on the patient age input box to prevent
		// submitting the form if a user clicks the 'Enter' key.
		$("#patientAge").on("keydown", function(event) {
			// Check if the key pressed was the enter key.
			if(event.keyCode === 13) {
				return false;
			}
		});

		// Bind to a user clicking a component help tooltip - we want to prevent
		// the default action here of selecting the component.
		$(".component-help-tooltip").on("click", function() {
			return false;
		});

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
		});
	});

})(window.gofar = window.gofar || {});
