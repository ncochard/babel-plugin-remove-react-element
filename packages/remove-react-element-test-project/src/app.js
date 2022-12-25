import React, { Component } from 'react';
import ReactDOM from 'react-dom/server';

class Desktop extends Component {
    render() {
        return <div className="desktop">
            { this.props.children }
        </div>;
    }
}

class Mobile extends Component {
    render() {
        return <div className="mobile">
            { this.props.children }
        </div>;
    }
}

export class MyPage extends Component {
    render() {
        return <div>
            <Desktop>
                This will show on desktops.
            </Desktop>
            <Mobile>
                This will show on mobile.
            </Mobile>
        </div>
    }
}

function main() {
    const app = ReactDOM.renderToString(
        <MyPage/>
    );
    console.log(app);
}

main();