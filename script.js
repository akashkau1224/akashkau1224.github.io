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
            const modalCaption = document.getElementById('modalImageCaption');
            modalImg.src = this.src;
            modalImg.alt = this.alt;
            // Find the .imageCaption sibling and use its text as the modal caption
            let captionText = '';
            const parent = this.parentElement;
            if (parent && parent.querySelector('.imageCaption')) {
                captionText = parent.querySelector('.imageCaption').textContent;
            } else {
                captionText = this.alt || '';
            }
            modalCaption.textContent = captionText;
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

    // Video Modal functionality
    document.querySelectorAll('a[href*="youtube.com/watch"], a[href*="youtu.be/"]').forEach(link => {
        // Target links with video-box SVG icons OR osLec class
        const svg = link.querySelector('svg');
        const titleElement = svg ? svg.querySelector('title') : null;
        const hasVideoBoxIcon = titleElement && titleElement.textContent.trim() === 'video-box';
        const hasOsLecClass = link.classList.contains('osLec');
        
        if (hasVideoBoxIcon || hasOsLecClass) {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const videoUrl = this.href;
                const videoModal = document.getElementById('videoModal');
                const modalVideo = document.getElementById('modalVideo');
                const modalCaption = document.getElementById('modalVideoCaption');
                
                // Convert YouTube URL to embed URL
                let embedUrl = '';
                let timestamp = '';
                
                // Extract timestamp if present (t= or ?t=)
                const timestampMatch = videoUrl.match(/[?&]t=(\d+)/);
                if (timestampMatch && timestampMatch[1]) {
                    timestamp = `?start=${timestampMatch[1]}`;
                }
                
                if (videoUrl.includes('youtube.com/watch')) {
                    const videoId = videoUrl.split('v=')[1]?.split('&')[0];
                    if (videoId) {
                        embedUrl = `https://www.youtube.com/embed/${videoId}${timestamp}`;
                    }
                } else if (videoUrl.includes('youtu.be/')) {
                    const videoId = videoUrl.split('youtu.be/')[1]?.split('?')[0];
                    if (videoId) {
                        embedUrl = `https://www.youtube.com/embed/${videoId}${timestamp}`;
                    }
                }
                
                if (embedUrl) {
                    modalVideo.src = embedUrl;
                    // Set caption based on link type
                    if (hasOsLecClass) {
                        modalCaption.textContent = 'OS Lecture';
                    } else {
                        // Try to find a caption from nearby elements
                        const projectCard = this.closest('.projectCard');
                        if (projectCard) {
                            const projectTitle = projectCard.querySelector('.projectTitle');
                            modalCaption.textContent = projectTitle ? projectTitle.textContent : '';
                        } else {
                            modalCaption.textContent = this.textContent.trim() || 'Video';
                        }
                    }
                    videoModal.classList.add('active');
                }
            });
        }
    });

    // Close video modal on close button
    const closeVideoBtn = document.getElementById('closeVideoModal');
    if (closeVideoBtn) {
        closeVideoBtn.onclick = function() {
            const videoModal = document.getElementById('videoModal');
            const modalVideo = document.getElementById('modalVideo');
            videoModal.classList.remove('active');
            // Stop video playback when closing
            modalVideo.src = '';
        };
    }

    // Close video modal when clicking outside the video
    const videoModal = document.getElementById('videoModal');
    if (videoModal) {
        videoModal.addEventListener('click', function(e) {
            if (e.target === videoModal) {
                const modalVideo = document.getElementById('modalVideo');
                videoModal.classList.remove('active');
                // Stop video playback when closing
                modalVideo.src = '';
            }
        });
    }

    // Close video modal on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const videoModal = document.getElementById('videoModal');
            if (videoModal && videoModal.classList.contains('active')) {
                const modalVideo = document.getElementById('modalVideo');
                videoModal.classList.remove('active');
                modalVideo.src = '';
            }
            const pdfModal = document.getElementById('pdfModal');
            if (pdfModal && pdfModal.classList.contains('active')) {
                const modalPdf = document.getElementById('modalPdf');
                pdfModal.classList.remove('active');
                modalPdf.src = '';
            }
        }
    });

    // PDF Modal functionality for Google Drive links
    document.querySelectorAll('a[href*="drive.google.com/file"]').forEach(link => {
        // Only target links with more-info SVG icons
        const svg = link.querySelector('svg');
        const titleElement = svg ? svg.querySelector('title') : null;
        if (titleElement && titleElement.textContent.trim() === 'more-info') {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const driveUrl = this.href;
                const pdfModal = document.getElementById('pdfModal');
                const modalPdf = document.getElementById('modalPdf');
                const modalCaption = document.getElementById('modalPdfCaption');
                
                // Convert Google Drive sharing URL to preview URL
                // Format: https://drive.google.com/file/d/{FILE_ID}/view?usp=sharing
                // To: https://drive.google.com/file/d/{FILE_ID}/preview
                let previewUrl = '';
                const fileIdMatch = driveUrl.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
                if (fileIdMatch && fileIdMatch[1]) {
                    previewUrl = `https://drive.google.com/file/d/${fileIdMatch[1]}/preview`;
                }
                
                if (previewUrl) {
                    modalPdf.src = previewUrl;
                    // Try to find a caption from nearby elements
                    const projectCard = this.closest('.projectCard');
                    if (projectCard) {
                        const projectTitle = projectCard.querySelector('.projectTitle');
                        modalCaption.textContent = projectTitle ? projectTitle.textContent : '';
                    } else {
                        modalCaption.textContent = '';
                    }
                    pdfModal.classList.add('active');
                }
            });
        }
    });

    // Close PDF modal on close button
    const closePdfBtn = document.getElementById('closePdfModal');
    if (closePdfBtn) {
        closePdfBtn.onclick = function() {
            const pdfModal = document.getElementById('pdfModal');
            const modalPdf = document.getElementById('modalPdf');
            pdfModal.classList.remove('active');
            // Stop PDF loading when closing
            modalPdf.src = '';
        };
    }

    // Close PDF modal when clicking outside the PDF
    const pdfModal = document.getElementById('pdfModal');
    if (pdfModal) {
        pdfModal.addEventListener('click', function(e) {
            if (e.target === pdfModal) {
                const modalPdf = document.getElementById('modalPdf');
                pdfModal.classList.remove('active');
                // Stop PDF loading when closing
                modalPdf.src = '';
            }
        });
    }

    // Resume link PDF modal functionality
    const resumeLink = document.getElementById('resumeLink');
    if (resumeLink) {
        resumeLink.addEventListener('click', function(e) {
            e.preventDefault();
            const driveUrl = this.href;
            const pdfModal = document.getElementById('pdfModal');
            const modalPdf = document.getElementById('modalPdf');
            const modalCaption = document.getElementById('modalPdfCaption');
            
            // Convert Google Drive sharing URL to preview URL
            let previewUrl = '';
            const fileIdMatch = driveUrl.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
            if (fileIdMatch && fileIdMatch[1]) {
                previewUrl = `https://drive.google.com/file/d/${fileIdMatch[1]}/preview`;
            }
            
            if (previewUrl) {
                modalPdf.src = previewUrl;
                modalCaption.textContent = 'Resume';
                pdfModal.classList.add('active');
            }
        });
    }
});