import React from 'react';
let Context = React.createContext({});

let consumer = Component => props => {
        return (
            <Context.Consumer> 
                {
                    context => {
                        return <Component {...props} {...context}/>
                    }
                }
            </Context.Consumer>
        )
}

function createContext(name, state, actions) {
    function provider(Component) {
        class CurrentContext extends React.Component {
            constructor(props) {
                super(props);
                this.state = state;
                this.actions = {};
                for(let key in actions) {
                    this.actions[key] = (...args) => {
                        let result = actions[key](...args)(this.state);
                        if(typeof result.then === 'function') {
                            result.then(newState => {
                                this.setState(newState);
                            })
                        } else {
                            this.setState(result)
                        }
                    }
                    this.actions[key].bind(this)
                }
            }

            render() {
                let context = {
                    [name]: { ...this.state, ...this.actions }
                }

                return(
                    <Context.Provider value={context}>
                        <Component />
                    </Context.Provider>
                )
            }
        }
        return CurrentContext;
    }
    return {
        provider: provider,
        consumer: consumer
    }
}

export default createContext;