import * as React from 'react';
import { Link } from 'react-router-dom';

interface Props {
}

interface State {
}

export default class extends React.Component<Props, State> {
  render() {
    return (
      <div>
        <Link to="/">Home</Link>
        <Link to="/sample">Sample</Link>
      </div>
    );
  }
}