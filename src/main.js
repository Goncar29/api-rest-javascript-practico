const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    headers: {
        'Content-Type': 'application/json;charset=utf-8',
    },
    params: {
        'api_key': API_KEY,
    },
});

// Utils

function createMovies(movies, container) {
    container.innerHTML = '';

    movies.forEach(movie =>{
        const movieContainer = document.createElement('div');
        movieContainer.classList.add('movie-container');
        movieContainer.addEventListener("click", () => {
            location.hash = '#movie=' + movie.id;
        })

        const movieImg = document.createElement('img');
        movieImg.classList.add('movie-img');
        movieImg.setAttribute('alt', movie.title);
        movieImg.setAttribute('src', 'https://image.tmdb.org/t/p/w300/' + movie.poster_path);
        
        movieContainer.appendChild(movieImg);
        container.appendChild(movieContainer)
    })
}

function createCategories(categories, container){
    container.innerHTML = "";

    categories.forEach(category =>{
        const categoryContainer = document.createElement('div');
        categoryContainer.classList.add('category-container');

        const categoryTitle = document.createElement('h3');
        categoryTitle.classList.add('category-title');
        categoryTitle.setAttribute('id', 'id' + category.id);
        categoryTitle.addEventListener('click', () =>{
            location.hash = `#category=${category.id}-${category.name}`;
        });
        const categoryTitleText = document.createTextNode(category.name);

        categoryTitle.appendChild(categoryTitleText)
        categoryContainer.appendChild(categoryTitle)
        container.appendChild(categoryContainer)
    })
}


// Llamados a la API

async function getTrendingMoviesPreview(){
    const { data } = await api('trending/movie/day');
    // const res = await fetch('https://api.themoviedb.org/3/trending/movie/day?api_key=' + API_KEY);
    // const data = await res.json();
    console.log({ data });

    const movies = data.results;
    createMovies(movies, trendingMoviesPreviewList)
}

async function getTrendingTvPreview(){
    const res = await fetch('https://api.themoviedb.org/3/trending/tv/day?api_key=' + API_KEY);
    const data = await res.json();

    trendingPreviewSerieList.innerHTML = "";
    
    console.log({ data });

    const series = data.results;
    series.forEach(serie =>{
        const serieContainer = document.createElement('div');
        serieContainer.classList.add('serie-container');

        const serieImg = document.createElement('img');
        serieImg.classList.add('serie-img');
        serieImg.setAttribute('alt', serie.title);
        serieImg.setAttribute('src', 'https://image.tmdb.org/t/p/w300/' + serie.poster_path);
        
        serieContainer.appendChild(serieImg);
        trendingPreviewSerieList.appendChild(serieContainer)
    })
    
}

async function getCategoriesPreview(){
    const { data } = await api('genre/movie/list');
    const categories = data.genres;

    console.log({ data });

    createCategories(categories, categoriesPreviewList);
    
}

async function getMoviesByCategory(id){
    const { data } = await api('discover/movie', {
        params: {
            with_genres: id,
        },
    });

    console.log({ data });

    const movies = data.results;
    createMovies(movies, genericSection)
}

// async function getCategoriesPreview(){
//     const { data } = await api('genre/tv/list');
//     const categories = data.genres;

//     console.log({ data });

//     createCategories(categoriesTv, categoriesPreviewList);
    
// }
async function getMoviesBySearch(query){
    const { data } = await api('search/movie', {
        params: {
            query,
        },
    });

    console.log({ data });

    const multi = data.results;
    createMovies(multi, genericSection)
}

async function getTrendingMovies(){
    const { data } = await api('trending/movie/day');
    // const res = await fetch('https://api.themoviedb.org/3/trending/movie/day?api_key=' + API_KEY);
    // const data = await res.json();
    console.log({ data });

    const movies = data.results;
    createMovies(movies, genericSection)
}

async function getMovieById(id){
    const { data: movie } = await api('movie/' + id);
    console.log({ movie });

    const movieImgUrl = 'https://image.tmdb.org/t/p/w500/' + movie.poster_path
    console.log(movieImgUrl)
    headerSection.style.background = `
    linear-gradient(
        180deg, 
        rgba(0, 0, 0, 0.35) 19.27%, 
        rgba(0, 0, 0, 0) 29.17%
        ),
    url(${movieImgUrl})`
    headerSection.style.backgroundPosition = 'center';
    headerSection.style.backgroundRepeat = 'no-repeat';
    headerSection.style.backgroundSize = 'cover';

    movieDetailTitle.textContent = movie.title;
    movieDetailDescription.textContent = movie.overview;
    movieDetailScore.textContent = movie.vote_average;

    createCategories(movie.genres, movieDetailCategoriesList)
    getRelatedMoviesId(id);
}
async function getRelatedMoviesId(id){
    const { data } = await api(`movie/${id}/recommendations`);
    const relatedMovies = data.results;

    createMovies(relatedMovies, relatedMoviesContainer)
}