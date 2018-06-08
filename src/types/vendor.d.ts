declare var DEBUG: boolean;

interface Window {
    __REDUX_DEVTOOLS_EXTENSION__: any;
}

declare namespace JSX {
    interface IntrinsicAttributes {
      store?: any;
    }
}