This is a web app which uses the shopify api

## Requirements
You've created shopify [development store](https://shopify.dev/apps/tools/development-stores#create-a-development-store-to-test-your-app)

## How to test

- clone the repo 

- navigate into project and run npm install

- create .env file at the root of the project 

- copy content from .env.example into .env and replace access token with your shop's access token

- Also replace BASE_URL to match your shop admin url

- Finaly run the following command :

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
