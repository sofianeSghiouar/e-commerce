import mongoose from 'mongoose';

const start = async () => {
  try {
    await mongoose
      .connect(process.env.DB_URL, {
        useNewUrlParser: true
      })
      .then(() => {
        console.log('database connected');
      });
  } catch (error) {
    throw new Error(error.message);
  }
};

export default start;
