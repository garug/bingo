# Bingo API

This is a simple Bingo API designed to serve bingo games. It's built with Deno, and requires minimal setup to run locally.

## Prerequisites

- [Deno](https://deno.land/) must be installed. Follow the official installation guide for your OS.
  
## Environment Setup

To authenticate users, the API requires a `.env` file with a valid Google Client ID to verify tokens locally.

1. Create a `.env` file in the root directory of the project.
2. Add the following line, replacing `<YOUR_GOOGLE_CLIENT_ID>` with your actual Google Client ID:

   ```env
   GOOGLE_CLIENT_ID=<YOUR_GOOGLE_CLIENT_ID>
   ```

## Running the API

Once you have Deno installed and your `.env` file configured, you can start the API with a single command:

```bash
deno task dev
```

This command will start the server and initialize the API locally.

## API Endpoints

*TODO: document future endpoints*

## Notes

- Ensure the Google Client ID in your `.env` file is accurate for token validation to work correctly.
- If you encounter issues with Deno, check that your version is up-to-date.
