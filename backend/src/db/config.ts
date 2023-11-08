import mongoose from "mongoose";

export async function createConnection(): Promise<void>{
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/toyxona-app');
        console.log('connection is established successfully');
    } catch(error: any) {
        console.log(error.message);    
    }
}