# react-ctx-state

Super easy react state manager, built using the React new Context API.

Must use React version equal or greater than 16.3.3 

The module exposes a function called **createContext** which accepts three paramenters:

- **name** (a string that will be the name of the props attribute in the cosumer components)
- **state** (Application state)
- **actions** (Function that modify the application state)

Which then returns an object with two methods **provider** and a **consumer**.

- The **provider** takes as parameter the parent component.
- The **consumer** takes as paramente a child component to which we need to pass some props or some actions.

Example:

First of all create state and actions for the application:

```javascript
//context.js
import createContext from 'react-ctx-state';
let state = {
    user: { name: 'Massimo' }
}

//actions have to always return the new updated state or a promise that returns the new updated state.
let actions = {
    setUser: data => state => {
        return {...state, user: data}
    }
}

//stateContext is an object with two methods: provider and consumer.
export default createContext('stateContext', state, actions);
```

Pass the state to all the children components:
```javascript
//app.js
import stateContext from './context.js'
import Children from './components.js'

class App extends Component {
  render() {
    return (
        <Children />
    );
  }
}

//provider pass the state and action down the children components.
export default stateContext.provider(App);
```

Then consume the state in a child component:
```javascript
//components.js
import stateContext from './context.js'

let Div = ({stateContext}) => {
    let { user } = stateContext;
    return (
        <div> { user.name } </div>
    )
}

let Button = ({stateContext}) => {
    let { setUser } = stateContext;
    return (
        <button onClick={() => { setUser({name: 'Minimo'}) }}>Change User</button>
    )
}

//consumer allows the children to access both state and actions.
Div = stateContext.consumer(Div);
Button = stateContext.consumer(Button)

function Children = () => {
    return (
        <div>
            <Div />
            <Button />
        </div>
    )
}

export default Children;
```

If there are multiple contexts, it's possible to use (provide|consume)MultipleCtx functions.

```javascript
import {provideMultipleCtx, consumeMultipleCtx} from 'react-ctx-state'

//let's say we created two extra contexts in contexts.js:
import { userContext, cartContext } from './context.js'

let Div = ({ userContext, cartContext }) => {
    return (
        <div>
            <div> { userContext.name } </div>
            <div> { cartContext.cartName }</div>
        </div>
    )
}

//the Div component now will be able to consumer more than one context:
Div = consumeMultipleCtx([cartContext, userContext], Div)

const App = () => {
    return <Div />
}

//The app Component now is provided with more than one context:
export default provideMultipleCtx([cartContext, userContext], App);
