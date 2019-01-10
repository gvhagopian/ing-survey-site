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

        var inputList = [{ t: new Date().getTime(), v: "pageload" }];
        document.getElementById("inputComment").addEventListener("focus", function (evt) {
            inputList.push({ t: new Date().getTime(), v: "gotfocus" });
        });
        document.getElementById("inputComment").addEventListener("blur", function (evt) {
            inputList.push({ t: new Date().getTime(), v: "lostfocus" });
        });
        document.getElementById("inputComment").addEventListener("keydown", function (evt) {
            var input = { t: new Date().getTime() };
            if (evt.char) {
                input.v = evt.char;
            } else if (evt.key && evt.key !== "Unidentified") {
                input.v = evt.key;
            } else {
                input.v = evt.code;
            }
            inputList.push(input);
        });

        var validation = Array.prototype.filter.call(forms, function (form) {
            form.addEventListener('submit', function (event) {
                var isValid = form.checkValidity();
                inputList.push({ t: new Date().getTime(), v: "submit" + (isValid ? "valid" : "invalid") });
                if (isValid === false) {
                    event.preventDefault();
                    event.stopPropagation();
                    var errorElements = document.querySelectorAll("input.form-control:invalid");
                    scrollTo(errorElements[0].getBoundingClientRect().top, 500);
                    //scrollTo(document.getElementsByTagName('html'), errorElements[0].getBoundingClientRect().top, 2000);
                }
                document.getElementById("inputHistory").value = JSONC.pack(inputList);
                console.log(document.getElementById("inputHistory").value);
                window.unpacked = JSONC.unpack(document.getElementById("inputHistory").value);
                form.classList.add('was-validated');
            }, false);
        });
        if (getComputedStyle(document.body).backgroundColor !== "rgb(232, 235, 238)") {
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

