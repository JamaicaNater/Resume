export function camelCaseToCapitalizedWords(camelCaseString) {
  const words = camelCaseString
    .replace(/([a-z])([A-Z])/g, '$1 $2') // Add space between lowercase and uppercase letters
    .split(' '); // Split by space

  const capitalizedWords = words.map(word => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  });

  return capitalizedWords.join(' ');
}
