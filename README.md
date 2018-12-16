# React Isomorphic Boilerplate
Whole bunch of config for an isomorphic React application

Notes:
  - Node v10.14.1 at the time of writing

## Getting started
Clone the repo `git clone git@github.com:richytong/react-isomorphic-boilerplate`

Install dependencies `npm i`

Run the application `npm start`

Navigate to `http://localhost:3000`

## Deployment
Export environmental variables needed for build in `.build.env` (you edit this)
```bash
. .build.env
```

Run make
```bash
make
```

<b>Makefile</b>
`make`
  - `clean` removes old build files
  - `build-source` builds source and bundle
  - `build-image` builds docker iamge
  - `push` auths and pushes to remote docker repository

## Notes
`redux` is a predicatable state container for Javascript apps. Predictable in its declarative approach to state management using `Actions`, plain Javascript object payloads that send data to the application `store` with `store.dispatch(action)`, and `Reducers` that take these `Actions` and specify how the application's state changes in response `(previousState, action) => newState`. Reducers often switch on `action.type` to predictably and declaratively change the application state like so:
```Javascript
const myReducer = (previousState = [], action) => { // our application state is an array
  switch (action.type) {
    case 'SOME_ACTION_TYPE':
      const newState = action.data
      return newState;
    default:
      return state;
  }
};
```
Application state is declared in the reducer in this manner using the default function parameters. For more complex applications however, it is more practical to split up reducers into multiple more specific ones. Redux provides a utility called ```combineReducers``` that allows you to easily declare multiple reducers for different parts of your state:
```Javascript
const myReducerForA = (previousState = initialA, action) => action.newA;
const myReducerForB = (previousState = initialB, action) => action.newB;
const myReducerForC = (previousState = initialC, action) => action.newC;

// the following are equivalent
const entireReducer = combineReducers({
  a: myReducerForA,
  b: myReducerForB,
  c: myReducerForC,
});

const entireReducer = (state = {}, action) => ({
  a: myReducerForA(state.A, action),
  b: myReducerForB(state.B, action),
  c: myReducerForC(state.C, action),
})
```
All combineReducers() does is generate a function that calls your reducers with the slices of state selected according to their keys. The state for the above application would then be { a: someA, b: someB, c: someC }. [Actions](https://redux.js.org/basics/actions), [Reducers](https://redux.js.org/basics/reducers)

```redux-thunk``` middleware allows you to write action creators that return a function instead of an action so you have more control when composing your redux actions. Abstract away network control flow to a thunk. You can also write normal action creators that return state. See the [docs](https://www.npmjs.com/package/redux-thunk)
