import mongoose from 'mongoose';

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.urlDB as string, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });
        console.log('Data base online!')
    }
    catch (error) {
        throw new Error('Error in the database!');
    }
}

export default dbConnection;