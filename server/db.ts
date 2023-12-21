import mongoose from 'mongoose';

//const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/observatorio';
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://dashboard-ir:vd5GZZdQmlwM0jzH@dashboard-ir.lagsuyl.mongodb.net/observatorio-test?authSource=admin&replicaSet=atlas-t99i3w-shard-0&readPreference=primary&ssl=true';
let isConnected: boolean;

const connectDb = async (): Promise<void> => {
    if (isConnected) {
        console.log('Using existing MongoDB connection');
        return;
    }
    try {
        await mongoose.connect(MONGODB_URI);
        isConnected = true;
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:');
        throw error;
    }
};

const disconnectDb = async (): Promise<void> => {
    if (!isConnected) {
        return;
    }
    try {
        await mongoose.disconnect();
        isConnected = false;
        console.log('Disconnected from MongoDB');
    } catch (error) {
        console.error('Error disconnecting from MongoDB:');
        throw error;
    }
};

const newDisconnectDb = async (): Promise<void> => {
    return ;
    if (!isConnected) {
        return;
    }
    try {
        await mongoose.disconnect();
        isConnected = false;
        console.log('Disconnected from MongoDB');
    } catch (error) {
        console.error('Error disconnecting from MongoDB:');
        throw error;
    }
};

export { connectDb, disconnectDb };
