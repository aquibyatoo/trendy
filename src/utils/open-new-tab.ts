export function openTab(URL: string) {
  const newWindow = window.open(URL, "_blank", "noopener,noreferrer");
  if (newWindow) newWindow.opener = null;
}
