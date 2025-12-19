<script setup lang="ts">
import { useSettingsStore } from '../stores/settings'

const settings = useSettingsStore()

const colors = [
  '#dee4fd',
  '#e91e63',
  '#9c27b0',
  '#673ab7',
  '#3f51b5',
  '#2196f3',
  '#03a9f4',
  '#00bcd4',
  '#009688',
  '#4caf50',
  '#8bc34a',
  '#cddc39',
  '#ffeb3b',
  '#ffc107',
  '#ff9800',
  '#ff5722',
  '#795548',
  '#607d8b'
]

function handleSpeedChange(event: Event) {
  const target = event.target as HTMLInputElement
  const value = parseFloat(target.value)
  const isMin = target.dataset.type === 'min'
  settings.update({
    speed: isMin ? [value, settings.speed[1]] : [settings.speed[0], value]
  })
}

function handleWindChange(event: Event) {
  const target = event.target as HTMLInputElement
  const value = parseFloat(target.value)
  const isMin = target.dataset.type === 'min'
  settings.update({
    wind: isMin ? [value, settings.wind[1]] : [settings.wind[0], value]
  })
}

function handleRadiusChange(event: Event) {
  const target = event.target as HTMLInputElement
  const value = parseFloat(target.value)
  const isMin = target.dataset.type === 'min'
  settings.update({
    radius: isMin ? [value, settings.radius[1]] : [settings.radius[0], value]
  })
}

function handleOpacityChange(event: Event) {
  const target = event.target as HTMLInputElement
  const value = parseFloat(target.value)
  const isMin = target.dataset.type === 'min'
  settings.update({
    opacity: isMin ? [value, settings.opacity[1]] : [settings.opacity[0], value]
  })
}

function handleRotationSpeedChange(event: Event) {
  const target = event.target as HTMLInputElement
  const value = parseFloat(target.value)
  const isMin = target.dataset.type === 'min'
  settings.update({
    rotationSpeed: isMin ? [value, settings.rotationSpeed[1]] : [settings.rotationSpeed[0], value]
  })
}
</script>

<template>
  <div class="settings-container">
    <div class="settings-group">
      <label class="settings-label">
        Snowflake Count
        <span class="value-chip">{{ settings.snowflakeCount }}</span>
      </label>
      <input
        type="range"
        class="settings-slider"
        :value="settings.snowflakeCount"
        min="0"
        max="750"
        step="1"
        @input="(e) => settings.update({ snowflakeCount: parseInt((e.target as HTMLInputElement).value) })"
      />
    </div>

    <div class="settings-group">
      <label class="settings-label">
        Speed
        <span class="value-chip">Min {{ settings.speed[0] }}</span>
        <span class="value-chip">Max {{ settings.speed[1] }}</span>
      </label>
      <div class="range-inputs">
        <input
          type="range"
          class="settings-slider"
          :value="settings.speed[0]"
          data-type="min"
          min="0"
          max="10"
          step="0.5"
          @input="handleSpeedChange"
        />
        <input
          type="range"
          class="settings-slider"
          :value="settings.speed[1]"
          data-type="max"
          min="0"
          max="10"
          step="0.5"
          @input="handleSpeedChange"
        />
      </div>
    </div>

    <div class="settings-group">
      <label class="settings-label">
        Wind
        <span class="value-chip">Min {{ settings.wind[0] }}</span>
        <span class="value-chip">Max {{ settings.wind[1] }}</span>
      </label>
      <div class="range-inputs">
        <input
          type="range"
          class="settings-slider"
          :value="settings.wind[0]"
          data-type="min"
          min="-1"
          max="10"
          step="0.5"
          @input="handleWindChange"
        />
        <input
          type="range"
          class="settings-slider"
          :value="settings.wind[1]"
          data-type="max"
          min="-1"
          max="10"
          step="0.5"
          @input="handleWindChange"
        />
      </div>
    </div>

    <div class="settings-group">
      <label class="settings-label">
        Radius
        <span class="value-chip">Min {{ settings.radius[0] }}</span>
        <span class="value-chip">Max {{ settings.radius[1] }}</span>
      </label>
      <div class="range-inputs">
        <input
          type="range"
          class="settings-slider"
          :value="settings.radius[0]"
          data-type="min"
          min="0.5"
          max="30"
          step="0.5"
          @input="handleRadiusChange"
        />
        <input
          type="range"
          class="settings-slider"
          :value="settings.radius[1]"
          data-type="max"
          min="0.5"
          max="30"
          step="0.5"
          @input="handleRadiusChange"
        />
      </div>
    </div>

    <div class="settings-group checkbox-group">
      <label class="checkbox-label">
        <input
          type="checkbox"
          :checked="settings.useImages"
          @change="(e) => settings.setUseImages((e.target as HTMLInputElement).checked)"
        />
        Use Images
      </label>
    </div>

    <div class="settings-group checkbox-group">
      <label class="checkbox-label">
        <input
          type="checkbox"
          :checked="settings.enable3DRotation"
          @change="(e) => settings.update({ enable3DRotation: (e.target as HTMLInputElement).checked })"
        />
        Enable 3D Rotation
      </label>
    </div>

    <template v-if="settings.useImages">
      <div class="settings-group">
        <label class="settings-label">
          Opacity
          <span class="value-chip">Min {{ settings.opacity[0] }}</span>
          <span class="value-chip">Max {{ settings.opacity[1] }}</span>
        </label>
        <div class="range-inputs">
          <input
            type="range"
            class="settings-slider"
            :value="settings.opacity[0]"
            data-type="min"
            min="0"
            max="1"
            step="0.1"
            @input="handleOpacityChange"
          />
          <input
            type="range"
            class="settings-slider"
            :value="settings.opacity[1]"
            data-type="max"
            min="0"
            max="1"
            step="0.1"
            @input="handleOpacityChange"
          />
        </div>
      </div>

      <div class="settings-group">
        <label class="settings-label">
          Rotation Speed
          <span class="value-chip">Min {{ settings.rotationSpeed[0] }}</span>
          <span class="value-chip">Max {{ settings.rotationSpeed[1] }}</span>
        </label>
        <div class="range-inputs">
          <input
            type="range"
            class="settings-slider"
            :value="settings.rotationSpeed[0]"
            data-type="min"
            min="-5"
            max="10"
            step="0.5"
            @input="handleRotationSpeedChange"
          />
          <input
            type="range"
            class="settings-slider"
            :value="settings.rotationSpeed[1]"
            data-type="max"
            min="-5"
            max="10"
            step="0.5"
            @input="handleRotationSpeedChange"
          />
        </div>
      </div>
    </template>

    <template v-else>
      <div class="settings-group">
        <label class="settings-label">
          Color
          <span class="value-chip">{{ settings.color }}</span>
        </label>
        <div class="color-picker">
          <button
            v-for="color in colors"
            :key="color"
            class="color-swatch"
            :class="{ active: settings.color === color }"
            :style="{ backgroundColor: color }"
            @click="settings.update({ color })"
          />
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped>
.settings-container {
  position: fixed;
  bottom: 20px;
  left: 20px;
  background: rgba(30, 30, 30, 0.9);
  padding: 20px;
  border-radius: 12px;
  min-width: 300px;
  max-width: 350px;
  color: white;
  z-index: 1000;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

.settings-group {
  margin-bottom: 16px;
}

.settings-label {
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.87);
}

.value-chip {
  display: inline-block;
  background: rgba(33, 150, 243, 0.87);
  padding: 2px 8px;
  border-radius: 16px;
  font-size: 12px;
  margin-left: 8px;
}

.settings-slider {
  width: 100%;
  height: 4px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 2px;
  outline: none;
  cursor: pointer;
  -webkit-appearance: none;
}

.settings-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 16px;
  height: 16px;
  background: #2196f3;
  border-radius: 50%;
  cursor: pointer;
}

.settings-slider::-moz-range-thumb {
  width: 16px;
  height: 16px;
  background: #2196f3;
  border-radius: 50%;
  cursor: pointer;
  border: none;
}

.range-inputs {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.checkbox-group {
  margin-bottom: 12px;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-size: 14px;
}

.checkbox-label input {
  width: 18px;
  height: 18px;
  cursor: pointer;
}

.color-picker {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 8px;
}

.color-swatch {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 2px solid transparent;
  cursor: pointer;
  transition: transform 0.2s, border-color 0.2s;
}

.color-swatch:hover {
  transform: scale(1.1);
}

.color-swatch.active {
  border-color: white;
  transform: scale(1.1);
}
</style>
