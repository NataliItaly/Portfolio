setTimeout(function() {
    document.querySelector("html").classList.add("loader")
    document.querySelector("html").classList.remove("loader")
    document.querySelector(".loader").style.transition = "all 1s ease"
    document.querySelector(".loader").style.opacity = "0"
  }, 2000);
  
  setTimeout(function() {
    document.querySelector(".loader").style.display = "none"
  }, 3000);