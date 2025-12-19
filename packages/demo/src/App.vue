<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Snowfall from 'vue-snowfall/src/Snowfall.vue'
import GithubLink from './components/GithubLink.vue'
import Settings from './components/Settings.vue'
import { useSettingsStore } from './stores/settings'
import logo from './logo.png'

const githubURL = import.meta.env.VITE_GITHUB_URL
const packageName = import.meta.env.VITE_PACKAGE_NAME

const settings = useSettingsStore()

const snowflakeImage = ref<HTMLImageElement | null>(null)
const images = ref<CanvasImageSource[]>([])

onMounted(() => {
  const img = new Image()
  img.src = logo
  img.onload = () => {
    snowflakeImage.value = img
    images.value = [img]
  }
})
</script>

<template>
  <div class="app">
    <Snowfall
      :color="settings.color"
      :snowflake-count="settings.snowflakeCount"
      :radius="settings.radius"
      :speed="settings.speed"
      :wind="settings.wind"
      :images="settings.useImages ? images : undefined"
      :opacity="settings.opacity"
      :enable3-d-rotation="settings.enable3DRotation"
    />
    <a class="title" :href="githubURL" :style="{ color: settings.color }">
      <img :src="logo" alt="Snowflake Logo" />
      <h1>{{ packageName }}</h1>
    </a>
    <Settings />
    <GithubLink :url="githubURL" />
  </div>
</template>

<style>
@import './App.css';
</style>
