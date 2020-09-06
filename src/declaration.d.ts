declare module '*.svg';
declare module '*.png';
declare module '*.jpg';
declare const VERSION: string;

declare module '*.scss' {
    const content: { [className: string]: string };
    export = content;
}

interface Window {
    store: {
        getState: () => any;
    };
    VERSION: any;
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: never;
}
