const hooks = [];
let currentComponent = 0;

export class Component {}

export function useState(initValue) {
  const position = currentComponent;

  if (!hooks[position]) {
    hooks[currentComponent] = initValue;
  } 

  return [
    hooks[position],
    (nextValue) => {
      hooks[position] = nextValue;
    }
  ];
}

function renderRealDOM(vdom) {
  if (typeof vdom === 'string') {
    return document.createTextNode(vdom);
  }
  if (vdom === undefined) return;

  const $el = document.createElement(vdom.tagName);
  
  vdom.children.map(renderRealDOM).forEach(node => {
    $el.appendChild(node);
  });
  
  return $el;
}

export const render = (function() {
  let prevVdom = null;
  
  return function (nextVdom, container) {
    if(prevVdom === null) {
      prevVdom = nextVdom;
    }

    container.appendChild(renderRealDOM(nextVdom));
  };
})();

export function createElement(tagName, props, ...children) {
  if (typeof tagName === 'function') {
    if (tagName.prototype instanceof Component) {
      const instance = new tagName({...props, children});
      return instance.render();
    } else {
      currentComponent++;
      
      return tagName.apply(null, [props, ...children]);  
    }
    
  }

  return { tagName, props, children }
}

