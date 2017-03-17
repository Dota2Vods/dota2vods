import React, { Component } from "react";

let storeCache = {};
if (typeof window !== "undefined" && window.__JSON_STORE_CACHE__) {
    storeCache = window.__JSON_STORE_CACHE__;
}

export const clearStoreCache = () => {
    const storeCacheSave = JSON.parse(JSON.stringify(storeCache));

    storeCache = {};

    return storeCacheSave;
}

export const connect = (componentToConnect, mapProps) => {
    class ConnectHelper extends Component {
        static contextTypes = {
            storeProvider: React.PropTypes.object
        };

        didMount = false;
        state = {};

        store = {
            getCount: () => {
                return this.get("count");
            }
        };

        get(key) {
            //Check cache
            if (storeCache[key]) {
                return storeCache[key];
            }

            //Get result from store provider
            let result = this.context.storeProvider.get(key);

            //Some providers don't return promises but directely the result
            if (!result.then) {
                storeCache[key] = result;
                return result;
            }

            //Wait for promise to resolve
            return result.then(promiseResult => {
                storeCache[key] = promiseResult;
                return promiseResult;
            });
        }

        constructor(props, context) {
            super(props, context);

            const provider = this.context.storeProvider;
            if (!provider) {
                throw new Error("No store provider found!");
            }

            const mappedProps = mapProps(this.store);

            Object.keys(mappedProps).forEach(propName => {
                const prop = mappedProps[propName];
                if (!prop.then) { //No promise -> set state directely in constructor
                    this.state[propName] = prop;
                    return;
                }

                //prop is promise, wait for resolve
                prop.then(value => {
                    const state = {};
                    state[propName] = value;
                    this.setState(state);
                });
            });
        }

        render() {
            return React.cloneElement(componentToConnect, this.state);
        }
    }

    return React.createElement(ConnectHelper, {});
};
