import app from 'main';
import connectToDB from '@/config/db_config';

const port: string | number = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectToDB();
    app.listen(port, () => console.log("Server is running on port " + port));
  } catch (error) {
    console.error(error);
  }
};

start();