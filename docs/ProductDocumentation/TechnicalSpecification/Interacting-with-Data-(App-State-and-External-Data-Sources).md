# Redux
We use Redux to maintain and manage our Application State.

We follow a customized version of the `ducks` structure for redux. 
This means that rather than having a separate directory for all action creators and a separate directory for all reducers we divide the Application state into Modules and each Module will be created as a separate directory in [/src/ducks](https://github.com/reach4help/reach4help/tree/master/web-client/src/ducks)

Our Redux Modules, implemented in the ducks structure is further broken up into 3 more parts:
* Actions
* Reducers
* Types

These different parts are discussed in detail below. 
We have implemented middlewares to three together for a more declarative approach to creating actions and reducers.
We have also implemented Utilities that aid in the development process.

## Types
We define `Types` as the name of the Action.
Each Type would have a set of states associated with it.

To create a `Type`, you must first import the `createActionTypeFactory` function which can be obtained from [src/store/utils/createActionTypeFactory](https://github.com/reach4help/reach4help/blob/master/web-client/src/store/utils/createActionTypeFactory.ts)

This function can be used to create a `Type Factory`.
A Type Factory can be thought of as the collection/group under which `Types` are created. 
To Create a `Type Factory`, call the imported `createActionTypeFactory` function and give the name of the `Type Factory` as the argument to the function.

By default, the name of the Redux Module must be used for creating a `Type Factory` and all `Types` must be created from this `Type Factory`. However, In the situation where you are using several different services in an action and would like to have a separate collection of types for separate services, you could use separate `Type Factory` for each service as can be seen in [/src/ducks/auth/types.js](https://github.com/reach4help/reach4help/blob/master/web-client/src/ducks/auth/types.ts)

The `createActionTypeFactory` function call returns an object with a method for each `Type` that is supported. 

Currently, there are 2 types of `Types`. Each of these `Types` represents a variation of the approach taken to retrieve data
### Async Type
These are the types in which an action is carried out with the expectation of getting a response only on the invocation of the action.
This can be thought of as the regular `request` and `response` model where you get the response only whenever a request is made.
This `Type` can be used for actions such as
* Making an API call using Axios, Fetch, XMLHttpRequest
* Client SDK of a particular service that returns a promise that resolves with data when invoked
* Executing Firebase Queries for fetching data once (not listening for updates as that would be multiple responses for a request)

This `Type` has the following states
* PENDING - When an action has been invoked but hasn't been fulfilled yet
* COMPLETED - When an Action has been carried out and the response has been obtained for the Action
* REJECTED - When an Action didn't succeed and failed with an error

To create this `Type`, you must use the `asyncType` method of a `Type Factory` and pass the name of the `Type` as the argument.
### Observer Type
These are the types in which an action is carried out with the expectation of getting more than one response at different time intervals.
This can be thought of as the `Subscription` Model where the client subscribes for updates and receives updates whenever they are available from the server.
This `Type` can be used for actions such as
* Implementing listeners to snapshot updates from firestore
* Implementing listeners for auth state change in firebase auth
* Implementing listeners for WebSockets
* Implementing listeners for 3rd party services using their SDK

This `Type` has the following states
* SUBSCRIBE - When an action to subscribe to service has been invoked
* UNSUBSCRIBE - When an action to unsubscribe from service has been invoked
* UPDATED - Whenever a response has been obtained from the service
* ERROR - Whenever an error occurs during the subscription or processing of data obtained in response from a subscription

To create this `Type`, you must use the `observerType` method of a `Type Factory` and pass the name of the `Type` as the argument.

An Example types file can be found at [/src/ducks/auth/types.js](https://github.com/reach4help/reach4help/blob/master/web-client/src/ducks/auth/types.ts)

## Actions
We define Actions as the bundle of the various implementation of the action, the Type Group, and the payload that is to be given to the implementations whenever the action is to be carried out.
We have defined Middlewares and utilities that will help in writing actions in a declarative format.

The Actions should be created at [/src/ducks](https://github.com/reach4help/reach4help/tree/master/web-client/src/ducks)/<module_name>/actions.ts

All actions related to a particular Redux Module must be placed in the actions.ts of that Redux Module.

Actions can be created in a declarative form by dispatching an object.
The operation/logic that is to be executed when an action is invoked shouldn't be created/written as a separate function. This function should be created in src/externalSources/<sourceName>/<reduxModule>.ts

with the following properties:
### type
The `Type` of the action that is to be carried out.
### payload
Options and parameters/values that are to be passed to the logic that implements the action
### asyncOperation
The function that is to be executed to get data for any asynchronous operation such as fetching data from an endpoint or using firebase to query data from firestore.

The middleware that enables this feature can be found at [src/store/middlewares/injectRequestMiddleware.ts](https://github.com/reach4help/reach4help/blob/master/web-client/src/store/middlewares/injectRequestMiddleware.ts)
### api
Function that is used to retrieve data from an API just as in asyncOperation but if you provide the function in API, the function would be provided with an instance of axios which is already configured with the base URL reach4help API (if any)

The middleware that enables this feature can be found at [src/store/middlewares/injectRequestMiddleware.ts](https://github.com/reach4help/reach4help/blob/master/web-client/src/store/middlewares/injectRequestMiddleware.ts)
### fallback
An optional action that will be dispatched in case the function provided as the `api` attribute or the `asyncOperation` attribute fails/throws an error. (This must be an action that is defined in actions.js and not a function like `api` or `asyncOperation`

The middleware that enables this feature can be found at [src/store/middlewares/injectRequestMiddleware.ts](https://github.com/reach4help/reach4help/blob/master/web-client/src/store/middlewares/injectRequestMiddleware.ts)
### observer
This can either be given a Function as the value or the boolean `false`.
If the value of the attribute is given as a `Function` then it should be the function that is to be executed to subscribe to a service. The Logic for subscribing to the service and to receive updates from the service must be written in this function. The function must return a function that can be called later for unsubscribing from the service. The Function will be provided with 2 arguments 
* nextValue : type - `Function`. The `nextValue` is the function that must be called repeatedly every time the service returns new data as updates. The `nextValue` function must be called with the data from the updates every time an update is received. An example of this can be found as the `observeUser` function in [src/http/resources/auth.ts](https://github.com/reach4help/reach4help/blob/master/web-client/src/http/resources/auth.ts)
* payload: type - type of the payload used in the action. The payload is the parameters and values passed from the action 
If the value of the attribute is given as a boolean `false` then the middleware will unsubscribe from the service by calling the function for unsubscribing that was returned by the function at the time of subscription.

Whenever an action to subscribe to service is created, another action to unsubscribe from the service must be created and must be called when updates from the service are no longer required.

The middleware is created in such a way that it will keep track of the number of components subscribed to a service and won't subscribe again. It also handles unsubscription and only stops listening for updates when all the subscribed components have unsubscribed.

TIP: When an action to subscribe to a service is to be called only through `useEffect` Hooks such as when the component initializes (which is most of the use cases), you can take advantage of the `useEffect` hook's feature of being able to clean up after an effect to `unsubscribe` from the service when the component is unmounting.
In this case, the action for the subscription itself can return the function that can be invoked for dispatching the action for unsubscription. An example of this can be seen in `observeUserAction` action in [src/ducks/auth/actions.ts](https://github.com/reach4help/reach4help/blob/master/web-client/src/ducks/auth/actions.ts) the function that is returned by this action acts as the action for unsubscription which is called whenever the component unmounts

The middleware that enables this feature can be found at [store/middlewares/observerMiddleware.ts](https://github.com/reach4help/reach4help/blob/master/web-client/src/store/middlewares/observerMiddleware.ts)

## Reducers
Separate Reducers must be created for each `redux module`.
Reducers for each Redux module must be created at src/ducks/<redux module name>/reducers.ts

Once a reducer is created, it must be registered in the `rootReducer` which can be found at [src/ducks/index.ts](https://github.com/reach4help/reach4help/blob/master/web-client/src/ducks/index.ts)

We have provided a helpful utility that can be used for creating reducers to fully leverage the existing tools.
This utility can be found at [src/store/utils/createReducer.ts](https://github.com/reach4help/reach4help/blob/master/web-client/src/store/utils/createReducer.ts)

An Example of how to use this utility can be seen at [src/ducks/auth/reducer.ts](https://github.com/reach4help/reach4help/blob/master/web-client/src/ducks/auth/reducer.ts)

The `createReducer` function accepts two arguments:
### Object with Listeners for each Action Type State
The first argument that the `createReducer` accepts is an object with 
* keys as the `State` of each `Action Type` that the reducer must listen to for updating its state
* values as functions that accept the current state and the action payload as arguments and modifies the state.

The `createReducer` function creates Reducers with [ImmerJS](https://github.com/immerjs/immer) and so the functions don't need to return any value, they can directly modify the state.

The function that is provided as the value to an action type should accept the Two Arguments:
* state - the current state of the reducer
* data - A wrapper around the returned value from the function executed when an action is dispatched or the updates received from service in case the action is subscribing to a service.
the data argument would be an object with the attribute `payload`, which will be the data returned by the function.

### initialState
This is the values with which the reducer's state must be initialized to. This would be the state of the reducer, the very first time the reducer is initialized.

# Firebase
Firebase is configured at [src/firebase/index.ts](https://github.com/reach4help/reach4help/blob/master/web-client/src/firebase/index.ts)
This file exports the configured `Firebase App` along with the instances of `Firestore` and `Firebase Auth`

## Firestore
Firestore can be interacted with using the `Firestore SDK` from Firebase.
An instance of the firestore class can be obtained from  [src/firebase/index.ts](https://github.com/reach4help/reach4help/blob/master/web-client/src/firebase/index.ts) as `firestore`.

Firestore lets you perform one time queries on the firestore db and also lets you attach listeners to queries to listen for updates to data in the query.

One Time queries can be executed in the same way as any other HTTP request is made, except that instead of using Axios or Fetch or XMLHttpRequest, you will be using the firestore SDK

[This is the Guideline](https://github.com/reach4help/reach4help/wiki/Interacting-with-Data-(App-State-and-External-Data-Sources)#asyncoperation) on how to perform these operations.

Queries that listen to updates from Firestore can be implemented using the Observer Actions.

[This the Guideline](https://github.com/reach4help/reach4help/wiki/Interacting-with-Data-(App-State-and-External-Data-Sources)#observer) on how to perform these operations.

## Firebase Auth
Firebase Auth can be interacted with using the `Firebase Auth SDK` from Firebase.
An instance of the Auth class can be obtained from  [src/firebase/index.ts](https://github.com/reach4help/reach4help/blob/master/web-client/src/firebase/index.ts) as `firebaseAuth`

Currently we support Login and Sign up using `Facebook Sign-in` method and are implementing mobile number verification through `Phone Number` method of `Firebase Auth`.

These have already been implemented and have been tested. 

We support both authentication via pop-up and redirect.

Persisting Users have also been taken care of