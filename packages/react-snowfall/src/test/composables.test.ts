import { describe, it, expect, vi, beforeEach } from 'vitest'
import { ref, nextTick } from 'vue'
import { useComponentSize, useSnowfallStyle, useDeepMemo } from '../composables'
import { snowfallBaseStyle } from '../config'

// Helper to create a mock component context for testing composables
function withSetup<T>(composable: () => T): { result: T; unmount: () => void } {
  let result: T
  let unmountCallbacks: (() => void)[] = []

  // Mock the Vue lifecycle hooks
  const onMountedCb: (() => void)[] = []
  const onUnmountedCb: (() => void)[] = []

  vi.doMock('vue', async (importOriginal) => {
    const vue = await importOriginal() as typeof import('vue')
    return {
      ...vue,
      onMounted: (cb: () => void) => { onMountedCb.push(cb) },
      onUnmounted: (cb: () => void) => { onUnmountedCb.push(cb) },
    }
  })

  result = composable()

  // Call mounted callbacks
  onMountedCb.forEach(cb => cb())

  const unmount = () => {
    onUnmountedCb.forEach(cb => cb())
    unmountCallbacks.forEach(cb => cb())
  }

  return { result, unmount }
}

describe('composables', () => {
  describe('useSnowfallStyle', () => {
    it('should return base styles when no overrides provided', () => {
      const overrides = ref(undefined)
      const result = useSnowfallStyle(overrides)

      expect(result.value).toEqual(snowfallBaseStyle)
    })

    it('should merge overrides with base styles', () => {
      const overrides = ref({ backgroundColor: 'blue', position: 'fixed' as const })
      const result = useSnowfallStyle(overrides)

      expect(result.value).toEqual({
        ...snowfallBaseStyle,
        ...overrides.value,
      })
    })

    it('should handle undefined overrides', () => {
      const overrides = ref(undefined)
      const result = useSnowfallStyle(overrides)

      expect(result.value).toEqual(snowfallBaseStyle)
    })

    it('should handle empty object overrides', () => {
      const overrides = ref({})
      const result = useSnowfallStyle(overrides)

      expect(result.value).toEqual(snowfallBaseStyle)
    })

    it('should override specific base styles', () => {
      const overrides = ref({ top: 50, left: 50 })
      const result = useSnowfallStyle(overrides)

      expect(result.value.top).toBe(50)
      expect(result.value.left).toBe(50)
      expect(result.value.position).toBe(snowfallBaseStyle.position)
    })

    it('should update reactively when overrides change', async () => {
      const overrides = ref({ backgroundColor: 'blue' })
      const result = useSnowfallStyle(overrides)

      expect(result.value.backgroundColor).toBe('blue')

      overrides.value = { backgroundColor: 'red' }
      await nextTick()

      expect(result.value.backgroundColor).toBe('red')
    })
  })

  describe('useDeepMemo', () => {
    it('should return the initial value', () => {
      const value = { foo: 'bar' }
      const result = useDeepMemo(() => value)

      expect(result.value).toEqual(value)
    })

    it('should handle primitive values', () => {
      const result = useDeepMemo(() => 42)
      expect(result.value).toBe(42)
    })

    it('should handle arrays', () => {
      const result = useDeepMemo(() => [1, 2, 3])
      expect(result.value).toEqual([1, 2, 3])
    })

    it('should handle nested objects', () => {
      const result = useDeepMemo(() => ({ nested: { deep: 'value' } }))
      expect(result.value).toEqual({ nested: { deep: 'value' } })
    })

    it('should handle null and undefined', () => {
      const nullResult = useDeepMemo(() => null)
      expect(nullResult.value).toBe(null)

      const undefinedResult = useDeepMemo(() => undefined)
      expect(undefinedResult.value).toBe(undefined)
    })

    it('should work with complex nested structures', () => {
      const complexValue = {
        users: [
          { id: 1, name: 'Alice', metadata: { role: 'admin' } },
          { id: 2, name: 'Bob', metadata: { role: 'user' } },
        ],
        settings: {
          theme: 'dark',
          notifications: { email: true, push: false },
        },
      }

      const result = useDeepMemo(() => complexValue)
      expect(result.value).toEqual(complexValue)
    })
  })

  describe('useComponentSize', () => {
    beforeEach(() => {
      vi.restoreAllMocks()
    })

    it('should return zero size for null ref', () => {
      const elementRef = ref<HTMLElement | null>(null)
      const result = useComponentSize(elementRef)

      expect(result.value).toEqual({ width: 0, height: 0 })
    })
  })
})
