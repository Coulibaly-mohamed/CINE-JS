const API_KEY = '5bbbccfaf48c26c30c6dd091bff9a96e';
const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get('id');
const MOVIE_DETAILS_URL = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`;
const MOVIE_COMMENTS_URL = `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=${API_KEY}`;

async function fetchMovieDetails() {
    try {
        const response = await fetch(MOVIE_DETAILS_URL);
        if (!response.ok) throw new Error(`Erreur : ${response.status}`);
        const movie = await response.json();
        displayMovieDetails(movie);
    } catch (error) {
        console.error('Erreur lors de la récupération des détails du film :', error);
    }
}

function displayMovieDetails(movie) {
    const movieDetailsContainer = document.getElementById('movie-details-container');
    const movieDetails = document.createElement('div');
    movieDetails.classList.add('movie-details');
    
    const moviePoster = document.createElement('img');
    moviePoster.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    
    const movieTitle = document.createElement('h2');
    movieTitle.textContent = movie.title;
    
    const movieOverview = document.createElement('p');
    movieOverview.textContent = movie.overview;
    
    movieDetails.appendChild(moviePoster);
    movieDetails.appendChild(movieTitle);
    movieDetails.appendChild(movieOverview);
    movieDetailsContainer.appendChild(movieDetails);
    
    fetchMovieComments();
}

async function fetchMovieComments() {
    try {
        const response = await fetch(MOVIE_COMMENTS_URL);
        if (!response.ok) throw new Error(`Erreur : ${response.status}`);
        const commentsData = await response.json();
        displayMovieComments(commentsData.results);
    } catch (error) {
        console.error('Erreur lors de la récupération des commentaires :', error);
    }
}

function displayMovieComments(comments) {
    const movieDetailsContainer = document.getElementById('movie-details-container');
    const commentsSection = document.createElement('div');
    commentsSection.classList.add('comments-section');
    
    const commentsTitle = document.createElement('h3');
    commentsTitle.textContent = 'Commentaires';
    commentsSection.appendChild(commentsTitle);
    
    comments.forEach(comment => {
        const commentElement = document.createElement('div');
        commentElement.classList.add('comment');
        
        const commentAuthor = document.createElement('h4');
        commentAuthor.textContent = comment.author;
        
        const commentContent = document.createElement('p');
        commentContent.textContent = comment.content;
        
        commentElement.appendChild(commentAuthor);
        commentElement.appendChild(commentContent);
        commentsSection.appendChild(commentElement);
    });
    
    movieDetailsContainer.appendChild(commentsSection);
}

fetchMovieDetails();
