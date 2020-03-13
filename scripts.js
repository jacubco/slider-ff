// TODO

// controller --> Refactor getID function


// GLOBALS
const dotsDiv = document.querySelector('.dots');
const slides = testimonials.length;
let currentSlide = 0;

var view = (function() {
  
  var DOMStrings = {
    dotsDiv: document.querySelector('.dots'),
    arrowRight: document.querySelector('.arrow--right'),
    arrowLeft: document.querySelector('.arrow--left'),
    testimonialDiv: document.querySelector('.testimonial'),
    testimonialsContainer: document.querySelector('.testimonials-container')
  }

  return {
    getDOMStrings: function() {
      return DOMStrings;
    },

    // Add testimonial markup to testimonials div
    loadTestimonial: function(i) {
      console.log('slide: ' + i);
      console.log('currentSlide: ' + currentSlide)
      
      testimonial = document.querySelector('.testimonial');
      var markup = createMarkup(i);
      testimonial.innerHTML = markup;
      listenForQuoteToggle()  
    }

  }
 
})();


var controller = (function(view) {
  var DOMStrings = view.getDOMStrings();
  
  function listenForEvents() {
    // Listen for click on a dot
    DOMStrings.dotsDiv
    .addEventListener('click', function(e) {view.loadTestimonial(getID(e.target))});
    // Listen for click on right arrow
    DOMStrings.arrowRight
    .addEventListener('click', loadNextTestimonial);
    // Listen for click on left arrow --> load previous testimonial
    DOMStrings.arrowLeft
    .addEventListener('click', loadPreviousTestimonial);
  };
  
  return {
    // Set up slider
    init: function(currentSlide) {
      console.log('slider initialized');
      // Load first Testimonial automatically
      view.loadTestimonial(currentSlide);
      // Create dots representing the slides
      createIndicators();
      listenForEvents()
    }
  };

})(view);

controller.init(currentSlide);


const dots = dotsDiv.querySelectorAll('.dot');

// Determine which slide to show
function determineCurrentSlide(eventTarget) {
  console.log(eventTarget);
  if (eventTarget.classList.contains('dot')) {
    currentSlide = getID(eventTarget);
    console.log(currentSlide);
    console.log('dot clicked');

  } else if (eventTarget.classList.contains('arrow--right')) {
    console.log('right arrow clicked');
  }
}


// Determine which slide to show on click on right arrow
function loadNextTestimonial() {
  if (currentSlide < slides - 1) {
    currentSlide += 1;
  } else {
    currentSlide = 0
  }
  view.loadTestimonial(currentSlide);
  changeActiveState(currentSlide);
}

// Determine which slide to show on click on left arrow
function loadPreviousTestimonial() {
  if (currentSlide > 0) {
    currentSlide -= 1;
  } else {
    currentSlide = slides - 1;
  }
  view.loadTestimonial(currentSlide);
  changeActiveState(currentSlide);
}

// Create testimonial markup
function createMarkup(i) {
  let markup = `
    <div class="testimonial__container fade">
      <img class="testimonial__image" src=${testimonials[i].imgURL} alt="">
      <div class="testimonial__quote testimonial__quote--short fade">${testimonials[i].quoteShort}</div>
      <div class="testimonial__read-more fade ">Read more</div>
      <div class="testimonial__quote testimonial__quote--long  fade no-show">${testimonials[i].quoteLong}</div><div class="testimonial__read-more testimonial__read-more--less fade no-show">Read less</div>
      <div class="testimonial__id">
        <div class="testimonial__name">${testimonials[i].name}</div>
        <div class="testimonial__title">${testimonials[i].title}</div>
      </div>
    </div>
  `
  return markup
}


// Create and add dots (representing available slides)
function createIndicators() {
  let html = '<div class="dot active" id="0"></div>'
  for(i = 1; i < testimonials.length; i++) {
    html += `<div class="dot" id="${i}"></div>`
  };
  dotsDiv.innerHTML = html;
}

// Change active state of the dots / indicators for active slide
function changeActiveState(currentSlide) {
  var current = document.getElementsByClassName("active");
  current[0].className = current[0].className.replace(" active", "");
  dots[currentSlide].className += ' active';
}

// Get ID when clicking on a dot
// function getID(event) {
//   if (event.target.classList.contains('dot')) {
//     var ID = event.target.getAttribute('id');
//     currentSlide = parseInt(ID, 10);
//     console.log(currentSlide);
//     view.loadTestimonial(currentSlide);
//     changeActiveState(currentSlide);
//   }
// }

function getID(eventTarget) {
  console.log(eventTarget);
  var ID = eventTarget.getAttribute('id');
  console.log(ID);
  return parseInt(ID, 10);
}




////////////////////////////////////
/////////////////////////// READ MORE

// Listen for click on read more
function listenForQuoteToggle() {
  document.querySelectorAll('.testimonial__read-more').forEach(item => item.addEventListener('click', toggleQuote));
}

// Toggle read more
function toggleQuote() {
  document.querySelector('.testimonial__quote--short').classList.toggle('no-show')
  document.querySelector('.testimonial__quote--long').classList.toggle('no-show')

  document.querySelector('.testimonial__read-more').classList.toggle('no-show')

  document.querySelector('.testimonial__read-more--less').classList.toggle('no-show')

}
