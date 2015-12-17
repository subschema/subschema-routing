"use strict";
import React, {Component} from 'react';
import {PropTypes, Form} from 'Subschema';
import defaults from 'lodash/object/defaultsDeep';
import {location, history, matched} from './PropTypes';

export default class Router extends Component {
    static propTypes = defaults({history}, Form.propTypes);
    static defaultProps = defaults({}, Form.defaultProps);
    static childContextTypes = defaults({
        location,
        history,
        matched
    }, Form.childContextTypes);

    constructor(props, ...args) {
        super(props, ...args);

        this.state = {location: {}}
    }

    componentWillMount() {
        this.setup(this.props);
    }

    componentWillReceiveProps(props) {
        if (props.history !== this.props.history) {
            this.setup(props);
        }
    }

    componentWillUnmount() {
        this.history && this.history();
        this.history = null;
    }

    getChildContext() {
        return {
            location: this.state.location,
            history: this.props.history,
            matched: {
                isMatched: this.state.isMatched
            }
        }
    }


    handleLocation = (location)=> {
        this.setState({location, isMatched: false})
    }

    setup(props) {
        if (this.history) {
            this.history();
        }
        this.history = props.history.listen(this.handleLocation);
    }

    render() {
        var {history, action, ...props }  = this.props;
        action = action || this.state.location.pathname;
        return <Form action={action} {...props}/>
    }
}
