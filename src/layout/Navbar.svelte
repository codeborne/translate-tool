<div class="bg-white outline navbar-light navbar-expand-lg px-3 px-lg-5">
  <nav id="top" class="navbar py-3">
    <div class="container-fluid p-0">
      <a class="navbar-brand text-dark fw-bolder p-0 me-lg-4">Translation Tool <i class="fas fa-globe"></i></a>

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
