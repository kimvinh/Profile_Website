// This project is using React v17.0.0 instead of React v.18.2.0 to pass the test #14 in the Timer section.

class Clock extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        break: 5,
        session: 25,
        timer: 1500,
        paused: true,
        clock: 'Session'
      }
      this.breakClick = this.breakClick.bind(this);
      this.sessionClick = this.sessionClick.bind(this);
      this.start_stop = this.start_stop.bind(this);
      this.countDown = this.countDown.bind(this);
      this.reset = this.reset.bind(this);
      this.clockFormat = this.clockFormat.bind(this);
    }
    
    breakClick(event) {
      if (this.state.paused === true) {
        if (this.state.clock === 'Break') {
          if (event.target.id === 'break-decrement' && this.state.break > 1) {
            this.setState((state) => ({
              break: state.break - 1,
              timer: (state.break - 1) * 60
            }));
          } else if (event.target.id === 'break-increment' && this.state.break < 60) {
            this.setState((state) => ({
              break: state.break + 1,
              timer: (state.break + 1) * 60
            }));
          }
        } else {
          if (event.target.id === 'break-decrement' && this.state.break > 1) {
            this.setState((state) => ({
              break: state.break - 1
            }));
          } else if (event.target.id === 'break-increment' && this.state.break < 60) {
            this.setState((state) => ({
              break: state.break + 1
            }));
          }
        }
      } 
    }
    
    sessionClick(event) {
      if (this.state.paused === true) {
        if (this.state.clock === 'Session') {
          if (event.target.id === 'session-decrement' && this.state.session > 1) {
            this.setState((state) => ({
              session: state.session - 1,
              timer: (state.session - 1) * 60
            }));
          } else if (event.target.id === 'session-increment' && this.state.session < 60) {
            this.setState((state) => ({
              session: state.session + 1,
              timer: (state.session + 1) * 60
            }));
          }
        } else {
          if (event.target.id === 'session-decrement' && this.state.session > 1) {
            this.setState((state) => ({
              session: state.session - 1
            }));
          } else if (event.target.id === 'session-increment' && this.state.session < 60) {
            this.setState((state) => ({
              session: state.session + 1
            }));
          }
        }
      } 
    }
    
    start_stop() {
      if (this.state.paused) {
        this.timerID = setInterval(() => {
          this.countDown();
        }, 1000);
      } else {
        clearInterval(this.timerID);
      }
      this.setState({ paused: !this.state.paused });
    }
    
    countDown() {
      this.setState((state) => {
        if (state.timer < 0) {
          $('audio')[0].play();
          if (state.clock === 'Session') {
            return {
              clock: 'Break',
              timer: state.break * 60
            };
          } else {
            return {
              clock: 'Session',
              timer: state.session * 60
            };
          }
        } else {
          return {
            timer: state.timer - 1
          };
        }
      });
    }
    
    reset() {
      $('audio')[0].pause();
      $('audio')[0].currentTime = 0;
      this.setState({
        break: 5,
        session: 25,
        timer: 1500,
        paused: true,
        clock: 'Session'
      });
      clearInterval(this.timerID);
    }
    
    clockFormat() {
      if (this.state.timer < 0) {
        return '00:00';
      }
      let minutes = Math.floor(this.state.timer / 60);
      let seconds = this.state.timer % 60;
      minutes = minutes < 10 ? '0' + minutes : minutes;
      seconds = seconds < 10 ? '0' + seconds : seconds;
      return minutes + ':' + seconds;
    }
    render() {
      return(
        <div id="clock-container">
          <h1>25 + 5 Clock</h1>
          <div id="break-session-controller">
            <div id="clock-controller">
              <h2 id="break-label">Break Length</h2>
              <div className="controller">
                <i id="break-decrement" className="fa fa-arrow-down fa-2x" onClick={this.breakClick}></i>
                <div id="break-length" className="length">{this.state.break}</div>
                <i id="break-increment" class="fa fa-arrow-up fa-2x" onClick={this.breakClick}></i>
              </div>
            </div>
            <div id="clock-controller">
              <h2 id="session-label">Session Length</h2>
              <div className="controller">
                <i id="session-decrement" className="fa fa-arrow-down fa-2x" onClick={this.sessionClick}></i>
                <div id="session-length" className="length">{this.state.session}</div>
                <i id="session-increment" class="fa fa-arrow-up fa-2x" onClick={this.sessionClick}></i>
              </div>
            </div>
          </div>
          <div id="session-display">
            <h3 id="timer-label">{this.state.clock}</h3>
            <div id="time-left">{this.clockFormat()}</div>
          </div>
          <div id="icon-controller">
            <button id="start_stop" onClick={this.start_stop}>
              <i class="fa fa-play fa-2x"></i><i class="fa fa-pause fa-2x"></i>
            </button>
            <button id="reset" onClick={this.reset}>
              <i class="fa fa-refresh fa-2x"></i>
            </button>
          </div>
          <audio id="beep" src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"></audio>
        </div>
      )
    }
  }
  
  ReactDOM.render(<Clock />, document.getElementById('container'));
  