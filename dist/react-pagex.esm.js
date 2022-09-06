import React, { useEffect, useId, useState, useMemo, createElement } from 'react';
import { match } from 'path-to-regexp';

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
  var m = match(regex_path, {
    decode: decodeURIComponent
  });
  var matches = m(path);
  return matches ? matches.params : null;
};

var Parser = {
  isMatch: isMatch,
  parseQuery: parseQuery
};

var Factory = /*#__PURE__*/new Map();
var Excute = function Excute() {
  var isMatched = false;
  var invalids = [];
  Factory.forEach(function (item, key) {
    if (item.params) {
      Factory.set(key, _extends({}, item, {
        params: null
      }));
      item.dispatch();
    }

    if (item.path) {
      var params = Parser.isMatch(item.path, window.location.pathname);

      if (params) {
        isMatched = true;
        Factory.set(key, _extends({}, item, {
          params: params
        }));
        item.dispatch();
      }
    } else {
      invalids.push(item);
    }
  });
  !isMatched && invalids.forEach(function (item) {
    Factory.set(item.id, _extends({}, item, {
      params: {}
    }));
    item.dispatch();
  });
};
window.addEventListener('popstate', function () {
  return Excute();
});

var RouteProvider = function RouteProvider(_ref) {
  var children = _ref.children;
  useEffect(function () {
    Excute();
  }, []);
  return children;
};

var Router = {
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

var useMatch = function useMatch(path) {
  var id = useId();

  var _useState = useState(0),
      _dispatch = _useState[1];

  useMemo(function () {
    var params = null;

    if (path) {
      params = Parser.isMatch(path, window.location.pathname);
    }

    Factory.set(id, {
      id: id,
      params: params,
      dispatch: function dispatch() {},
      path: path
    }); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(function () {
    Factory.set(id, _extends({}, Factory.get(id), {
      dispatch: function dispatch() {
        return _dispatch(Math.random());
      }
    }));
    return function () {
      Factory["delete"](id);
    }; // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  var item = Factory.get(id);
  return item == null ? void 0 : item.params;
};

var Link = function Link(_ref) {
  var href = _ref.href,
      noHref = _ref.noHref,
      children = _ref.children,
      label = _ref.label,
      component = _ref.component;
  return createElement(component || 'a', _extends({}, noHref !== false ? {
    href: href
  } : {}, {
    onClick: function onClick(e) {
      e.preventDefault();
      Router.go(href);
    }
  }), children || label);
};

var Route = function Route(_ref) {
  var path = _ref.path,
      Render = _ref.render;
  var params = useMatch(path);
  return params ? React.createElement(Render, {
    params: params
  }) : React.createElement(React.Fragment, null);
};

var useQuery = Parser.parseQuery;

export { Link, Parser, Route, RouteProvider, Router, useMatch, useQuery };
//# sourceMappingURL=react-pagex.esm.js.map
