const plugin = require("../src/index");
const invokePlugin = require("./_utils/invokePlugin");

test("should work with multiple fontSizes and lineHeights", () => {
  const config = {
    theme: {
      spacing: {
        "1": "0.25rem"
      },
      fontSize: {
        sm: "0.875rem",
        base: "1rem",
        "5xl": "3rem"
      },
      lineHeight: {
        none: "1",
        snug: "1.375",
        "3": ".75rem",
        "4": "1rem"
      },
      fontFamily: {
        sans: ["Inter var"]
      },
      baseline: {
        fonts: {
          sans: {
            descenderHeightScale: 0.136,
            capHeight: 0.723
          }
        }
      }
    },
    variants: {}
  };

  const { utilities } = invokePlugin(plugin.handler, config);
  const utilityObject = utilities[0][0];
  const utilityKeys = Object.keys(utilityObject);

  const textSmLeadningNone = utilityObject[utilityKeys[0]];
  expect(textSmLeadningNone.fontSize).toEqual("0.875rem");
  expect(textSmLeadningNone.lineHeight).toEqual("1rem");
  expect(textSmLeadningNone.transform).toEqual(
    "translateY(0.2074285714285714em)"
  );
  expect(textSmLeadningNone["&:before"].marginTop).toEqual("-0.5rem");

  expect(utilityObject).toMatchSnapshot();
});

test("should generate styles for all configured fonts", () => {
  const config = {
    theme: {
      spacing: {
        "1": "0.25rem"
      },
      fontSize: {
        base: "1rem"
      },
      lineHeight: {
        none: "1"
      },
      fontFamily: {
        sans: ["Inter var"],
        serif: ["Merriweather"],
        mono: ["Roboto Mono"]
      },
      baseline: {
        fonts: {
          sans: {
            descenderHeightScale: 0.136,
            capHeight: 0.723
          },
          serif: {
            descenderHeightScale: 0.144,
            capHeight: 0.7462
          },
          mono: {
            descenderHeightScale: 0.111,
            capHeight: 0.7077
          }
        }
      }
    },
    variants: {}
  };

  const { utilities } = invokePlugin(plugin.handler, config);
  const classNames = Object.keys(utilities[0][0]);

  expect(classNames).toHaveLength(5);
  expect(classNames[0]).toContain(".font-sans");
  expect(classNames[1]).toContain(".font-serif");
  expect(classNames[2]).toContain(".font-mono");
});
