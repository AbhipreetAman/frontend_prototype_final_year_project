document.getElementById('detectButton').addEventListener('click', async () => {
    const imageInput = document.getElementById('imageInput');
    const coordinatesInput = document.getElementById('coordinates');
    const output = document.getElementById('output');

    if (!imageInput.files[0] && !coordinatesInput.value) {
        alert('Please select an image file or enter coordinates');
        return;
    }

    if (imageInput.files[0] && coordinatesInput.value) {
        alert('Please select an image file or enter coordinates, not both');
        return;
    }

    output.innerHTML = 'Processing...';

    let image;
    if (imageInput.files[0]) {
        image = await loadImage(imageInput.files[0]);
    } else {
        image = null;
    }

    const coordinates = coordinatesInput.value;

    let waterCoordinates;
    if (image) {
        waterCoordinates = await detectWaterBody(image);
    } else {
        waterCoordinates = [];
    }

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (image) {
        canvas.width = image.width;
        canvas.height = image.height;
        ctx.drawImage(image, 0, 0);

        ctx.fillStyle = 'rgba(0, 0, 255, 0.3)';
        ctx.beginPath();
        for (let coords of waterCoordinates) {
            ctx.rect(coords.x, coords.y, coords.width, coords.height);
        }
        ctx.fill();
    } else {
        canvas.width = 500;
        canvas.height = 500;

        ctx.fillStyle = 'rgba(0, 0, 255, 0.3)';
        ctx.fillRect(100, 100, 300, 300);
    }

    output.innerHTML = '';
    output.appendChild(canvas);
});

async function loadImage(file) {
    return new Promise(resolve => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.src = URL.createObjectURL(file);
    });
}

async function detectWaterBody(image) {
    // Here you would implement your water body detection algorithm
    // This is just a placeholder function
    return [
        { x: 50, y: 50, width: 100, height: 100 },
        { x: 150, y: 150, width: 200, height: 200 }
    ];
}
