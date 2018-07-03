export const SERVER = {
    PORT: 3000,
    ROUTES_DIR: 'routes',
    API_PATH_PREFIX: '/api'
}

export const DB = {
    PROTOCOL: "mongodb://",
    DOMAIN: "localhost",
    PORT: ":27017",
    DATABASE: "borderGuru",
    COLLECTIONS: {
        ORDER: "orders",
        CUSTOMER: "customers"
    }
}

export const LOGGER = {
    DEFAULT_LEVEL: 'silly',
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

export const EXPOSED_NODE = {
    ORDER: '_id customerId addressId itemName price currency',
    CUSTOMER: '_id customerName customerAddress',
    ADDRESS: '_id address'
}