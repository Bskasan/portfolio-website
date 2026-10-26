import { ComponentProps } from "react";

/*
  Every page's content area: the screen's side gutter and vertical rhythm, plus a
  short fade-in as the "tube warms up". The fade is plain CSS (.page-in in
  styles/crt/components.css) so it starts on first paint — the previous Framer Motion
  version kept server-rendered pages invisible until JavaScript had loaded.
*/
const PageWrapper = ({ className, ...props }: ComponentProps<"div">) => {
  return (
    <div
      {...props}
      className={`page-in pad pt-[34px] pb-14 max-frame:pt-6 max-frame:pb-10 ${className ?? ""}`}
    />
  );
};

export default PageWrapper;
