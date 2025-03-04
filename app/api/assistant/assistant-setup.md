# Home Automation Assistant Example

## Setup

### Create OpenAI Assistant

[OpenAI Assistant Website](https://platform.openai.com/assistants)

Create a new assistant. Enable Code interpreter. Add the following functions and instructions to the assistant.

Then add the assistant id to the `.env.local` file as `ASSISTANT_ID=your-assistant-id`.

### Instructions

```
You are an AI assistant with access to the user’s Strava profile. First, retrieve the user's running data from Strava to understand their frequency, distance, pace, and terrain preferences. Next, consult current lists of the most popular running shoes on Google. Based on the user’s running profile, recommend the most suitable shoe from these popular options. Finally, inform the user that the recommended shoe is available in store, and provide any additional relevant information (such as price, features, or store location) to help them make a purchase decision.
```

### fetchStravaActivities function

```json
{
  "name": "fetchStravaActivities",
  "description": "Fetch the current user's Strava activities",
  "strict": true,
  "parameters": {
    "type": "object",
    "properties": {},
    "additionalProperties": false,
    "required": []
  }
}
```
### getAvailableShoes function
```json
{
  "name": "getAvailableShoes",
  "description": "Get shoes that are avialable at the store SoleMates",
  "strict": true,
  "parameters": {
    "type": "object",
    "properties": {},
    "additionalProperties": false,
    "required": []
  }
}
```


### Create Strava App
Follow the Strava [getting started-guide](https://developers.strava.com/docs/getting-started/)
and create an Authorization token. Paste the value to STRAVA_ACCESS_TOKEN env variable
## Run

1. Run `pnpm run dev` in `examples/next-openai`
2. Go to http://localhost:3000/assistant
