Octopus Front End Test
======================

This project contains a Next.js app and a stub server to give you some data to work with locally.

In this code test, you'll be asked to fill out the front end tests and then make them pass by writing an app that consumes the API.

We've included a sample Next.js project for your convenience, you're welcome to swap
it out for another framework and/or use Typescript if you prefer.

You're also welcome to write more tests for other parts of the application - but design those however you like.

Getting started
---------------

First you'll need to install your dependencies. We've used yarn, if you have another preference feel
free to remove the lock file and use what you are comfortable with:

```bash
cd client && yarn
```

Start the app
-------------

```bash
yarn dev
```

This will do two things:

1. Start a Next.js app running in development on [http://localhost:3000](http://localhost:3000) 
2. Start a graphQL stub server running on [http://localhost:3001/graphql](http://localhost:3001/graphql)


Running tests
-------------

You can run tests from the `client` directory.

```bash
cd client && yarn test
```

This should give you two failures:

```bash
 FAIL src/App.test.js
  ✕ should be able to increase and decrease product quantity
  ✕ should be able to add items to the basket
```

The task is to build the app that passes these tests :)

Best of luck!


What we're looking for:
----------------------

We would like you to demonstrate your ability to:

- Reason through a programming problem
- Implement a visual design
- Implement some user interactions
- Write code that is easy to understand and extend
- Write tests that document and safeguard the program's behaviour
- Use a version control system (e.g. `git`) effectively to convey intent and keep changes small