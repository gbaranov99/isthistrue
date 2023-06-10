# Is This True

A fact-checking website powered by cutting-edge Large Language Models to determine the truth of a claim.

Visit [isthistrue.site](https://isthistrue.site) to check out the website.

## Setting OpenAI API key

To run this project, you must have an OpenAI API key, which can be created [here](https://platform.openai.com/account/api-keys).

Create a file `.env` in the root of the project with the following config: `OPENAI_API_KEY=sk-<your key>...` so that the app can read and use your API key.

## Development server

This project can be run on a dev server with `npm start`

## Build

This project runs in production on a docker container. 

Run `docker build -t isthistrue .` to build the docker image.

Run `docker run --name isthistrue-container -d -p 8080:80 isthistrue` to build the project. It will be running at [localhost:8080](http://localhost:8080)
