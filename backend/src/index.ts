import express from 'express';
import ideasRouter from './routes/ideas.routes';
const app = express();
app.use(express.json());

app.listen(3002, () => {
  console.log(`🚀 Server running on Port:${3002}`);
});

app.use('/ideas', ideasRouter);

export default app;
