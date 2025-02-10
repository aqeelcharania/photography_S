const imageCounts = {
    wedding: 5,
    babyshower: 5,
    corporate: 5,
    graduation: 0,
    product: 0,
};
function preloadImages() {
    const promises = [];
    const criticalImages = [
        'Photos/wedding/wedding1.jpeg',
        'Photos/babyshower/babyshower1.jpeg'
    ]; // List of images you want to load first

    // Show the loading overlay
    document.getElementById('loading-overlay').style.display = 'flex';

    // Preload critical images first
    criticalImages.forEach((image) => {
        const img = new Image();
        img.src = image;
        promises.push(new Promise((resolve, reject) => {
            img.onload = resolve;
            img.onerror = reject;
        }));
    });

    // After loading critical images, preload other images
    for (const category in imageCounts) {
        if (imageCounts[category] > 0) {
            for (let i = 1; i <= imageCounts[category]; i++) {
                const img = new Image();
                const imageSrc = `Photos/${category}/${category}${i}.jpeg`;
                img.src = imageSrc;
                promises.push(new Promise((resolve, reject) => {
                    img.onload = resolve;
                    img.onerror = reject;
                }));
            }
        }
    }

    // Wait for all images to be preloaded
    Promise.all(promises).then(() => {
        console.log('All images have been preloaded');
        // Hide the loading overlay once all images are loaded
        document.getElementById('loading-overlay').style.display = 'none';
    }).catch((error) => {
        console.error('Some images failed to preload:', error);
        // Optionally hide loading if there's an error
        document.getElementById('loading-overlay').style.display = 'none';
    });
}

// Call the preload function when the page loads
window.onload = function() {
    preloadImages();
};



function changeImage(direction, baseName, category, elementId) {
    const imageElement = document.getElementById(elementId);
    let currentImageIndex = parseInt(imageElement.dataset.currentIndex, 10) || 1;

    // Get the image count for the given category
    const totalImages = imageCounts[category];

    // Update the index
    currentImageIndex += direction;

    // Wrap around if the index goes out of bounds
    if (currentImageIndex > totalImages) currentImageIndex = 1;
    if (currentImageIndex < 1) currentImageIndex = totalImages;

    // Update the image's src and save the current index in a data attribute
    imageElement.src = `${baseName}${currentImageIndex}.jpeg`;
    imageElement.dataset.currentIndex = currentImageIndex;
}


emailjs.init('5ATc8aUowc-tHk0cE'); // Ensure the public key is from EmailJS dashboard

function sendForm(e) {
    e.preventDefault();

    const form = e.target;

    // Ensure service_id and template_id are correct from EmailJS
    emailjs.sendForm('service_uds5uci', 'template_8vid9on', form)
        .then(function(response) {
            console.log('Success:', response);
            alert('Your booking request has been sent successfully!');
            form.reset(); // Clear form after submission
        }, function(error) {
            console.error('Error:', error);
            alert('Oops! Something went wrong.');
        });
}

document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('#contact-form');
    if (form) {
        form.addEventListener('submit', sendForm);
    }
});

window.addEventListener('scroll', () => {
    document.body.classList.toggle('scrolled', window.scrollY > 50);
  });

// Handle menu toggle
function toggleMenu() {
    const menu = document.querySelector('.dropdown-content');
    const button = document.querySelector('.dropbtn');
    
    menu.classList.toggle('show');
    button.classList.toggle('active');
}

// Close the menu if clicked outside
document.addEventListener('click', function (event) {
    const dropdown = document.querySelector('.dropdown');
    const button = document.querySelector('.dropbtn');
    if (!dropdown.contains(event.target)) {
        document.querySelector('.dropdown-content').classList.remove('show');
        button.classList.remove('active');
    }
});
