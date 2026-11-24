(function () {
  document.documentElement.classList.add("js");

  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var nodes = document.querySelectorAll(".reveal");

  if (reduce || !("IntersectionObserver" in window)) {
    Array.prototype.forEach.call(nodes, function (el) {
      el.classList.add("is-in");
    });
  } else {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );
    Array.prototype.forEach.call(nodes, function (el) {
      io.observe(el);
    });
  }

  var toggle = document.getElementById("nav-toggle");
  Array.prototype.forEach.call(document.querySelectorAll(".nav a"), function (link) {
    link.addEventListener("click", function () {
      if (toggle) toggle.checked = false;
    });
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && toggle) toggle.checked = false;
  });

  var submit = document.getElementById("demo-submit");
  var status = document.getElementById("demo-status");
  var form = document.getElementById("demo-form");
  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
    });
  }
  if (submit && status) {
    submit.addEventListener("click", function () {
      status.hidden = false;
    });
  }
})();
