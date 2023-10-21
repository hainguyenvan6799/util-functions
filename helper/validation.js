const isNumberPositive = (number) => {
  const regex = /^(?:[1-9]\d*|\d)$/;
  return regex.test(number);
}

const isFullscreen = () => {
  return !!(
    document.fullscreenElement ||
    document['mozFullScreenElement'] ||
    document['msFullscreenElement']
  );
};
