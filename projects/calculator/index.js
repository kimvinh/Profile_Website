let first = true;

function calculateMath(string) {
  let problem = string.split(/(\+|-|\*|\/)/);
  problem = problem.filter(e => e !== "");
  while (problem.indexOf('-') !== -1) {
    if (/[0-9]/.test(problem[problem.indexOf('-') - 1])) {
      problem[problem.indexOf('-') + 1] = '-' + problem[problem.indexOf('-') + 1];
      problem[problem.indexOf('-')] = '+';
    } else {
      problem[problem.indexOf('-') + 1] = '-' + problem[problem.indexOf('-') + 1];
      problem.splice(problem.indexOf('-'), 1);
    }
  }
  while (/\//.test(problem.join(""))) {
    let indexDivide = problem.indexOf('/');
    let solved = problem[indexDivide - 1] / problem[indexDivide + 1];
    problem.splice(indexDivide - 1, 3, String(solved));
  }
  while (/\*/.test(problem.join(""))) {
    let indexMulti = problem.indexOf('*');
    let solved = problem[indexMulti - 1] * problem[indexMulti + 1];
    problem.splice(indexMulti - 1, 3, String(solved));
  }
  while(/\+/.test(problem.join(""))) {
    let indexAdd = problem.indexOf('+');
    let solved = Number(problem[indexAdd - 1]) + Number(problem[indexAdd + 1]);
    problem.splice(indexAdd - 1, 3, String(solved));
  }
  // while (/\-/.test(problem.join(""))) {
  //   console.log("Hello");
  //   let indexSub = problem.indexOf('-');
  //   let solved = Number(problem[indexSub - 1]) - Number(problem[indexSub + 1]);
  //   problem.splice(indexSub - 1, 3, solved);
  //   console.log(solved);
  // }
  return problem.join("");
}

class KeyPad extends React.Component {
  constructor(props) {
    super(props);
    this.click = this.click.bind(this);
  }
  click(e) {
    this.props.buttonClick(e.target.value);
  }
  render() {
    return(
      <div id="key-pads">
        <button id="clear" className="" value="AC" onClick={this.click}>AC</button>
        <button id="divide" className="" value="/" onClick={this.click}>/</button>
        <button id="multiply" className="" value="*" onClick={this.click}>X</button>
        <button id="seven" className="" value="7" onClick={this.click}>7</button>
        <button id="eight" className="" value="8" onClick={this.click}>8</button>
        <button id="nine" className="" value="9" onClick={this.click}>9</button>
        <button id="subtract" className="" value="-" onClick={this.click}>-</button>
        <button id="four" className="" value="4" onClick={this.click}>4</button>
        <button id="five" className="" value="5" onClick={this.click}>5</button>
        <button id="six" className="" value="6" onClick={this.click}>6</button>
        <button id="add" className="" value="+" onClick={this.click}>+</button>
        <button id="one" className="" value="1" onClick={this.click}>1</button>
        <button id="two" className="" value="2" onClick={this.click}>2</button>
        <button id="three" className="" value="3" onClick={this.click}>3</button>
        <button id="equals" className="" value="=" onClick={this.click}>=</button>
        <button id="zero" className="" value="0" onClick={this.click}>0</button>
        <button id="decimal" className="" value="." onClick={this.click}>.</button>
      </div>
    );
  }
}

class Screen extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    if (this.props.warning) {
      $('#display').text(this.props.message);
      setTimeout(() => {
        $('#display').text(this.props.output);
      }, 1500);
    }
    return (
      <div id="calculator">
        <div id="formula-screen">{this.props.input.replace(/X/g, '*')}</div>
        <div id="display">{this.props.output}</div>
      </div>
    )
  }
}

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      output: '0',
      warning: false,
      message: ''
    }
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(newOutput) {
    const lastChar = this.state.input.charAt(this.state.input.length - 1);
    const regex = /^[0-9]*\.?[0-9]*$/;
    // User presses 'AC' button
    if (newOutput === "AC") {
      first = true;
      this.setState({
        input: '',
        output: '0',
        warning: false,
        message: ''
      })
    } else {  // User presses other buttons
      if (first) {  // Check if user presses the button at the very first time
        this.setState({
          input: newOutput,
          output: newOutput,
          warning: false
        })
        first = false;
      } else {   // Check if user presses the button at the next times
        // Check if user presses the numerial button
        if (/[0-9]/.test(newOutput)) {
          // Check if user presses the '0' button at the first time
          if (this.state.output === '0') {
            // Don't allow user to presses multiple '0' button after the first time
            if (newOutput != '0') {
              if (this.state.input.length > 1) {
                this.setState((state)=> ({
                  input: state.input.slice(0, state.input.length - 1) + newOutput,
                  output: newOutput,
                  warning: false
                }))
              } else {
                this.setState({
                  input: newOutput,
                  output: newOutput,
                  warning: false
                });
              }
            }
          } else if (/\+|-|\*|\//.test(this.state.output)) {
            this.setState((state) => ({
              input: state.input + newOutput,
              output: newOutput,
              warning: false
            }));
          } else {  // Check if user presses the button that is not '0'
            let length = (this.state.output + newOutput).length;
            if (length <= 22) {
              this.setState((state) => ({
                input: state.input + newOutput,
                output: state.output + newOutput,
                warning: false
              }))
            } else {
              this.setState({
                warning: true,
                message: 'DIGIT LIMIT MET'
              })
            }
          }
        } else if (/\+|-|\*|\//.test(newOutput)) {  // Check if user presses the 'operator' buttons
          if (/\d/.test(this.state.output)) {  // Check if the current output is a number
            this.setState((state) => ({
              input: state.input + newOutput,
              output: newOutput,
              warning: false
            }));
          } else if ((lastChar === '+' || lastChar === '*' || lastChar === '/') && newOutput === '-') {
            this.setState((state) => ({
              input: state.input + newOutput,
              output: newOutput
            }))
          } else if (/\+|\*|\//.test(this.state.output) && !(/\-$/.test(this.state.input))) {
            this.setState((state) => ({
              input: state.input.slice(0, -1) + newOutput,
              output: newOutput,
              warning: false
            }));
          } else {
            this.setState((state) => ({
              input: state.input.slice(0, -2) + newOutput,
              output: newOutput,
            }));
          }
        } else if (newOutput === '.') {
          if (/\d/.test(this.state.output)) {
            if (newOutput === '.' && !regex.test(this.state.output + newOutput)) {
              return;
            }
            this.setState((state) => ({
              input: state.input + newOutput,
              output: state.output + newOutput,
              warning: false
            }));
          } else if ((lastChar === '+' || lastChar === '-' || lastChar === '*' || lastChar === '/') && newOutput === '-') {
            this.setState((state) => ({
              input: state.input + newOutput,
              output: newOutput
            }));
          }
        } else if (newOutput === '=') {
          try {
            const result = calculateMath(this.state.input);
            this.setState((state) => ({
              input: result.toString(),
              output: result.toString(),
              warning: false
            }));
          } catch (error) {
            this.setState({
              warning: true,
              message: 'INVALID INPUT'
            });
          }
        }
      } 
    }
  }
  render() {
    return (
      <div>
        <Screen input={this.state.input} output={this.state.output} warning={this.state.warning} message={this.state.message}/>
        <KeyPad buttonClick={this.handleClick} />
      </div>
    )
  }
}

const root = ReactDOM.createRoot(document.getElementById("container"));
root.render(<Calculator />);