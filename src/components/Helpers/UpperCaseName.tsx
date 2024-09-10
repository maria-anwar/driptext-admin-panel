// Utility function to get initials from a name
const getInitials = (name: string): string => {
    if (!name) return "";
    const words = name.split(" ");
    const firstTwoWords = words.slice(0, 2);
    return firstTwoWords
      .map(word => word[0].toUpperCase())
      .join("");
  };
  
  export default getInitials;
  