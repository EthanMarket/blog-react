import * as React from 'react';

export interface INotFoundProps {
}

export default class NotFound extends React.Component<INotFoundProps> {
  public render() {
    return (
      <div style={{width:1000,height:3000,backgroundColor:'red'}}>
        404
      </div>
    );
  }
}
