let credits = 0;

// Sample dataset with user information (replace with actual API fetch in production)
const sampleSnaps = [
    { photoId: 1, userId: 1, userPhone: '+1234567890', imageUrl: 'path/to/image1.jpg', likeCounts: 15 },
    { photoId: 2, userId: 2, userPhone: '+1987654321', imageUrl: 'path/to/image2.jpg', likeCounts: 20 },
    { photoId: 3, userId: 3, userPhone: '+1555123456', imageUrl: 'path/to/image3.jpg', likeCounts: 12 },
    { photoId: 4, userId: 4, userPhone: '+1888777666', imageUrl: 'path/to/image4.jpg', likeCounts: 18 },
    { photoId: 5, userId: 5, userPhone: '+1666999888', imageUrl: 'path/to/image5.jpg', likeCounts: 25 },
];

// Function to render snaps from sample dataset
function renderSampleSnaps() {
    const snapContainer = document.getElementById('snapContainer');
    sampleSnaps.forEach(snap => {
        const snapItem = document.createElement('div');
        snapItem.classList.add('snap-item');

        const img = document.createElement('img');
        img.src = snap.imageUrl;
        snapItem.appendChild(img);

        const userInfo = document.createElement('p');
        userInfo.textContent = `User ID: ${snap.userId}, Phone: ${snap.userPhone}`;
        snapItem.appendChild(userInfo);

        const likeBtn = document.createElement('button');
        likeBtn.classList.add('like-btn');
        likeBtn.textContent = `Like (${snap.likeCounts})`;
        likeBtn.addEventListener('click', async () => {
            // Example: Simulating like functionality
            likeBtn.textContent = `Like (${++snap.likeCounts})`;
        });

        snapItem.appendChild(likeBtn);
        snapContainer.appendChild(snapItem);
    });
}

// Call renderSampleSnaps function to populate snaps on page load
document.addEventListener('DOMContentLoaded', renderSampleSnaps);

// Example function to handle simulated upload
document.getElementById('uploadForm').addEventListener('submit', async function (event) {
    event.preventDefault(); // Prevent the form from submitting the traditional way

    // Simulate successful upload
    const snapContainer = document.getElementById('snapContainer');
    const snapItem = document.createElement('div');
    snapItem.classList.add('snap-item');

    const img = document.createElement('img');
    img.src = 'path/to/new/image.jpg'; // Replace with actual uploaded image URL
    snapItem.appendChild(img);

    const userInfo = document.createElement('p');
    userInfo.textContent = `User ID: 6, Phone: +1777888999`; // Replace with actual user info
    snapItem.appendChild(userInfo);

    const likeBtn = document.createElement('button');
    likeBtn.classList.add('like-btn');
    likeBtn.textContent = `Like (0)`;
    likeBtn.addEventListener('click', async () => {
        // Example: Simulating like functionality
        likeBtn.textContent = `Like (1)`;
    });

    snapItem.appendChild(likeBtn);
    snapContainer.prepend(snapItem);

    // Reset the file input
    document.getElementById('file-upload').value = "";

    // Add 2 credit points (simulated)
    credits += 2;
    document.getElementById('credits').textContent = `Credits: ${credits}`;
});
