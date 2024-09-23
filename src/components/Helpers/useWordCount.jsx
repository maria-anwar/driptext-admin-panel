import React, { useEffect, useState } from "react";
import { gapi } from "gapi-script";

// Get fixed values from environment variables (adjust for your setup)
const CLIENT_ID = import.meta.env.VITE_CLIENT_ID; // OAuth2 Client ID
const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY; // API Key

// Google Docs API discovery document URL
const DISCOVERY_DOCS = [
  "https://docs.googleapis.com/$discovery/rest?version=v1",
];

// Scopes needed for the API
const SCOPES = "https://www.googleapis.com/auth/documents.readonly";

const useWordCount = (fileId) => {
  const [wordCount, setWordCount] = useState(0);

  useEffect(() => {
    const initializeGapiClient = () => {
      gapi.load("client:auth2", () => {
        gapi.client
          .init({
            apiKey: API_KEY, // Use the API key
            clientId: CLIENT_ID, // Use the Client ID
            discoveryDocs: DISCOVERY_DOCS,
            scope: SCOPES,
          })
          .then(() => {
            // // Get the auth instance
            // const authInstance = gapi.auth2.getAuthInstance();

            // // If user is not signed in, sign in automatically using the fixed values (OAuth credentials)
            // if (!authInstance.isSignedIn.get()) {
            //   authInstance.signIn().then(() => {
            //     if (fileId) {
            //       fetchGoogleDocData(fileId); // After sign-in, fetch the document data
            //     }
            //   });
            // } else {
            //   // If already signed in, directly fetch document data
            //   if (fileId) {
            //     fetchGoogleDocData(fileId);
            //   }
            // }
          })
          .catch((error) => {
            console.error("Error initializing Google API client:", error);
          });
      });
    };

    if (fileId) {
      initializeGapiClient();
    }
  }, [fileId]);

  // Fetch document content and count words
  const fetchGoogleDocData = (documentId) => {
    gapi.client.docs.documents
      .get({
        documentId: documentId,
      })
      .then((response) => {
        const content = response.result.body.content;
        let totalWords = 0;

        content.forEach((element) => {
          if (element.paragraph) {
            element.paragraph.elements.forEach((el) => {
              if (el.textRun && el.textRun.content) {
                const text = el.textRun.content;
                totalWords += text.trim().split(/\s+/).length;
              }
            });
          }
        });

        setWordCount(totalWords);
      })
      .catch((error) => {
        console.error("Error fetching document:", error);
      });
  };

  return wordCount;
};

export default useWordCount;
