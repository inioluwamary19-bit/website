 let pastries = document.getElementById("pastries")
 let link = document.getElementById("links")

 // toggle mobile menu

 pastries.addEventListener("click", () => {
    pastries.classList.toggle("active");
    link.classList.toggle("active")
 })