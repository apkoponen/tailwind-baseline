import plugin from "tailwindcss/plugin";
import { baselineStyles, createCssSelectors, getValueAndUnit } from "./utils";

module.exports = plugin(function({ addUtilities, theme }) {
  const spacing = theme("spacing", {});
  // We assume the spacing 1 to be the grid's row height, as it is by default in Tailwind
  const [gridRowHeightRem] = getValueAndUnit(spacing["1"]);
  const { fonts } = theme("baseline", {});
  const lineHeight = theme("lineHeight", {});
  const fontSize = theme("fontSize", {});

  const multiplierLeadings = Object.keys(lineHeight).filter(
    leading => !lineHeight[leading].endsWith("rem")
  );
  const remLeadings = Object.keys(lineHeight).filter(leading =>
    lineHeight[leading].endsWith("rem")
  );

  const utilities = {};
  Object.keys(fonts).forEach(fontFamily => {
    const fontConfig = fonts[fontFamily];
    const fontBasekickConfig = {
      baseFontSize: 1,
      gridRowHeight: gridRowHeightRem,
      descenderHeightScale: fontConfig.descenderHeightScale,
      capHeight: fontConfig.capHeight
    };
    Object.keys(fontSize).forEach(sizeName => {
      const [fontSizeRem] = getValueAndUnit(fontSize[sizeName]);

      multiplierLeadings.forEach(leading => {
        const [lineHeightMultiplier] = getValueAndUnit(lineHeight[leading]);
        utilities[
          createCssSelectors(fontFamily, sizeName, leading)
        ] = baselineStyles({
          typeSizeModifier: fontSizeRem,
          typeRowSpan: Math.ceil(
            (lineHeightMultiplier * fontSizeRem) / gridRowHeightRem
          ),
          ...fontBasekickConfig
        });
      });

      remLeadings.forEach(leading => {
        const [lineHeightRem] = getValueAndUnit(lineHeight[leading]);
        utilities[
          createCssSelectors(fontFamily, sizeName, leading)
        ] = baselineStyles({
          typeSizeModifier: fontSizeRem,
          typeRowSpan: Math.ceil(lineHeightRem / gridRowHeightRem),
          ...fontBasekickConfig
        });
      });
    });
  });

  utilities[".baseline-debug-stripe"] = {
    background: `repeating-linear-gradient(0, #68d391,#68d391 ${gridRowHeightRem}rem, #c6f6d5 ${gridRowHeightRem}rem, #c6f6d5 ${2 *
      gridRowHeightRem}rem)`
  };
  utilities[".baseline-debug-line"] = {
    background:
      "linear-gradient(rgba(255, 0, 0, 0.15), rgba(255, 0, 0, 0.15) 1px, transparent 1px)",
    backgroundSize: `1px ${gridRowHeightRem}rem`
  };
  addUtilities(utilities);
});
