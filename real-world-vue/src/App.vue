<script setup>
import { RouterLink, RouterView } from 'vue-router'
// import HelloWorld from './components/HelloWorld.vue'
// import EventCard from './components/EventCard.vue'
import { inject } from 'vue'

const GStore = inject('GStore')
</script>

<template>
  <header>
    <!-- <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" /> -->

    <div id="flashMessage" v-if="GStore.flashMessage">
      {{ GStore.flashMessage }}
    </div>
    <div class="wrapper">
      <nav>
        <RouterLink :to="{ name: 'EventList' }">Events</RouterLink>
        <RouterLink :to="{ name: 'About' }">About</RouterLink>
      </nav>
    </div>
  </header>

  <!-- <transition :name="$route.meta.transitionName" >
    <RouterView />
  </transition> -->
  <main>
    <RouterView v-slot="{ Component }">
      <transition :name="$route.meta.transitionName">
        <Component class="absolute" :is="Component" />
      </transition>
    </RouterView>
  </main>
</template>

<!-- <style scoped> -->
<style>
#app {
  overflow: hidden;
}

header {
  line-height: 1.5;
  max-height: 100vh;
  justify-content: center;
}

@keyframes yellowFade {
  from {
    background-color: hsla(160, 100%, 37%, 1);
  }
  to {
    background-color: transparent;
  }
}

#flashMessage {
  animation: yellowFade 3s;

  position: absolute;
  top: 20px;
  right: 0;
  left: 0;

  text-align: center;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  /* width: 100%; */
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    /* padding-right: calc(var(--section-gap) / 2); */
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    /* text-align: left; */
    /* margin-left: -1rem; */
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 0;
  }
}

main {
  min-width: calc(100vw / 2);
  position: relative;
  height: 80vh;
}

.events {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

h1 {
  margin: 20px 0;

  width: 100%;
  text-align: center;
}

h4 {
  font-size: 20px;
}

/* .slide-enter-active,
.slide-leave-active {
  transition: all 0.5s;
}
.slide-enter-from {
  transform: translateX(100px);
}
.slide-leave-to {
  transform: translateX(-100px);
} */

.absolute {
  position: absolute;
  left: 0;
  right: 0;
}

.leftToRight-enter-active,
.leftToRight-leave-active {
  transition: all 0.5s ease-out;
}

.leftToRight-enter-from {
  opacity: 0;
  transform: translateX(-100px);
}
.leftToRight-leave-to {
  opacity: 0;
  transform: translateX(100px);
}

.rightToLeft-enter-active,
.rightToLeft-leave-active {
  transition: all 0.5s;
}
.rightToLeft-enter-from {
  opacity: 0;
  transform: translateX(100px);
}
.rightToLeft-leave-to {
  opacity: 0;
  transform: translateX(-100px);
}
</style>
