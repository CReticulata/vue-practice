<template>
  <div class="network-error">
    <h1>Uh-Oh!</h1>

    <h3>
      It looks like you're experiencing some network issues, please take a breath and
      <a href="#" @click="$router.go(-1)">click here</a> to try again.
    </h3>
  </div>
</template>

<style>
.network-error {
  text-align: center;
}

@media (min-width: 1024px) {
  .network-error {
    min-height: 80vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-width: calc(100vw / 2);
  }
}
</style>
