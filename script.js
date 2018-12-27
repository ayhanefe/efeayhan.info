// Hide all elements with class="containerTab", except for the one that matches the clickable grid column
function openTab(tabName) {
  var i, x;
  x = document.getElementsByClassName("containerTab");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  document.getElementById(tabName).style.display = "block";
}

function expandTab(tab) {
  var expand, i, x;
  x = document.getElementsByClassName("container-grid");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  if (tab == "UROP") {
    expand = document.getElementById("expandedUROP");
  } else if (tab == "PennAI") {
    expand = document.getElementById("expandedPennAI");
  } else if (tab == "WS") {
    expand = document.getElementById("expandedWS");
  }
  expand.parentElement.style.display = "block";
}
