<div class="bg-white outline navbar-light navbar-expand-lg px-3 px-lg-5">
  <nav id="top" class="navbar py-3">
    <div class="container-fluid p-0">
      <a class="navbar-brand text-dark fw-bolder p-0 me-lg-4"><img src="./media/logo_full.svg" class="nav-logo" alt="Translation tool logo"></a>

      <button class="navbar-toggler collapsed border-0" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
        <div class="animated-icon"><span></span><span></span><span></span><span></span></div>
      </button>

      <div class="collapse navbar-collapse gap-2" id="navbarText">
        <slot/>
      </div>
    </div>
  </nav>
  <slot name="authenticated"/>
</div>
