import mongoose from 'mongoose';
import dbref from 'mongoose-dbref';
import { DB } from '../../constants'
import { logger } from '../logger';

export default (done) => (
    mongoose.connect(`${DB.PROTOCOL}${DB.DOMAIN}${DB.PORT}/${DB.DATABASE}`,
    (err, db) => done(err)),
    dbref.utils,
    dbref.install(mongoose)
);