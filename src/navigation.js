window.addEventListener('DOMContentLoaded', navigator, false);
window.addEventListener('hashchange', navigator, false);

function navigator() {
    console.log({ location });

    if(location.hash.startsWith('#trends')) {
        trendsPage()
        getTrendingTvPreview()
    }else if(location.hash.startsWith('#search=')) {
        searchPage()
    }else if(location.hash.startsWith('#movie=')) {
        moviesDetailsPage()
        getTrendingMoviesPreview()
    }else if(location.hash.startsWith('#category=')){
        cetagoriesPage()
        getCategoriesPreview()
    }else{
        homePage()
        getTrendingMoviesPreview()
        getTrendingTvPreview()
        getCategoriesPreview()
    }
    location.hash
}

function trendsPage() {
    console.log('Trends!!');
}
function searchPage() {
    console.log('Search!!');
}
function moviesDetailsPage() {
    console.log('Movie!!');
}
function cetagoriesPage() {
    console.log('Categories!!');
}
function homePage() {
    console.log('Home!!');
}