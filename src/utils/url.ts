export function removeSearchParam(paramName: string) {
    const url = new URL(window.location.href);
    url.searchParams.delete(paramName);
    window.history.replaceState({}, "", url.toString());
  }