async function getTrendingMoviesPreview(){
    const res = await fetch('https://api.themoviedb.org/3/trending/movie/day?api_key=' + API_KEY);
    const data = await res.json();

    console.log({ data });

    const movies = data.results;
    movies.forEach(movie =>{
        const trendingPreviewMoviesContainer = document.querySelector('#trendingPreview .trendingPreview-movieList')
        const movieContainer = document.createElement('div');
        movieContainer.classList.add('movie-container');

        const movieImg = document.createElement('img');
        movieImg.classList.add('movie-img');
        movieImg.setAttribute('alt', movie.title);
        movieImg.setAttribute('src', 'https://image.tmdb.org/t/p/w300/' + movie.poster_path);
        
        movieContainer.appendChild(movieImg);
        trendingPreviewMoviesContainer.appendChild(movieContainer)
    })
    
}
getTrendingMoviesPreview()

async function getTrendingTvPreview(){
    const res = await fetch('https://api.themoviedb.org/3/trending/tv/day?api_key=' + API_KEY);
    const data = await res.json();

    console.log({ data });

    const series = data.results;
    series.forEach(serie =>{
        const trendingPreviewSeriesContainer = document.querySelector('#trendingPreviewSeries .trendingPreview-serieList')
        const serieContainer = document.createElement('div');
        serieContainer.classList.add('serie-container');

        const serieImg = document.createElement('img');
        serieImg.classList.add('serie-img');
        serieImg.setAttribute('alt', serie.title);
        serieImg.setAttribute('src', 'https://image.tmdb.org/t/p/w300/' + serie.poster_path);
        
        serieContainer.appendChild(serieImg);
        trendingPreviewSeriesContainer.appendChild(serieContainer)
    })
    
}
getTrendingTvPreview()


async function getCategoriesPreview(){
    const res = await fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=' + API_KEY);
    const data = await res.json();

    console.log({ data });

    const categories = data.genres;
    categories.forEach(category =>{
        const previewCategoriesContainer = document.querySelector('#categoriesPreview .categoriesPreview-list')
        const categoryContainer = document.createElement('div');
        categoryContainer.classList.add('category-container');

        const categoryTitle = document.createElement('img');
        categoryTitle.classList.add('categoryTitle');
        categoryTitle.setAttribute('id', category.name);
        const categoryTitleText = document.createTextNode(categories.name);

        categoryTitle.appendChild(categoryTitleText)
        categoryContainer.appendChild(categoryTitle)
        previewCategoriesContainer.appendChild(categoryContainer)
    })
    
}
getCategoriesPreview()