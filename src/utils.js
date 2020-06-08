// Mostly from Braid Design System by SEEK
// Cf. https://github.com/seek-oss/braid-design-system/blob/7acbe2f92f9313b95d3ab25bfc5fc1bce29dfdb3/lib/hooks/typography/baseline.ts
// Modified to taking in all values as rems.
function baselineStyles({
  typeSizeModifier,
  baseFontSize,
  descenderHeightScale,
  typeRowSpan,
  gridRowHeight,
  capHeight
}) {
  const fontSize = typeSizeModifier * baseFontSize;

  const calculateTypeOffset = lh => {
    const lineHeightScale = lh / fontSize;
    return (lineHeightScale - 1) / 2 + descenderHeightScale;
  };

  const lineHeight = typeRowSpan * gridRowHeight;
  const typeOffset = calculateTypeOffset(lineHeight);

  const topSpace = lineHeight - capHeight * fontSize;
  const heightCorrection =
    topSpace > gridRowHeight ? topSpace - (topSpace % gridRowHeight) : 0;
  const preventCollapse = gridRowHeight;

  return {
    fontSize: `${fontSize}rem`,
    lineHeight: `${lineHeight}rem`,
    transform: `translateY(${typeOffset}em)`,
    paddingTop: `${preventCollapse}rem`,
    "&:before": {
      content: "''",
      marginTop: `-${heightCorrection + preventCollapse}rem`,
      display: "block",
      height: 0
    }
  };
}

// Mostly from Polished by Styled Components
// Cf. https://github.com/styled-components/polished/blob/3fdfe9b73a5b5c7f5636c42471c2bc9bed2f56ca/src/helpers/getValueAndUnit.js
const cssRegex = /^([+-]?(?:\d+|\d*\.\d+))([a-z]*|%)$/;
function getValueAndUnit(value) {
  if (typeof value !== "string") return [value, ""];
  const matchedValue = value.match(cssRegex);
  if (matchedValue) return [parseFloat(value), matchedValue[2]];
  return [value, undefined];
}

function createCssSelectors(fontFamily, sizeName, leading) {
  return (
    `.font-${fontFamily}.text-${sizeName}.leading-${leading}.baseline, ` +
    `.font-${fontFamily} .text-${sizeName}.leading-${leading}.baseline, ` +
    `.font-${fontFamily} .text-${sizeName} .leading-${leading}.baseline ,` +
    `.text-${sizeName} .font-${fontFamily}.leading-${leading}.baseline, ` +
    `.text-${sizeName} .font-${fontFamily} .leading-${leading}.baseline`
  );
}

module.exports = { baselineStyles, getValueAndUnit, createCssSelectors };
