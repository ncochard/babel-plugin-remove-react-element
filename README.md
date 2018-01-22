# remove-react-element

> This Babel plugin can be used to remove every usage of a `react` component from code. Used with `webpack`, this can be used to create a bundle for a *mobile* website and a *desktop* website.

## Installation

```sh
npm install --save-dev remove-react-element
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
	"plugins": [
		["remove-react-element", { "elementNames": ["Desktop"] }]
	]
}
```

### Via Node API

```javascript
require("@babel/core").transform("code", {
	"plugins": [
		["remove-react-element", { "elementNames": ["Desktop"] }]
	]
});
```

## Example

**In**

```javascript
	class MyPage extends Component {
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
```

**Out**

```javascript
	class MyPage extends Component {
	    render() {
	        return <div>
	            {null}
	            <Mobile>
	                This will show on mobile.
	            </Mobile>
	        </div>
	    }
	}
```

## Why...
Consider the following `react` component... The code below can be compiled and bundled without `remove-react-element`.  The resulting bundle would be a valid **responsive** website.

	import MediaQuery from 'react-responsive';
	import React, { Component } from 'react';
	
	//The markup wrapped inside the <Desktop/> tag will only show
	// if the width of the page is lower than 1224px.
	class Desktop extends Component {
	    render() {
	        return <MediaQuery query="(min-device-width: 1224px)">
	            { this.props.children }
	        </MediaQuery>;
	    }
	}
	
	//The markup wrapped inside the <Mobile/> tag will only show
	// if the width of the page is lower than 1224px.
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

But you might have a requirement to generate a smaller bundle for mobile devices. This bundle would not need to contain the markup related to **desktop**. This can be achieved with `remove-react-element`.

To achieve this, you can configure webpack as followed.

	const webpack = require('webpack');
	const path = require('path');
	const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
	
	module.exports = {
		...
		module: {
			rules: [
				{
					include: [
						path.resolve('./src')
					],
					use: [
						{
							loader: 'babel-loader',
							options: {
								plugins: [
									[
										"remove-react-element",
										{ "elementNames": ["Desktop"] }
								    ]
								]
							}
						}
					]
				}
			]
		},
		plugins: [
			new UglifyJSPlugin(...)
		]
	};