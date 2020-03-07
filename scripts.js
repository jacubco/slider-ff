// TODO

// controller --> change slide: use event bubbling instead of three different listeners

var view = (function() {

  var DOMStrings = {
    dotsDiv: '.dots',
    arrowRight: '.arrow--right',
    arrowLeft: '.arrow--left',
    testimonialDiv: '.testimonial',
    testimonialContainer: '.testimonial-container',

  }

  return {
    getDOMStrings: function() {
      return DOMStrings;
    }

  }
 
})();


// GLOBALS
const dotsDiv = document.querySelector('.dots');
const slides = testimonials.length;
let currentSlide = 0

var controller = (function(daView) {
  var myVar = daView.getDOMStrings();
  console.log(myVar);


  // Listen for events
  // Listen for click on a dot --> load corresponding testimonial
  dotsDiv.addEventListener('click', getID);

  // Listen for click on right arrow --> load next testimonial
  document.querySelector('.arrow--right').addEventListener('click', function(){loadNextTestimonial();});

  // Listen for click on left arrow --> load previous testimonial
  document.querySelector('.arrow--left').addEventListener('click', function(){loadPreviousTestimonial();});

  // Load first Testimonial on page load
  loadTestimonial(currentSlide);
  // Create dots representing the slides
  createIndicators();
  // console.log(DOMStrings.dotsDiv);
})(view);


const dots = dotsDiv.querySelectorAll('.dot');






// Determine which slide to show on click on right arrow
function loadNextTestimonial() {
  if (currentSlide < slides - 1) {
    currentSlide += 1;
  } else {
    currentSlide = 0
  }
  loadTestimonial(currentSlide);
  changeActiveState(currentSlide);
}

// Determine which slide to show on click on left arrow
function loadPreviousTestimonial() {
  if (currentSlide > 0) {
    currentSlide -= 1;
  } else {
    currentSlide = slides - 1;
  }
  loadTestimonial(currentSlide);
  changeActiveState(currentSlide);
}

// View

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

// Add testimonial markup to testimonials div
function loadTestimonial(i) {
  console.log('slide: ' + i);
  testimonial = document.querySelector('.testimonial');
  let markup = createMarkup(i);
  testimonial.innerHTML = markup;
  listenForQuoteToggle()

  console.log('currentSlide: ' + currentSlide)

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
function getID(event) {
  if (event.target.classList.contains('dot')) {
    var ID = event.target.getAttribute('id');
    currentSlide = parseInt(ID, 10);
    console.log(currentSlide);
    loadTestimonial(currentSlide);
    changeActiveState(currentSlide);
  }
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
