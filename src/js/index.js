window.onload = function() {
	$(document).ready(function() {
		$(".loop").owlCarousel({
			margin: 64,
			loop: false,
			dots: true,
			nav: true,
			items: 3,
			navText: [
				"<i class='fa fa-angle-left' aria-hidden='true'></i>",
				"<i class='fa fa-angle-right' aria-hidden='true'></i>"
			],
			responsive: {
				0: {
					items: 1
				},
				960: {
					items: 1
				},
				1024: {
					items: 2,
					margin: 16
				},
				1280: {
					items: 2,
					margin: 34
				},
				1680: {
					margin: 64
				}
			}
		});

		$(".header-button-phone").click(function(e) {
			e.stopPropagation();
			$("#dropdown-menu").toggleClass("open");
			return $("#dropdown-menu").removeClass("closed");
		});

		$("#dropdown-menu li span").click(function(e) {
			return $("#dropdown-menu").removeClass("open");
		});

		$("#filter-button").click(function(e) {
			e.stopPropagation();
			$("#filters-wrap").toggleClass("open");
		});

		const tabs = () => {
			const body = $("body");
			const oneTab = $("#tab-buttons").find(".btn");
			const contentContainer = ".food-wrap";

			body.on("click", ".btn", function() {
				const ths = $(this);
				const thsIndex = ths.index();

				ths.siblings().removeClass("active");
				$(contentContainer).removeClass("active");

				ths.addClass("active");
				$(contentContainer)
					.eq(thsIndex)
					.addClass("active");
			});
		};

		tabs();
	});

	document.querySelector(".header-button-search").onclick = function() {
		document.querySelector(".header-search").classList.add("active-search");
	};

	document.querySelector(".g-content").onclick = function(e) {
		document.querySelector(".header-search").classList.remove("active-search");
	};

	$(document).ready(function() {
		var mainContainer = $(".main-container");
		var $animation_elements = $(".animate-element");

		for (var i = 0; i < $animation_elements.length; i++) {
			$animation_elements.eq(i).css("transition-delay", (i % 5) / 30 + "s");
		}

		var $window = $(window);

		var check_if_in_view = function($animation_element) {
			var window_height = $window.height();
			var window_top_position = $window.scrollTop();
			var window_bottom_position = window_top_position + window_height;

			$.each($animation_elements, function() {
				var $element = $(this);
				var element_height = $element.outerHeight();
				var element_top_position = $element.offset().top;
				var element_bottom_position = element_top_position + element_height;

				//check to see if this current container is within viewport
				if (
					element_bottom_position >= window_top_position &&
					element_top_position <= window_bottom_position
				) {
					if (!$element.hasClass("active")) {
						$element.addClass("active");
					}
				}
			});
		};

		mainContainer.addClass("active");
		setTimeout(function() {
			check_if_in_view($animation_elements);
		}, 625);

		$(window).on("scroll", function(event) {
			check_if_in_view($animation_elements);
		});

		var itemCont = ".menu-item-cnt";
		var itemName = ".recipe-hover";

		$(itemName).hover(
			function() {
				var parent = $(this).closest(itemCont);
				parent.addClass("open-hover");
			},
			function() {
				var parent = $(this).closest(itemCont);
				parent.removeClass("open-hover");
			}
		);
	});

	$(document).ready(function() {
		const menuItem = document.getElementsByClassName("menu-item");

		if (menuItem.length) {
			function equalHeight(img, info) {
				img.style = "height: auto;";
				info.style = "height: auto;";

				imgH = img.offsetHeight;
				infoH = info.offsetHeight;

				var max = Math.max(imgH, infoH);

				img.style = "height: " + max + "px;";
				info.style = "height: " + max + "px;";
			}

			for (let mi of menuItem) {
				let restImg = mi.getElementsByClassName("rest-img")[0];
				let infoWrap = mi.getElementsByClassName("info-wrap")[0];

				if (restImg !== undefined && infoWrap !== undefined) {
					equalHeight(restImg, infoWrap);

					window.onresize = equalHeight(restImg, infoWrap);
				}
			}
		}

		// counter

		const countContainer = document.getElementsByClassName("count-container");

		if (countContainer.length) {
			for (let i = 0; i < countContainer.length; i++) {
				let countInfo = countContainer[i].getElementsByClassName(
					"count-container-info"
				)[0];
				let countInput = countContainer[i].getElementsByClassName(
					"count-container-input"
				)[0];

				let countButtonMin = countContainer[i].getElementsByClassName(
					"count-button-min"
				)[0];
				let countButtonMax = countContainer[i].getElementsByClassName(
					"count-button-max"
				)[0];

				countInput.setAttribute("id", "count-container-input" + (i + 1));

				countButtonMin.addEventListener(
					"click",
					() => {
						let getValue = parseInt(countInput.value);
						if (getValue > 1) {
							countInput.setAttribute("value", parseInt(countInput.value) - 1);
							countInfo.innerHTML = countInput.value;
						}
					},
					false
				);

				countButtonMax.addEventListener(
					"click",
					() => {
						let getValue = parseInt(countInput.value);
						if (getValue < 100) {
							countInput.setAttribute("value", parseInt(countInput.value) + 1);
							countInfo.innerHTML = countInput.value;
						}
					},
					false
				);
			}
		}

		//rangerSlider

		const selects = $("select");
		const rangeInputs = $('input[type="range"]');
		const priceValue = document.getElementsByClassName("price-value")[0];

		$(document).on("input", 'input[type="range"]', function(e) {
			priceValue.innerHTML = e.currentTarget.value;
		});

		if (rangeInputs.length) {
			rangeInputs.rangeslider({
				polyfill: false,
				horizontalClass: "rangeslider--horizontal",
				handleClass: "rangeslider__handle"
			});
		}

		const body = document.getElementsByTagName("body")[0];
		const headerShopingCard = document.getElementById("header-shopping-cart");
		const trashModal = document.getElementById("trash-window");
		const closeTrash = document.getElementById("close-trash");

		headerShopingCard.addEventListener(
			"click",
			() => {
				if (!body.classList.contains("lock")) {
					body.className += " lock";
				}

				if (!trashModal.classList.contains("open")) {
					trashModal.className += " open";
				}
			},
			false
		);

		closeTrash.addEventListener(
			"click",
			() => {
				if (body.classList.contains("lock")) {
					body.classList.remove("lock");
				}

				if (trashModal.classList.contains("open")) {
					trashModal.classList.remove("open");
				}
			},
			false
		);

		if (selects.length) {
			selects.niceSelect();
		}
	});

	class Support {
		constructor() {
			this.form = document.getElementById("support-form");
			this.submit = document.getElementById("submit-support");
			this.fields = document.getElementsByClassName("common_field");
			this.success = document.getElementById("message_success");

			this.nameField = document.getElementById("name_field");
			this.emailField = document.getElementById("email_field");
			this.messageField = document.getElementById("textarea_field");

			if (this.form) {
				this.values();
			}
		}

		values() {
			this.nameValue = null;
			this.emailValue = null;
			this.messageValue = null;

			this.events();
		}

		events() {
			if (this.submit) {
				this.submit.addEventListener("click", () => {
					this.nameValue = this.nameField.value;
					this.emailValue = this.emailField.value;
					this.messageValue = this.messageField.value;

					this.result();
				});
			}

			for (let field of this.fields) {
				if (field) {
					field.addEventListener("keyup", () => {
						if (field.classList.contains("error")) {
							field.classList.remove("error");
						}
					});
				}
			}
		}

		result() {
			let result = true;

			if (this.nameField && !this.checkName(this.nameValue)) {
				result = false;

				if (!this.nameField.classList.contains("error")) {
					this.nameField.className += " error";
				}
			}

			if (this.emailField && !this.checkEmail(this.emailValue)) {
				result = false;

				if (!this.emailField.classList.contains("error")) {
					this.emailField.className += " error";
				}
			}

			if (this.phoneField && !this.checkPhone(this.phoneValue)) {
				result = false;

				if (!this.phoneField.classList.contains("error")) {
					this.phoneField.className += " error";
				}
			}

			if (this.messageField && this.messageValue === "") {
				result = false;

				if (!this.messageField.classList.contains("error")) {
					this.messageField.className += " error";
				}
			}

			console.log(result);

			if (result === true) {
				this.doneSubmit();
			}
		}

		doneSubmit() {
			console.log(this.success);
			if (!this.success.classList.contains("active")) {
				this.success.className += " active";
			}

			setTimeout(() => {
				for (let field of this.fields) {
					if (field) {
						field.value = "";
					}
				}
			}, 500);

			setTimeout(() => {
				if (this.success.classList.contains("active")) {
					this.success.classList.remove("active");
				}
			}, 3000);
		}

		checkName(name) {
			const pattern = new RegExp(
				/^[a-zA-Zа-яА-Я'][a-zA-Zа-яА-Я-' ]+[a-zA-Zа-яА-Я']?$/gi
			);

			return pattern.test(name);
		}

		checkPhone(phone) {
			const pattern = new RegExp(
				/^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/
			);

			return pattern.test(phone);
		}

		checkEmail(email) {
			const pattern = new RegExp(
				/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
			);

			return pattern.test(email);
		}
	}

	new Support();

	let conMap = () => {
		if (window.google !== undefined) {
			const mapZoom = 17;
			const mapContact = $("#map-container");
			const latitude = parseFloat(mapContact.attr("data-lat"));
			const longitude = parseFloat(mapContact.attr("data-lng"));
			const markerUrl = "images/marker-map.png";
			const mapStyles = [
				{
					featureType: "administrative",
					elementType: "all",
					stylers: [
						{
							saturation: "-100"
						}
					]
				},
				{
					featureType: "administrative.province",
					elementType: "all",
					stylers: [
						{
							visibility: "off"
						}
					]
				},
				{
					featureType: "landscape",
					elementType: "all",
					stylers: [
						{
							saturation: -100
						},
						{
							lightness: 65
						},
						{
							visibility: "on"
						}
					]
				},
				{
					featureType: "poi",
					elementType: "all",
					stylers: [
						{
							saturation: -100
						},
						{
							lightness: "50"
						},
						{
							visibility: "simplified"
						}
					]
				},
				{
					featureType: "road",
					elementType: "all",
					stylers: [
						{
							saturation: "-100"
						}
					]
				},
				{
					featureType: "road.highway",
					elementType: "all",
					stylers: [
						{
							visibility: "simplified"
						}
					]
				},
				{
					featureType: "road.arterial",
					elementType: "all",
					stylers: [
						{
							lightness: "30"
						}
					]
				},
				{
					featureType: "road.local",
					elementType: "all",
					stylers: [
						{
							lightness: "40"
						}
					]
				},
				{
					featureType: "transit",
					elementType: "all",
					stylers: [
						{
							saturation: -100
						},
						{
							visibility: "simplified"
						}
					]
				},
				{
					featureType: "water",
					elementType: "geometry",
					stylers: [
						{
							hue: "#ffff00"
						},
						{
							lightness: -25
						},
						{
							saturation: -97
						}
					]
				},
				{
					featureType: "water",
					elementType: "labels",
					stylers: [
						{
							lightness: -25
						},
						{
							saturation: -100
						}
					]
				}
			];

			const mapOptions = {
				center: new google.maps.LatLng(latitude, longitude),
				zoom: mapZoom,
				panControl: false,
				mapTypeControl: false,
				streetViewControl: false,
				mapTypeId: google.maps.MapTypeId.ROADMAP,
				scrollwheel: false,
				styles: mapStyles
			};

			const mapArea = new google.maps.Map(
				document.getElementById("map-container"),
				mapOptions
			);

			let marker = new google.maps.Marker({
				position: new google.maps.LatLng(latitude, longitude),
				map: mapArea,
				visible: true,
				icon: markerUrl
			});
		}
	};

	conMap();
};

// wow.init();
