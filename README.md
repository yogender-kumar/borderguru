# Borderguru API

Using `NodeJs`, `Express`, `ES6` as a tech stack.
`Babel` is used for `ES6` compiler

* [API Structure](#api-structure)
* [Guidelines](#guidelines)
* [Dependencies](#dependencies)
* [How do I get set up?](#how-to-setup)
* [API Documentation](#api-documentation)
* [Validations](#validations)
* [Assumptions](#assumptions)
* [TODO](#todo)

## API Directory Structure
```
+-- log
|   +-- *.log
+-- src
|   +-- constants
|       +-- index.js
|   +-- utils
|           +-- db
|               +-- index.js
|           +-- logger
|               +-- index.js
|   +-- routes
|       +-- route1.js
|   +-- controllers
|           +-- controller1.js
|   +-- app.js
|
```

## Guidelines
The API is [REST API](http://en.wikipedia.org/wiki/Representational_State_Transfer "RESTful"), result format for endpoints is JSON.

For API Versioning `/v1/` is used in the URL

## Dependencies

* Make sure Node 8+ is installed.
* Make sure MongoDB is installed.
* Make sure MongoDB is running on default port i.e. `:27017` on the machine.

## How do I get set up?

* Clone the [Repository](https://github.com/yogender-kumar/borderguru.git) and follow the steps

* Install dependencies
```
npm install
```
* Start server
```
npm run start
```

* Start server & watching files
```
npm run dev
```

API will be served at `http:localhost:3000/api/v1/...`

## API Documentation

For API's documentation [Swagger UI](https://swagger.io/tools/swagger-ui/) is used.

And can be accessed at `http://localhost:3000/api-docs/`

## Validations

Only `requird` AND `type check` validations are happening on most of the fields.

`Currency` validation & calcuation based on `currency` is not happening on price while getting total amout of the customer.

Order Creation: Validation happens on `customerId` and `addressId` from that customer.

Order Updation: `customerId` & `addressId` are being removed from payload to avoid updation on these 2 fields.

## Assumptions

For testing purpose `_id` field for `Order` & `Customer` is custom defined, to make it human readable.

Minimal `Customer` data is stored in the database from the JSON file (`faker/customer.json`) to make API's working.

Validations are covered but not edge cases scenarios. So playing with API's make sure passing the right data when required as `query param` or `payload`.

## TODO

* unit/integration test

