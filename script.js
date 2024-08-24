let slideIndex = 0;
showSlides();
timeoutId = -1

function showSlides() {
    let slides = document.querySelectorAll(".mySlides");
    
    // Hide all slides
    slides.forEach(slide => {
        slide.classList.remove("active");
    });

    let dots = document.querySelectorAll(".dot");

    // Remove "active" class from all dots
    dots.forEach(dot => dot.classList.remove("active"));

    dots[slideIndex].classList.add("active"); 

    // Display the current slide
    slides[slideIndex].classList.add("active");

    // Increment slideIndex
    slideIndex++;
    if (slideIndex >= slides.length) {
        slideIndex = 0;
    }

    // Set up the next slide change
    timeoutId = setTimeout(showSlides, 3000); // Change slide every 3 seconds
}

function currentSlide(n) {
    clearTimeout(timeoutId);
    showSlides(slideIndex = n);
}