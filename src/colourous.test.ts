import colourous from './colourous';

test('generate random colour, generates colour properly', () => {
  const colour = colourous.generateRandomColour();
  colour[0].forEach((val) => {
    expect(+val).toBeGreaterThanOrEqual(0);
    expect(+val).toBeLessThanOrEqual(255);
  });
  colour[1].forEach((val) => {
    expect(val).toMatch(/^[0-9A-F][0-9A-F]$/);
  });
});

test('get hue list, pass in string, returns appropriate hues', () => {
  const colours = [
    'rgb(125,24,255)',
    'rgb(34,245,120)',
    'rgb(100,24,200)',
    'rgb(56,147,198)',
  ];
  const expectedHueLists = [
    ['125', '24', '255'],
    ['34', '245', '120'],
    ['100', '24', '200'],
    ['56', '147', '198'],
  ];
  const hueLists: string[][] = colours.map((val) => {
    return colourous.getHueList(val);
  });
  hueLists.forEach((list, listInd) => {
    list.forEach((hue, hueInd) => {
      expect(hue).toEqual(expectedHueLists[listInd][hueInd]);
    });
  });
});

test('get hue list, pass in string array, returns appropriate hues', () => {
  const colours = [
    ['125', '24', '255'],
    ['34', '245', '120'],
    ['100', '24', '200'],
    ['56', '147', '198'],
  ];
  const expectedHueLists = [
    ['125', '24', '255'],
    ['34', '245', '120'],
    ['100', '24', '200'],
    ['56', '147', '198'],
  ];
  const hueLists: string[][] = colours.map((val) => {
    return colourous.getHueList(val);
  });
  hueLists.forEach((list, listInd) => {
    list.forEach((hue, hueInd) => {
      expect(hue).toEqual(expectedHueLists[listInd][hueInd]);
    });
  });
});

test('get hex hue list, pass in string, returns appropriate hues', () => {
  const colours = [
    '#000000',
    '#f43da6',
    '#546df3',
    '#70d342',
    '#abcdef',
    '#ffffff',
  ];
  const expectedHueLists = [
    ['00', '00', '00'],
    ['f4', '3d', 'a6'],
    ['54', '6d', 'f3'],
    ['70', 'd3', '42'],
    ['ab', 'cd', 'ef'],
    ['ff', 'ff', 'ff'],
  ];
  const hueLists: string[][] = colours.map((val) => {
    return colourous.getHexHueList(val);
  });
  hueLists.forEach((list, listInd) => {
    list.forEach((hue, hueInd) => {
      expect(hue).toEqual(expectedHueLists[listInd][hueInd]);
    });
  });
});

test('get hex hue list, pass in string array, returns appropriate hues', () => {
  const colours = [
    ['00', '00', '00'],
    ['f4', '3d', 'a6'],
    ['54', '6d', 'f3'],
    ['70', 'd3', '42'],
    ['ab', 'cd', 'ef'],
    ['ff', 'ff', 'ff'],
  ];
  const expectedHueLists = [
    ['00', '00', '00'],
    ['f4', '3d', 'a6'],
    ['54', '6d', 'f3'],
    ['70', 'd3', '42'],
    ['ab', 'cd', 'ef'],
    ['ff', 'ff', 'ff'],
  ];
  const hueLists: string[][] = colours.map((val) => {
    return colourous.getHexHueList(val);
  });
  hueLists.forEach((list, listInd) => {
    list.forEach((hue, hueInd) => {
      expect(hue).toEqual(expectedHueLists[listInd][hueInd]);
    });
  });
});

test('get rgb from hue list, pass in string array, returns appropriate rgb strings', () => {
  const hueLists = [
    ['125', '24', '255'],
    ['34', '245', '120'],
    ['100', '24', '200'],
    ['56', '147', '198'],
  ];
  const expectedColours = [
    'rgb(125,24,255)',
    'rgb(34,245,120)',
    'rgb(100,24,200)',
    'rgb(56,147,198)',
  ];
  const colours: string[] = hueLists.map((val) => {
    return colourous.getRGBFromHueList(val);
  });
  colours.forEach((colour, colourInd) => {
    expect(colour).toEqual(expectedColours[colourInd]);
  });
});

test('get rgb from hue list, pass in invalid values, throws appropriate error', () => {
  const hueLists = [
    ['125', '24', '265'],
    ['34', '285', '120'],
    ['100', '400', '200'],
    ['397', '147', '198'],
  ];
  hueLists.forEach((colour, colourInd) => {
    expect(() => {
      colourous.getRGBFromHueList(colour);
    }).toThrow(
      'One or more of the rgb values are outside the accepted range. Each number must be within 0-255'
    );
  });
});

test('convert rgb to hex, pass in rgb hue list, returns appropriate hex hue list', () => {
  const hueLists = [
    ['125', '24', '255'],
    ['34', '245', '120'],
    ['100', '24', '200'],
    ['56', '147', '198'],
  ];
  const expectedHexHueLists = [
    ['7D', '18', 'FF'],
    ['22', 'F5', '78'],
    ['64', '18', 'C8'],
    ['38', '93', 'C6'],
  ];
  const colours: string[][] = hueLists.map((val) => {
    return colourous.convertRGBToHex(val);
  });
  colours.forEach((colour, colourInd) => {
    expect(colour).toEqual(expectedHexHueLists[colourInd]);
  });
});

test('convert rgb to hex, pass in out of range values, throws appropriate error', () => {
  const hueLists = [
    ['260', '24', '255'],
    ['34', '300', '120'],
    ['1000', '24', '200'],
    ['56', '147', '467'],
  ];
  hueLists.forEach((colour, colourInd) => {
    expect(() => {
      colourous.convertRGBToHex(colour);
    }).toThrow(
      'One or more of the values provided was out of range. The range for rgb values is 0-255'
    );
  });
});

test('convert hex to rgb, pass in hex hue list, returns appropriate rgb hue list', () => {
  const hueLists = [
    ['7D', '18', 'FF'],
    ['22', 'F5', '78'],
    ['64', '18', 'C8'],
    ['38', '93', 'C6'],
  ];
  const expectedRGBHueLists = [
    ['125', '24', '255'],
    ['34', '245', '120'],
    ['100', '24', '200'],
    ['56', '147', '198'],
  ];
  const colours: string[][] = hueLists.map((val) => {
    return colourous.convertHexToRGB(val);
  });
  colours.forEach((colour, colourInd) => {
    expect(colour).toEqual(expectedRGBHueLists[colourInd]);
  });
});

test('convert hex to rgb, pass in out of range values, throws appropriate error', () => {
  const hueLists = [
    ['7D', '18', 'FG'],
    ['2Z', 'F5', '78'],
    ['64', 'HR', 'C8'],
    ['R4', '93', 'C6'],
  ];
  hueLists.forEach((colour, colourInd) => {
    expect(() => {
      colourous.convertHexToRGB(colour);
    }).toThrow(
      'One or more of the values passed was not a valid hexadecimal hue value. Only 0-9 and A-F characters are allowed, and only 2 digits for each hue value is allowed'
    );
  });
});

test('calculate luminance, pass in rgb hue list, returns appropriate luminances', () => {
  const hueLists = [
    ['125', '24', '255'],
    ['34', '245', '120'],
    ['100', '24', '200'],
    ['56', '147', '198'],
  ];

  const expectedLuminances = [0.12, 0.67, 0.08, 0.26];
  const luminances: number[] = hueLists.map((val) => {
    return colourous.calculateLuminance(val);
  });
  luminances.forEach((luminance, colourInd) => {
    expect(luminance).toEqual(expectedLuminances[colourInd]);
  });
});

test('calculate luminance, pass in out of range values, throws appropriate error', () => {
  const hueLists = [
    ['267', '24', '255'],
    ['300', '245', '120'],
    ['100', '24', '457'],
    ['342', '147', '198'],
  ];
  hueLists.forEach((hueList) => {
    expect(() => {
      colourous.calculateLuminance(hueList);
    }).toThrow(
      'One or more of the values provided was out of range. The range for rgb values is 0-255'
    );
  });
});
