import { html } from 'snabbdom-jsx';

const view = ({user}) =>
  <div>
    <h1>Admin Page</h1>
    <div>Welcome {user}</div>
  </div>

export default { view };
