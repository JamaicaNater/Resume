function camelCaseToCapitalizedWords(input) {
    // Use a regular expression to split the input string at each capital letter.
    // The regular expression matches any capital letter that is not followed by another capital letter.
    const wordsArray = input.split(/(?=[A-Z])/);
  
    // Capitalize the first letter of each word and join them with spaces.
    const capitalizedWords = wordsArray.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  
    return capitalizedWords;
}
  
export default camelCaseToCapitalizedWords