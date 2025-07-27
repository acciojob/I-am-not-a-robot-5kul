//your code here
// Get all elements
const images = document.querySelectorAll('.image');
const resetBtn = document.getElementById('reset');
const verifyBtn = document.getElementById('verify');
const para = document.getElementById('para');
const h = document.getElementById('h');

// Variables to track state
let selectedImages = [];
let duplicatedImage = null;
let resetState = false;

// Randomize images on page load
function randomizeImages() {
    const imageSources = [
        'https://via.placeholder.com/150?text=Image1',
        'https://via.placeholder.com/150?text=Image2',
        'https://via.placeholder.com/150?text=Image3',
        'https://via.placeholder.com/150?text=Image4',
        'https://via.placeholder.com/150?text=Image5'
    ];

    // Randomly pick one image to duplicate
    duplicatedImage = imageSources[Math.floor(Math.random() * imageSources.length)];

    // Add the duplicate image to the sources
    imageSources.push(duplicatedImage);

    // Shuffle the image sources array
    for (let i = imageSources.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [imageSources[i], imageSources[j]] = [imageSources[j], imageSources[i]];
    }

    // Set images source
    images.forEach((img, index) => {
        img.src = imageSources[index];
        img.addEventListener('click', imageClickHandler);
    });
}

// Handle image click
function imageClickHandler(e) {
    if (selectedImages.length < 2 && !selectedImages.includes(e.target)) {
        e.target.classList.add('selected');
        selectedImages.push(e.target);

        if (selectedImages.length === 1) {
            resetBtn.style.display = 'inline-block';
        } else if (selectedImages.length === 2) {
            verifyBtn.style.display = 'inline-block';
        }
    }
}

// Reset functionality
resetBtn.addEventListener('click', () => {
    selectedImages.forEach(image => image.classList.remove('selected'));
    selectedImages = [];
    resetBtn.style.display = 'none';
    verifyBtn.style.display = 'none';
    para.textContent = '';
    h.textContent = "Please click on the identical tiles to verify that you are not a robot.";
    randomizeImages(); // Reshuffle the images
});

// Verify functionality
verifyBtn.addEventListener('click', () => {
    const [first, second] = selectedImages;
    if (first.src === second.src) {
        para.textContent = "You are a human. Congratulations!";
        para.style.color = 'green';
    } else {
        para.textContent = "We can't verify you as a human. You selected the non-identical tiles.";
        para.style.color = 'red';
    }

    // Hide buttons after verification
    verifyBtn.style.display = 'none';
    resetBtn.style.display = 'none';
    h.textContent = ""; // Remove the instructions text
});

// Initialize the game
randomizeImages();
