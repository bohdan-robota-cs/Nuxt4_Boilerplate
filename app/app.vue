<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtLoadingIndicator />
    <NuxtPage />
    <ClientOnly>
      <Toaster rich-colors position="top-right" close-button />
    </ClientOnly>
  </div>
</template>
<script setup lang="ts"></script>
