"use strict";
import React, {Component} from 'react';
import {types, PropTypes, Form} from 'Subschema';
import defaults from 'lodash/object/defaultsDeep';
import {location, history} from './PropTypes';

var ObjectType = types.Object;

export default class Router extends Component {
    static propTypes = defaults({history}, Form.propTypes);
    static defaultProps = defaults({}, Form.defaultProps);
    static childContextTypes = defaults({
        location,
        history
    }, Form.childContextTypes);

    constructor(props, ...args) {
        super(props, ...args);

        this.state = {}
    }

    componentWillMount() {
        this.setup(this.props);
    }

    getChildContext() {
        return {
            location: this.state.location,
            history: this.props.history
        }
    }

    componentWillReceiveProps(props) {
        if (props.history !== this.props.history) {
            this.setup(props);
        }
    }

    handleLocation = (location)=> {
        this.setState({location})
    }

    setup(props) {
        if (this.history) {
            this.history();
        }
        this.history = props.history.listen(this.handleLocation);
    }

    render() {
        var {history, ...props }  = this.props;

        return <Form {...props}/>
    }
}