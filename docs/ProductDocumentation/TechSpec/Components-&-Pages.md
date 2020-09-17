**ATTENTION: This is still an on-going process.**

# Components

## Container components 

Location: [src/containers](https://github.com/reach4help/reach4help/tree/master/web-client/src/containers)

Usually referred to as just **containers**, these components' main responsibility is to manage logic. 
They act as a bridge between the **redux store** and **presentational components**.

**Do's:**
* Interact with redux;
* Handle redirects;
* Have complex logic with react component lifecycle;
* Decide what components to render;

**Dont's:**
* Declare CSS or any other presentational related aspect;
* Have business logic (should be abstracted to managers as much as possible);

**Example**:

```jsx
  UserCreateFormContainer.tsx
  ...
  const handleSubmit = val => {
    createUserAction(val); //dispatch redux actions
  }
  ...
  <>
    {/* handle logic for presentational components */}
    <UserCreateFormComponent onSubmit={handleSubmit} /> 
  </>
```
## Presentational Components

Location: [src/components](https://github.com/reach4help/reach4help/tree/master/web-client/src/components)

Usually referred to as just **components**, Presentational Components are dummy components that should be as atomic as possible and should only worry about the presentation layer.

**Do's:**
* Received props and render output;
* Have presentational state (ex: toggle state);
* Define styles;
* Receive callbacks by props, to abstract logic.

**Dont's:**
* Communicate with redux;
* Be broad (they should be as modular as possible);
* Have logic that is not presentational (ex: Should **not** be the ones to process a form or to validate it)

**Example**:

```jsx
  ProfilePhoto.tsx
  ...
  const StyledContainer = styled.div`
    width: 100%;
    height: 100%;      
  `
  ...
  <StyledContainer onClick={props.handleClick}>
    <Image src={props.imageSrc} />
  </StyledContainer>
  
```

# Pages & Routes

**Pages** and **routes** are the bridge navigation and containers/components. 

## Pages

Location: [src/pages](https://github.com/reach4help/reach4help/tree/master/web-client/src/pages)

Pages are responsible for defining and managing the available routes. 

These are some of the examples of responsibilities that pages might have:

1. [MasterPage](https://github.com/reach4help/reach4help/blob/master/web-client/src/pages/MasterPage.tsx), is responsible for instantiating the router and main routes/pages.
2. [AuthenticatedPage](https://github.com/reach4help/reach4help/blob/master/web-client/src/pages/AuthenticatedPage.tsx), is responsible for deciding whether or not to render routes that should **only be visible** when the user is authenticated.


## Routes

Location: [src/pages/routes](https://github.com/reach4help/reach4help/tree/master/web-client/src/pages/routes)

A route represents **precisely one** URL location and should only be responsible for this location.

**Main responsibilities:**
1. Define the exact pathname;
2. Define some of the page structure;
3. Get state from navigation and pass it to children components.

**Example:**

`src/routes/RecoverPasswordRoute`

   ```js
      constants.js
      ...
      export default RecoverPasswordLocation = new Location ('/recover-password'); 
   ```

   ```jsx
      RecoverPasswordRoute.tsx
      ...
      <>
          <Header title="Landing Page"/>
          <RecoverPasswordFormContainer isRecoverPassword token={location.state.token}/>
          <Footer />
      </> 
   ```
**Note:**

