<script setup lang="ts">
import { ref, toRef, watch, onMounted, onUnmounted, type CSSProperties } from 'vue'
import { SnowfallCanvas, type SnowfallCanvasConfig } from './SnowfallCanvas.js'
import { defaultConfig } from './Snowflake.js'
import { useComponentSize, useDeepMemo, useSnowfallStyle } from './composables.js'

export interface SnowfallProps {
  /**
   * The color of the snowflakes, can be any valid CSS color.
   */
  color?: string
  /**
   * The minimum and maximum radius of the snowflakes, will be randomly selected within this range.
   */
  radius?: [number, number]
  /**
   * The minimum and maximum speed of the snowflakes, will be randomly selected within this range.
   */
  speed?: [number, number]
  /**
   * The minimum and maximum wind of the snowflakes, will be randomly selected within this range.
   */
  wind?: [number, number]
  /**
   * The frequency in frames that the wind and speed will change.
   */
  changeFrequency?: number
  /**
   * The number of snowflakes to render.
   */
  snowflakeCount?: number
  /**
   * An array of images to use as snowflakes.
   */
  images?: CanvasImageSource[]
  /**
   * The minimum and maximum rotation speed of the snowflakes, will be randomly selected within this range.
   */
  rotationSpeed?: [number, number]
  /**
   * The minimum and maximum opacity of the snowflakes (when using images), will be randomly selected within this range.
   */
  opacity?: [number, number]
  /**
   * Enable 3D rotation effect for snowflakes.
   */
  enable3DRotation?: boolean
  /**
   * Any style properties that will be passed to the canvas element.
   */
  style?: CSSProperties
}

const props = withDefaults(defineProps<SnowfallProps>(), {
  color: () => defaultConfig.color,
  changeFrequency: () => defaultConfig.changeFrequency,
  radius: () => defaultConfig.radius,
  speed: () => defaultConfig.speed,
  wind: () => defaultConfig.wind,
  rotationSpeed: () => defaultConfig.rotationSpeed,
  opacity: () => defaultConfig.opacity,
  snowflakeCount: 150,
  images: undefined,
  enable3DRotation: false,
  style: undefined,
})

const styleRef = toRef(props, 'style')
const mergedStyle = useSnowfallStyle(styleRef)

const canvasRef = ref<HTMLCanvasElement | null>(null)
const canvasSize = useComponentSize(canvasRef)

const config = useDeepMemo<SnowfallCanvasConfig>(() => ({
  color: props.color,
  changeFrequency: props.changeFrequency,
  radius: props.radius,
  speed: props.speed,
  wind: props.wind,
  rotationSpeed: props.rotationSpeed,
  images: props.images,
  snowflakeCount: props.snowflakeCount,
  opacity: props.opacity,
  enable3DRotation: props.enable3DRotation,
}))

let snowfallCanvas: SnowfallCanvas | undefined

onMounted(() => {
  if (canvasRef.value) {
    snowfallCanvas = new SnowfallCanvas(canvasRef.value, config.value)
  }
})

onUnmounted(() => {
  snowfallCanvas?.pause()
  snowfallCanvas = undefined
})

watch(
  config,
  (newConfig) => {
    if (snowfallCanvas) {
      snowfallCanvas.updateConfig(newConfig)
    }
  },
  { deep: true }
)
</script>

<template>
  <canvas
    ref="canvasRef"
    :height="canvasSize.height"
    :width="canvasSize.width"
    :style="mergedStyle"
    data-testid="SnowfallCanvas"
  />
</template>
