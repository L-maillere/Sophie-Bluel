// Séléction des éléments du formulaire
const loginForm = document.getElementById('login-form');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');

// Écoute de l'envoi du formulaire
loginForm.addEventListener('submit', async function(event) {
    // Empêcher le reload de la page
    event.preventDefault();

    // Récupération des valeurs du formulaire
    const email = emailInput.value;
    const password = passwordInput.value;

    try {
        // Envoyer les informations de connexion
        const reponse = await fetch('http://localhost:5678/api/users/login', {
            method: 'POST',
            headers: {'Content-type' : 'application/json' },
            body: JSON.stringify({email, password })           
        });

        const data = await reponse.json();
        console.log(data);

        // Vérification de la réponse du serveur
        if (data.userId && data.token) {
            // Si les informations sont correctes, stocker le token dans le localStorage
            localStorage.setItem('token', data.token);
            // Rediriger vers le home page
            window.location.href = 'index.html';
        } else {
            alert('Identifiants invalides. Veuillez réessayer.');
        }
    } catch (error) {
        console.error('Une erreur s\'est produite lors de la requête de login:', error);
    }
});

