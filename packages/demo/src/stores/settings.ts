import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { SnowfallProps } from 'vue-snowfall'

export interface SnowfallSettings extends SnowfallProps {
  useImages: boolean
}

export const useSettingsStore = defineStore('settings', () => {
  const color = ref('#dee4fd')
  const snowflakeCount = ref(200)
  const radius = ref<[number, number]>([0.5, 3.0])
  const speed = ref<[number, number]>([0.5, 3.0])
  const wind = ref<[number, number]>([-0.5, 2.0])
  const rotationSpeed = ref<[number, number]>([-1.0, 1.0])
  const opacity = ref<[number, number]>([0.1, 0.2])
  const useImages = ref(false)
  const enable3DRotation = ref(false)

  function update(changes: Partial<SnowfallProps>) {
    if (changes.color !== undefined) color.value = changes.color
    if (changes.snowflakeCount !== undefined) snowflakeCount.value = changes.snowflakeCount
    if (changes.radius !== undefined) radius.value = changes.radius
    if (changes.speed !== undefined) speed.value = changes.speed
    if (changes.wind !== undefined) wind.value = changes.wind
    if (changes.rotationSpeed !== undefined) rotationSpeed.value = changes.rotationSpeed
    if (changes.opacity !== undefined) opacity.value = changes.opacity
    if (changes.enable3DRotation !== undefined) enable3DRotation.value = changes.enable3DRotation
  }

  function setUseImages(value: boolean) {
    useImages.value = value
    if (value) {
      radius.value = [5, 20]
    } else {
      radius.value = [0.5, 3]
    }
  }

  return {
    color,
    snowflakeCount,
    radius,
    speed,
    wind,
    rotationSpeed,
    opacity,
    useImages,
    enable3DRotation,
    update,
    setUseImages,
  }
})
