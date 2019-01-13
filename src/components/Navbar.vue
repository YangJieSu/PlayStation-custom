<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
      <i class="fas fa-heart pr-1"></i>
      <router-link class="navbar-brand" to="/">六角購物網</router-link>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav pl-4">
          <li class="nav-item active">
            <router-link class="nav-link" to="/">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/">FAQ</router-link>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
  export default {
    data() {
      return {};
    },
  };
</script>