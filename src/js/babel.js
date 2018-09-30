"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

window.onload = function () {
    $(document).ready(function () {
        $(".loop").owlCarousel({
            margin: 64,
            loop: false,
            dots: true,
            nav: true,
            items: 3,
            navText: ["<i class='fa fa-angle-left' aria-hidden='true'></i>", "<i class='fa fa-angle-right' aria-hidden='true'></i>"],
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

        $(".header-button-phone").click(function (e) {
            e.stopPropagation();
            $("#dropdown-menu").toggleClass("open");
            return $("#dropdown-menu").removeClass("closed");
        });

        $("#dropdown-menu li span").click(function (e) {
            return $("#dropdown-menu").removeClass("open");
        });

        $("#filter-button").click(function (e) {
            e.stopPropagation();
            $("#filters-wrap").toggleClass("open");
        });

        var tabs = function tabs() {
            var body = $("body");
            var oneTab = $("#tab-buttons").find(".btn");
            var contentContainer = ".food-wrap";

            body.on("click", ".btn", function () {
                var ths = $(this);
                var thsIndex = ths.index();

                ths.siblings().removeClass("active");
                $(contentContainer).removeClass("active");

                ths.addClass("active");
                $(contentContainer).eq(thsIndex).addClass("active");
            });
        };

        tabs();
    });

    document.querySelector(".header-button-search").onclick = function () {
        document.querySelector(".header-search").classList.add("active-search");
    };

    document.querySelector(".g-content").onclick = function (e) {
        document.querySelector(".header-search").classList.remove("active-search");
    };

    $(document).ready(function () {
        var mainContainer = $(".main-container");
        var $animation_elements = $(".animate-element");

        for (var i = 0; i < $animation_elements.length; i++) {
            $animation_elements.eq(i).css("transition-delay", i % 5 / 30 + "s");
        }

        var $window = $(window);

        var check_if_in_view = function check_if_in_view($animation_element) {
            var window_height = $window.height();
            var window_top_position = $window.scrollTop();
            var window_bottom_position = window_top_position + window_height;

            $.each($animation_elements, function () {
                var $element = $(this);
                var element_height = $element.outerHeight();
                var element_top_position = $element.offset().top;
                var element_bottom_position = element_top_position + element_height;

                //check to see if this current container is within viewport
                if (element_bottom_position >= window_top_position && element_top_position <= window_bottom_position) {
                    if (!$element.hasClass("active")) {
                        $element.addClass("active");
                    }
                }
            });
        };

        mainContainer.addClass("active");
        setTimeout(function () {
            check_if_in_view($animation_elements);
        }, 625);

        $(window).on("scroll", function (event) {
            check_if_in_view($animation_elements);
        });

        var itemCont = ".menu-item-cnt";
        var itemName = ".recipe-hover";

        $(itemName).hover(function () {
            var parent = $(this).closest(itemCont);
            parent.addClass("open-hover");
        }, function () {
            var parent = $(this).closest(itemCont);
            parent.removeClass("open-hover");
        });
    });

    $(document).ready(function () {
        var menuItem = document.getElementsByClassName("menu-item");

        if (menuItem.length) {
            var equalHeight = function equalHeight(img, info) {
                img.style = "height: auto;";
                info.style = "height: auto;";

                imgH = img.offsetHeight;
                infoH = info.offsetHeight;

                var max = Math.max(imgH, infoH);

                img.style = "height: " + max + "px;";
                info.style = "height: " + max + "px;";
            };

            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {

                for (var _iterator = menuItem[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var mi = _step.value;

                    var restImg = mi.getElementsByClassName("rest-img")[0];
                    var infoWrap = mi.getElementsByClassName("info-wrap")[0];

                    if (restImg !== undefined && infoWrap !== undefined) {
                        equalHeight(restImg, infoWrap);

                        window.onresize = equalHeight(restImg, infoWrap);
                    }
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }
        }

        // counter

        var countContainer = document.getElementsByClassName("count-container");

        if (countContainer.length) {
            var _loop = function _loop(i) {
                var countInfo = countContainer[i].getElementsByClassName("count-container-info")[0];
                var countInput = countContainer[i].getElementsByClassName("count-container-input")[0];

                var countButtonMin = countContainer[i].getElementsByClassName("count-button-min")[0];
                var countButtonMax = countContainer[i].getElementsByClassName("count-button-max")[0];

                countInput.setAttribute("id", "count-container-input" + (i + 1));

                countButtonMin.addEventListener("click", function () {
                    var getValue = parseInt(countInput.value);
                    if (getValue > 1) {
                        countInput.setAttribute("value", parseInt(countInput.value) - 1);
                        countInfo.innerHTML = countInput.value;
                    }
                }, false);

                countButtonMax.addEventListener("click", function () {
                    var getValue = parseInt(countInput.value);
                    if (getValue < 100) {
                        countInput.setAttribute("value", parseInt(countInput.value) + 1);
                        countInfo.innerHTML = countInput.value;
                    }
                }, false);
            };

            for (var i = 0; i < countContainer.length; i++) {
                _loop(i);
            }
        }

        //rangerSlider

        var selects = $("select");
        var rangeInputs = $('input[type="range"]');
        var priceValue = document.getElementsByClassName("price-value")[0];

        $(document).on("input", 'input[type="range"]', function (e) {
            priceValue.innerHTML = e.currentTarget.value;
        });

        if (rangeInputs.length) {
            rangeInputs.rangeslider({
                polyfill: false,
                horizontalClass: "rangeslider--horizontal",
                handleClass: "rangeslider__handle"
            });
        }

        var body = document.getElementsByTagName("body")[0];
        var headerShopingCard = document.getElementById("header-shopping-cart");
        var trashModal = document.getElementById("trash-window");
        var closeTrash = document.getElementById("close-trash");

        headerShopingCard.addEventListener("click", function () {
            if (!body.classList.contains("lock")) {
                body.className += " lock";
            }

            if (!trashModal.classList.contains("open")) {
                trashModal.className += " open";
            }
        }, false);

        closeTrash.addEventListener("click", function () {
            if (body.classList.contains("lock")) {
                body.classList.remove("lock");
            }

            if (trashModal.classList.contains("open")) {
                trashModal.classList.remove("open");
            }
        }, false);

        if (selects.length) {
            selects.niceSelect();
        }
    });

    var Support = function () {
        function Support() {
            _classCallCheck(this, Support);

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

        _createClass(Support, [{
            key: "values",
            value: function values() {
                this.nameValue = null;
                this.emailValue = null;
                this.messageValue = null;

                this.events();
            }
        }, {
            key: "events",
            value: function events() {
                var _this = this;

                if (this.submit) {
                    this.submit.addEventListener("click", function () {
                        _this.nameValue = _this.nameField.value;
                        _this.emailValue = _this.emailField.value;
                        _this.messageValue = _this.messageField.value;

                        _this.result();
                    });
                }

                var _iteratorNormalCompletion2 = true;
                var _didIteratorError2 = false;
                var _iteratorError2 = undefined;

                try {
                    var _loop2 = function _loop2() {
                        var field = _step2.value;

                        if (field) {
                            field.addEventListener("keyup", function () {
                                if (field.classList.contains("error")) {
                                    field.classList.remove("error");
                                }
                            });
                        }
                    };

                    for (var _iterator2 = this.fields[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                        _loop2();
                    }
                } catch (err) {
                    _didIteratorError2 = true;
                    _iteratorError2 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion2 && _iterator2.return) {
                            _iterator2.return();
                        }
                    } finally {
                        if (_didIteratorError2) {
                            throw _iteratorError2;
                        }
                    }
                }
            }
        }, {
            key: "result",
            value: function result() {
                var result = true;

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
        }, {
            key: "doneSubmit",
            value: function doneSubmit() {
                var _this2 = this;

                console.log(this.success);
                if (!this.success.classList.contains("active")) {
                    this.success.className += " active";
                }

                setTimeout(function () {
                    var _iteratorNormalCompletion3 = true;
                    var _didIteratorError3 = false;
                    var _iteratorError3 = undefined;

                    try {
                        for (var _iterator3 = _this2.fields[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                            var _field = _step3.value;

                            if (_field) {
                                _field.value = "";
                            }
                        }
                    } catch (err) {
                        _didIteratorError3 = true;
                        _iteratorError3 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion3 && _iterator3.return) {
                                _iterator3.return();
                            }
                        } finally {
                            if (_didIteratorError3) {
                                throw _iteratorError3;
                            }
                        }
                    }
                }, 500);

                setTimeout(function () {
                    if (_this2.success.classList.contains("active")) {
                        _this2.success.classList.remove("active");
                    }
                }, 3000);
            }
        }, {
            key: "checkName",
            value: function checkName(name) {
                var pattern = new RegExp(/^[a-zA-Zа-яА-Я'][a-zA-Zа-яА-Я-' ]+[a-zA-Zа-яА-Я']?$/gi);

                return pattern.test(name);
            }
        }, {
            key: "checkPhone",
            value: function checkPhone(phone) {
                var pattern = new RegExp(/^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/);

                return pattern.test(phone);
            }
        }, {
            key: "checkEmail",
            value: function checkEmail(email) {
                var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);

                return pattern.test(email);
            }
        }]);

        return Support;
    }();

    new Support();

    var conMap = function conMap() {
        if (window.google !== undefined) {
            var mapZoom = 17;
            var mapContact = $("#map-container");
            var latitude = parseFloat(mapContact.attr("data-lat"));
            var longitude = parseFloat(mapContact.attr("data-lng"));
            var markerUrl = "images/marker-map.png";
            var mapStyles = [{
                featureType: "administrative",
                elementType: "all",
                stylers: [{
                    saturation: "-100"
                }]
            }, {
                featureType: "administrative.province",
                elementType: "all",
                stylers: [{
                    visibility: "off"
                }]
            }, {
                featureType: "landscape",
                elementType: "all",
                stylers: [{
                    saturation: -100
                }, {
                    lightness: 65
                }, {
                    visibility: "on"
                }]
            }, {
                featureType: "poi",
                elementType: "all",
                stylers: [{
                    saturation: -100
                }, {
                    lightness: "50"
                }, {
                    visibility: "simplified"
                }]
            }, {
                featureType: "road",
                elementType: "all",
                stylers: [{
                    saturation: "-100"
                }]
            }, {
                featureType: "road.highway",
                elementType: "all",
                stylers: [{
                    visibility: "simplified"
                }]
            }, {
                featureType: "road.arterial",
                elementType: "all",
                stylers: [{
                    lightness: "30"
                }]
            }, {
                featureType: "road.local",
                elementType: "all",
                stylers: [{
                    lightness: "40"
                }]
            }, {
                featureType: "transit",
                elementType: "all",
                stylers: [{
                    saturation: -100
                }, {
                    visibility: "simplified"
                }]
            }, {
                featureType: "water",
                elementType: "geometry",
                stylers: [{
                    hue: "#ffff00"
                }, {
                    lightness: -25
                }, {
                    saturation: -97
                }]
            }, {
                featureType: "water",
                elementType: "labels",
                stylers: [{
                    lightness: -25
                }, {
                    saturation: -100
                }]
            }];

            var mapOptions = {
                center: new google.maps.LatLng(latitude, longitude),
                zoom: mapZoom,
                panControl: false,
                mapTypeControl: false,
                streetViewControl: false,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                scrollwheel: false,
                styles: mapStyles
            };

            var mapArea = new google.maps.Map(document.getElementById("map-container"), mapOptions);

            var marker = new google.maps.Marker({
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