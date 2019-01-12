import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router';

// tslint:disable:no-any
interface Props {
  props: object;
  load: Promise<{default: React.ComponentType<any>}>;
}

function RouterRenderContainer({load, props}: Props) {
  const [component, setComponent] = useState<React.ReactElement<any> | null>(null);
  
  useEffect(() => {
    load.then(({default: Component}) => {
      setComponent(React.createElement(Component, props));
    });
  }, []);
  
  return component;
}

export function render(load: () => Promise<{default: React.ComponentType<any>}>): ((props: RouteComponentProps<any>) => React.ReactNode) {
  return props => React.createElement(RouterRenderContainer, {
    props,
    load: load(),
  });
}