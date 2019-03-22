import { Request, Response } from 'express';
import { renderApp } from 'server/renderApp';

export function requestHandler(req: Request, res: Response) {
  res.send(renderApp(req, {
    sample: {
      testString: 'SERVER SIDE RENDERING INITIAL STATE',
    },
  }));
}