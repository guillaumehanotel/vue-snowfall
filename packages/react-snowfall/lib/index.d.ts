import { ComponentOptionsMixin } from 'vue';
import { ComponentProvideOptions } from 'vue';
import { CSSProperties } from 'vue';
import { DefineComponent } from 'vue';
import { ExtractPropTypes } from 'vue';
import { PropType } from 'vue';
import { PublicProps } from 'vue';

declare type __VLS_NonUndefinedable<T> = T extends undefined ? never : T;

declare type __VLS_Prettify<T> = {
    [K in keyof T]: T[K];
} & {};

declare type __VLS_TypePropsToRuntimeProps<T> = {
    [K in keyof T]-?: {} extends Pick<T, K> ? {
        type: PropType<__VLS_NonUndefinedable<T[K]>>;
    } : {
        type: PropType<T[K]>;
        required: true;
    };
};

declare type __VLS_WithDefaults<P, D> = {
    [K in keyof Pick<P, keyof P>]: K extends keyof D ? __VLS_Prettify<P[K] & {
        default: D[K];
    }> : P[K];
};

declare const _default: DefineComponent<ExtractPropTypes<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<SnowfallProps>, {
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
}>>, {}, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {}, string, PublicProps, Readonly<ExtractPropTypes<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<SnowfallProps>, {
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
}, {}, {}, {}, string, ComponentProvideOptions, true, {}, any>;
export { _default as Snowfall }
export default _default;

export declare class SnowfallCanvas {
    #private;
    private lastUpdate;
    private snowflakes;
    private config;
    get ctx(): CanvasRenderingContext2D | null;
    get canvas(): HTMLCanvasElement;
    set canvas(canvas: HTMLCanvasElement);
    constructor(canvas: HTMLCanvasElement, config: Partial<SnowfallCanvasConfig>);
    /**
     * Updates the config used for the snowfall animation, if the number of snowflakes
     * has changed then this will create new or remove existing snowflakes gracefully
     * to retain the position of as many existing snowflakes as possible.
     */
    updateConfig(config: Partial<SnowfallCanvasConfig>): void;
    /**
     * Updates the location of each snowflake based on the number of frames passed then
     * clears the canvas and draws each snowflake.
     */
    private render;
    private animationFrame;
    /**
     * The animation loop, will calculate the time since the last render and update
     * the position of the snowflakes appropriately before queueing another frame.
     */
    private loop;
    /** Start the animation playing. */
    play(): void;
    /** Pause the animation. */
    pause(): void;
}

export declare interface SnowfallCanvasConfig extends SnowflakeConfig {
    /**
     * The number of snowflakes to be rendered.
     *
     * The default value is 150.
     */
    snowflakeCount: number;
}

export declare interface SnowfallProps {
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

declare type SnowflakeConfig = Partial<SnowflakeProps>;

declare interface SnowflakeProps {
    /** The color of the snowflake, can be any valid CSS color. */
    color: string;
    /**
     * The minimum and maximum radius of the snowflake, will be
     * randomly selected within this range.
     *
     * The default value is `[0.5, 3.0]`.
     */
    radius: [number, number];
    /**
     * The minimum and maximum speed of the snowflake.
     *
     * The speed determines how quickly the snowflake moves
     * along the y axis (vertical speed).
     *
     * The values will be randomly selected within this range.
     *
     * The default value is `[1.0, 3.0]`.
     */
    speed: [number, number];
    /**
     * The minimum and maximum wind of the snowflake.
     *
     * The wind determines how quickly the snowflake moves
     * along the x axis (horizontal speed).
     *
     * The values will be randomly selected within this range.
     *
     * The default value is `[-0.5, 2.0]`.
     */
    wind: [number, number];
    /**
     * The frequency in frames that the wind and speed values
     * will update.
     *
     * The default value is 200.
     */
    changeFrequency: number;
    /**
     * An array of images that will be rendered as the snowflakes instead
     * of the default circle shapes.
     */
    images?: CanvasImageSource[];
    /**
     * The minimum and maximum rotation speed of the snowflake (in degrees of
     * rotation per frame).
     *
     * The rotation speed determines how quickly the snowflake rotates when
     * an image is being rendered.
     *
     * The values will be randomly selected within this range.
     *
     * The default value is `[-1.0, 1.0]`.
     */
    rotationSpeed: [number, number];
    /**
     * The minimum and maximum opacity of the snowflake image.
     *
     * This value only applies to snowflakes that are using images.
     *
     * The values will be randomly selected within this range.
     *
     * The default value is `[1, 1]`.
     */
    opacity: [number, number];
    /**
     * Enable 3D rotation effect (like falling leaves).
     *
     * When enabled, snowflakes will rotate on X and Y axes in addition to Z axis,
     * creating a more realistic 3D tumbling effect.
     *
     * The default value is `false`.
     */
    enable3DRotation?: boolean;
}

export { }
