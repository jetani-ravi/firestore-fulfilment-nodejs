'use strict';

const functions = require('firebase-functions');
const admin = require('firebase-admin');
const { WebhookClient } = require('dialogflow-fulfillment');

// Enable library debugging statements
process.env.DEBUG = 'dialogflow:*';

// Initialize Firebase Admin SDK
admin.initializeApp(functions.config().firebase);

// Get a reference to Firestore
const db = admin.firestore();

// Cloud Function to handle Dialogflow fulfillment
exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
  // Create a new instance of WebhookClient
  const agent = new WebhookClient({ request, response });

  // Function to write data to Firestore
  const writeToDb = (agent) => {
    // Get parameter from Dialogflow with the string to add to the database
    const databaseEntry = agent.parameters.databaseEntry;

    // Get the reference to the 'dialogflow' collection and 'agent' document
    const dialogflowAgentRef = db.collection('dialogflow').doc('agent');

    // Run a Firestore transaction to set the document with the provided entry
    return db.runTransaction(t => {
      t.set(dialogflowAgentRef, { entry: databaseEntry });
      return Promise.resolve('Write complete');
    }).then(() => {
      agent.add(`Wrote "${databaseEntry}" to the Firestore database.`);
    }).catch(err => {
      console.log(`Error writing to Firestore: ${err}`);
      agent.add(`Failed to write "${databaseEntry}" to the Firestore database.`);
    });
  };

  // Function to read data from Firestore
  const readFromDb = (agent) => {
    // Get the reference to the 'dialogflow' collection and 'agent' document
    const dialogflowAgentDoc = db.collection('dialogflow').doc('agent');

    // Read the value of 'entry' in the document and send it to the user
    return dialogflowAgentDoc.get()
      .then(doc => {
        if (!doc.exists) {
          agent.add('No data found in the database!');
        } else {
          agent.add(doc.data().entry);
        }
        return Promise.resolve('Read complete');
      }).catch(() => {
        agent.add('Error reading entry from the Firestore database.');
        agent.add('Please add an entry to the database first by saying, "Write <your phrase> to the database"');
      });
  };

  // Map from Dialogflow intent names to functions to be run when the intent is matched
  const intentMap = new Map();
  intentMap.set('ReadFromFirestore', readFromDb);
  intentMap.set('WriteToFirestore', writeToDb);
  
  // Handle the Dialogflow request using the intent map
  agent.handleRequest(intentMap);
});
