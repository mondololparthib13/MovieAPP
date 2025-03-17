document.addEventListener("DOMContentLoaded", () => {
    const searchForm = document.getElementById('searchForm');
    const inputBox = document.getElementById('inputBox');
    const movieContainer = document.querySelector('.movie-container');

    // Function to fetch movie details
    const getMovieInfo = async (movie) => {
        const myApiKey = "f7e92a30";
        const url = `https://www.omdbapi.com/?apikey=${myApiKey}&t=${movie}`;
        const response = await fetch(url);
        const data = await response.json();

        if (data.Response === "True") {
            showMovieData(data);
        } else {
            movieContainer.innerHTML = `<h2>Movie Not Found</h2>`;
        }
    };

    // Function to display movie data
    const showMovieData = (data) => {
        movieContainer.innerHTML = "";

        // Object destructuring
        const { Title, imdbRating, Genre, Released, Runtime, Actors, Plot, Poster } = data;

        // Movie info container
        const movieElement = document.createElement('div');
        movieElement.classList.add('movie-info');
        movieElement.innerHTML = `
            <h2>${Title}</h2>
            <p><strong>Rating: &#11088; </strong>${imdbRating}</p>
            <p><strong>Released Date: </strong>${Released}</p>
            <p><strong>Duration: </strong>${Runtime}</p>
            <p><strong>Cast: </strong>${Actors}</p>
            <p><strong>Plot: </strong>${Plot}</p>
        `;

        // Genres
        const movieGenreElement = document.createElement('div');
        movieGenreElement.classList.add('movie-genre');

        Genre.split(",").forEach(element => {
            const p = document.createElement('p');
            p.innerText = element.trim();
            movieGenreElement.appendChild(p);
        });

        movieElement.appendChild(movieGenreElement);

        // Movie poster
        const moviePosterElement = document.createElement('div');
        moviePosterElement.classList.add('movie-poster');
        moviePosterElement.innerHTML = `<img src="${Poster}" alt="${Title} Poster"/>`;

        movieContainer.appendChild(moviePosterElement);
        movieContainer.appendChild(movieElement);
    };

    // Search event
    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const movieName = inputBox.value.trim();

        if (movieName !== '') {
            getMovieInfo(movieName);
        }
    });
});
