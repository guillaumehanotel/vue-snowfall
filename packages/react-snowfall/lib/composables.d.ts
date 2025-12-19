import { Ref, CSSProperties } from 'vue';

/**
 * Returns the height and width of a HTML element, uses the `ResizeObserver` api if available to detect changes to the
 * size. Falls back to listening for resize events on the window.
 * @param elementRef A ref to the HTML element to be measured
 */
export declare function useComponentSize(elementRef: Ref<HTMLElement | null>): Ref<{
    height: number;
    width: number;
}, {
    height: number;
    width: number;
} | {
    height: number;
    width: number;
}>;
/**
 * Utility composable that merges any provided styles with the default styles
 * @param overrides The style prop passed into the component
 */
export declare function useSnowfallStyle(overrides: Ref<CSSProperties | undefined>): import('vue').ComputedRef<CSSProperties>;
/**
 * Utility composable to stabilize a reference to a value, the returned value will always match the input value
 * but will maintain reference equality until a deep change is made.
 *
 * @example
 *
 * const config = useDeepMemo(() => ({ foo: 'bar', bar: 'baz' }))
 * // config.value stays referentially stable until actual values change
 */
export declare function useDeepMemo<T>(getValue: () => T): Ref<T>;
