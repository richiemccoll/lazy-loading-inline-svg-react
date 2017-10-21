import React, { Component } from "react";
import "./App.css";
import { trace, src } from "./test-image.jpg";
import { string, bool, func } from "prop-types";

ImageContainer.propTypes = {
  trace: string.isRequired,
  fullImage: string.isRequired,
  hasLoaded: bool.isRequired,
  handleSwap: func.isRequired
};

function ImageContainer({ trace, fullImage, hasLoaded, handleSwap }) {
  if (hasLoaded) return <img src={fullImage} alt="Lazy load test" />;
  return <img src={trace} alt="Lazy load test" onLoad={handleSwap} />;
}

class App extends Component {
  state = {
    hasLoaded: false,
    fullImage: ""
  };

  handleSwap = () => {
    // src is the full size image
    fetch(src).then(response =>
      response.blob().then(image =>
        // image here is a blob
        // now we want to set hasLoaded to true
        // generate a DOMString from the image blob.
        // and update the fullImage part of state to the requested image.
        this.setState({
          hasLoaded: true,
          fullImage: URL.createObjectURL(image)
        })
      )
    );
  };

  render() {
    const { hasLoaded, fullImage } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Lazy Loading with Inline SVG</h1>
        </header>
        <div>
          <ImageContainer
            trace={trace}
            fullImage={fullImage}
            handleSwap={this.handleSwap}
            hasLoaded={hasLoaded}
          />
        </div>
      </div>
    );
  }
}

export default App;
