const API_LINK = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=8362ebbeab2621fe4a849694bde1f8cb&page=1";
const IMG_PATHH = "https://image.tmdb.org/t/p/w1280";
const SEARCH_API = "search/multi";

const agree = document.getElementById("agree");
const disagree = document.getElementById("disagree");
/// GENRE BUTTONS : 
const GENRE_BUTTON1 = document.createElement("button");
const GENRE_BUTTON2 = document.createElement("button");
const GENRE_BUTTON3 = document.createElement("button");
const GENRE_BUTTON4 = document.createElement("button");
const GENRE_BUTTON5 = document.createElement("button");
const genreButtons = [GENRE_BUTTON1, GENRE_BUTTON2, GENRE_BUTTON3, GENRE_BUTTON4, GENRE_BUTTON5];
/// TYPE BUTTONS :
const TYPE_BUTTON1 = document.createElement("button");
const TYPE_BUTTON2 = document.createElement("button");
/// OTHER NECESSARY VARIABLES TO DECLARE :
const main = document.getElementById("main");
const head = document.getElementById("header");
const desc = document.getElementById("description");
const next = document.createElement("button");
const cards = document.createElement("div");
next.classList.add('next');
const genreMapping = {
    'Action': 28,
    'Comedy': 35,
    'Crime': 80,
    'Drama': 18,
    'Historical': 36,
    'Romance': 10749,
    
   
  };
  



/// TO AGREE OR NOT TO AGREE :

agree.addEventListener('click',function(){
    agree.remove();
    disagree.remove();

    desc.innerHTML = "Pick a genre of the content you would like to watch today ! ";

    main.appendChild(GENRE_BUTTON1);
    GENRE_BUTTON1.innerHTML = "Action";
    main.appendChild(GENRE_BUTTON2);
    GENRE_BUTTON2.innerHTML="Drama";
    main.appendChild(GENRE_BUTTON3);
    GENRE_BUTTON3.innerHTML = "Crime";
    main.appendChild(GENRE_BUTTON4); 
    GENRE_BUTTON4.innerHTML="Historical";
    main.appendChild(GENRE_BUTTON5);
    GENRE_BUTTON5.innerHTML= "Romance";
    /// ADD THE NEXT BUTTON :
    main.appendChild(next);
    next.innerHTML="Next → ";

    let genreSelected = false;

    genreButtons.forEach((button) => {
    button.addEventListener('click', function () {
        if (!genreSelected) {
            selected_genre = genreMapping[button.innerHTML];
            console.log(selected_genre);
            genreSelected = true;
            next.style.display = "block"; // Display the next button after selecting a genre
        }
        });

    next.addEventListener('click', function(){

    if (genreSelected) {
        fetchMoviesByGenre(selected_genre);
        genreSelected = false; // Reset genreSelected for future selections
        next.style.display = "none"; // Hide the next button after fetching movies
    }
    });

});


});






disagree.addEventListener('click',function(){

    agree.remove();
    disagree.remove();
  
    desc.remove();
    const GOODBYE_MESSAGE = document.createElement("p");
    GOODBYE_MESSAGE.innerHTML = "Have fun looking for something to watch by yourself then :("
    main.appendChild(GOODBYE_MESSAGE);

});


/// FUNCTION TO FETCH THE NECESSARY DATA FROM THE URL API :
function fetchMoviesByGenre(selected_genre) {
    const API_URL = `${API_LINK}&with_genres=${selected_genre}`;

    fetch(API_URL)
        .then(res => res.json())
        .then((data) => {
           
            desc.remove();
            GENRE_BUTTON1.remove();
            GENRE_BUTTON2.remove();
            GENRE_BUTTON3.remove();
            GENRE_BUTTON4.remove();
            GENRE_BUTTON5.remove();
            console.log('success');
            const message = document.createElement('h2');
            main.appendChild(message);
            message.innerHTML="These are the shows we recommend (-_-)";

            const movies = data.results;
            movies.forEach(movie => {
                const card = document.createElement("div");
                const Picture = document.createElement("img");
                Picture.src = IMG_PATHH + movie.poster_path;
                const Title = document.createElement("p"); // Use "p" element for the title
                
                Title.innerHTML = `${movie.title}`;
                card.classList.add('movie-card');
                Picture.classList.add('movie-image');
                Title.classList.add('movie-title');
                cards.classList.add('cards')

                card.appendChild(Picture);
                card.appendChild(Title);
                cards.appendChild(card); // Append the card to the main container
                main.appendChild(cards);

                
               

            
            
            });
        })
        .catch((error) => {
            console.error('Error fetching movies:', error);
        });
}


