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

// Image Modal (Lightbox) functionality for project images

document.addEventListener('DOMContentLoaded', function() {
    // Add click event to all project images
    document.querySelectorAll('.projectImage').forEach(img => {
        img.addEventListener('click', function() {
            const modal = document.getElementById('imageModal');
            const modalImg = document.getElementById('modalImage');
            modalImg.src = this.src;
            modal.classList.add('active');
        });
    });

    // Close modal on close button
    const closeBtn = document.getElementById('closeImageModal');
    if (closeBtn) {
        closeBtn.onclick = function() {
            document.getElementById('imageModal').classList.remove('active');
        };
    }

    // Close modal when clicking outside the image
    const modal = document.getElementById('imageModal');
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    }
});