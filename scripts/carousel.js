let currentIndex = 0;

function showSlide(index) {
    const slides = document.querySelectorAll('.carousel-item');
    if (index >= slides.length) currentIndex = 0;
    if (index < 0) currentIndex = slides.length - 1;

    slides.forEach((slide, i) => {
        slide.style.display = (i === currentIndex) ? 'block' : 'none';
    });
}

function nextSlide() {
    showSlide(++currentIndex);
}

function prevSlide() {
    showSlide(--currentIndex);
}

// Initialize the carousel
showSlide(currentIndex);

// Optional: Auto-slide every 5 seconds
setInterval(nextSlide, 5000);
