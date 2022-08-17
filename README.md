## Energy marketplace

This is a simple app using Next.js that currently lists an array of products that can be added or removed from a basket. This uses graphQL for the api and uses tailwind for styling.

To install dependencies, change to the client folder and run yarn:
```bash
cd client && yarn
```

To start the app, whilst in the client folder:
```bash
yarn dev
```

This will do two things:

1. Start a Next.js app running in development on [http:#localhost:3000](http://localhost:3000) 
2. Start a graphQL stub server running on [http://localhost:3001/graphql](http://localhost:3001/graphql)

To run the tests: `yarn test`, and to run the Cypress test: `yarn cypress` within the client folder.

### Notes / future improvements to make

- Currently, this app has several unit tests for various components, and an integration test on Cypress.
- I haven't typed the files despite installing TypeScript - my intention is to type all the files
- I'm currently using db.js, but the queries / mutations are not as relational as they could be. Creating an actual db would be better
- This mainly uses Static Site Generated (SSG) and Server Side Rendering (SSR) pages, and therefore have minimised the use of Redux or React for state management - as  the complexity increases substantially trying to manage client and server state.
- In the future, I should use local storage / caching to track the basket contents.
- Increase testing
- Further refactoring required
