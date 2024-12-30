const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Sert les fichiers statiques (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Route pour la page d'accueil
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Endpoint pour télécharger une vidéo YouTube
app.get('/download', async (req, res) => {
    const url = req.query.url;

    if (!url) {
        return res.status(400).send('URL manquante.');
    }

    try {
        // Appel à l'API RapidAPI
        const response = await axios.get('https://youtube-to-mp4.p.rapidapi.com/url=&title', {
            params: {
                url,
                title: 'Téléchargement Vidéo YouTube',
            },
            headers: {
                'x-rapidapi-host': 'youtube-to-mp4.p.rapidapi.com',
                'x-rapidapi-key': '20649c7c82mshed1c3c45890ea0ap1b2d2ejsn0b509cae98a3', // Remplace avec ta clé API
            },
        });

        // Vérifie si un lien de téléchargement est disponible
        const downloadUrl = response.data.downloadUrl; // Assure-toi que la clé correspond à la réponse de l'API
        if (downloadUrl) {
            res.redirect(downloadUrl); // Redirige l'utilisateur vers le lien de téléchargement
        } else {
            res.status(500).send('Erreur : Aucun lien de téléchargement disponible.');
        }
    } catch (error) {
        console.error('Erreur API :', error.message);
        res.status(500).send('Erreur lors de l\'appel à l\'API.');
    }
});

// Lancer le serveur
app.listen(PORT, () => {
    console.log(`Serveur lancé sur http://localhost:${PORT}`);
});
