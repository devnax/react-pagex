'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var pathToRegexp = require('path-to-regexp');

var navigate = {
  go: function go(path) {
    window.history.pushState({
      pagex: true,
      path: path
    }, "", path);
    dispatchEvent(new PopStateEvent("popstate", {
      state: {
        pagex: true,
        path: path
      }
    }));
  },
  reload: function reload() {
    dispatchEvent(new PopStateEvent("popstate", {
      state: {
        path: window.location.pathname,
        pagex: true
      }
    }));
  },
  back: function back() {
    return window.history.back();
  },
  forward: function forward() {
    return window.history.forward();
  }
};

function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };
  return _extends.apply(this, arguments);
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

var Link = function Link(_ref) {
  var href = _ref.href,
      noHref = _ref.noHref,
      children = _ref.children,
      label = _ref.label,
      component = _ref.component;
  return React.createElement(component || 'a', _extends({}, noHref !== false ? {
    href: href
  } : {}, {
    onClick: function onClick(e) {
      e.preventDefault();
      navigate.go(href);
    }
  }), children || label);
};

var parseQuery = function parseQuery(q) {
  if (q === void 0) {
    q = window.location.search;
  }

  if (!q) return {};
  var query_string = q.substring(1);
  var vars = query_string.split('&');
  var query = {};

  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split('=');
    query[pair[0]] = pair[1];
    query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
  }

  return query;
};

var isMatch = function isMatch(regex_path, path) {
  var m = pathToRegexp.match(regex_path, {
    decode: decodeURIComponent
  });
  var matches = m(path);
  return matches ? matches.params : null;
};

var Parser = {
  isMatch: isMatch,
  parseQuery: parseQuery
};

var core = {
  currentGroup: null,
  groups: /*#__PURE__*/new Map(),
  actives: /*#__PURE__*/new Map()
};
var useGroup = function useGroup(props) {
  var uid = React.useId();

  var _useState = React.useState(0),
      d = _useState[0],
      _dispatch = _useState[1];

  var prevGroupId = React.useMemo(function () {
    return core.currentGroup;
  }, []); // set current group

  React.useMemo(function () {
    core.currentGroup = uid;
    core.groups.set(uid, _extends({}, props, {
      dispatch: function dispatch() {},
      routes: new Map()
    }));
  }, []);
  React.useEffect(function () {
    core.currentGroup = prevGroupId;
    var get = core.groups.get(uid);

    if (get) {
      core.groups.set(uid, _extends({}, get, {
        dispatch: function dispatch() {
          return _dispatch(Math.random());
        }
      }));
    }

    return function () {
      core.groups["delete"](uid);
    };
  }, []);
  React.useEffect(function () {
    var group = core.groups.get(uid);

    if (group) {
      var found = false;
      group.routes.forEach(function (route, routeId) {
        var path = group.basepath ? "" + group.basepath + route.path : route.path;
        var params = Parser.isMatch(path, window.location.pathname) || false;

        if (params || route.params) {
          group.routes.set(routeId, _extends({}, route, {
            params: params
          }));
          route.dispatch();
        }

        if (!found && params) {
          group.onFound && group.onFound(route);
          found = true;
        }
      });

      if (!found) {
        group.onError && group.onError();
      }
    }
  }, [d]);
};
var useRoute = function useRoute(path) {
  var _group$routes$get;

  var uid = React.useId();

  var _useState2 = React.useState(0),
      _dispatch2 = _useState2[1];

  var groupId = React.useMemo(function () {
    return core.currentGroup;
  }, []);
  var group = React.useMemo(function () {
    return groupId && core.groups.get(groupId);
  }, []);
  var params = React.useMemo(function () {
    var params = Parser.isMatch(path, window.location.pathname) || false;

    if (group) {
      group.routes.set(uid, {
        dispatch: function dispatch() {},
        path: path,
        params: params
      });
    }

    return params;
  }, []);
  React.useEffect(function () {
    if (group) {
      group.routes.set(uid, {
        dispatch: function dispatch() {
          return _dispatch2(Math.random());
        },
        path: path,
        params: params
      });
    }

    return function () {
      if (group) {
        group.routes["delete"](uid);
      }
    };
  }, []);
  return group && ((_group$routes$get = group.routes.get(uid)) == null ? void 0 : _group$routes$get.params);
};
window.addEventListener('popstate', function () {
  core.groups.forEach(function (group) {
    return group.dispatch();
  });
});

var Route = function Route(_ref) {
  var path = _ref.path,
      Render = _ref.render;
  var params = useRoute(path);
  return params ? React__default.createElement(Render, {
    params: params
  }) : React__default.createElement(React__default.Fragment, null);
};

var _excluded = ["children"];

var Routes = function Routes(_ref) {
  var children = _ref.children,
      props = _objectWithoutPropertiesLoose(_ref, _excluded);

  useGroup(props);
  return React__default.createElement(React__default.Fragment, null, children);
};

var useQuery = Parser.parseQuery;

exports.Link = Link;
exports.Navigate = navigate;
exports.Parser = Parser;
exports.Route = Route;
exports.Routes = Routes;
exports.core = core;
exports.useGroup = useGroup;
exports.useQuery = useQuery;
exports.useRoute = useRoute;
//# sourceMappingURL=react-pagex.cjs.development.js.map
