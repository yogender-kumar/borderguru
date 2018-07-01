import express from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';
import path from 'path';
import swaggerUi from 'swagger-ui-express';
import db from './utils/db';

import { SERVER } from './constants';
import logger from './utils/logger';
const swaggerDocument = require('../swagger.json');

const app = express();

// initialize middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Swager middleware for API documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

/**
* Initialize Database connection
* On error exit process
* On success start the application
*/
db((err)=>{

    if(err){
        logger.error(`[app] DB connect error: ${err.message}`);
        
        process.exit(1);
    }else{
        logger.debug('[app] Connected to db');

        let server = app.listen( SERVER.PORT, err => {

            if(err){
                logger.error(`[app] app start error: ${err.message}`);
                process.exit(1);
            }
            
            logger.debug(`[app] Start loading routes from "${SERVER.ROUTES_DIR}" directory`);
            fs.readdirSync(path.join(__dirname,SERVER.ROUTES_DIR))
            .map( file => {
                app.use(
                    SERVER.API_PATH_PREFIX,
                    require('./' + SERVER.ROUTES_DIR + '/' + file)
                );
            });
            
            logger.info(`API's are running on  - ${server.address().address}${SERVER.PORT}${SERVER.API_PATH_PREFIX}`);
        });

    }

});

