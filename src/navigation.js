let maxPage;
let page = 1;
let infinitScroll;

searchFormBtn.addEventListener("click", () => {
    location.hash = '#search=' + searchFormInput.value
    // hacer condicional para que el usuario escriba algo
});
trendingBtn.addEventListener("click", () => {
    location.hash = '#trends';
});
// trendingBtnSeries.addEventListener("click", () => {
//     location.hash = '#trendstv';
// })
arrowBtn.addEventListener("click", () => {
        history.back();
});

window.addEventListener('DOMContentLoaded', navigator, false);
window.addEventListener('hashchange', navigator, false);
window.addEventListener('scroll', infinitScroll, false);

function navigator() {
    console.log({ location });

    if(infinitScroll) {
        window.removeEventListener('scroll', infinitScroll, { passive: false });
        infinitScroll = undefined;
    }

    if(location.hash.startsWith('#trends')) {
        trendsPage()
        // getTrendingTvPreview()
    }else if(location.hash.startsWith('#trendstv')) {
        trendstv()
    }else if(location.hash.startsWith('#search=')) {
        searchPage()
    }else if(location.hash.startsWith('#movie=')) {
        moviesDetailsPage()
        // getTrendingMoviesPreview()
    // }else if(location.hash.startsWith('#serie=')) {
    //     seriesDetailsPage()
    //     // getTrendingSeriesPreview()
    }else if(location.hash.startsWith('#category=')){
        cetagoriesPage()
    }else{
        homePage()
        // getTrendingMoviesPreview()
        // getTrendingTvPreview()
        // getCategoriesPreview()
    }
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    location.hash

    if(infinitScroll){
        window.addEventListener('scroll', infinitScroll, { passive: false });
    }
}
function trendsPage() {
    console.log('Trends!!');

    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.remove('inactive');
    searchForm.classList.add('inactive');

    // trendingPreviewSeries.classList.add('inactive');
    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    likedMoviesSection.classList.add('inactive');
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');

    headerCategoryTitle.innerHTML = 'Tendencias'

    getTrendingMovies();

    infinitScroll = getPaginatedTrendingMovies;
}
// function trendstv() {
//     headerSection.classList.remove('header-container--long');
//     headerSection.style.background = '';
//     arrowBtn.classList.remove('inactive');
//     arrowBtn.classList.remove('header-arrow--white');
//     headerTitle.classList.add('inactive');
//     headerCategoryTitle.classList.remove('inactive');
//     searchForm.classList.add('inactive');

//     trendingPreviewSeries.classList.add('inactive');
//     categoriesPreviewSection.classList.add('inactive');
//     genericSection.classList.remove('inactive');
//     movieDetailSection.classList.add('inactive')
// }
function searchPage() {
    console.log('Search!!');

    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.add('inactive');
    searchForm.classList.remove('inactive');

    // trendingPreviewSeries.classList.add('inactive');
    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    likedMoviesSection.classList.add('inactive');
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');

    // ['#search', 'buscad??'] con split separamos los elementos en un array cada vez qe hay un =
    const [_, query] = location.hash.split('=')
    getMoviesBySearch(query);

    infinitScroll = getPaginatedMoviesBySearch(query);
}
function moviesDetailsPage() {
    console.log('Movie!!');

    headerSection.classList.add('header-container--long');
    // headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.add('header-arrow--white');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.add('inactive');
    searchForm.classList.add('inactive');

    // trendingPreviewSeries.classList.remove('inactive');
    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    likedMoviesSection.classList.add('inactive');
    genericSection.classList.add('inactive');
    movieDetailSection.classList.remove('inactive');

     // ['#movie', 'id'] con split separamos los elementos en un array cada vez qe hay un =
    const [_, movieId] = location.hash.split('=')
    getMovieById(movieId);
}
function cetagoriesPage() {
    console.log('Categories!!');

    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.remove('inactive');
    searchForm.classList.add('inactive');

    // trendingPreviewSeries.classList.add('inactive');
    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    likedMoviesSection.classList.add('inactive');
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');

    // ['#category', 'id-name'] con split separamos los elementos en un array cada vez qe hay un =
    const [_, categoryData] = location.hash.split('=');
    const [categoryId, categoryName] = categoryData.split('-');

    headerCategoryTitle.innerHTML = categoryName;

    getMoviesByCategory(categoryId);

    infinitScroll = getPaginatedMoviesByCategory(categoryId);
}
function homePage() {
    console.log('Home!!');

    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.add('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.remove('inactive');
    headerCategoryTitle.classList.add('inactive');
    searchForm.classList.remove('inactive');

    // trendingPreviewSeries.classList.remove('inactive');
    trendingPreviewSection.classList.remove('inactive');
    categoriesPreviewSection.classList.remove('inactive');
    likedMoviesSection.classList.remove('inactive');
    genericSection.classList.add('inactive');
    movieDetailSection.classList.add('inactive');
    
    getTrendingMoviesPreview();
    // getTrendingTvPreview()
    getCategoriesPreview();
    getLikedMovies();
}