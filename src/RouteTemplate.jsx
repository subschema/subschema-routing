import React, {Component} from 'react';
import Subschema, {Editor, PropTypes} from 'Subschema';
import {location, matched} from './PropTypes';


export default class MainTemplate extends Component {
    static template = false;

    static inputClassName = '  ';

    static isContainer = true;


    static contextTypes = {
        loader: PropTypes.loader.isRequired,
        location,
        matched
    }

    static propTypes = {
        index: PropTypes.string,
        pathname: PropTypes.string
    }

    render() {
        if (this.props.pathname == null) {
            if (!this.context.matched.isMatched) {
                return <span>{this.props.children}</span>
            }
        } else if (this.context.location.pathname === this.props.pathname) {
            this.context.matched.isMatched = true;
            return <span>{this.props.children}</span>
        }
        return null;
    }
}