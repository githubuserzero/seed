import { Request, Response } from 'express';
import { renderApp } from 'ssr/renderApp';

export function requestHandler(req: Request, res: Response) {
  res.send(renderApp(req, {}));
}