const hamburger=document.querySelector(".hamburger");
const navMenu =document.querySelector(".nav-bar");
const mobile = document.querySelector('.mobile')
const nav = document.querySelector('.navbar-mobile');

hamburger.addEventListener('click', ()=>{
          if(nav.className === "navbar-mobile"){
            nav.className = "mob";
            hamburger.classList.toggle("active");
            navMenu.classList.toggle("active");
          }else{
            nav.className = "navbar-mobile";
            hamburger.classList.remove("active");
            navMenu.classList.remove("active");
          }
})