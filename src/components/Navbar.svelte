<nav id="top" class="navbar navbar-expand-lg navbar-light bg-white outline">
  <div class="container-fluid">
    <a class="navbar-brand text-dark" href="#"><h3>Translation Tool <i class="fas fa-globe"></i></h3></a>

    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarText">
      <slot/>
    </div>
  </div>
</nav>

<style>
  .outline {
    border-bottom: 1px solid lightgray;
  }
  .btn-outline-secondary {
    border: 1px solid lightgray;
  }
  .nav-link.active {
    border-bottom: 3px solid dodgerblue;
  }
</style>