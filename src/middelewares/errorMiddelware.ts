import express from "express";

export default (
  error: any,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  console.error(error);
  res.status(500).json({ error });
};
