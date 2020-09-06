declare module '*.svg';
declare module '*.png';
declare module '*.jpg';
declare var VERSION: string;

declare module '*.module.sass' {
    const classes: { [key: string]: string };
    export default classes;
}

interface Window {
    store: {
        getState: () => object;
    };
    VERSION: any;
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: never;
}