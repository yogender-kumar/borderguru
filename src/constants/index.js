export const SERVER = {
    PORT: 3000,
    ROUTES_DIR: 'routes'
}

export const DB = {
    PROTOCOL: "mongodb://",
    DOMAIN: "localhost",
    PORT: ":27017",
    DATABASE: "/borderGuru"
}

export const LOGGER = {
    DEFAULT_LEVEL: 'debut',
    ERROR_LEVEL: 'error',
    COLORS: {
        error: 'red',
        warn: 'amber',
        info: 'blue',
        verbose: 'magenta',
        debug: 'yellow',
        silly: 'green'
    },
    LEVEL: { 
        error: 0, 
        warn: 1, 
        info: 2, 
        verbose: 3, 
        debug: 4, 
        silly: 5 
      }
}