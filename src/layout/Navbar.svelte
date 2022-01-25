<div class="bg-white outline navbar-light navbar-expand-lg px-3">
  <nav id="top" class="navbar">
    <div class="container-fluid p-0">
      <a class="navbar-brand text-dark"><h3>Translation Tool <i class="fas fa-globe"></i></h3></a>

      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse gap-2" id="navbarText">
        <slot/>
      </div>
    </div>
  </nav>
  <slot name="authenticated"/>
</div>
