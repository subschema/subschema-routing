#Subschema Routing
A simple valueManager based routing approach to subschema. Its an idea,
trying to come up with a better solution that what is in the subschema
demo.

Its kinda crude, but may improve in time.

[demo](http://subschema.github.io/subschema-routing)

##Usage
```sh
  $ npm install subschema-routing
```

##Example
```jsx
"use strict";
import React, {Component} from 'react';
import {Link, RouteTemplate, Routing } from 'SubschemaRouting';
import Subschema, {loader} from 'Subschema';

import {  useQueries,useBasename } from 'history'
import createHistory from 'history/lib/createHashHistory'

const history = useQueries(useBasename(createHistory))({
    basename: '#'
});

class NotFound extends Component {

    render() {
        return <div><h3>Page Not Found</h3> <Link href="/" label="To Name"/></div>
    }
}

loader.addTemplate({RouteTemplate})
loader.addType({NotFound, Link});

var schema = {

    schema: {
        name: {
            type: "Text"
        },
        age: {
            type: "Number"
        },
        toName: {
            template: false,
            type: 'Link',
            href: '',
            label: 'To Name'
        },
        toAge: {
            template: false,
            type: 'Link',
            href: '/age',
            label: 'To Age'
        },
        notFound: {
            template: false,
            type: 'NotFound'
        }
    },
    fieldsets: [
        {
            template: "RouteTemplate",
            pathname: '/',
            fieldsets: [{fields: ["name", "toAge"]}]
        },
        {
            template: "RouteTemplate",
            pathname: '/age',
            fieldsets: [{fields: ["age", "toName"]}]
        }, {
            template: "RouteTemplate",
            fieldsets: [{fields: ["notFound"]}]
        }
    ]
}

export default class App extends Component {

    render() {
        return <Routing history={history} schema={schema} loader={loader}/>
    }
}


```