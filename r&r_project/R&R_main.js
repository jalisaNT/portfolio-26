$(function(){
  $(".container-fluid").load("../shorthands/index.html", function() {

    //Define
    const links = document.querySelector(".top-links");
    const navToggle = document.getElementById("check");

    navToggle.addEventListener("click",function(){
      links.classList.toggle("show-links")
    })
  })

  const scroll_nav_bar = document.querySelector(".custom-navbar")
//Navbar has background when reach a certain point
window.addEventListener("scroll",function(){
  const scrollNo = window.scrollY;
  if(scrollNo > 2000){
   scroll_nav_bar.classList.add('additional')
   
  }
  else{
    scroll_nav_bar.classList.remove('additional')
    
  }
})

console.log(window.innerWidth)
});
