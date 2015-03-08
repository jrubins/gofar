(function(GO_FAR) {

	/**
	 * Represents an individual component that has some value towards the calculation.
	 * @constructor
	 * @param {String} label - The label for the component.
	 * @param {int} points - The number of points to add to the total when the component
	 * 		is selected.
	 */
	GO_FAR.Component = function(label, points) {
		this.label = label;
		this.points = points;

		// this is whether or not the component is currently selected, all components
		// start out as not selected
		this.selected = ko.observable(false);
	};

	/**
	 * Our view model for our data for the calculator.
	 * @constructor
	 */
	GO_FAR.ViewModel = function() {
		var self = this;

		// the initial points that the calculator should start at
		var initialPoints = -15;

		// all the static components we'll display as checkboxes for the user to select for
		// the calculation
		this.staticComponents = [
			{
				label: "Moderate or worse cerebral disability*",
				points: 15			
			},
			{
				label: "Admission from a skilled nursing facility",
				points: 6			
			},
			{
				label: "Metastatic or hematologic cancer",
				points: 7			
			},
			{
				label: "Major trauma",
				points: 10			
			},
			{
				label: "Pneumonia",
				points: 1			
			},
			{
				label: "Septicemia",
				points: 7
			},
			{
				label: "Hypotension or hypoperfusion",
				points: 5
			},
			{
				label: "Acute stroke",
				points: 8
			},
			{
				label: "Respiratory insufficiency",
				points: 4
			},
			{
				label: "Hepatic insufficiency",
				points: 6
			},
			{
				label: "Renal insufficiency or dialysis",
				points: 4
			},
			{
				label: "Medical noncardiac diagnosis",
				points: 7
			}
		];

		// true if any of the components are currently selected, false otherwise 
		this.anySelected = ko.observable(false);

		// the total number of points from adding up all the selected components currently
		this.componentPoints = ko.observable(initialPoints);

		// the total number of points for the currently entered age group
		this.agePoints = ko.observable(0);

		// the total number of points - combination of the component points and the age points
		this.totalPoints = ko.computed(function() {
			return self.componentPoints() + self.agePoints();
		});

		// the probability for the calculation, depending on the total number of points
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
			// we want to either add or subtract points depending on whether or not the component
			// is now selected or de-selected
			var newPoints = component.selected() ? -1 * component.points : component.points;
			
			// add our new points to our point total so far
			self.componentPoints(self.componentPoints() + newPoints);

			// our component is now the opposite of its previously selected state
			component.selected(!component.selected());

			// update whether or not we have any components or age value selected / entered
			self.updateAnySelected();

			// return true to perform the default behavior - otherwise our checkbox will not get
			// checked
			return true;
		};

		/**
		 * Updates our internal indicator if we have any selected components or entered
		 * value in the patient age input box so that we can either enable or disable
		 * the "Clear All" button.
		 */
		this.updateAnySelected = function() {
			// find any component that is currently selected
			var selectedComponent = _.find(self.components(), function(component) {
				return component.selected();
			});

			// check if we have any components selected now or if we have a value for the
			// age of the patient
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
			// loop over all of our components and mark them as no longer checked
			_.each(self.components(), function(component) {
				component.selected(false);
			});

			// reset our component point total back to zero
			self.componentPoints(initialPoints);

			// get rid of any value that was entered for the patient age.
			self.patientAge("");

			// reset our age points total back to zero
			self.agePoints(0);

			// we no longer have any more checked components
			self.anySelected(false);
		};

		// an array of components that we'll allow the user to interact with to create their calculation
		this.components = ko.observableArray([]);

		// the patient age input value
		this.patientAge = ko.observable();

		// subscribe to when a user enters a value for the patient's age
		this.patientAge.subscribe(function(newPatientAge) {
			// attempt to parse our entered age as a number
			var parsedAge = parseInt(newPatientAge, 10);

			// check if the entered number could be parsed as a number or not
			if(!isNaN(parsedAge)) {
				if(newPatientAge >= 70 && newPatientAge < 75) {
					self.agePoints(2);
				} else if(newPatientAge >= 75 && newPatientAge < 80) {
					self.agePoints(5);
				} else if(newPatientAge >= 80 && newPatientAge < 85) {
					self.agePoints(6);
				} else if(newPatientAge >= 85) {
					self.agePoints(11);
				} else { // if the user types any other number range
					self.agePoints(0);
				}
			} else { // the user typed something that can't be a number
				self.agePoints(0);
			}

			// update whether or not we have any components or age value entered
			self.updateAnySelected();
		});

		// loop over each of our static components so we can build up our components objects
		_.each(this.staticComponents, function(component) {
			// add a new component to our array for each static one we have
			this.components.push(new GO_FAR.Component(component.label, component.points));
		}, this);

		return this;
	};

	$(document).on('ready', function() {
		// bind our model to our view
		ko.applyBindings(new GO_FAR.ViewModel(), $("#content")[0]);

		// add our hover listener so we can change the background color to inform
		// the user they can select an option
		$("#components .component").hover(function() {
			$(this).css("background-color", "#e6e6e6");
		}, function() {
			$(this).css("background-color", "#fff");
		});
	});

})(window.gofar = window.gofar || {});
