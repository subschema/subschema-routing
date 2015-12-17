"use strict";
import {PropTypes} from 'react';

export var location = PropTypes.shape({
    pathname: PropTypes.string,
    query: PropTypes.obj,
    search: PropTypes.string,
    pop: PropTypes.func,
    push: PropTypes.func
});

export var history = PropTypes.shape({
    listen: PropTypes.func
});
