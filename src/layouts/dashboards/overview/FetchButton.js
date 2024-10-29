import React, { useState } from "react";

/* eslint-disable react/prop-types */
const FetchButton = ({ surveyId, fetchResponses }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true); // Set loading state to true
    await fetchResponses(surveyId); // Trigger the fetch operation
    setIsLoading(false); // Reset loading state after fetch is done
  };

  return (
    <button
      onClick={handleClick}
      style={{
        padding: "8px 16px",
        backgroundColor: "#27a2c2",
        color: "white",
        border: "none",
        borderRadius: 5,
        cursor: "pointer",
      }}
      disabled={isLoading} // Disable button while loading
    >
      {isLoading ? "Loading..." : "Fetch Responses"}
    </button>
  );
};

export default FetchButton;
