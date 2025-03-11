<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
  <header>
    <nav class="nav">
      <RouterLink activeClass="nav__link_active" class="nav__link" to="/">Progress Bar</RouterLink>
      <RouterLink activeClass="nav__link_active" class="nav__link" to="/diagram"
        >Diagram</RouterLink
      >
    </nav>
  </header>

  <RouterView />
</template>

<style scoped>
.nav {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 50px;
}

.nav__link {
  display: inline-flex;
  padding: 5px;
  border: none;
  border-radius: 5px;
  text-transform: uppercase;
  color: #00487d;
  font-size: 20px;
  font-weight: 700;
  text-decoration: none;
}

.nav__link_active {
  text-decoration: underline;
  text-underline-offset: 2px;
}
</style>
