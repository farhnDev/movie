class SearchInput extends HTMLElement {
    constructor() {
        super();
        this.searchDom = this.attachShadow({mode: 'open'});
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.searchDom.innerHTML =
            ` 
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
            `
    }
}

customElements.define("search-bar", SearchInput);