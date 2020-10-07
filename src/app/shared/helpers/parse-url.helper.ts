export function parseUrl(url: string, redirectTo: string) {
  const urlTokens = url.split('/');
  const redirectToTokens = redirectTo.split('/');

  let token = redirectToTokens.shift();

  while (token) {
    if (token !== '.' && token !== '..') {
      redirectToTokens.unshift(token);
      break;
    }

    if (token === '..') {
      urlTokens.pop();
    }

    token = redirectToTokens.shift();
  }

  urlTokens.push(...redirectToTokens);

  return urlTokens.join('/');
}
