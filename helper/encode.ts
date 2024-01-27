export function replaceSpecialCharsWithBase10(originalText: string) {
  let result = '';
  for (let i = 0; i < originalText.length; i++) {
    const char = originalText.charAt(i);
    if (char.match(/[^\w\s]/)) {
      result += '#' + originalText.charCodeAt(i) + ';';
    } else {
      result += char;
    }
  }
  return result;
}
