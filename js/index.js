// Votre clé API
const API_KEY = '5bbbccfaf48c26c30c6dd091bff9a96e';
const filmContainer = document.querySelector(".film-list")

// Endpoint de l'API TMDB
const TRENDING_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=fr-FR&page=1`;




// Fonction pour récupérer les films en tendance
async function fetchTrendingMovies() {
    try {
        const response = await fetch(TRENDING_URL);
        if (!response.ok) {
            throw new Error(`Erreur : ${response.status}`);
        }

        const data = await response.json();
        displayMovies(data.results);
    } catch (error) {
        console.error('Erreur lors de la récupération des films :', error);
    }
}
// Fonction pour afficher les films en tendance
function displayMovies(movies) {
    const moviesContainer = document.getElementById('film-list');
    moviesContainer.innerHTML = ''; // Efface les anciens films

    movies.forEach(movie => {
        // Création d'une carte pour chaque film
        const movieCard = document.createElement('div');
        movieCard.classList.add('movie-card');

        const moviePoster = document.createElement('img');
        moviePoster.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
        moviePoster.id =  `https://image.tmdb.org/t/p/w500${movie.id}`;
        //
        moviePoster.alt = movie.title;

        const movieTitle = document.createElement('h3');
        movieTitle.textContent = movie.title;

        const movieReleaseDate = document.createElement('p');
        movieReleaseDate.textContent = `Date de sortie : ${movie.release_date}`;

        const viewMore = document.createElement('a')
        viewMore.href = `movie.html?id=${movie.id}`
        viewMore.textContent = "Voir plus"

        

        // Ajout des éléments à la carte
        movieCard.appendChild(moviePoster);
        movieCard.appendChild(movieTitle);
        movieCard.appendChild(movieReleaseDate);
        movieCard.appendChild(viewMore);

        // Ajout de la carte au conteneur
        moviesContainer.appendChild(movieCard);
    });
}

// Appeler et afficher les films
fetchTrendingMovies();
