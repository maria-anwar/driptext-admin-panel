// Utility function to get initials from a name
const getInitials = (name: string): string => {
  if (!name || typeof name !== "string") return "";

  const words = name.split(" ").filter(Boolean); // Filter out empty strings
  const firstTwoWords = words.slice(0, 2); // Take first two words if available

  return firstTwoWords
    .map((word) => word[0]?.toUpperCase()) // Check if word[0] exists before accessing
    .join("");
};

export default getInitials;
