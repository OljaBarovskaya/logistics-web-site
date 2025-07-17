// listener for burger to work

const burgerMenu = document.querySelector(".burger-menu");

burgerMenu.addEventListener('click', function(){
  document.body.classList.toggle('mob-menu_opened');
});