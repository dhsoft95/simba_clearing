(function ($) {
    "use strict";

    /**
     * Easy selector helper function
     */
    const select = (el, all = false) => {
        el = el.trim()
        if (all) {
            return [...document.querySelectorAll(el)]
        } else {
            return document.querySelector(el)
        }
    }

    /**
     * Easy event listener function
     */
    const on = (type, el, listener, all = false) => {
        let selectEl = select(el, all)
        if (selectEl) {
            if (all) {
                selectEl.forEach(e => e.addEventListener(type, listener))
            } else {
                selectEl.addEventListener(type, listener)
            }
        }
    }

    /**
     * Easy on scroll event listener
     */
    const onscroll = (el, listener) => {
        el.addEventListener('scroll', listener)
    }
    /**
     * Mobile nav toggle
     */
    on('click', '.mobile-nav-toggle', function(e) {
        select('#navbar').classList.toggle('navbar-mobile')
        this.classList.toggle('bi-list')
        this.classList.toggle('bi-x')
    })

    /**
     * Mobile nav dropdowns activate
     */
    on('click', '.navbar .dropdown > a', function(e) {
        if (select('#navbar').classList.contains('navbar-mobile')) {
            e.preventDefault()
            this.nextElementSibling.classList.toggle('dropdown-active')
        }
    }, true)

    /**
     * Scrool with ofset on links with a class name .scrollto
     */
    on('click', '.scrollto', function(e) {
        if (select(this.hash)) {
            e.preventDefault()

            let navbar = select('#navbar')
            if (navbar.classList.contains('navbar-mobile')) {
                navbar.classList.remove('navbar-mobile')
                let navbarToggle = select('.mobile-nav-toggle')
                navbarToggle.classList.toggle('bi-list')
                navbarToggle.classList.toggle('bi-x')
            }
            scrollto(this.hash)
        }
    }, true)

    /**
     * Scroll with ofset on page load with hash links in the url
     */
    window.addEventListener('load', () => {
        if (window.location.hash) {
            if (select(window.location.hash)) {
                scrollto(window.location.hash)
            }
        }
    });

    /**
     * Navbar links active state on scroll
     */
    let navbarlinks = select('#navbar .scrollto', true)
    const navbarlinksActive = () => {
        let position = window.scrollY + 200
        navbarlinks.forEach(navbarlink => {
            if (!navbarlink.hash) return
            let section = select(navbarlink.hash)
            if (!section) return
            if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
                navbarlink.classList.add('active')
            } else {
                navbarlink.classList.remove('active')
            }
        })
    }
    window.addEventListener('load', navbarlinksActive)
    onscroll(document, navbarlinksActive)

    /**
     * Scrolls to an element with header offset
     */
    const scrollto = (el) => {
        let header = select('#header')
        let offset = header.offsetHeight

        let elementPos = select(el).offsetTop
        window.scrollTo({
            top: elementPos - offset,
            behavior: 'smooth'
        })
    }

    /**
     * Toggle .header-scrolled class to #header when page is scrolled
     */
    let selectHeader = select('#header')
    let selectTopbar = select('#topbar')
    if (selectHeader) {
        const headerScrolled = () => {
            if (window.scrollY > 100) {
                selectHeader.classList.add('header-scrolled')
                if (selectTopbar) {
                    selectTopbar.classList.add('topbar-scrolled')
                }
            } else {
                selectHeader.classList.remove('header-scrolled')
                if (selectTopbar) {
                    selectTopbar.classList.remove('topbar-scrolled')
                }
            }
        }
        window.addEventListener('load', headerScrolled)
        onscroll(document, headerScrolled)
    }

    /**
     * Back to top button
     */
    let backtotop = select('.back-to-top')
    if (backtotop) {
        const toggleBacktotop = () => {
            if (window.scrollY > 100) {
                backtotop.classList.add('active')
            } else {
                backtotop.classList.remove('active')
            }
        }
        window.addEventListener('load', toggleBacktotop)
        onscroll(document, toggleBacktotop)
    }


    // Owl Carousel initialization
    $('.hero-slider').owlCarousel({
        items: 1,
        loop: true,
        margin: 0,
        nav: true,
        autoHeight: true,
        autoplay: true,
        autoplayHoverPause: true,
        dots: false,
        navText: ["<i class='bx bx-chevron-left'></i>", "<i class='bx bx-chevron-right'></i>"]
    });


    $('.hero-slider-two').owlCarousel({
        items: 1,
        loop: true,
        margin: 0,
        nav: true,
        autoplay: true,
        autoplayHoverPause: true,
        dots: false,
        navText: ["<i class='bx bx-chevron-left'></i>", "<i class='bx bx-chevron-right'></i>"]
    })
    $('.speciality-slider').owlCarousel({
        loop: true,
        margin: 30,
        dots: false,
        nav: true,
        autoplay: true,
        autoplayHoverPause: true,
        navText: ["<i class='bx bxs-left-arrow-alt'></i>", "<i class='bx bxs-right-arrow-alt'></i>"],
        responsive: {0: {items: 1}, 576: {items: 2}, 768: {items: 2}, 1200: {items: 3}}
    })
    $('.testimonials-slider').owlCarousel({
        items: 1,
        loop: true,
        margin: 30,
        dots: true,
        nav: true,
        autoplay: true,
        autoplayHoverPause: true,
        navText: ["<i class='bx bxs-left-arrow-alt'></i>", "<i class='bx bxs-right-arrow-alt'></i>"],
    })
    $('.partner-slider').owlCarousel({
        loop: true,
        dots: false,
        margin: 30,
        nav: false,
        autoplay: true,
        autoplayHoverPause: true,
        responsive: {0: {items: 2}, 576: {items: 3}, 768: {items: 4}, 1200: {items: 5}}
    })
    $('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
        disableOn: 300,
        type: 'iframe',
        mainClass: 'mfp-fade',
        removalDelay: 160,
        preloader: false,
        fixedContentPos: false
    });
    $('.services-slider').owlCarousel({
        loop: true,
        margin: 30,
        dots: false,
        nav: true,
        autoplay: true,
        autoplayHoverPause: true,
        navText: ["<i class='bx bxs-left-arrow-alt'></i>", "<i class='bx bxs-right-arrow-alt'></i>"],
        responsive: {0: {items: 1}, 576: {items: 1}, 768: {items: 2}, 1200: {items: 4}}
    })
    $('.odometer').appear(function (e) {
        var odo = $(".odometer");
        odo.each(function () {
            var countNumber = $(this).attr("data-count");
            $(this).html(countNumber);
        });
    });
    $('.hero-slider-three').owlCarousel({
        items: 1,
        loop: true,
        margin: 0,
        nav: true,
        autoHeight: true,
        autoplay: true,
        autoplayHoverPause: true,
        dots: true,
        navText: ["<i class='bx bx-chevron-left'></i>", "<i class='bx bx-chevron-right'></i>"]
    })
    $('.services-slider-two').owlCarousel({
        loop: true,
        margin: 30,
        dots: false,
        nav: true,
        autoplay: true,
        autoplayHoverPause: true,
        navText: ["<i class='bx bxs-left-arrow-alt'></i>", "<i class='bx bxs-right-arrow-alt'></i>"],
        responsive: {0: {items: 1}, 576: {items: 1}, 768: {items: 2}, 1200: {items: 3}}
    })
    $('.clients-slider').owlCarousel({
        loop: true,
        margin: 30,
        dots: false,
        nav: true,
        autoplay: true,
        autoplayHoverPause: true,
        navText: ["<i class='bx bxs-left-arrow-alt'></i>", "<i class='bx bxs-right-arrow-alt'></i>"],
        responsive: {0: {items: 1}, 576: {items: 1}, 768: {items: 1}, 1200: {items: 2}}
    })
    $('#accordion h3').on('click', function () {
        var iconChevron = $('.bx-chevron-right'), currentIcon = $(this).children('.bx-chevron-right');
        $(iconChevron).not(currentIcon).removeClass('is-rotate');
        $(this).children('.bx-chevron-right').toggleClass('is-rotate');
        $(this).next().toggleClass('is-hidden').siblings('.drawer').addClass('is-hidden');
    });
    $('.blog-slider').owlCarousel({
        loop: true,
        margin: 30,
        dots: false,
        nav: true,
        autoplay: true,
        autoplayHoverPause: true,
        navText: ["<i class='bx bxs-left-arrow-alt'></i>", "<i class='bx bxs-right-arrow-alt'></i>"],
        responsive: {0: {items: 1}, 576: {items: 1}, 768: {items: 2}, 1200: {items: 3}}
    })
    $('.ferry-gallery').magnificPopup({
        delegate: 'a',
        type: 'image',
        tLoading: 'Loading image #%curr%...',
        mainClass: 'mfp-img-mobile',
        gallery: {enabled: true, navigateByImgClick: true, preload: [0, 1]}
    });
    $('.accordion > li:eq(0) .title').addClass('active').next().slideDown();
    $('.accordion .title').click(function (j) {
        var dropDown = $(this).closest('li').find('.accordion-content');
        $(this).closest('.accordion').find('.accordion-content').not(dropDown).slideUp();
        if ($(this).hasClass('active')) {
            $(this).removeClass('active');
        } else {
            $(this).closest('.accordion').find('.title.active').removeClass('active');
            $(this).addClass('active');
        }
        dropDown.stop(false, true).slideToggle();
        j.preventDefault();
    });

    function makeTimer() {
        var endTime = new Date("november  30, 2022 17:00:00 PDT");
        var endTime = (Date.parse(endTime)) / 1000;
        var now = new Date();
        var now = (Date.parse(now) / 1000);
        var timeLeft = endTime - now;
        var days = Math.floor(timeLeft / 86400);
        var hours = Math.floor((timeLeft - (days * 86400)) / 3600);
        var minutes = Math.floor((timeLeft - (days * 86400) - (hours * 3600)) / 60);
        var seconds = Math.floor((timeLeft - (days * 86400) - (hours * 3600) - (minutes * 60)));
        if (hours < "10") {
            hours = "0" + hours;
        }
        if (minutes < "10") {
            minutes = "0" + minutes;
        }
        if (seconds < "10") {
            seconds = "0" + seconds;
        }
        $("#days").html(days + "<span>Days</span>");
        $("#hours").html(hours + "<span>Hours</span>");
        $("#minutes").html(minutes + "<span>Minutes</span>");
        $("#seconds").html(seconds + "<span>Seconds</span>");
    }

    setInterval(function () {
        makeTimer();
    }, 300);
    $('.feedback-slider').owlCarousel({
        loop: true,
        margin: 30,
        dots: false,
        nav: true,
        autoplay: true,
        autoplayHoverPause: true,
        navText: ["<i class='bx bxs-left-arrow-alt'></i>", "<i class='bx bxs-right-arrow-alt'></i>"],
        responsive: {0: {items: 1}, 576: {items: 1}, 768: {items: 1}, 1200: {items: 1}}
    })
    $(".newsletter-form").validator().on("submit", function (event) {
        if (event.isDefaultPrevented()) {
            formErrorSub();
            submitMSGSub(false, "Please enter your email correctly.");
        } else {
            event.preventDefault();
        }
    });

    function callbackFunction(resp) {
        if (resp.result === "success") {
            formSuccessSub();
        } else {
            formErrorSub();
        }
    }

    function formSuccessSub() {
        $(".newsletter-form")[0].reset();
        submitMSGSub(true, "Thank you for subscribing!");
        setTimeout(function () {
            $("#validator-newsletter").addClass('hide');
        }, 4000)
    }

    function formErrorSub() {
        $(".newsletter-form").addClass("animated shake");
        setTimeout(function () {
            $(".newsletter-form").removeClass("animated shake");
        }, 1000)
    }

    function submitMSGSub(valid, msg) {
        if (valid) {
            var msgClasses = "validation-success";
        } else {
            var msgClasses = "validation-danger";
        }
        $("#validator-newsletter").removeClass().addClass(msgClasses).text(msg);
    }

    $(".newsletter-form").ajaxChimp({url: "", callback: callbackFunction});
    $(window).on('scroll', function () {
        if ($(this).scrollTop() > 0) {
            $('.go-top').addClass('active');
        } else {
            $('.go-top').removeClass('active');
        }
    });
    $(function () {
        $(window).on('scroll', function () {
            var scrolled = $(window).scrollTop();
            if (scrolled > 600) $('.go-top').addClass('active');
            if (scrolled < 600) $('.go-top').removeClass('active');
        });
        $('.go-top').on('click', function () {
            $("html, body").animate({scrollTop: "0"}, 500);
        });
    });
    jQuery(window).on('load', function () {
        jQuery(".preloader").fadeOut(500);
    });
    $('body').append("<div class='switch-box'><label id='switch' class='switch'><input type='checkbox' onchange='toggleTheme()' id='slider'><span class='slider round'></span></label></div>");
})(jQuery);

function setTheme(themeName) {
    localStorage.setItem('ferry_theme', themeName);
    document.documentElement.className = themeName;
}

function toggleTheme() {
    if (localStorage.getItem('ferry_theme') === 'theme-dark') {
        setTheme('theme-light');
    } else {
        setTheme('theme-dark');
    }
}

(function () {
    if (localStorage.getItem('ferry_theme') === 'theme-dark') {
        setTheme('theme-dark');
        document.getElementById('slider').checked = false;
    } else {
        setTheme('theme-light');
        document.getElementById('slider').checked = true;
    }
})();
/**
 * Events slider
 */

