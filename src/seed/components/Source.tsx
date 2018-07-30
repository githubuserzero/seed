import * as React from 'react';
import * as styles from './Source.module.scss';

interface Props {
  source: string;
}

class Component extends React.Component<Props, {}> {
  private container: React.RefObject<HTMLPreElement> = React.createRef();
  
  render() {
    return (
      <pre ref={this.container} className={styles.main}>
        <code>
          {this.props.source}
        </code>
      </pre>
    );
  }
  
  componentDidMount() {
    this.highlight();
  }

  componentDidUpdate() {
    this.highlight();
  }
  
  highlight = () => {
    if (this.container.current) hljs.highlightBlock(this.container.current);
  };
}

export default Component;