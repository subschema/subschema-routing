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
        "query": PropTypes.object,
        activeClass: PropTypes.cssClass
    }
    static defaultProps = {
        "label": "{.}",
        "search": "",
        "href": "",
        activeClass: "active"
    }
    handleClick = (e)=> {
        e && e.preventDefault();
        var {href,query,search,action} = this.props

        this.context.history.push({pathname: href, query, search, action});

    }

    render() {
        var isActive = this.props.href === this.context.location.pathname;
        return <a href={this.props.href+this.props.search}
                  onClick={this.handleClick}
                  className={this.props.className+' '+(isActive ? ' '+this.props.activeClass : '')}>{this.props.label}</a>
    }
}