const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    headers: {
        'Content-Type': 'application/json;charset=utf-8',
    },
    params: {
        'api_key': API_KEY,
        "language": "es-ES",
    },
});


async function getTrendingMoviesPreview(){
    const { data } = await api('trending/movie/day');
    // const res = await fetch('https://api.themoviedb.org/3/trending/movie/day?api_key=' + API_KEY);
    // const data = await res.json();

    trendingMoviesPreviewList.innerHTML = "";

    console.log({ data });

    const movies = data.results;
    movies.forEach(movie =>{
        const movieContainer = document.createElement('div');
        movieContainer.classList.add('movie-container');

        const movieImg = document.createElement('img');
        movieImg.classList.add('movie-img');
        movieImg.setAttribute('alt', movie.title);
        movieImg.setAttribute('src', 'https://image.tmdb.org/t/p/w300/' + movie.poster_path);
        
        movieContainer.appendChild(movieImg);
        trendingMoviesPreviewList.appendChild(movieContainer)
    })
    
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

    categoriesPreviewList.innerHTML = "";

    categories.forEach(category =>{
        const categoryContainer = document.createElement('div');
        categoryContainer.classList.add('category-container');

        const categoryTitle = document.createElement('h3');
        categoryTitle.classList.add('category-title');
        categoryTitle.setAttribute('id', 'id' + category.id);
        const categoryTitleText = document.createTextNode(category.name);

        categoryTitle.appendChild(categoryTitleText)
        categoryContainer.appendChild(categoryTitle)
        categoriesPreviewList.appendChild(categoryContainer)
    })
    
}
