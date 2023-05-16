// Récupération des travaux depuis l'API
const response = await fetch('http://localhost:5678/api/works');
const works = await response.json();
let copyWorks = works;
// Transformations des travaux en JSON
const valueWorks = JSON.stringify(works);
// Création d'une variable qui stockera une copie de la gallery pour la modale

function generateWorks(works) {
    for (let i = 0; i < works.length; i++) {
        const article = works[i];
        // Récupération de l'élément du DOM qui accueillera la galerie
        const sectionGallery = document.querySelector(".gallery");
        // Création d'une balise dédiée à un travail
        const workElement = document.createElement("figure");
        workElement.dataset.id = works[i].id;
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

function generateModalWorks() {
    for (let i = 0; i < copyWorks.length; i++) {
        const article = copyWorks[i];
        const galleryModale = document.querySelector(".modale-gallery");
        const workElement = document.createElement("figure");
        workElement.dataset.id = copyWorks[i].id;
        const imageElement = document.createElement("img");
        imageElement.src = article.imageUrl;
        const editElement = document.createElement("a");
        editElement.href = '#';
        editElement.innerText = 'éditer';

        galleryModale.appendChild(workElement);
        workElement.appendChild(imageElement);
        workElement.appendChild(editElement);
    }
}

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
    console.log(works);
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

// Gestion du bouton dans le menu de navigation login/logout
// Vérification de la précense d'un token
if (localStorage.getItem('token')) {
    const loginLink = document.querySelector('.menu-login a');
    loginLink.textContent = 'logout';

    loginLink.addEventListener('click', function(event) {
        event.preventDefault();

        // Suppression du token pour "déconnecter"
        localStorage.removeItem('token');

        loginLink.textContent = 'login';

        window.location.href = 'index.html';
    });
}

// Admin mode
// Vérification de la précense d'un token
if (localStorage.getItem('token')) {
    const header = document.querySelector("header");
    // Création des éléments présents dans le header version admin et ajout des classes/styles css
    const headerAdmin = document.createElement("div");
    headerAdmin.classList.add('mode-admin');
    const iconAdmin = document.createElement("i");
    iconAdmin.classList.add('fa-regular', 'fa-pen-to-square');
    const textAdmin = document.createElement("p");
    textAdmin.innerText = 'Mode édition';
    const applyAdmin = document.createElement("button");
    applyAdmin.innerText = 'publier les changements';

    // Rattachement des balises crées au header
    header.appendChild(headerAdmin);
    headerAdmin.appendChild(iconAdmin);
    headerAdmin.appendChild(textAdmin);
    headerAdmin.appendChild(applyAdmin);

    // Rajout d'une marge au header initial pour laisser la place à la partie "header admin"
    const headerClassic = document.querySelector(".mode-classic");
    headerClassic.style.setProperty('margin-top', '97px');

    const img = document.querySelector("figure");
    // Création des éléments présents avec l'image version admin et ajout des classes/styles css
    const imgAdmin = document.createElement("div");
    imgAdmin.classList.add('modifier-img');
    const iconImgAdmin = document.createElement("i");
    iconImgAdmin.classList.add('fa-regular', 'fa-pen-to-square');
    const textImgAdmin = document.createElement("p");
    textImgAdmin.innerText = 'modifier';

    // Rattachement des balises crées à l'image
    img.appendChild(imgAdmin);
    imgAdmin.appendChild(iconImgAdmin);
    imgAdmin.appendChild(textImgAdmin);

    const article = document.querySelector("article");
    // Création des éléments présents dans l'article version admin et ajout des classes/styles css
    const articleAdmin = document.createElement("div");
    articleAdmin.classList.add('modifier-article');
    const iconArticleAdmin = document.createElement("i");
    iconArticleAdmin.classList.add('fa-regular', 'fa-pen-to-square');
    const textArticleAdmin = document.createElement("p");
    textArticleAdmin.innerText = 'modifier';

    // Rattachement des balises crées à l'article
    const titleBalise = document.querySelector('h2');
    article.insertBefore(articleAdmin, titleBalise);
    articleAdmin.appendChild(iconArticleAdmin);
    articleAdmin.appendChild(textArticleAdmin);

    const projects = document.getElementById('portfolio');
    // Création des éléments présents dans le portfolio version admin et ajout des classes/styles css
    const projectsAdmin = document.createElement("div");
    projectsAdmin.classList.add('modifier-projets');
    const iconProjectsAdmin = document.createElement("i");
    iconProjectsAdmin.classList.add('fa-regular', 'fa-pen-to-square');
    const textProjectsAdmin = document.createElement("p");
    textProjectsAdmin.innerText = 'modifier';

    // Rattachement des balises crées au portfolio
    const filtersDiv = document.querySelector('.filters');
    projects.insertBefore(projectsAdmin, filtersDiv);
    projectsAdmin.appendChild(iconProjectsAdmin);
    projectsAdmin.appendChild(textProjectsAdmin);

    // Modale
    projectsAdmin.addEventListener('click', function(event) {
        // Permet au clic de ne pas se "propager" au document.addEventListener plus bas
        event.stopPropagation();

        // Création des éléments de la modale lors du clic et ajout des styles/classes css
        const modale = document.createElement("aside");
        modale.classList.add('modale');
        const wrapperModale = document.createElement("div");
        wrapperModale.classList.add('modale-wrapper');
        const closeBtnModale = document.createElement("i");
        closeBtnModale.classList.add('fa-solid', 'fa-xmark');
        closeBtnModale.id = 'closeBtnModale';
        const titleModale = document.createElement("h3");
        titleModale.innerText = 'Galerie photo';
        const galleryModale = document.createElement("div");
        galleryModale.classList.add('modale-gallery');
        const addBtnModale = document.createElement("button");
        addBtnModale.innerText = 'Ajouter une photo';
        const deleteModale = document.createElement("a");
        deleteModale.href = '#';
        deleteModale.innerText = 'Supprimer la galerie';
        deleteModale.id = 'delete-gallery';

        // Rattachement de la modale à la balise <main> et au bon endroit
        const main = document.querySelector('main');
        main.insertBefore(modale, projects);
        modale.appendChild(wrapperModale);
        wrapperModale.appendChild(closeBtnModale);
        wrapperModale.appendChild(titleModale);
        wrapperModale.appendChild(galleryModale);
        wrapperModale.appendChild(addBtnModale);
        wrapperModale.appendChild(deleteModale);

        generateModalWorks(copyWorks);

        // Suppression de la modale quand on vient cliquer sur la croix
        closeBtnModale.addEventListener('click', function() {
            modale.remove();
        });

        // Suppression de la modale quand on vient cliquer en dehors de la modale
        document.addEventListener('click', function(event) {
            const target = event.target;
            if (!wrapperModale.contains(target)) {
                modale.remove();
            }
        });

        // Création de la deuxième "page" de la modale, permettant d'ajouter une photo/travail
        addBtnModale.addEventListener('click', function(event) {
            event.stopPropagation();
            wrapperModale.innerHTML = '';

            const previousBtnModale = document.createElement("i");
            previousBtnModale.classList.add('fa-solid', 'fa-arrow-left');
            previousBtnModale.id = 'previousBtnModale';
            titleModale.innerText = 'Ajout photo';

            const imageContainer = document.createElement("div");
            imageContainer.id = 'imageContainer';
            const drawImageContainer = document.createElement("i");
            drawImageContainer.classList.add('fa-regular', 'fa-image');
            const imageSelected = document.createElement("img");
            imageSelected.id = 'imageSelected';
            imageSelected.style.display = 'none';
            imageSelected.src = '#';
            const fileInputBtn = document.createElement("label");
            fileInputBtn.setAttribute("for", "fileInput");
            fileInputBtn.innerText = '+ Ajouter photo';
            const fileInput = document.createElement("input");
            fileInput.id = 'fileInput';
            fileInput.type = 'file';
            fileInput.accept = "image/jpg, image/png";
            const fileConditions = document.createElement("p");
            fileConditions.innerText = 'jpg, png : 4mo max';

            const formContainer = document.createElement("div");
            formContainer.id = 'formContainer';
            const formFileProperties = document.createElement("form");
            formFileProperties.id = 'formFileProperties';
            const labelTitle = document.createElement("label");
            labelTitle.innerText = 'Titre';
            const inputTitle = document.createElement("input");
            const labelCategories = document.createElement("label");
            labelCategories.innerText = 'Catégorie';
            const categoriesList = document.createElement("select");
            const categorieObjects = document.createElement("option");
            categorieObjects.value = "Objets";
            categorieObjects.innerText = "Objets";
            const categorieApartments = document.createElement("option");
            categorieApartments.value = "Appartements";
            categorieApartments.innerText = "Appartements";
            const categorieHotelsRestaurants = document.createElement("option");
            categorieHotelsRestaurants.value = "Hotels & restaurants";
            categorieHotelsRestaurants.innerText = "Hotels & restaurants";

            const validateBtn = document.createElement("button");
            validateBtn.innerText = 'Valider';
            validateBtn.type = 'submit';
            validateBtn.id = 'validateBtn';
            
            wrapperModale.appendChild(previousBtnModale);
            wrapperModale.appendChild(closeBtnModale);
            wrapperModale.appendChild(titleModale);

            wrapperModale.appendChild(imageContainer);
            imageContainer.appendChild(drawImageContainer);
            imageContainer.appendChild(imageSelected);
            imageContainer.appendChild(fileInputBtn);
            imageContainer.appendChild(fileInput);
            imageContainer.appendChild(fileConditions);

            wrapperModale.appendChild(formContainer);
            formContainer.appendChild(formFileProperties);
            formFileProperties.appendChild(labelTitle);
            formFileProperties.appendChild(inputTitle);
            formFileProperties.appendChild(labelCategories);
            formFileProperties.appendChild(categoriesList);
            categoriesList.appendChild(categorieObjects);
            categoriesList.appendChild(categorieApartments);
            categoriesList.appendChild(categorieHotelsRestaurants);

            wrapperModale.appendChild(validateBtn);

            fileInput.addEventListener('change', function(event) {
                const selectedFile = event.target.files[0];
                const imageURL = URL.createObjectURL(selectedFile);
                imageSelected.src = imageURL;
                imageSelected.style.display = 'block';
                fileInputBtn.style.display = 'none';
                fileConditions.style.display = 'none';
                drawImageContainer.style.display = 'none';
            });

            function checkFields() {
                const inputValue = inputTitle.value;
                const categorieValue = categoriesList.value;
                const fileSelected = fileInput.files[0];
                if (inputValue && categorieValue && fileSelected) {
                    validateBtn.disabled = false;
                    validateBtn.style.background = '#1D6154';
                    validateBtn.addEventListener('click', addWork);
                } else {
                    validateBtn.disabled = true;
                    validateBtn.style.background = '#A7A7A7'
                    console.log("champs incomplets");
                    validateBtn.removeEventListener('click', addWork);
                }
            };

            inputTitle.addEventListener('input', checkFields);
            categoriesList.addEventListener('change', checkFields);
            fileInput.addEventListener('input', checkFields);

            function addWork(event) {
                event.preventDefault;
                console.log(copyWorks);

                const categoryID = parseInt(categoriesList.selectedIndex.value);
                const newImage = {
                    id: copyWorks.length + 1,
                    title: inputTitle.value,
                    imageURL: imageSelected.src,
                    categoryID: categoryID,
                    userId: 1,
                    category: {
                        id: categoryID,
                        name: categoriesList.options[categoriesList.selectedIndex].text
                    }
                };

                copyWorks.push(newImage);

                document.querySelector(".gallery").innerHTML = "";
                generateWorks(copyWorks);
                console.log(copyWorks);

                modale.remove();
            }
        });
    });
}