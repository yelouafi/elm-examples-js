import { html } from 'snabbdom-jsx';
import snabbdom from 'snabbdom';
import clazz from 'snabbdom/modules/class';
import props from 'snabbdom/modules/props';
import style from 'snabbdom/modules/style';
import eventlisteners from 'snabbdom/modules/eventlisteners';


import App from './App';

const patch = snabbdom.init([
  clazz, props, style, eventlisteners
]);

// Gets the initial state from the Component
let state = App.init(),
    vnode = document.getElementById('placeholder');

function updateUI() {
  const newVnode = <App state={state} dispatch={dispatch} />
  vnode = patch(vnode, newVnode);
}

function dispatch(action) {
  state = App.update(state, action);
  updateUI();
}

updateUI();
