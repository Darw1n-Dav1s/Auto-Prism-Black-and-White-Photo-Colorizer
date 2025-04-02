document.getElementById('upload-input').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const uploadedImage = document.getElementById('uploaded-image');
            uploadedImage.src = e.target.result;
            uploadedImage.style.display = 'block';
        }
        reader.readAsDataURL(file);

        // Show loading animation
        document.getElementById('loading').style.display = 'block';

        const formData = new FormData();
        formData.append('file', file);

        fetch('/upload', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            document.getElementById('loading').style.display = 'none'; // Hide loading animation
            document.getElementById('colorized-image').src = data.colorized_image;
            document.getElementById('colorized-image').style.display = 'block';
            document.getElementById('download-btn').style.display = 'block';

            document.getElementById('download-btn').onclick = function() {
                const link = document.createElement('a');
                link.href = data.colorized_image;
                link.download = 'colorized_image.png';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            };
        })
        .catch(error => {
            document.getElementById('loading').style.display = 'none'; // Hide loading animation on error
            console.error('Error:', error);
        });
    }
});
