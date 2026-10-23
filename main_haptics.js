const nav_section = document.querySelector(".container-fluid");
const navToggle = document.getElementById("check");
const cursor = document.querySelector(".cursor");
const hover_cursor = document.querySelector(".select");
const scroll_nav_bar = document.querySelector(".custom-navbar");

//Cursor 
document.addEventListener("mousemove", (event) => {
  const {width, height} = cursor.getBoundingClientRect();
  cursor.style.left =`${event.clientX - width / 2}px`;
  cursor.style.top =`${event.clientY - height / 2}px`;
  hover_cursor.style.left =`${event.clientX - width / 2}px`;
  hover_cursor.style.top =`${event.clientY - height / 2}px`;
});


const clickableElements = document.querySelectorAll('a, button');

// Loop through them
clickableElements.forEach(element => {
    element.addEventListener('mouseenter', function() {
        //cursor.style.display = `none`
        console.log('Clicked:', this);
        cursor.style.display =`none`
         hover_cursor.style.display =`block`
    });

    element.addEventListener('mouseleave', function() {
        //cursor.style.display = `none`
        cursor.style.display =`block`
         hover_cursor.style.display =`none`
        
    });


   
});

console.log(nav_section);
console.log(window.innerWidth);
const links = document.querySelector(".top-links");
console.log(links);
navToggle.addEventListener("click",function(){

  links.classList.toggle("show-links")
})

//Homepage link fade in and out animation
const homepageLink = document.getElementById("homepage");
homepageLink.addEventListener("click", function (e) {
  e.preventDefault(); // Stop default jump
    
  document.body.classList.add("fade-out");
    
  setTimeout(() => {
    window.location.href = this.href; 
  }, 500); 
});
ScrollReveal().reveal('.container', { delay: 100 });
ScrollReveal().reveal(".row", {
  duration: 1000,
  scale: 0.85
});


const nav = document.getElementById("project_nav");

for(const link of nav.getElementsByTagName("a")) {  
  link.onmousemove = e => {
    const rect = link.getBoundingClientRect(),    
          img = link.querySelector("#proj_item");
    
    img.style.left = `${e.clientX - rect.left}px`;
    img.style.top = `${e.clientY - rect.top}px`;
  }
}


//Navbar has background when reach a certain point
window.addEventListener("scroll",function(){
  const scrollNo = window.scrollY;
  if(scrollNo > 100){
   scroll_nav_bar.classList.add('additional')
   
  }
  else{
    scroll_nav_bar.classList.remove('additional')
    
  }
});

// Source - https://stackoverflow.com/a/48774903
// Posted by WyriHaximus
// Retrieved 2026-09-13, License - CC BY-SA 3.0


