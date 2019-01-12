import { Request, Response } from 'express';
import { renderShowcase } from 'ssr/renderShowcase';

export function requestHandler(req: Request, res: Response) {
  res.send(renderShowcase(req));
}