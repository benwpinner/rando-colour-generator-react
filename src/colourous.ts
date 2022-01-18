interface Colour {
  rgb: string[];
  hex: string[];
  luminance?: number;
  contrast?: number;
  tints?: Colour[];
  shades?: Colour[];
}

class Colourous {
  _decToHex = [
    `0`,
    `1`,
    `2`,
    `3`,
    `4`,
    `5`,
    `6`,
    `7`,
    `8`,
    `9`,
    `A`,
    `B`,
    `C`,
    `D`,
    `E`,
    `F`,
  ];

  /**
   * Generates random integer within specified range
   * @param {number} min The lower bound of the range
   * @param {number} max The upper bound of the range
   * @returns {number} Random number
   * @author Ben Pinner
   */
  _randomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  /**
   * Rounds a value to a specified number of decimal places
   * @param {number} value Value to be rounded
   * @param {number} precision The number of decimal places to round to, defaults to 0
   * @returns {number} The rounded value
   * @author Ben Pinner
   */
  _round(value: number, precision: number = 0): number {
    var multiplier = Math.pow(10, precision);
    return Math.round(value * multiplier) / multiplier;
  }

  /**
   * Takes a decimal number and converts it to hexidecimal
   * @param {number} dec The decimal number to be converted
   * @returns {string} Hexadecimal value equivalent to decimal value passed
   * @author Ben Pinner
   */
  _convertDecimalToHex(dec: number): string {
    let remainder;
    let remainderString = ``;
    while (dec !== 0) {
      remainder = this._round(dec % 16);
      remainderString = `${this._decToHex[remainder]}${remainderString}`;
      dec = Math.floor(dec / 16);
    }

    return remainderString.padStart(2, `0`);
  }

  /**
   * Generates a random colour returned in rgb and hex format
   * @returns {string[]} Array containing 2 strings: rgb code and hex code
   * @author Ben Pinner
   */
  generateRandomColour(): Colour {
    const colourRGB = [
      `${this._randomInt(0, 255)}`,
      `${this._randomInt(0, 255)}`,
      `${this._randomInt(0, 255)}`,
    ];
    const colourHex = this.convertRGBToHex(colourRGB);
    return { rgb: colourRGB, hex: colourHex, luminance: undefined };
  }

  /**
   * Takes an rgb colour and breaks it down into its 3 values (i.e red value, green value, and blue value)
   * @param {string | string[]} colour The colour to separate into its hues
   * @returns {string[]} The list of hue values for the rgb string passed in
   * @author Ben Pinner
   */
  getHueList(colour: string | string[]): string[] {
    return colour instanceof Array
      ? colour.map((val) => `${this._round(+val)}`)
      : colour
          .slice(4, -1)
          .split(`,`)
          .map((val) => `${this._round(+val)}`);
  }

  /**
   * Takes a hex colour and breaks it down into its 3 values (i.e red value, green value, and blue value)
   * @param {string | string[]} colour The colour to separate into its hues
   * @returns {string[]} The list of hue values for the hex string
   */
  getHexHueList(colour: string | string[]): string[] {
    console.log(colour);
    return colour instanceof Array
      ? colour
      : colour
          .slice(1)
          .split(``)
          .reduce((acc: string[], val, i) => {
            i % 2 === 0
              ? acc.push(val)
              : (acc[Math.floor(i / 2)] = acc[Math.floor(i / 2)] + val);
            return acc;
          }, []);
  }

  /**
   * Converts a list of rgb hue values, to a string of format `rgb(redVal, blueVal, greenVal)`
   * @param {string[]} colour The list of hue values to convert to a string
   * @returns {string} The rgb string
   * @author Ben Pinner
   */
  getRGBFromHueList(colour: string[]): string {
    return `rgb(${colour.map((val) => this._round(+val)).join(`,`)})`;
  }

  /**
   * Converts a colour from rgb format to hex format
   * @param {string[]} colour The colour to convert from rgb to hex
   * @returns {string[]} The hex code generated from the rgb code passed in
   * @author Ben Pinner
   */
  convertRGBToHex(colour: string[]): string[] {
    if (colour.find((hue) => +hue > 255))
      throw new Error(
        'One or more of the values provided was out of range. The range for rgb values is 0-255'
      );
    const hex = colour.map((val) => this._convertDecimalToHex(+val));
    // if (hex.includes(`undefined`)) console.error(`💥💥💥 ${hex}, ${colour}`);
    return hex;
  }

  /**
   * Converts a colour from hex format to rgb format
   * @param {string[]} colour The hex colour to be converted to rgb format
   * @returns  {string[]} The rgb code generated from the hex code
   * @author Ben Pinner
   */
  convertHexToRGB(colour: string[]): string[] {
    if (colour.find((hue) => !hue.match(/^[0-9A-Fa-f][0-9A-Fa-f]$/)))
      throw new Error(
        'One or more of the values passed was not a valid hexadecimal hue value. Only 0-9 and A-F characters are allowed, and only 2 digits for each hue value is allowed'
      );
    return colour.reduce((acc: string[], val) => {
      acc.push(
        val
          .split(``)
          .reverse()
          .reduce(
            (acc, digit, i) =>
              `${+acc + this._decToHex.indexOf(digit.toUpperCase()) * 16 ** i}`,
            ''
          )
      );
      return acc;
    }, []);
  }

  // Maths
  // Tints - New value = current value + ((255 - current value) x tint factor)
  // Shades - New value = current value x shade factor
  /**
   * Takes a colour and generates a tint of that colour, the brightness is dictated by the factor passed in
   * @param {string[]} colour List of the rgb values of colour in order
   * @param {number} factor The factor by which you want to lighten the passed in colour
   * @returns {Colour} The rgb and hex code of the tint generated
   * @author Ben Pinner
   */
  _generateTint(colour: string[], factor: number): Colour {
    const rgb = colour.map((val) => `${+val + (255 - +val) * factor}`);
    const hex = this.convertRGBToHex(rgb);
    return { rgb, hex };
  }

  /**
   * Takes a colour and generates a tint of that colour that's brightness is determined by the factor passed
   * @param {string[]} colour List of the rgb values of colour in order
   * @param {number} factor The factor by which you want to darken the passed in colour
   * @returns {Colour} The rgb and hex code of the shade generated
   * @author Ben Pinner
   */
  _generateShade(colour: string[], factor: number): Colour {
    const rgb = colour.map((val) => `${+val * (1 - factor)}`);
    const hex = this.convertRGBToHex(rgb);
    return { rgb, hex };
  }

  // const [backgroundTints, backgroundShades] = generateShadesTints();

  // if R <= 10 then Rg = R/3294, else Rg = (R/269 + 0.0513)^2.4

  // if G <= 10 then Gg = G/3294, else Gg = (G/269 + 0.0513)^2.4

  // if B <= 10 then Bg = B/3294, else Bg = (B/269 + 0.0513)^2.4

  // L = 0.2126 * Rg + 0.7152 * Gg + 0.0722 * Bg

  /**
   * Calculates the relative luminance of any colour passed in
   * @param {string | string[]} colour The colour to calculate the relative luminance of
   * @returns {number} The relative luminance of the colour passed in
   * @author Ben Pinner
   */
  calculateRelativeLuminance(colour: string[]): number {
    const hueList = this.getHueList(colour);
    const hueValues = hueList.map((val) =>
      +val <= 10 ? `${+val / 3294}` : `${(+val / 269 + 0.0513) ** 2.4}`
    );
    return this._round(
      0.2126 * +hueValues[0] + 0.7152 * +hueValues[1] + 0.0722 * +hueValues[2],
      3
    );
  }

  // If Luminance is less or equal to 0.5, then Saturation = (max-min)/(max+min)
  // If Luminance is bigger then 0.5. then Saturation = ( max-min)/(2.0-max-min)

  /**
   * Calculates the saturation value of a specific colour
   * @param {Object} colour The colour to calculate saturation for
   * @returns {number} The saturation of the colour
   * @author Ben Pinner
   */
  calculateSaturation(colour: Colour): number {
    const hueList = this.getHueList(colour.rgb).map((val) => +val);
    const luminance = colour.luminance;
    const max = Math.max(...hueList);
    const min = Math.min(...hueList);
    if (luminance === undefined) throw new Error('luminance is undefined');
    return luminance <= 0.5
      ? (max - min) / (max + min)
      : (max - min) / (2 - max - min);
  }

  /**
   * Takes a colour and generates a list of tints and a list of shades
   * @param {string[]} colour The colour to generate shades and tints for, either in form `rgb(red,greeb,blue)` or [red,green,blue]
   * @returns {string[][]} The list of shades and list of tints, each colour also has it's luminance returned
   * @author Ben Pinner
   */
  generateShadesTints(colour: string[]): Colour[][] {
    const hueList = this.getHueList(colour);
    const tints = [];
    const shades = [];
    for (let i = 0; i < 9; i++) {
      const tint = this._generateTint(hueList, (i + 1) / 10);
      const shade = this._generateShade(hueList, (i + 1) / 10);
      tints.push({
        ...tint,
        luminance: this.calculateRelativeLuminance(tint.rgb),
      });
      shades.push({
        ...shade,
        luminance: this.calculateRelativeLuminance(shade.rgb),
      });
    }

    return [shades, tints];
  }

  /**
   * Takes two colours and calculates their contrast ratio
   * @param {string[][]} colours The colours to compare
   * @returns {number} The contrast ratio of the two colours
   * @author Ben Pinner
   */
  calculateContrastRatio(
    colours: string[][],
    luminances: number[] | null = null
  ) {
    if (!luminances) {
      luminances = [
        this.calculateRelativeLuminance(colours[0]),
        this.calculateRelativeLuminance(colours[1]),
      ];
    }

    return this._round(
      (Math.max(...luminances) + 0.05) / (Math.min(...luminances) + 0.05),
      2
    );
  }

  /**
   * Calculates the opposite hue of the colour passed in
   * @param {string[]} colour The colour to calculate the opposite hue for
   * @returns {string[]} The opposite hue calculated
   * @author Ben Pinner
   */
  getOppositeColour(colour: string[]) {
    if (this.calculateRelativeLuminance(colour) > 0.5) {
      return colour.map((val) => `${Math.abs(225 - +val)}`);
    } else
      return colour.map((val) =>
        Math.abs(275 - +val) > 255 ? '255' : `${Math.abs(275 - +val)}`
      );
  }

  // R = r / 255 = 0.09
  // G = g / 255 = 0.38
  // B = b / 255 = 0.46

  // If Red is max, then Hue = (G-B)/(max-min)
  // If Green is max, then Hue = 2.0 + (B-R)/(max-min)
  // If Blue is max, then Hue = 4.0 + (R-G)/(max-min)

  /**
   * Generates a hue number for a colour
   * @param {string[]} colour The colour calculate the hue number for
   * @returns {number} The hue number
   * @author Ben Pinner
   */
  generateHueNumber(colour: string[]) {
    const hueList = this.getHueList(colour);
    const [R, G, B] = hueList.map((hue) => +hue / 255);
    const max = Math.max(R, G, B);
    const min = Math.min(R, G, B);
    let hue;
    if (max === R) {
      hue = ((G - B) / (max - min)) * 60;
    }
    if (max === G) {
      hue = 2 + ((B - R) / (max - min)) * 60;
    } else {
      hue = 4 + (R - G) / (max - min);
    }

    return Math.round(hue < 0 ? hue + 360 : hue);
  }

  /**
   * Calculates colour variations (tints and shades) and their contrast ratio with the colour passed in
   * @param {Colour} colour The colour to calculate variations for
   * @returns {Object[][]} A list holding the shades and tints lists, each of the format: [rgbString, hexString, contrast]
   * @author Ben Pinner
   */
  calculateVariationsAndContrasts(colour: Colour): Colour[][] {
    const hueList = this.getHueList(colour.rgb).map((hue) => hue);

    const [shades, tints] = this.generateShadesTints(hueList);

    shades.forEach((shade) => {
      if (colour.luminance && shade.luminance) {
        shade.contrast = this.calculateContrastRatio(
          [hueList, shade.rgb],
          [colour.luminance, shade.luminance]
        );
      } else {
        throw new Error('luminance was undefined');
      }
    });

    tints.forEach((tint) => {
      if (colour.luminance && tint.luminance)
        tint.contrast = this.calculateContrastRatio(
          [hueList, tint.rgb],
          [colour.luminance, tint.luminance]
        );
    });

    // const shadeContrasts = shades.map((shade) => [
    //   this.getRGBFromHueList(shade.map((val) => this._round(val))),
    //   this.calculateContrastRatio([
    //     hueList,
    //     shade.map((val) => this._round(val)),
    //   ]),
    // ]);
    // const tintContrasts = tints.map((tint) => [
    //   this.getRGBFromHueList(tint.map((val) => this._round(val))),
    //   this.calculateContrastRatio([
    //     hueList,
    //     tint.map((val) => this._round(val)),
    //   ]),
    // ]);

    return [tints, shades];
  }

  // calculateContrasts(colour, shades, tints) {
  //   const shadeContrasts = shades.map((shade) => [
  //     shade.map((val) => this._round(val)),
  //     this.calculateContrastRatio([
  //       colour,
  //       shade.map((val) => this._round(val)),
  //     ]),
  //   ]);
  //   const tintContrasts = tints.map((tint) => [
  //     tint.map((val) => this._round(val)),
  //     this.calculateContrastRatio([colour, tint.map((val) => this._round(val))]),
  //   ]);

  //   return [shadeContrasts, tintContrasts];
  // }

  /**
   * Receives a list of colours, and returns the one with the highest contrast property
   * @param {Colour[]} colours The list of colours to search through
   * @returns {Colour} The colour selected
   */
  getHigherContrastColour(colours: Colour[]): Colour {
    const selectedColour = colours
      .sort((a: any, b: any) => a.contrast - b.contrast)
      .find((c: any) => c.contrast > 7);
    if (!selectedColour)
      return colours.reduce(
        (acc: any, c: any) => (c.contrast > acc.contrast ? c : acc),
        { rgb: [], hex: [], contrast: 0 }
      );

    return selectedColour;
  }

  /**
   * Receives a list of colours, and returns the one with the lowest contrast property
   * @param {Colour[]} colours The list of colours to search through
   * @returns {Colour} The colour selected
   */
  getLowerContrastColour(colours: Colour[]) {
    const selectedColour = colours
      .sort((a: any, b: any) => {
        return a.contrast - b.contrast;
      })
      .find((c: any) => {
        return c.contrast > 7;
      });

    if (!selectedColour) return colours.find((c: any) => c.contrast > 3.5);

    return selectedColour;
  }
}
export default new Colourous();
