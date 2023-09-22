class SearchInput extends HTMLElement {
  constructor() {
    super();
    this.searchDom = this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  set clickEvent(event) {
    this._clickEvent = event;
    this.render();
  }

  get value() {
    return this.searchDom.querySelector(".input-keyword").value;
  }

  render() {
    this.searchDom.innerHTML = ` 
    <link
            href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
            rel="stylesheet"/>            
            <div class="row justify-content-center align-items-center">
                           <div class="col-md-8">
                <div class="input-group mb-3">
                    <input type="text" class="form-control input-keyword" placeholder="Film Kesukaan mu">
                    <div class="input-group-append">
                        <button class="btn btn-outline-primary search-button" type="button"
                        >Search
                        </button>
                    </div>
                </div>
            </div>
            </div>
            `;
    this.searchDom
      .querySelector(".search-button")
      .addEventListener("click", this._clickEvent);
  }
}

customElements.define("search-bar", SearchInput);
