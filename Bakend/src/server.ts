import express from 'express';
import bodyParser from 'body-parser';
import { getTasks, createTask, updateTask, deleteTask } from './taskController';

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// Rotas
app.get('/tasks', getTasks);
app.post('/tasks', createTask);
app.put('/tasks/:id', updateTask);
app.delete('/tasks/:id', deleteTask);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
