# MOVIE APP

This project is built using NextJs to allow users to query the imdb database and get movie information in a summarised format.

## Dependencies
1. Redux toolkit: To leverage its robust state management and useQuery hooks.
2. Zod: For validation on the backend and frontend
3. Chakra UI: for reusable styled components
4. Tailwinds: for easier styling using classnames
5. React icons: Icon library
6. React Hook Form: Form library to aid form management
7. Jest: for frontend and API testing
8. msw: To aid with mocking http requests for testing
9. cross-fetch: To add fetching functionality in the jest tests


## Getting Started

1. Create you own .env file as described below

2. Install the application:

```bash
npm install
# or
yarn install
```

3. Test the application:

```bash
npm run test
# or
yarn test
```

4. If test successful, build the application:

```bash
npm run build
# or
yarn build
```


5. Lastly, start the application:
```bash
npm run start
# or
yarn start
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## Required Environment Variables
API_KEY={OMDB API KEY} <br />
BASE_URL={Base url of the service e.g. http://localhost:3000}

## Live version of APP
https://movie-demo-app-081e2e6a8158.herokuapp.com/


## Link to Gitbhub repository
https://github.com/andrewouko/movie-search
