import MediaQuery from 'react-responsive';
import React, { Component } from 'react';

class Desktop extends Component {
    render() {
        return <MediaQuery query="(min-device-width: 1224px)">
            { this.props.children }
        </MediaQuery>;
    }
}

class Mobile extends Component {
    render() {
        return <MediaQuery query="(max-device-width: 1224px)">
            { this.props.children }
        </MediaQuery>;
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