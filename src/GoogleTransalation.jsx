import React, { useEffect } from 'react';

const GoogleTranslation = () => {
  useEffect(() => {
    const googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement({
        pageLanguage: 'en',
        includedLanguages: 'de',
        layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
      }, 'google_translate');
    };

    const applyCustomTranslateStyles = () => {
      const translateElement = document.getElementById("google_translate");
      if (translateElement) {
        Object.assign(translateElement.style, {
          zIndex: 99999,
       
          width: "40px",
          height: "40px",
          overflow: "hidden",
          borderRadius: "50%", // Make the outer div round
          display: "flex",      // Center contents
          justifyContent: "center",
          alignItems: "center",
        });

        const translateElementInner = translateElement.querySelector(".goog-te-gadget-simple");
        if (translateElementInner) {
          Object.assign(translateElementInner.style, {
            display: "flex",
            alignItems: "center",
            justifyContent: "center", // Center inner contents
            borderRadius: "50%",       // Ensure inner element is also round
            width: "50px",             // Fill the outer div
            height: "50px",            // Fill the outer div
            
          });

          const googleLogo = translateElementInner.querySelector("img");
          if (googleLogo) {
            googleLogo.remove();

            const customLogo = document.createElement("img");
            customLogo.src = "/language.png"; // Path to your custom logo
            customLogo.alt = "Custom Logo";

            customLogo.style.width = "100%";  // Make logo fill the inner div
            customLogo.style.height = "100%"; // Make logo fill the inner div
            customLogo.style.borderRadius = "50%"; // Ensure logo is round
            customLogo.style.objectFit = "cover"; // Ensure the logo fits well
            customLogo.style.display = "block"; // Block level to remove extra space

            translateElementInner.appendChild(customLogo); // Append the logo to the inner div
          }

          const dropdown = translateElementInner.querySelector("span");
          if (dropdown) {
            dropdown.style.display = "none"; // Hide the dropdown
          }

          const poweredBy = translateElementInner.querySelector("span a");
          if (poweredBy) {
            poweredBy.style.display = "flex"; // Ensure it displays properly
          }
        }
      }
    };

    const script = document.createElement('script');
    script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true; // Load the script asynchronously
    document.head.appendChild(script);

    script.onload = () => {
      setTimeout(applyCustomTranslateStyles, 200);
    };

    script.onerror = () => {
      console.error("Error loading Google Translate script.");
    };

    window.googleTranslateElementInit = googleTranslateElementInit;

    // Cleanup script on unmount
    return () => {
      document.head.removeChild(script);
      delete window.googleTranslateElementInit;
    };
  }, []);

  return <div id="google_translate"></div>;
};

export default GoogleTranslation;
