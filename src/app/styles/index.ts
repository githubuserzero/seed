import * as _env from '!!sass-variable-loader!./env.scss';

interface Env {
  hello: string;
  xxx: string;
}

export const env: Env = _env as Env;