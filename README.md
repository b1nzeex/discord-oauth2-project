# Discord OAuth2 Project

### An open source React and Fastify application to learn Discord OAuth2

![Screenshot of the Discord OAuth2 Project](https://i.imgur.com/hj5rubQ.png)

## How does Discord OAuth2 Work?

> OAuth 2.0 is an authorization framework for delegated access to APIs. It involves clients that request scopes that Resource Owners authorize/give consent to. Authorization grants are exchanged for access tokens and refresh tokens (depending on flow).

###### In this case, we are using Discord OAuth2 which works as follows:

- The user clicks a login button on the website which redirects them to discord's authorization page
- When the user clicks "Authorize", discord will redirect the user back to the website to continue the OAuth2 flow
- When redirected, a "code" query parameter will appear in the URL (e.g. http://127.0.0.1:3000?code=CODE_HERE)
- The code is then used to make an API request to discord to exchange the code for an access token
- An access token, refresh token and some other information is then returned after the code is provided
- The access token is stored (optionally, you can store the refresh token too) in cookies, a database or in this project's case, browser local storage
- This access token is then referenced at anytime to make API requests to discord (such as obtaining user information)

## Step 1

###### Clone the GitHub repository to your computer

```
git clone https://github.com/b1nzeex/discord-oauth2-project.git discord-oauth2-project
```

## Step 2

###### Step into the project directory and and into both sub-directories and run the NPM install commands

```
cd discord-oauth2-project
cd api
npm i
cd ..
cd react
npm i
cd ..
```

## Step 3

###### Go to [Discord Developer Portal](https://discord.com/developers) and create an application and get your Client ID and Client Secret from the OAuth2 tab and add http://127.0.0.1:3000 as your redirect URL while you're there

![Screenshot of Discord Developer Portal](https://i.imgur.com/yjQI5PR.png)

## Step 4

###### In the /api/src directory, create a config.ts file and put the following contents inside replacing information with your relevant information - keep the port as 8000

```ts
export const CLIENT_ID = "YOUR_CLIENT_ID";
export const CLIENT_SECRET = "YOUR_CLIENT_SECRET";
export const PORT = 8000;
export const WEB_URL = "http://127.0.0.1:3000";
```

## Step 5

###### Now ensure you're in the /discord-oauth2-project/api directory and run the TypeScript compiler command

```
tsc
```

_If you run into problems with this, you may need to install TypeScript using the following command_

```
npm i -g typescript
```

## Step 6

###### If you completed the previous steps correctly, the command "tsc" will have returned an empty response - now you can start the API by running the index.js file within the dist folder

```
node dist/index.js
```

## Step 7

###### Now launch a new terminal and step into the /discord-oauth2-project/react directory and edit the /discord-oauth2-project/react/src/config.js file with your relevant information

```js
export const CLIENT_ID = "";
export const REDIRECT_URL = "http://127.0.0.1:3000";
export const API_URL = "http://127.0.0.1:8000";
```

## Step 8

###### Now run the following command to start your website!

```
npm run start
```

## Step 9

###### Now navigate to http://127.0.0.1:3000 in your browser and test the OAuth2 flow!

## Problems?

###### Feel free to contact me via Discord - Host#1291
