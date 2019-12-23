export default function createElement(tag, config, children) {
  if (typeof tag === "function") {
    return createComponent(tag, config);
  }
  return createVElement(tag, config, children);
}

function createVElement(tag, config, children = null) {
  return {
    tag,
    ...config,
    props: { children },
    dom: null
  };
}

function mountVElement(element, parentNode) {
  const { tag, className, props, style, dom, ...attrList } = element;

  element.dom = document.createElement(tag);

  if (props.children) {
    props.children.forEach(child => {
      mount(child, element.dom);
    });
  }

  if (className) {
    element.dom.className = className;
  }

  if (style) {
    Object.keys(style).forEach(key => (element.dom.style[key] = style[key]));
  }

  if (attrList) {
    Object.keys(attrList).forEach(attrName => {
      element.dom.setAttribute(attrName, attrList[attrName]);
    });
  }

  parentNode.appendChild(element.dom);

  return element.dom;
}

function mountText(text, parentNode) {
  parentNode.textContent = text;
  return parentNode.textContent;
}

function mount(element, parentNode) {
  if (typeof element === "string" || typeof element === "number") {
    return mountText(element, parentNode);
  }
  if (typeof element.tag === "function") {
    return mountVComponent(element, parentNode);
  }
  return mountVElement(element, parentNode);
}

function createComponent(tag, props) {
  // props : {message: 'Hello from props'}
  return {
    tag,
    props,
    dom: null
  };
}

function mountVComponent(vComponent, parentNode) {
  // vComponent - {tag: function App(){}, props: {message: 'Hello from props'}}

  const { tag: Component, props } = vComponent;
  const instance = new Component(props);

  const nextRenderedElement = instance.render();

  instance._currentElement = nextRenderedElement;
  instance._parentNode = parentNode;
  const dom = mount(nextRenderedElement, parentNode);

  vComponent.dom = dom;
  vComponent._instance = instance;
  parentNode.appendChild(dom);

  return dom;
}
function update(prevElement, nextElement) {
  if (prevElement.tag === nextElement.tag) {
    if (typeof prevElement.tag === "string") {
      updateVElement(prevElement, nextElement);
    }
  } else {
  }
}

function updateVElement(prevElement, nextElement) {
  nextElement.dom = prevElement.dom;

  if (nextElement.props.children) {
    updateChildren(
      prevElement.props.children,
      nextElement.props.children,
      nextElement.dom
    );
  }

  if (prevElement.style !== nextElement.style) {
    Object.keys(nextElement.style).forEach(
      s => (dom.style[s] = nextElement.style[s])
    );
  }
}

function updateChildren(prevChildren, nextChildren, parentNode) {
  if (!Array.isArray(nextChildren)) {
    nextChildren = [nextChildren];
  }
  if (!Array.isArray(prevChildren)) {
    prevChildren = [prevChildren];
  }

  for (let i = 0; i < nextChildren.length; i++) {
    const nextChild = nextChildren[i]; // span.card__title Osh
    const prevChild = prevChildren[i]; // span.card__title Bishkek
    if (typeof nextChild === "string" && typeof prevChild === "string") {
      updateVText(prevChild, nextChild, parentNode);
    } else {
      update(prevChild, nextChild);
    }
  }
}
// <span>2</span>
// '2' '3'
function updateVText(prevText, nextText, parentDOM) {
  if (prevText !== nextText) {
    parentDOM.textContent = nextText;
  }
}

class Component {
  constructor(props = {}) {
    this.props = props;
    this.state = {};

    this._pendingState = null;
    this._currentElement = null;
    this._parentNode = null;
  }
  updateComponent() {
    const prevElement = this._currentElement;
    if (this._pendingState !== this.state) {
      this.state = this._pendingState;
    }
    this._pendingState = null;
    const nextRenderedElement = this.render();
    this._currentElement = nextRenderedElement;
    update(prevElement, nextRenderedElement);
  }
  setState(partialNewState) {
    this._pendingState = { ...this.state, ...partialNewState };
    this.updateComponent();
  }
  render() {}
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "Bishkek"
    };
    setTimeout(() => {
      this.setState({ title: "Osh" });
    }, 1000);
  }
  render() {
    return createElement("div", { className: "card" }, [
      createElement("span", { className: "card__title" }, [this.state.title]),
      createElement("span", { className: "card__caption" }, [
        " State of Kyrgyzstan"
      ])
    ]);
  }
}

/*
{
    tag: 'div',
    className: 'card',
    props: {
        children: [
            {
                tag: 'span',
                className: 'card__title',
                props: {
                    children: ['Bishkek']
                }
            },
            {
                tag: 'span',
                className: 'card__caption',
                props: {
                    children: ['State of Kyrgyzstan']
                }
            }
        ]
    }
}

{
    tag: 'div',
    className: 'card',
    children: [
        {
            tag: 'span',
            className: 'card__title',
            children: ['Osh']
        },
        {
            tag: 'span',
            className: 'card__caption',
            children: ['State of Kyrgyzstan']
        }
    ]
}

*/

mount(
  createElement(App, { message: "Hello from props!" }),
  document.getElementById("root")
);
{
  /*
    
class App extends Component {
    render() {
        return (
            createElement('div', {className: 'banner'}, [
                createElement('h1', {}, [this.props.message])
            ])
        );
    }
}

1.
mount(
    createElement(App),
    document.getElementById('root')
) 
2.
mount(
    {tag: function App() {}},
    document.getElementById('root')
)

3.
mountVComponent(
    {tag: function App() {}},
    document.getElementById('root')
)
4.
render();
5.
mount(createElement('div', {className: 'banner'} , [
    createElement('h1')
]), document.getElementById('root'))
6.
mount(
    {
        tag: 'div',
        className: 'banner',
        props: {
            children: [
                {tag: 'h1', children: ['Hello']}
            ]
        },
    },
    document.getElementById('root')
)
*/
}
