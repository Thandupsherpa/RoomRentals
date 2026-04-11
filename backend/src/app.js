import express from 'express';
import authRouter from './routes/auth.routes.js';
import ownerRouter from './routes/owner.routes.js';


const app = express();

app.use(express.json());

app.use('/api/auth',authRouter)
app.use('/api/owner',ownerRouter);

export default app;