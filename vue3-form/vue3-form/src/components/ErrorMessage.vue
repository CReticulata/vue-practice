<script setup></script>
<template>
  <p class="error-message">
    <slot></slot>
  </p>
</template>

<style>
.error-message {
  color: red;

  margin-left: 90px;
}
</style>
