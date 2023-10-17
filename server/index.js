import express from 'express';
import bodyParser from 'body-parser';
import  cors from 'cors';
import mongoose from 'mongoose';
import dotenv  from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import orderRoutes from './routes/order.js'
import generalRoutes from './routes/general.js'
import productRoutes from './routes/product.js'
import userRoutes from './routes/user.js'




/* CONFIGURATION */
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

/* ROUTES */
app.use("/orders", orderRoutes);
app.use("/general", generalRoutes);
app.use("/product", productRoutes);
app.use("/user", userRoutes);


/* MONGOOSE SETUP */
const PORT = process.env.PORT || 9000;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

    /* ONLY ADD DATA ONE TIME */
    // AffiliateStat.insertMany(dataAffiliateStat);
    // OverallStat.insertMany(dataOverallStat);
    // Product.insertMany(dataProduct);
    // ProductStat.insertMany(dataProductStat);
    // Transaction.insertMany(dataTransaction);
    // User.insertMany(dataUser);
  })
  .catch((error) => console.log(`${error} did not connect`));