const API_KEY = '5bbbccfaf48c26c30c6dd091bff9a96e';
const SEARCH_URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=`;

// Écouteur d'événement pour l'entrée de recherche
document.getElementById('search-input').addEventListener('input', async function () {
    const query = this.value.trim();
    
    if (query.length < 3) {
        document.getElementById('search-results').innerHTML = '';
        return;
    }
    
    try {
        const response = await fetch(SEARCH_URL + encodeURIComponent(query));
        if (!response.ok) throw new Error(`Erreur : ${response.status}`);
        const data = await response.json();
        displaySearchResults(data.results);
    } catch (error) {
        console.error('Erreur lors de la recherche :', error);
    }
});

// Fonction pour afficher les résultats de la recherche
function displaySearchResults(movies) {
    const searchResultsContainer = document.getElementById('search-results');
    searchResultsContainer.innerHTML = '';

    if (movies.length === 0) {
        searchResultsContainer.innerHTML = '<p>Aucun film trouvé.</p>';
        return;
    }

    movies.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.classList.add('movie-card');
        
        const moviePoster = document.createElement('img');
        moviePoster.src = movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'placeholder.jpg';
        moviePoster.alt = movie.title;
        
        const movieTitle = document.createElement('h3');
        movieTitle.textContent = movie.title;
        
        const movieLink = document.createElement('a');
        movieLink.href = `movie.html?id=${movie.id}`;
        movieLink.textContent = 'Voir les détails';
        
        movieCard.appendChild(moviePoster);
        movieCard.appendChild(movieTitle);
        movieCard.appendChild(movieLink);
        searchResultsContainer.appendChild(movieCard);
    });
}
