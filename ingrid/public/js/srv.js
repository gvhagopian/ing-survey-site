var scrollTo = function (to, duration) {
    const
        element = document.scrollingElement || document.documentElement,
        start = element.scrollTop,
        change = to - start,
        startDate = +new Date(),
        // t = current time
        // b = start value
        // c = change in value
        // d = duration
        easeInOutQuad = function (t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        },
        animateScroll = function () {
            const currentDate = +new Date();
            const currentTime = currentDate - startDate;
            element.scrollTop = parseInt(easeInOutQuad(currentTime, start, change, duration));
            if (currentTime < duration) {
                requestAnimationFrame(animateScroll);
            }
            else {
                element.scrollTop = to;
            }
        };
    animateScroll();
};

(function () {
    'use strict';
    window.addEventListener('load', function () {
        var forms = document.getElementsByClassName('needs-validation');

        var validation = Array.prototype.filter.call(forms, function (form) {
            form.addEventListener('submit', function (event) {
                if (form.checkValidity() === false) {
                    event.preventDefault();
                    event.stopPropagation();
                    var errorElements = document.querySelectorAll("input.form-control:invalid");
                    scrollTo(errorElements[0].getBoundingClientRect().top, 500);
                    //scrollTo(document.getElementsByTagName('html'), errorElements[0].getBoundingClientRect().top, 2000);
                }
                form.classList.add('was-validated');
            }, false);
        });
        if (getComputedStyle(document.body).backgroundColor !== "rgb(255, 255, 255)") {
            var obfs = document.getElementsByClassName('obfuscated-black');

            Array.prototype.filter.call(obfs, function (obf) {
                obf.textContent = obf.textContent.replace(/[^ ]/g, "-");
            });

            var paths = document.getElementsByClassName("img-path");
            for (var i = 0; i < paths.length; ++i) {
                paths[i].style.fill = getComputedStyle(document.getElementById("query")).color;
            }
        }
    }, false);
})();

