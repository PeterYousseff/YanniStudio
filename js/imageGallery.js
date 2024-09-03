// scripts.js
document.addEventListener('DOMContentLoaded', function() {
    const gallery = document.querySelector('.gallery');
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('mainImage');
    const captionText = document.getElementById('caption');
    const relatedContainer = document.querySelector('.related-images');
    const closeModal = document.querySelector('.close');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    const mainArrowLeft = document.querySelector('.main-arrow.left');
    const mainArrowRight = document.querySelector('.main-arrow.right');

    let currentImageIndex = 0;
    let currentRelatedImages = [];

    // Open modal when a gallery image is clicked
    gallery.addEventListener('click', function(event) {
        if (event.target.tagName === 'IMG') {
            openModal(event.target);
        }
    });

    // Close modal when the close button is clicked
    closeModal.addEventListener('click', function() {
        closeModalFn();
    });

    // Switch to a related image when it is clicked
    relatedContainer.addEventListener('click', function(event) {
        if (event.target.classList.contains('related')) {
            switchImage(event.target);
        }
    });

    // Slider navigation for related images
    prevBtn.addEventListener('click', function() {
        scrollRelatedImages(-1);
    });

    nextBtn.addEventListener('click', function() {
        scrollRelatedImages(1);
    });

    // Navigate images using main arrows
    mainArrowLeft.addEventListener('click', function() {
        navigateMainImage(-1);
    });

    mainArrowRight.addEventListener('click', function() {
        navigateMainImage(1);
    });

    function openModal(image) {
        modal.style.display = 'block';
        modalImg.src = image.src;
        captionText.innerHTML = image.alt;

        // Update related images
        currentRelatedImages = image.getAttribute('data-related').split(',');
        updateRelatedImages(currentRelatedImages);
        currentImageIndex = 0; // Reset to the first image
        scrollToCurrentRelatedImage();
        highlightCurrentRelatedImage();
    }

    function closeModalFn() {
        modal.style.display = 'none';
    }

    function switchImage(image) {
        modalImg.style.opacity = 0; // Fade out
        setTimeout(() => {
            modalImg.src = image.src;
            captionText.innerHTML = image.alt;
            modalImg.style.opacity = 1; // Fade in
        }, 250); // Wait for the fade out to complete

        // Update related images
        const relatedImages = gallery.querySelector(`img[src="${image.src}"]`).getAttribute('data-related').split(',');
        updateRelatedImages(relatedImages);
        highlightCurrentRelatedImage();
    }

    function updateRelatedImages(relatedImages) {
        const relatedElems = relatedContainer.querySelectorAll('.related');
        relatedElems.forEach((elem, index) => {
            if (relatedImages[index]) {
                elem.src = relatedImages[index];
                elem.style.display = 'inline';
            } else {
                elem.style.display = 'none';
            }
        });
    }

    function scrollRelatedImages(direction) {
        const relatedImages = relatedContainer.children;
        const relatedWidth = relatedImages[0].clientWidth + 10; // Image width + margin
        relatedContainer.scrollLeft += direction * relatedWidth;
        applyTransitionToRelatedImages(direction);
    }

    function applyTransitionToRelatedImages(direction) {
        const relatedElems = relatedContainer.querySelectorAll('.related');
        relatedElems.forEach(elem => {
            elem.style.opacity = 0; // Fade out
            setTimeout(() => {
                elem.style.opacity = 1; // Fade in
            }, 250); // Wait for the fade out to complete
        });
    }

    function scrollToCurrentRelatedImage() {
        const relatedImages = relatedContainer.children;
        const relatedWidth = relatedImages[0].clientWidth + 10; // Image width + margin
        const newScrollLeft = currentImageIndex * relatedWidth - (relatedContainer.clientWidth / 2) + (relatedWidth / 2);
        relatedContainer.scrollLeft = newScrollLeft;
    }

    function navigateMainImage(direction) {
        currentImageIndex += direction;
        if (currentImageIndex < 0) {
            currentImageIndex = currentRelatedImages.length - 1;
        } else if (currentImageIndex >= currentRelatedImages.length) {
            currentImageIndex = 0;
        }
        modalImg.style.opacity = 0; // Fade out
        setTimeout(() => {
            modalImg.src = currentRelatedImages[currentImageIndex];
            captionText.innerHTML = `Related Image ${currentImageIndex + 1}`;
            modalImg.style.opacity = 1; // Fade in
            scrollToCurrentRelatedImage(); // Scroll to the current related image
            highlightCurrentRelatedImage();
        }, 250); // Wait for the fade out to complete
    }

    function highlightCurrentRelatedImage() {
        const relatedElems = relatedContainer.querySelectorAll('.related');
        relatedElems.forEach((elem, index) => {
            if (index === currentImageIndex) {
                elem.classList.add('active');
            } else {
                elem.classList.remove('active');
            }
        });
    }
});
