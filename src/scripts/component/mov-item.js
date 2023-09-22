class MovItem extends HTMLElement {
  constructor() {
    super();
    this.movDom = this.attachShadow({ mode: "open" });
  }

  set movie(movie) {
    this._movie = movie;
    this.render();
  }

  render() {
    if (this._movie) {
      this.movDom.innerHTML = `
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
          rel="stylesheet"/>
        <div class="col-md-4 my-3">
          <div class="card">
            <img src="${this._movie.Poster}" class="card-img-top custom-img" alt="">
            <div class="card-body">
              <h5 class="card-title">${this._movie.Title}</h5>
              <h6 class="card-subtitle mb-2 text-muted">${this._movie.Year}</h6>
              <a href="#" class="btn btn-primary modal-detail" data-bs-toggle="modal"
                data-bs-target="#movieModal" data-imdbid="${this._movie.imdbID}">To Details</a>
            </div>
          </div>
        </div>
      `;

      const modalDetailButton = this.movDom.querySelector(".modal-detail");
      if (modalDetailButton) {
        modalDetailButton.addEventListener(
          "click",
          this.handleButtonClick.bind(this),
        );
      }
    }
  }

  handleButtonClick(e) {
    e.preventDefault();
    if (e.target.classList.contains("modal-detail")) {
      const moveId = e.target.dataset.imdbid;
      this.getMovieDetail(moveId).then((movieDetail) => {
        this.updateDetail(movieDetail);
      });
    }
  }
  //
  getMovieDetail(moveId) {
    return fetch("https://www.omdbapi.com/?apikey=487a600d&i=" + moveId)
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then((movieDetail) => {
        if (movieDetail.Response === "False") {
          throw new Error(movieDetail.Error);
        }
        return movieDetail;
      });
  }

  //   //
  updateDetail(movieDetail) {
    const modal = document.querySelector("#movieModal");
    const modalTitle = document.querySelector(".modal-title");
    const modalBody = document.querySelector(".modal-body");

    modalTitle.textContent = `${movieDetail.Title} (${movieDetail.Year})`;
    modalBody.innerHTML = `
        <div class="container-fluid">
          <div class="row">
            <div class="col-md-3">
              <img src="${movieDetail.Poster}" style="border-radius: 9px" alt="" class="img-fluid">
            </div>
            <div class="col-md">
              <ul class="list-group">
                <li class="list-group-item"><h4>${movieDetail.Title}</h4></li>
                <li class="list-group-item"><strong>Director : </strong> ${movieDetail.Director}</li>
                <li class="list-group-item"><strong>Actor : </strong> ${movieDetail.Actors}</li>
                <li class="list-group-item"><strong>Writer :</strong> ${movieDetail.Writer}</li>
                <li class="list-group-item"><strong>Release :</strong> ${movieDetail.Released}</li>
                <li class="list-group-item"><strong>Plot :</strong> ${movieDetail.Plot}</li>
              </ul>
            </div>
          </div>
        </div>
      `;
    const modalInstance = new bootstrap.Modal(modal);
    modalInstance.show();
  }
}

customElements.define("movie-item", MovItem);
