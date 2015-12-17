import React, {Component} from 'react';
import Subschema, {Editor, PropTypes} from 'Subschema';
import {location} from './PropTypes';


export default class MainTemplate extends Component {
    static template = false;

    static inputClassName = '  ';

    static isContainer = true;


    static contextTypes = {
        loader: PropTypes.loader.isRequired,
        location
    }

    static propTypes = {
        index: PropTypes.string,
        pathname: PropTypes.string
    }

    render() {
        if (this.props.pathname == null || this.context.location.pathname === this.props.pathname) {
            return <span>{this.props.children}</span>
        } else {
            return <span/>;
        }
    }

}