import * as React from 'react';
import './index.scss';

interface IProps {
  name: string
}

interface IState {
  value: number,
  inputValue: string
}

class Animal extends React.Component<IProps, IState> {
  public constructor(props: IProps) {
    super(props);
    this.state = {
      inputValue: 'a',
      value: 10
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  public render() {
    const { name } = this.props
    const { value, inputValue } = this.state
    return (
      <div className="TSDiv">
        <h2>Hello TS {name}-{value}</h2>
        <p><input value={inputValue} onChange={this.handleChange}/></p>
        <p><button onClick={(e: React.MouseEvent<HTMLButtonElement>): void => {
          console.log(this.state.inputValue)
        }}>ADD</button></p>
      </div>
    );
  }

  public componentDidMount(): void {
    console.log('componentDidMount')
  }

  private handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
    this.setState({ inputValue: e.target.value });
  }

  private handleClick(e: React.MouseEvent<HTMLButtonElement>): void {
    console.log('hello')
  }
}

export default Animal;