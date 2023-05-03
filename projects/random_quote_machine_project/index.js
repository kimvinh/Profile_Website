const root = ReactDOM.createRoot(document.getElementById("quote-box"));

let dataQuote;

function getQuote() {
  return $.ajax({
    method: 'GET',
    url: 'https://api.api-ninjas.com/v1/quotes',
    headers: { 'X-Api-Key': 'EQhhJ+GvRITjnR1TGF1KOQ==yjpuNfyOVfE5tLwl'},
    contentType: 'application/json',
    success: function(result) {
      dataQuote = result;
    },
    error: function ajaxError(jqXHR) {
        console.error('Error: ', jqXHR.responseText);
    }
  });
}

$(document).ready(function () {
  getQuote().then(() => {
    root.render(<App />);
  });
});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quote: dataQuote[0].quote,
      author: dataQuote[0].author
    }
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    getQuote();
    setTimeout(() => {
      this.setState({
        quote: dataQuote[0].quote,
        author: dataQuote[0].author
      });
    }, 500);
  }
  render() {
    return (
      <>
        <TextQuote quote={this.state.quote}/>
        <AuthorQuote author={this.state.author}/>
        <div className="feature-buttons">
          <div className="button-link">
            <a className="button" id="tweet-quote" target="_top" href="https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=%22Either%20write%20something%20worth%20reading%20or%20do%20something%20worth%20writing.%22%20Benjamin%20Franklin"><i className="fa fa-twitter"></i></a>
            <a className="button" id="tumblr-quote" target="_top" href="https://www.tumblr.com/login?redirect_to=https%3A%2F%2Fwww.tumblr.com%2Fwidgets%2Fshare%2Ftool%3Fposttype%3Dquote%26tags%3Dquotes%252Cfreecodecamp%26caption%3DRalph%2BWaldo%2BEmerson%26content%3DThe%2Bonly%2Bperson%2Byou%2Bare%2Bdestined%2Bto%2Bbecome%2Bis%2Bthe%2Bperson%2Byou%2Bdecide%2Bto%2Bbe.%26canonicalUrl%3Dhttps%253A%252F%252Fwww.tumblr.com%252Fbuttons%26shareSource%3Dtumblr_share_button"><i className="fa fa-tumblr"></i></a>
          </div>
          <button className="button" id="new-quote" onClick={this.handleClick}>New Quote</button>
        </div>
      </>
    );
  };
}

const TextQuote = (props) => {
  return (
    <div id="text">
      <i className="fa fa-quote-left"></i>
      <span>{props.quote}</span>
    </div>
  )
};

const AuthorQuote = (props) => {
  return (
    <div id="author">
      <p>- {props.author}</p>
    </div>
  )
}