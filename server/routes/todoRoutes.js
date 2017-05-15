import express from 'express';

const todoRouter = express.Router();

todoRouter.route('/')
  .get((req, res) => {
    res.status(200).send("{ message: 'Welcome to Worklist API' }");
  });

export default todoRouter;
