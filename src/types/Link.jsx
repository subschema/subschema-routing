import React, {Component} from 'react';
import { PropTypes} from 'Subschema';
function clzName(name, active) {
    return (name === active ? 'active' : '');
}
import {location,history} from '../PropTypes';

export default class Link extends Component {
    static contextTypes = {
        location,
        history
    }
    static propTypes = {
        "href": PropTypes.expression,
        "search": PropTypes.expression,
        "label": PropTypes.expression,
        "action": PropTypes.oneOf(["PUSH", "POP", "REPLACE"]),
        "query": PropTypes.object
    }
    static defaultProps = {
        "label": "{.}",
        "search": "",
        "href": ""
    }
    handleClick = (e)=> {
        e && e.preventDefault();
        var {href,query,search,action} = this.props

        this.context.history.push({pathname: href, query, search, action});

    }

    render() {
        return <a href={this.props.href+this.props.search}
                  onClick={this.handleClick}
                  className={this.props.className+' '+(this.props.href === this.context.location.pathname ? 'active' : '')}>{this.props.label}</a>
    }
}