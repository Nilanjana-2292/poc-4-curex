(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();


    // Initiate the wowjs
    new WOW().init();


    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.sticky-top').addClass('shadow-sm').css('top', '0px');
        } else {
            $('.sticky-top').removeClass('shadow-sm').css('top', '-100px');
        }
    });


    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({ scrollTop: 0 }, 1500, 'easeInOutExpo');
        return false;
    });


    // Facts counter
    $('[data-toggle="counter-up"]').each(function () {
        var $this = $(this);
        var finalCount = $this.attr('data-count');

        $this.prop('Counter', 0).animate({
            Counter: finalCount
        }, {
            duration: 2000,
            easing: 'swing',
            step: function (now) {
                $this.text(Math.ceil(now));
            },
            complete: function () {
                $this.text(finalCount + '+');
            }
        });
    });


    // Header carousel
    $(".header-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        items: 1,
        dots: true,
        loop: true,
        nav: true,
        navText: [
            '<i class="bi bi-chevron-left"></i>',
            '<i class="bi bi-chevron-right"></i>'
        ]
    });


    // Testimonials carousel
    $('.testimonial-carousel').owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        loop: true,
        nav: false,
        dots: true,
        items: 1,
        dotsData: true,
    });


    // Portfolio isotope and filter
    var portfolioIsotope = $('.portfolio-container').isotope({
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
    });
    $('#ourservices li').on('click', function () {
        $("#ourservices li").removeClass('active');
        $(this).addClass('active');

        portfolioIsotope.isotope({ filter: $(this).data('filter') });
    });

})(jQuery);

// consulatation modal
// Step navigation
document.querySelectorAll('.next-step').forEach(button => {
    button.addEventListener('click', function () {
        const current = this.closest('.form-step');
        const next = current.nextElementSibling;
        if (next && next.classList.contains('form-step')) {
            current.classList.add('d-none');
            next.classList.remove('d-none');
        }
    });
});

// Handle previous steps
document.querySelectorAll('.prev-step').forEach(button => {
    button.addEventListener('click', function () {
        const current = this.closest('.form-step');
        const prev = current.previousElementSibling;
        if (prev && prev.classList.contains('form-step')) {
            current.classList.add('d-none');
            prev.classList.remove('d-none');
        }
    });
});

// Day button selection
const dayButtons = document.querySelectorAll('.day-btn');
const selectedDayInput = document.getElementById('selectedDay');
dayButtons.forEach(button => {
    button.addEventListener('click', () => {
        dayButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        selectedDayInput.value = button.textContent;
    });
});

//  for booking
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("consultForm");
    const steps = document.querySelectorAll(".form-step");
    let currentStep = 0;
 
    const requiredFieldsByStep = {
        0: ['name', 'bookingFor', 'sex', 'age'],
        1: ['duration', 'days', 'date', 'time'],
        2: ['problem', 'language']
    };
 
    function showStep(index) {
        steps.forEach((step, i) => {
            step.classList.toggle("d-none", i !== index);
        });
    }
 
    function validateStep(stepIndex) {
        const fields = requiredFieldsByStep[stepIndex];
        for (let field of fields) {
            const input = form.querySelector(`[name="${field}"]`);
            if (input) {
                if (
                    (input.type === "radio" && !form.querySelector(`[name="${field}"]:checked`)) ||
                    (!['radio'].includes(input.type) && !input.value.trim())
                ) {
                    Swal.fire({
                        icon: 'warning',
                        title: 'Missing Field',
                        text: `Please complete the "${field}" field before continuing.`,
                    });
                    return false;
                }
            }
        }
        return true;
    }
 
    document.querySelectorAll(".next-step").forEach(button => {
        button.addEventListener("click", () => {
            if (validateStep(currentStep)) {
                if (currentStep < steps.length - 1) {
                    currentStep++;
                    showStep(currentStep);
                }
            }
        });
    });
 
    document.querySelectorAll(".prev-step").forEach(button => {
        button.addEventListener("click", () => {
            if (currentStep > 0) {
                currentStep--;
                showStep(currentStep);
            }
        });
    });
 
    // Day selection
    document.querySelectorAll(".day-btn").forEach(button => {
        button.addEventListener("click", () => {
            document.querySelectorAll(".day-btn").forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");
            document.getElementById("selectedDay").value = button.value;
        });
    });
 
    // Duration selection
    document.querySelectorAll(".duration-btn").forEach(button => {
        button.addEventListener("click", () => {
            document.querySelectorAll(".duration-btn").forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");
            document.getElementById("selectedDuration").value = button.textContent.trim();
        });
    });
 
    // Final submit
    form.addEventListener("submit", function (e) {
        e.preventDefault();
 
        if (!validateStep(currentStep)) return;
 
        const formData = new FormData(form);
        const formObject = {};
        formData.forEach((value, key) => {
            formObject[key] = value;
        });
 
        // Save to localStorage
        localStorage.setItem("consultationFormData", JSON.stringify(formObject));
 
        // Show success alert and redirect
        Swal.fire({
            icon: 'success',
            title: 'Form Submitted!',
            text: 'Your consultation form has been successfully submitted.',
            confirmButtonText: 'OK'
        }).then(() => {
            window.location.href = "thank-you.html";
        });
    });
 
    // Show initial step
    showStep(currentStep);
});
 
 

// 
  const durationButtons = document.querySelectorAll('.duration-btn');
  const selectedDurationInput = document.getElementById('selectedDuration');

  durationButtons.forEach(button => {
    button.addEventListener('click', () => {
      durationButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      selectedDurationInput.value = button.textContent;
    });
  });

// contact us
    document.getElementById("contact-form").addEventListener("submit", function(e) {
        e.preventDefault(); // Prevent actual form submission
 
        Swal.fire({
            title: 'Thank You!',
            text: 'Thanks for connecting with Us. Will get back to you shortly.',
            icon: 'success',
            confirmButtonText: 'OK'
        });
 
        // Optional: Reset the form
        this.reset();
    });