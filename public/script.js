function downloadVideo() {
    const url = document.getElementById('url').value;
    const resultDiv = document.getElementById('result');

    if (!url) {
        resultDiv.textContent = 'Veuillez entrer une URL valide.';
        return;
    }

    fetch(`/download?url=${encodeURIComponent(url)}`)
        .then(response => {
            if (response.redirected) {
                window.location.href = response.url; // Redirige vers le lien de téléchargement
            } else {
                return response.text();
            }
        })
        .then(data => {
            if (data) {
                resultDiv.textContent = data;
            }
        })
        .catch(error => {
            resultDiv.textContent = 'Erreur lors du téléchargement.';
            console.error(error);
        });
}
