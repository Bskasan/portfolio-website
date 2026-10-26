/*
  The CRT monitor drawn around the page: the glass behind the content, then the
  scanline / vignette overlays, the bezel and the monitor chin on top. All layers
  are fixed and ignore the pointer, so the page underneath scrolls and clicks
  normally. Each layer has a view-transition name (see styles/crt.css) so the
  monitor stays still while the page content changes.
*/
const CrtFrame = () => {
  return (
    <>
      <div className="crt-glass" aria-hidden="true" />
      <div className="crt-frame" aria-hidden="true">
        <div className="crt-screen-fx">
          <div className="crt-scan" />
          <div className="crt-vignette" />
          <div className="crt-roll" />
        </div>
        <div className="crt-bezel" />
        <div className="crt-shell" />
        <div className="crt-chin">
          <span>RONINDEV</span>
          <span className="crt-grille" />
          <span>
            POWER
            <span className="crt-led" />
          </span>
        </div>
      </div>
    </>
  );
};

export default CrtFrame;
