import { createPortal } from "react-dom";

export function Portal({
  children,
  destinatinId,
}: {
  children: React.ReactNode;
  destinatinId: string;
}) {
  let domNode = null;
  if (domNode == null) domNode = document.getElementById(destinatinId);
  if (domNode == null) return null;
  return createPortal(children, domNode);
}
