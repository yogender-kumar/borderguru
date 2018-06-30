import express from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';
import path from 'path';
import db from './utils/db';

import { SERVER } from './constants';
import logger from './utils/logger';

const app = express();

// initialize middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/**
* Initialize Database connection
* On error exit process
* On success start the application
*/
db((err)=>{
    if(err){
        logger.error(err.message);
        process.exit(1);
    }else{
        logger.info('Connected to db');
        app.listen( SERVER.PORT, err => {
            if(err){
                logger.error(err.message);
                process.exit(1);
            }

            logger.info(`Start loading routes from "${SERVER.ROUTES_DIR}" directory`);
            fs.readdirSync(path.join(__dirname, SERVER.ROUTES_DIR)).map( file => {
                require('./' + SERVER.ROUTES_DIR + '/' + file)(app);
            });

            logger.info(`API's are running on port - ${SERVER.PORT}`);
        });
    }
});

