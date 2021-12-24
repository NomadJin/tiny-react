/* @jsx createElement */
import { createElement, render, Component } from './react.js';

class YourTitle extends Component{
  render() {
    return (
      <p>나는 타이틀이 되고싶은 당신!</p>
    )
  }
}

function Title(props) {
  return (
    <div>
      <h2>정말 동작할까?</h2>
      <p>잘 동작하는지 보고 싶다.</p>
      <YourTitle />
    </div>
  );
}

console.log(Title());

render(<Title />, document.querySelector('#root'));