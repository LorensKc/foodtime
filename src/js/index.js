/* OWL
 =============================================*/
jQuery(document).ready(function($) {
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
});

/*	Search
 =============================================*/

window.onload = function() {
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

		const priceValue = document.getElementsByClassName("price-value")[0];

		$(document).on("input", 'input[type="range"]', function(e) {
			priceValue.innerHTML = e.currentTarget.value;
		});

		$('input[type="range"]').rangeslider({
			polyfill: false,
			horizontalClass: "rangeslider--horizontal",
			handleClass: "rangeslider__handle"
		});

		const body = document.getElementsByTagName("body")[0];
		const headerShopingCard = document.getElementById("header-shopping-cart");
		const trashModal = document.getElementById("trash-window");
		const closeTrash = document.getElementById("close-trash");

		headerShopingCard.addEventListener("click", () => {
				if (!body.classList.contains("lock")) {
					body.className += " lock";
				}

				if (!trashModal.classList.contains("open")) {
					trashModal.className += " open";
				}
		}, false);

		closeTrash.addEventListener('click', () => {
			if (body.classList.contains("lock")) {
				body.classList.remove("lock");
			}

			if (trashModal.classList.contains("open")) {
				trashModal.classList.remove("open");
			}
		}, false);

		$('select').niceSelect();
	});
};

/*	Animations on scroll
 =============================================*/

// wow = new WOW(
//     {
//         animateClass: 'animated',
//         offset:       100
//     }
// );

// wow.init();
