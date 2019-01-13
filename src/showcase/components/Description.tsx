import React, { createRef, RefObject, useEffect } from 'react';

export interface DescriptionProps {
  html: string;
}

export function Description({html}: DescriptionProps) {
  const container: RefObject<HTMLDivElement> = createRef();
  
  useEffect(() => {
    if (container.current) {
      Array.from(container.current.querySelectorAll('pre code')).forEach(element => {
        hljs.highlightBlock(element.parentElement);
      });
    }
  });
  
  return (
    <div ref={container}
         dangerouslySetInnerHTML={{__html: html}}/>
  );
}