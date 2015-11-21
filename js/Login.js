import { html } from 'snabbdom-jsx';
import Type from 'union-type';
import { pipe, targetValue } from './helpers';
import { login } from './api';

const Action = Type({
  Name          : [String],
  Password      : [String],
  LoginStart    : [],
  LoginError    : [String]
});

const onSubmit = (state, dispatch, onLogin) => event => {
  event.preventDefault();
  doLogin(state, dispatch, onLogin);
  return false;
}

function doLogin(state, dispatch, onLogin) {
  dispatch(Action.LoginStart());
  login(state.name, state.password)
    .then(() => onLogin(state.name))
    .catch(err => dispatch(Action.LoginError(err)));
}

const view = ({ state, dispatch, onLogin }) =>

  <form selector=".login" on-submit={onSubmit(state, dispatch, onLogin)}>
    <h1>Login</h1>

    <input
      type="text"
      placeholder="User name"
      value={state.name}
      on-input={pipe(targetValue, Action.Name, dispatch)} />

    <input
      type="password"
      placeholder="Password"
      value={state.password}
      on-input={pipe(targetValue, Action.Password, dispatch)} />

    <button>Sign in</button>

    <div
      selector=".status"
      style-display={state.status ? 'block' : 'none'}>
      {state.status}
    </div>

  </form>;

function init() {
  return { name: '', password: '', status: '' };
}

function update(state, action) {
  return Action.case({
    Name          : name => ({...state, name}),
    Password      : password => ({...state, password}),
    LoginStart    : () => ({...state, status: 'Please wait...' }),
    LoginError    : err => ({...state, status: err})
  }, action /* dont forget this */ );
}

export default { init, view, update, Action };
