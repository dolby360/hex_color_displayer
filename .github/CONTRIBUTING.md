# Contributing to `hex-color-displayer`

:clap: First off, thank you for taking the time to contribute. :clap:

Contributing is pretty straight-forward:

- Fork the repository
- Open new brach
- Commit your changes
- Create a pull request against the `master` branch

## Install remote development version

Contributions are welcome in all shapes or forms.
If you're a user, you can play around with the current version in development and report back if you bump into anything
suspicious.

Install development version using `npm`:

```bash
npm install
```

## Get started

Scroll around [package.json](../package.json) and get familiarize with the project,
pay attention to the following section, as most of the developing steps will use these scripts:

```json
"scripts":{
  // some scrips you can run using npm
}
```

To get you going, here are some npm scripts I use constantly while working on *hex-color-displayer*:

- ```npm run storybook```
- ```npm test```

# Debugging
The easiest way to deubg this code is to use storybook.
To debug storybook with vscode you can use the following configuration.
```json
{
    "version": "0.2.0",
    "configurations": [
        {
            "name": "Storybook Debug",
            "type": "node-terminal",
            "request": "launch",
            "command": "npm run storybook",
            "internalConsoleOptions": "openOnFirstSessionStart",
            "serverReadyAction": {
                  "pattern": "Local:.+(https?://[^:]+:[0-9]+)",
                  "uriFormat": "%s",
                  "action": "debugWithChrome"
            }
        }
    ]
}
```