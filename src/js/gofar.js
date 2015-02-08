(function(GO_FAR) {

	// from detectmobilebrowser.com
	GO_FAR.isMobileBrowser = function() {
		var a = navigator.userAgent || navigator.vendor || window.opera;
		if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) {
			return true;
		}
		return false;
	};

	GO_FAR.Component = function(label, points, ageBracket, mobileOrder) {
		var self = this;

		self.label = label;
		self.points = points;
		self.selected = ko.observable(false);
		self.ageBracket = ko.observable(ageBracket ? ageBracket : false);
		self.mobileOrder = mobileOrder;

		return self;
	};

	GO_FAR.ViewModel = function() {
		var self = this;

		self.anySelected = ko.observable(false);

		self.points = ko.observable(0);

		self.probability = ko.computed(function() {
			if(self.points() >= 24) {
				return "0.9%";
			} else if(self.points() <= 23 && self.points() >= 14) {
				return "1.7%";
			} else if(self.points() <= 13 && self.points() >= -5) {
				return "9.4%";
			} else if(self.points() >= -15 && self.points() <= -6) {
				return "27%";
			}
		});

		self.addPoints = function(model) {
			self.anySelected(true);

			var newPoints = model.selected() ? -1 * model.points : model.points;

			if(model.ageBracket()) {
				_.each(self.ageComponents, function(ageComponent) {
					if(ageComponent.label !== model.label && ageComponent.selected()) {
						ageComponent.selected(false);
						newPoints -= ageComponent.points;
					}
				});
			}
			
			self.points(self.points() + newPoints);
			model.selected(!model.selected());

			return true;
		};

		self.clearAll = function() {
			$.each(self.components(), function(index, component) {
				component.selected(false);
			});
			self.points(0);
			self.anySelected(false);
		};

		self.staticComponents = [
			{
				label: "Neurologically intact or with minimal deficits*",
				points: -15,
				mobileOrder: 1
			},
			{
				label: "Admission from a skilled nursing facility",
				points: 6,
				mobileOrder: 2
			},
			{
				label: "Metastatic or hematologic cancer",
				points: 7,
				mobileOrder: 7
			},
			{
				label: "Major trauma",
				points: 10,
				mobileOrder: 8
			},
			{
				label: "Pneumonia",
				points: 1,
				mobileOrder: 9
			},
			{
				label: "Septicemia",
				points: 7,
				mobileOrder: 10
			},
			{
				label: "age 70 to 74 y",
				points: 2,
				ageBracket: true,
				mobileOrder: 3
			},
			{
				label: "Hypotension or hypoperfusion",
				points: 5,
				mobileOrder: 11
			},
			{
				label: "Acute stroke",
				points: 8,
				mobileOrder: 12
			},
			{
				label: "75 to 79 y",
				points: 5,
				ageBracket: true,
				mobileOrder: 4
			},
			{
				label: "Respiratory insufficiency",
				points: 4,
				mobileOrder: 13
			},
			{
				label: "Hepatic insufficiency",
				points: 6,
				mobileOrder: 14
			},
			{
				label: "80 to 84 y",
				points: 6,
				ageBracket: true,
				mobileOrder: 5
			},
			{
				label: "Renal insufficiency or dialysis",
				points: 4,
				mobileOrder: 15
			},
			{
				label: "Medical noncardiac diagnosis",
				points: 7,
				mobileOrder: 16
			},
			{
				label: ">= 85 y",
				points: 11,
				ageBracket: true,
				mobileOrder: 6
			}
		];

		self.components = ko.observableArray([]);
		self.ageComponents = [];
		$.each(self.staticComponents, function(index, component) {
			var componentViewModel = new GO_FAR.Component(component.label, component.points, component.ageBracket, component.mobileOrder);
			self.components.push(componentViewModel);
			
			if(component.ageBracket) {
				self.ageComponents.push(componentViewModel);
			}

		});

		if(GO_FAR.isMobileBrowser()) {
			self.components(_.sortBy(self.components(), function(component) {
				return component.mobileOrder;
			}));
		}

		return self;
	};

	$(document).on('ready', function() {
		ko.applyBindings(new GO_FAR.ViewModel(), $("#content")[0]);

		$("#components .component").hover(function() {
			$(this).css("background-color", "#e6e6e6");
		}, function() {
			$(this).css("background-color", "#fff");
		});
	});
})(window.gofar = window.gofar || {});
