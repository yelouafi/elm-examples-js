import { html } from 'snabbdom-jsx';
import Type from 'union-type';
import { pipe } from './helpers';
import Login from './Login';
import Admin from './Admin';
import Guest from './Guest';

// state : { pages, user, page, loginState }

const Action = Type({
  ShowPage    : [String],
  UpdateLogin : [Login.Action]
});


const onLogin = (state, dispatch) => pipe(Action.ShowPage, dispatch);

const view = ({ state, dispatch }) => {
  if(state.user)
    return state.pages[state.user].view({ user: state.user })
  else {
    return <Login
        state={state.loginState}
        dispatch={pipe(Action.UpdateLogin, dispatch)}
        onLogin={onLogin(state, dispatch)} />
  }
}

function init() {
  return {
    pages : {
      admin: Admin,
      guest: Guest
    },
    user: null,
    page: null,
    loginState: Login.init()
  };
}


function update(state, action) {
  return Action.case({
    ShowPage    : user => ({...state, user}),
    UpdateLogin : loginAction => ({...state,
      loginState: Login.update(state.loginState, loginAction)
    })
  }, action /* dont forget this */ );
}

export default { init, view, update, Action };
