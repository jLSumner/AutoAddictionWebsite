document.addEventListener("DOMContentLoaded", () => {
  const mybutton = document.getElementById("myBtn");

  // Show or hide the button based on scroll position
  window.addEventListener("scroll", () => {
    if (document.documentElement.scrollTop > 20 || document.body.scrollTop > 20) {
      mybutton.style.display = "block";
    } else {
      mybutton.style.display = "none";
    }
  });

  // Scroll to top when the button is clicked
  mybutton.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
});