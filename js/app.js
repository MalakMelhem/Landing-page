/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

/**
 * Define Global Variables
 * 
*/
const navbarList=document.getElementById('navbar__list');
const sections=document.querySelectorAll('section');
const scrollUpBtn=document.getElementById('scrollUpBtn');
const pageHeader=document.querySelector('.page__header');
let isScrolling;

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/



/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/
function makeActive(){
    for (const section of sections) {
        const navLink=document.querySelector(`a[href="#${section.id}"]`);
        const box = section.getBoundingClientRect();
        if (box.top <= 150 && box.bottom >= 150) {
        //apply active state on current section and corresponding Nav link
        section.classList='your-active-class';
        navLink.parentElement.classList='active-link';
        } else {
        //Remove active state from other section and corresponding Nav link
        section.classList.remove('your-active-class');
        navLink.parentElement.classList.remove('active-link');
        }
     }
}

// build the nav
sections.forEach(section=>{
    const lineItem=document.createElement('li');
    const link=document.createElement('a');
    const title=section.dataset.nav;
    link.href = `#${section.id}`;
    link.innerHTML=title;
    link.classList='menu__link';
    lineItem.appendChild(link);
    navbarList.appendChild(lineItem);

});



// Add class 'active' to section when near top of viewport
const defaultLineItem=document.querySelectorAll('li')[0];
defaultLineItem.classList='active-link';

// Show the navbar 
pageHeader.classList.remove('hidden');


// Scroll to anchor ID using scroll event
function scrollingById(event){
    if(event.target.nodeName ==='A'){
        event.preventDefault();
        const anchorID=event.target.getAttribute('href').substring(1);
        const targetedSection = document.getElementById(`${anchorID}`);
        targetedSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

}

// Make scroll to up button visible 
function makeVisible(){
    if(window.scrollY>window.innerHeight){
        scrollUpBtn.classList.add('show');
    }else{
        scrollUpBtn.classList.remove('show');
    }
}


/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 

// Scroll to section on link click
navbarList.addEventListener('click', scrollingById);

// Set sections as active, and add a scroll to top button
document.addEventListener('scroll', ()=>{
    makeActive();
    makeVisible();
    // Show the navbar when scrolling
    pageHeader.classList.remove('hidden');
    clearTimeout(isScrolling);
    isScrolling = setTimeout(() => {
        pageHeader.classList.add('hidden'); 
    }, 2000); 
});

scrollUpBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

