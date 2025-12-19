import { CSSProperties } from 'vue';

export interface SnowfallProps {
    /**
     * The color of the snowflakes, can be any valid CSS color.
     */
    color?: string;
    /**
     * The minimum and maximum radius of the snowflakes, will be randomly selected within this range.
     */
    radius?: [number, number];
    /**
     * The minimum and maximum speed of the snowflakes, will be randomly selected within this range.
     */
    speed?: [number, number];
    /**
     * The minimum and maximum wind of the snowflakes, will be randomly selected within this range.
     */
    wind?: [number, number];
    /**
     * The frequency in frames that the wind and speed will change.
     */
    changeFrequency?: number;
    /**
     * The number of snowflakes to render.
     */
    snowflakeCount?: number;
    /**
     * An array of images to use as snowflakes.
     */
    images?: CanvasImageSource[];
    /**
     * The minimum and maximum rotation speed of the snowflakes, will be randomly selected within this range.
     */
    rotationSpeed?: [number, number];
    /**
     * The minimum and maximum opacity of the snowflakes (when using images), will be randomly selected within this range.
     */
    opacity?: [number, number];
    /**
     * Enable 3D rotation effect for snowflakes.
     */
    enable3DRotation?: boolean;
    /**
     * Any style properties that will be passed to the canvas element.
     */
    style?: CSSProperties;
}
declare const _default: import('vue').DefineComponent<import('vue').ExtractPropTypes<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<SnowfallProps>, {
    color: () => string;
    changeFrequency: () => number;
    radius: () => [number, number];
    speed: () => [number, number];
    wind: () => [number, number];
    rotationSpeed: () => [number, number];
    opacity: () => [number, number];
    snowflakeCount: number;
    images: undefined;
    enable3DRotation: boolean;
    style: undefined;
}>>, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<SnowfallProps>, {
    color: () => string;
    changeFrequency: () => number;
    radius: () => [number, number];
    speed: () => [number, number];
    wind: () => [number, number];
    rotationSpeed: () => [number, number];
    opacity: () => [number, number];
    snowflakeCount: number;
    images: undefined;
    enable3DRotation: boolean;
    style: undefined;
}>>> & Readonly<{}>, {
    color: string;
    radius: [number, number];
    speed: [number, number];
    wind: [number, number];
    changeFrequency: number;
    images: CanvasImageSource[];
    rotationSpeed: [number, number];
    opacity: [number, number];
    enable3DRotation: boolean;
    style: CSSProperties;
    snowflakeCount: number;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
export default _default;
type __VLS_NonUndefinedable<T> = T extends undefined ? never : T;
type __VLS_TypePropsToRuntimeProps<T> = {
    [K in keyof T]-?: {} extends Pick<T, K> ? {
        type: import('vue').PropType<__VLS_NonUndefinedable<T[K]>>;
    } : {
        type: import('vue').PropType<T[K]>;
        required: true;
    };
};
type __VLS_WithDefaults<P, D> = {
    [K in keyof Pick<P, keyof P>]: K extends keyof D ? __VLS_Prettify<P[K] & {
        default: D[K];
    }> : P[K];
};
type __VLS_Prettify<T> = {
    [K in keyof T]: T[K];
} & {};
