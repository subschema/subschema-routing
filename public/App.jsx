"use strict";
import React, {Component} from 'react';
import Routing from '../src/Routing.jsx';
import Subschema, {loader} from 'Subschema';
import Link from '../src/types/Link.jsx';
import Main from '../src/Main.jsx';
import {  useQueries,useBasename } from 'history'
import createHistory from 'history/lib/createHashHistory'
const history = useQueries(useBasename(createHistory))({
    basename: '#'
});
class Index extends Component {

    render() {
        return <div>Index Page</div>
    }
}

class NotFound extends Component {

    render() {
        return <div>Page Not Found </div>
    }
}
loader.addTemplate({MainTemplate: Main})
loader.addType({NotFound, Index, Link});

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
            template: "MainTemplate",
            pathname: '/',
            fieldsets: [{fields: ["name", "toAge"]}]
        },
        {
            template: "MainTemplate",
            pathname: '/age',
            fieldsets: [{fields: ["age", "toName"]}]
        },{
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