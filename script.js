const APILINK = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=c8c519bd0d0baf45eb026e4be9d0599c&page=1';
const IMG_PATH = 'https://image.tmdb.org/t/p/w500';
const SEARCHAPI='https://api.themoviedb.org/3/search/movie?&api_key=c8c519bd0d0baf45eb026e4be9d0599c&query=';


const main = document.getElementById('section');
const form = document.getElementById('form');
const search = document.getElementById('query');
const loadMoreBtn = document.getElementById('loadMore');

let currentPage = 1;       
let currentURL = APILINK;   

returnMovies(APILINK);

function returnMovies(url){
    fetch(url)
        .then(res => res.json())
        .then(function(data){
        console.log(data.results);
        data.results.forEach(elements => {
            const div_card = document.createElement('div');
            div_card.setAttribute('class', 'card');
            
            const image = document.createElement('img');
            image.setAttribute('class', 'thumbnail');
            image.setAttribute('id', 'image');
            
            const title = document.createElement('h3');
            title.setAttribute('id', 'title');
            
            const center=document.createElement('center');

            title.innerHTML=`${elements.title}`;
            image.src=IMG_PATH+elements.poster_path;
            image.onerror = () => image.src = 'https://raw.githubusercontent.com/kushwaha-aryan/storage/refs/heads/main/mohamed_hassan-cinema-4153289_1920.jpg';

            center.appendChild(image);
            div_card.appendChild(center);
            div_card.appendChild(title);

            main.appendChild(div_card);
        });
    });
}

loadMoreBtn.addEventListener('click', () => {
    currentPage++;
    const nextURL = currentURL.replace(/&page=\d+/, `&page=${currentPage}`);
    currentURL = nextURL;
    returnMovies(nextURL);
});

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    main.innerHTML = '';
    currentPage = 1;
    const searchItem=search.value;
    
    if(searchItem){
        currentURL = SEARCHAPI + searchItem + `&page=1`;
        returnMovies(currentURL);
        search.value="";
    }
})
