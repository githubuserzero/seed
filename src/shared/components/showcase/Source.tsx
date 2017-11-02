import * as React from 'react';
import styled from 'styled-components';

interface Props {
  source: string;
  className?: string;
}

export default styled(({source, className}: Props) => {
  return <pre className={className}><code>{source}</code></pre>;
})`
  margin-top: 1.4rem;
`;