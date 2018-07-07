import React from 'react';
import { resolve } from 'path';

function createContext(name, state, actions) {
    let Context = React.createContext({});

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
                            return result.then(newState => {
                                return new Promise((resolve, reject) => {
                                    this.setState(newState, function(){
                                        //state has now been set;
                                        resolve();
                                    });
                                })
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

    return {
        provider: provider,
        consumer: consumer
    }
}

export default createContext;