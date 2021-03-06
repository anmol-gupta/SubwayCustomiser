import React, { Component } from 'react';
import Layout from '../src/hoc/Layout/Layout'
import SubwayBuilder from '../src/containers/SubwayBuilder/SubwayBuilder';
class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <SubwayBuilder />
        </Layout>
      </div>
    );
  }
}

export default App;
