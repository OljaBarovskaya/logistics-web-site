// listener for burger to work

const burgerMenu = document.querySelector(".burger-menu");

burgerMenu.addEventListener('click', function(){
  document.body.classList.toggle('mob-menu_opened');
});

const navigationMenu = document.querySelector(".navigation");

if (window.innerWidth < 870){
  navigationMenu.addEventListener('click', function(){
    document.body.classList.toggle('mob-menu_opened');
  })
}

//slider

let currentCardRight=1;
let currentCardLeft=0;

async function insertReview(backgroundColor, textColor, location, neededCard) { 
    console.log(currentCardLeft, currentCardRight);
    const reviewInformation = 'reviews.json';
    console.log(reviewInformation);
    const res = await fetch(reviewInformation);
    console.log(res);
    const data = await res.json(); 
    console.log(data);
    let obj=data[neededCard];
    console.log(obj);
    console.log(currentCardLeft, currentCardRight);
    const testimonialContent = document.querySelector('.testimonial__content')
    testimonialContent.insertAdjacentHTML(location, 
      `<div class="review ${backgroundColor}">
        <div class="review__user">
          <div class="review__user-information">
            <img class="user-image" src=${obj.img} alt="user's photo">
            <div class="review__user-profile ${textColor}">
              <h5>${obj.name}</h5>
              <p>${obj.company}Fuel Company</p>
            </div>
          </div>
          <div class="icon-quotation-mark icon_with-gradient background_primary-coloured"><span>"</span></div>
        </div>
        <div class="review__content">
          <p class="color_grey">${obj.review}</p>
            <span class="stars review__stars">${obj.stars}</span>
        </div>
      </div>
      `
      )}

async function setListenersForReviewButtons(){
  let rightButton=document.querySelector('.right-arrow');
  let leftButton=document.querySelector('.left-arrow');
  const reviewInformation = 'reviews.json';
  const res = await fetch(reviewInformation);
  const data = await res.json(); 
  const reviewsAmount=data.length;
  let reviewCards=document.getElementsByClassName("review");
  rightButton.addEventListener('click', function(){
    reviewCards[0].remove();
    currentCardRight=currentCardRight+1;
    currentCardLeft=currentCardLeft+1;
    if(currentCardRight>=reviewsAmount){
      currentCardRight=0;
    };
    if(currentCardLeft>=reviewsAmount){
      currentCardLeft=0;
    };
    if(currentCardRight % 2 === 0){
      insertReview("background_coloured_grey", "color_dark",'beforeend', currentCardRight);
    } else {
      insertReview("background_primary2-coloured", "color_light",'beforeend', currentCardRight);
    }
  })
  leftButton.addEventListener('click', function(){
    reviewCards[1].remove();
    currentCardLeft=currentCardLeft-1;
    currentCardRight=currentCardRight-1;
    if(currentCardLeft<0){
      currentCardLeft=reviewsAmount-1;
    }
    if(currentCardRight<0){
      currentCardRight=reviewsAmount-1;
    }
    if(currentCardLeft % 2 === 0){
      insertReview("background_coloured_grey", "color_dark", 'afterbegin', currentCardLeft);
    } else {
      insertReview("background_primary2-coloured", "color_light", 'afterbegin', currentCardLeft);
    }
  })
} 

setListenersForReviewButtons();


//Modal Window for Projects

async function showModalWindow(projectNumber) { 
    const projectsInformation = 'projects.json';
    const res = await fetch(projectsInformation);
    const data = await res.json(); 
    let obj=data[projectNumber];
    document.body.insertAdjacentHTML('afterbegin', 
      `<section class="modal-window">
        <div class="close-button">
          <span class="line"></span>
          <span class="line"></span>
        </div>
        <div class="modal-window__main">
          <div class="modal-window__img ${obj.img}"></div>
          <h3>${obj.title}</h3>
          <h5>${obj.subtitle}</h5>
          <p>${obj.main_text}</p>
        </div>
      </section>
      `
      )
      const closeButton=document.querySelector('.close-button');
      const modalWindow=document.querySelector('.modal-window');
      console.log(closeButton);
      closeButton.addEventListener('click', function () {
        document.body.classList.remove('modal-window_open');
        modalWindow.remove();
      })
    }

function addListenersToShowModalWindow() {
  let projects=document.querySelectorAll('.project');
  console.log(projects);
  projects.forEach(element => {
    console.log(element);
      element.addEventListener('click', async function(){
        document.body.classList.add('modal-window_open');
        let classes = Array.from(element.classList);
        console.log(classes);
        let neededProject = classes[1];
        const projectsInformation = 'projects.json';
        console.log(projectsInformation);
        const res = await fetch(projectsInformation);
        console.log(res);
        const data = await res.json(); 
        console.log(data);
        let projectNumber;
        projectNumber = data.findIndex(item => 
          item.img == neededProject);
        console.log(projectNumber);
          
        showModalWindow(projectNumber)
      })
    });
}

addListenersToShowModalWindow();