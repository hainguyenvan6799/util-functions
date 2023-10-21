export function waitForElementToLoad(elementSelector, callback, timeoutInMillisecond) {
  const targetNode = document;
  const config = { childList: true, subtree: true };

  const observer = new MutationObserver(function (mutationsList, observer) {
    for (let mutation of mutationsList) {
      if (mutation.target.querySelector(elementSelector)) {
        callback();
        observer.disconnect();
        return;
      }
    }
  });

  observer.observe(targetNode, config);

  setTimeout(() => {
    observer.disconnect();
  }, timeoutInMillisecond);
}
