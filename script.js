var header = document.getElementsById("navbar");
var sticky = header.offsetTop;

document.onscroll() = function() {

  if (window.pageYOffset >= sticky) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
}
