import mongoose, { ConnectOptions } from 'mongoose';
const MONGODB_URI = process.env.MONGO_URL || 'mongodb+srv://khasogi27:rahasia@auth.cgyekj8.mongodb.net/?retryWrites=true&w=majority';
// const MONGODB_URI = process.env.MONGO_URL || 'mongodb://localhost:27017';

const connectToDB = async (): Promise<any> => {
  const options: ConnectOptions = {
    // useNewUrlParser: true,
    // useUnifiedTopology: 
    // useNewUrlParser: true,
  };

  try {
    const { connection } = await mongoose.connect(MONGODB_URI, options);

    if (connection.readyState === 1) {
      console.log('Connected to MongoDB');
      return Promise.resolve(true);
    }
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    return Promise.reject(false);
  }
}

export default connectToDB;