// tslint:disable:only-arrow-functions

const urlRegex: RegExp = /https?:\/\/([^/]+)\/?.*/i;
export function getHostname(url: string): undefined | string {
  const hostname: string = url.replace(urlRegex, "$1");
  if (hostname === url) {
    // There is no hostname in the string.
    return undefined;
  } else {
    return hostname;
  }
}
