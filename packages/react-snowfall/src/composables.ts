import { ref, computed, watch, onMounted, onUnmounted, type Ref, type CSSProperties } from 'vue'
import isEqual from 'fast-deep-equal'
import { snowfallBaseStyle } from './config.js'
import { getSize } from './utils.js'

/**
 * Returns the height and width of a HTML element, uses the `ResizeObserver` api if available to detect changes to the
 * size. Falls back to listening for resize events on the window.
 * @param elementRef A ref to the HTML element to be measured
 */
export function useComponentSize(elementRef: Ref<HTMLElement | null>) {
  const size = ref(getSize(elementRef.value))

  const resizeHandler = () => {
    if (elementRef.value) {
      size.value = getSize(elementRef.value)
    }
  }

  let resizeObserver: ResizeObserver | null = null

  onMounted(() => {
    if (!elementRef.value) return
    resizeHandler()

    if (typeof ResizeObserver === 'function') {
      resizeObserver = new ResizeObserver(resizeHandler)
      resizeObserver.observe(elementRef.value)
    } else {
      window.addEventListener('resize', resizeHandler)
    }
  })

  onUnmounted(() => {
    if (resizeObserver) {
      resizeObserver.disconnect()
    } else {
      window.removeEventListener('resize', resizeHandler)
    }
  })

  return size
}

/**
 * Utility composable that merges any provided styles with the default styles
 * @param overrides The style prop passed into the component
 */
export function useSnowfallStyle(overrides: Ref<CSSProperties | undefined>) {
  return computed<CSSProperties>(() => ({
    ...snowfallBaseStyle,
    ...(overrides.value || {}),
  }))
}

/**
 * Utility composable to stabilize a reference to a value, the returned value will always match the input value
 * but will maintain reference equality until a deep change is made.
 *
 * @example
 *
 * const config = useDeepMemo(() => ({ foo: 'bar', bar: 'baz' }))
 * // config.value stays referentially stable until actual values change
 */
export function useDeepMemo<T>(getValue: () => T): Ref<T> {
  const state = ref(getValue()) as Ref<T>

  watch(
    getValue,
    (newValue) => {
      if (!isEqual(newValue, state.value)) {
        state.value = newValue
      }
    },
    { deep: true }
  )

  return state
}
