import { html } from 'snabbdom-jsx';

const view = ({user}) =>
  <div>
    <h1>Guest Page</h1>
    <div>Welcome {user} Sorry that'all you can get with your current status</div>
  </div>

export default { view };
