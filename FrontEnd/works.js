// Récupération des travaux depuis l'API
const response = await fetch('http://localhost:5678/api/works');
const works = await response.json();
// Transformations des travaux en JSON
const valueWorks = JSON.stringify(works);

function generateWorks(works) {
    for (let i = 0; i < works.length; i++) {
        const article = works[i];
        // Récupération de l'élément du DOM qui accueillera la galerie
        const sectionGallery = document.querySelector(".gallery");
        // Création d'une balise dédiée à un travail
        const workElement = document.createElement("figure");
        workElement.dataset.id = works[i].id
        // Création des balises
        const imageElement = document.createElement("img");
        imageElement.src = article.imageUrl;
        const descriptionElement = document.createElement("figcaption");
        descriptionElement.innerText = article.title;

        // Rattachement de la balise article à la section gallery
        sectionGallery.appendChild(workElement);
        workElement.appendChild(imageElement);
        workElement.appendChild(descriptionElement);
    }
}

generateWorks(works);

// Fonctionnement bouton du filtre "Tous"
const allBtn = document.getElementById('all');
allBtn.addEventListener('click', function() {
    // Application des effets demandés au bouton du filter sélectionné
    const activatedBtn = document.querySelector('.filter-activated');
    if (activatedBtn) {
    activatedBtn.classList.remove('filter-activated');
    }
    allBtn.classList.add('filter-activated');
    // Mise à jour de la galerie
    document.querySelector(".gallery").innerHTML = "";
    generateWorks(works);
});

// Fonctionnement bouton du filtre "Objets"
const objectsBtn = document.getElementById('objects');
objectsBtn.addEventListener('click', function() {
    // Application des effets demandés au bouton du filter sélectionné
    const activatedBtn = document.querySelector('.filter-activated');
    if (activatedBtn) {
    activatedBtn.classList.remove('filter-activated');
    }
    objectsBtn.classList.add('filter-activated');
    // Filtrage par rapport à la catégorie
    const filteredWorks = works.filter (work => work.category.name === 'Objets');
    // Mise à jour de la galerie
    document.querySelector(".gallery").innerHTML = "";
    generateWorks(filteredWorks);
});

// Fonctionnement bouton du filtre "Appartements"
const apartmentsBtn = document.getElementById('apartments');
apartmentsBtn.addEventListener('click', function() {
    // Application des effets demandés au bouton du filter sélectionné
    const activatedBtn = document.querySelector('.filter-activated');
    if (activatedBtn) {
    activatedBtn.classList.remove('filter-activated');
    }
    apartmentsBtn.classList.add('filter-activated');
    // Filtrage par rapport à la catégorie
    const filteredWorks = works.filter (work => work.category.name === 'Appartements');
    // Mise à jour de la galerie
    document.querySelector(".gallery").innerHTML = "";
    generateWorks(filteredWorks);
});

// Fonctionnement bouton du filtre "Hôtels & Restaurants"
const hotelsRestaurantsBtn = document.getElementById('hotels-restaurants');
hotelsRestaurantsBtn.addEventListener('click', function() {
    // Application des effets demandés au bouton du filter sélectionné
    const activatedBtn = document.querySelector('.filter-activated');
    if (activatedBtn) {
    activatedBtn.classList.remove('filter-activated');
    }
    hotelsRestaurantsBtn.classList.add('filter-activated');
    // Filtrage par rapport à la catégorie
    const filteredWorks = works.filter (work => work.category.name === 'Hotels & restaurants');
    // Mise à jour de la galerie
    document.querySelector(".gallery").innerHTML = "";
    generateWorks(filteredWorks);
});