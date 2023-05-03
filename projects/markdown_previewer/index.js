const defaultText = `# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:

Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`

You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.org), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | -------------
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbered lists too.
1. Use just 1s if you want!
1. And last but not least, let's not forget embedded images:

![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)
`

function converter(text) {
  return marked.parse(text, {breaks: true});
}

class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  handleChange(e) {
    this.props.textChange(e.target.value);
  }
  handleClick() {
    this.props.iconClick('Editor');
  }
  render() {
    return (
      <div className="editor-wrapper">
        <div className="tool-bar">
          <div>
            <i className="fa fa-free-code-camp" title="no-stack-dub-sack"></i>
            <span>Editor</span>
          </div>
          <i className={this.props.value.icon} onClick={this.handleClick}></i>
        </div>
        <textarea id="editor" type="text" value={this.props.value.text} onChange={this.handleChange}></textarea>
      </div>
    );
  };
}

class Preview extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    this.props.iconClick('Previewer');
  };
  render() {
    return (
      <div className="preview-wrapper">
        <div className="tool-bar">
          <div>
            <i className="fa fa-free-code-camp" title="no-stack-dub-sack"></i>
            <span>Previewer</span>
          </div>
          <i className={this.props.value.icon} onClick={this.handleClick}></i>
        </div>
        <div id="preview">
          {this.props.value.text}
        </div>
      </div>
      
    );
  };
}

class MarkDown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editor: defaultText,
      isMaximize: false,
      icon: '',
      type: ''
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleIconClick = this.handleIconClick.bind(this);
  }
  handleInputChange(newText) {
    this.setState({
      editor: newText,
    })
  }
  handleIconClick(type) {
    this.setState((state) => ({
      isMaximize: !state.isMaximize,
      type: type
    }))
  }
  render() {
    if (this.state.isMaximize) {
      this.state.icon = 'fa fa-compress';
      if (this.state.type === 'Editor') {
        $('.preview-wrapper').addClass('hide');
        $('.editor-wrapper').addClass('maximized');
      } else {
        $('.editor-wrapper').addClass('hide');
        $('.preview-wrapper').addClass('maximized');
      }
    } else {
      this.state.icon = 'fa fa-arrows-alt'
      if (this.state.type === 'Editor') {
        $('.preview-wrapper').removeClass('hide');
        $('.editor-wrapper').removeClass('maximized');
      } else {
        $('.editor-wrapper').removeClass('hide');
        $('.preview-wrapper').removeClass('maximized');
      }
    }
    const convert = converter(this.state.editor);
    return (
      <>
        <Editor value={{text: this.state.editor, icon: this.state.icon}} textChange={this.handleInputChange} iconClick={this.handleIconClick} />
        <Preview value={{text: convert, icon: this.state.icon}} iconClick={this.handleIconClick} />
      </>
    )
  };
}

const root = ReactDOM.createRoot(document.getElementById("container"));
root.render(<MarkDown />);
