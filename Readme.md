#Subschema Routing
A simple valueManager based routing approach to subschema. Its an idea,
trying to come up with a better solution that what is in the subschema
demo.



##Usage
```sh
  $ npm install subschema-routing
```

##Example
```js
"use strict";
import React, {Component} from 'react';
import {Routing, MainTemplate, Link} from 'SubschemaRoutin.jsx';
import Subschema, {loader} from 'Subschema';
import {  useQueries,useBasename } from 'history'
import createHistory from 'history/lib/createHashHistory'

const history = useQueries(useBasename(createHistory))({
    basename: '#'
});

class NotFound extends Component {

    render() {
        return <div>Page Not Found </div>
    }
}

loader.addTemplate({MainTemplate})
loader.addType({NotFound,  Link});

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
        //Fieldsets can be nested, MainTemplate determines weather to show 
         // a template
        
        {
            template: "MainTemplate",
            //path to listen to
            pathname: '/',
            fieldsets: [{fields: ["name", "toAge"]}]
        },
        {
            template: "MainTemplate",
            //path to listen to
            pathname: '/age',
            fieldsets: [{fields: ["age", "toName"]}]
        },{
        //if pathname is not supplied its a not found page.
            template: "MainTemplate",
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