import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';

// Tarefas em memória
let tasks: { id: number, title: string }[] = [];
let nextId = 1;

// Obter todas as tarefas
export const getTasks = (req: Request, res: Response) => {
    res.json(tasks);
};

// Criar uma nova tarefa
export const createTask = [
  // Validação
  body('title').notEmpty().withMessage('Título é obrigatório'),

  // Controlador
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title } = req.body;
    const newTask = { id: nextId++, title };
    tasks.push(newTask);
    res.status(201).json(newTask);
  }
];

// Atualizar uma tarefa existente
export const updateTask = [
  // Validação
  body('title').notEmpty().withMessage('Título é obrigatório'),

  // Controlador
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const { title } = req.body;
    const task = tasks.find(task => task.id === parseInt(id));
    if (!task) {
      return res.status(404).json({ error: 'Tarefa não encontrada' });
    }

    task.title = title;
    res.json(task);
  }
];

// Deletar uma tarefa
export const deleteTask = (req: Request, res: Response) => {
    const { id } = req.params;
    tasks = tasks.filter(task => task.id !== parseInt(id));
    res.status(204).end();
};

