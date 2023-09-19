import '../components/search-input.js';
const main = () => {
    const searchButton = document.querySelector('search-bar');
    searchButton.addEventListener('click', async function () {
        const inputKeyword = searchButton.shadowRoot.querySelector('.input-keyword');
        const movies = await getMovies(inputKeyword.value);
        updateMovie(movies);
    });
//eventbindng
    document.addEventListener('click', async function (e) {
        if (e.target.classList.contains('modal-detail')) {
            const moveId = e.target.dataset.imdbid;
            const movieDetail = await getMovieDetail(moveId);
            updateDetail(movieDetail);
        }
    });

    function getMovieDetail(moveId) {
        return fetch('https://www.omdbapi.com/?apikey=487a600d&i=' + moveId)
            .then(response => response.json())
            .then(m => m);
    }

    function updateDetail(m) {
        const movieDetail = showDetail(m);
        const modalBody = document.querySelector('.modal-body');
        modalBody.innerHTML = movieDetail;
    }

    function getMovies(keyword) {
        return fetch('https://www.omdbapi.com/?apikey=487a600d&s=' + keyword)
            .then(response => response.json())
            .then(response => response.Search);
    }

    function updateMovie(movies) {
            let cards = '';
            movies.forEach(m => cards += showCards(m));
            const movieElement = document.querySelector('.movie-container');
            movieElement.innerHTML = cards;
        }


    function showCards(m) {
        return `<div class="col-md-4 my-3">
          <div class="card">
            <img src="${m.Poster}" class="card-img-top" alt="">
            <div class="card-body">
              <h5 class="card-title">${m.Title}</h5>
              <h6 class="card-subtitle mb-2 text-muted">${m.Year}</h6>
              <a href="#" class="btn btn-primary modal-detail" data-bs-toggle="modal"
              data-bs-target="#movieModal" data-imdbid="${m.imdbID}">To Details</a>
            </div>
          </div>
        </div>`;
    }

    function showDetail(m) {
        return `
     <div class="container-fluid">
                    <div class="row">
                        <div class="col-md-3">
                            <img src="${m.Poster}" alt="" class="img-fluid">
                        </div>
                        <div class="col-md">
                            <ul class="list-group">
                                <li class="list-group-item"><h4>${m.Title}(${m.Year})</h4></li>
                                <li class="list-group-item"><strong>Director : </strong> ${m.Director}</li>
                                <li class="list-group-item"><strong>Actor : </strong> ${m.Actors}</li>
                                <li class="list-group-item"><strong>Writer :</strong> ${m.Writer}</li>
                                <li class="list-group-item"><strong>Plot :</strong> ${m.Plot}</li>
                            </ul>
                        </div>
                    </div>
                </div>
    `;
    }
};
export default main;
