import * as React from 'react';

interface Props {
  html: string;
}

class Component extends React.Component<Props, {}> {
  private container: React.RefObject<HTMLDivElement> = React.createRef();
  
  render() {
    return (
      <div ref={this.container} dangerouslySetInnerHTML={{__html: this.props.html}}/>
    );
  }
  
  componentDidMount() {
    this.highlight();
  }

  componentDidUpdate() {
    this.highlight();
  }
  
  highlight = () => {
    if (this.container.current) {
      Array.from(this.container.current.querySelectorAll('pre code')).forEach(element => {
        hljs.highlightBlock(element.parentElement);
      });
    }
  };
}

export default Component;