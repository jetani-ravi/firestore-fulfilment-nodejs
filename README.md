# Dialogflow Firestore Sample

## Description
This sample illustrates the integration of Dialogflow with Firestore database. It showcases the process of parsing user requests using Dialogflow and triggering Firebase functions to add or retrieve entries from Firestore. Users can instruct the Dialogflow agent to write or retrieve data from the database.

## Features
- Adds user input to the Firestore database.
- Retrieves previously stored data from the database.
- Demonstrates the interaction flow: Dialogflow → Webhook Request → Firebase Function → Firestore Database.

## Use Cases
This sample serves as a foundation for connecting databases to Dialogflow agents. It can be expanded to store user preferences, retrieve data from external systems, or facilitate user collaboration through chat/voice.

## Setup

### Dialogflow and Fulfillment
1. Use the provided [template](https://console.dialogflow.com/api-client/oneclick?templateUrl=https://oneclickgithub.appspot.com/dialogflow/fulfillment-firestore-nodejs) to create the agent.
2. Enable Inline Editor in Dialogflow console under Fulfillment and deploy.

### Firestore
1. In Dialogflow console, go to Fulfillment > Enable Inline Editor > Deploy.
2. View execution logs in the Firebase console.
3. In Firebase console, create a database, starting in locked mode and enabling it.


## References & Issues
- For questions, check [StackOverflow](https://stackoverflow.com/questions/tagged/dialogflow) or [Dialogflow Developer Community](https://plus.google.com/communities/103318168784860581977).
- Refer to Dialogflow [Documentation](https://dialogflow.com/docs/getting-started/basics).
