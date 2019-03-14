import { Request, Response } from 'express';
import { renderApp } from 'server/renderApp';

export function requestHandler(req: Request, res: Response) {
  res.send(renderApp(req, {}));
}