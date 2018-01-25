import * as React from 'react';
import * as styles from './Source.module.scss';

interface Props {
  source: string;
}

export default ({source}: Props) => {
  return <pre className={styles.main}><code>{source}</code></pre>;
};