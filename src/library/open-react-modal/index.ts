import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './index.scss';

export interface Options {
  className?: string;
}

let modalCount: number = 0;

const closeCallbacks: (() => void)[] = [];

export function closeModals() {
  closeCallbacks.forEach(c => c());
}

export default (element: React.ReactElement<{close: (() => void)}>, options: Options = {}) => {
  const dim: HTMLDivElement = document.createElement('div');
  document.body.appendChild(dim);
  
  const contentContainer: HTMLElement = document.createElement('div');
  dim.appendChild(contentContainer);
  dim.setAttribute('class', 'open-react-modal ' + (options.className || ''));
  
  contentContainer.setAttribute('role', 'container');
  
  document.body.style.overflow = 'hidden';
  modalCount += 1;
  
  const close: (() => void) = () => {
    document.body.removeChild(dim);
    modalCount -= 1;
    if (modalCount <= 0) {
      document.body.style.overflow = '';
    }
    closeCallbacks.splice(closeCallbacks.indexOf(close), 1);
  };
  
  ReactDOM.render(React.cloneElement(element, {close}), contentContainer);
  
  closeCallbacks.push(close);
  
  return close;
}