class AppBar extends HTMLElement {
    constructor() {
        super();
        this.seaDom = this.attachShadow({mode: 'open'});
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.seaDom.innerHTML =
            `
<!--<style>-->
<!--h1{-->
<!--padding: 16px;-->
<!--}-->
<!--</style>-->
<link
            href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
            rel="stylesheet"/>   
<div class="container">
    <div class="row mt-5">
        <div class="col">
            <h1>Movies Online</h1>
        </div>
    </div>
</div>
            `
    }
}

customElements.define("app-bar", AppBar);