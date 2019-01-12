import React, { createRef, RefObject, useEffect } from 'react';
import styles from './Source.module.scss';

export interface Props {
  source: string;
}

export function Source({source}: Props) {
  const container: RefObject<HTMLPreElement> = createRef();
  
  useEffect(() => {
    if (container.current) {
      hljs.highlightBlock(container.current);
    }
  });
  
  return (
    <pre ref={container} className={styles.main}>
      <code>
        {source}
      </code>
    </pre>
  );
}