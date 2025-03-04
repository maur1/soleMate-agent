# SoleMate
Find your running shoe
  
* [Try it out](https://sole-mate-sigma.vercel.app/)


## How to use

To run the example locally you need to:

1. Sign up at [OpenAI's Developer Platform](https://platform.openai.com/signup).
2. Go to [OpenAI's dashboard](https://platform.openai.com/account/api-keys) and create an API KEY.
3. Create a [Strava Access Token](https://developers.strava.com/docs/getting-started/)
4. [Create](app/api/assistant/assistant-setup.md) an OpenAi Assistant with functions
5. Set the required environment variable as the token value as shown [the example env file](./.env.local.example) but in a new file called `.env.local`
6. `pnpm install` to install the required dependencies.
7. `pnpm dev` to launch the development server.

