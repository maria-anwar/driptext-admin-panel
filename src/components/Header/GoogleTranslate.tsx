import React, { useEffect } from "react";

// Extend the Window interface to include the google property
declare global {
  interface Window {
    google: any;
    googleTranslateElementInit: () => void;
  }
}

const GoogleTranslate = () => {
  useEffect(() => {
    // Function to initialize Google Translate
    const googleTranslateInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages: "de", // Add more languages if needed
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
        },
        "google_translate_element"
      );
    };

    // Load the Google Translate script
    const addGoogleTranslateScript = () => {
      const script = document.createElement("script");
      script.src =
        "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);

      window.googleTranslateElementInit = googleTranslateInit;
    };

    addGoogleTranslateScript();

    // Apply custom styling after a delay to ensure the widget is loaded
    const applyCustomTranslateStyles = () => {
      const translateElement = document.querySelector(
        "#google_translate_element .goog-te-gadget-simple"
      ) as HTMLElement;
      if (translateElement) {
        translateElement.style.display = "flex";
        translateElement.style.alignItems = "center";
        translateElement.style.width = "3rem";
        translateElement.style.height = "3rem";
        translateElement.style.borderRadius = "50%";
        translateElement.style.backgroundColor = "#f7f7f7";
        translateElement.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.1)";
        translateElement.style.cursor = "pointer";
        translateElement.style.overflow = "hidden";
        translateElement.style.marginLeft = "1rem";

        

        // Optional: Hide "Powered by Google" text
        const poweredBy = document.querySelector(
          "#google_translate_element .goog-te-gadget span a"
        );
        if (poweredBy) (poweredBy as HTMLElement).style.display = "none";
      }
    };

    setTimeout(applyCustomTranslateStyles, 1000);
  }, []);

  return <div id="google_translate_element"></div>;
};

export default GoogleTranslate;
