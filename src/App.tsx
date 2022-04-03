import './App.css';
import { FormEventHandler, MouseEventHandler, useState } from 'react';
import colourous from './colourous';
import ntc from './nameThatColour';
import Generator from './components/generator';
import Variations from './components/variations';
import { Colour, MainColour } from './types/Colour';
import Likes from './components/likes';

ntc.init();

const populateVariation = (variation: string[][]): Colour => {
  const luminance = colourous.calculateLuminance(variation[0]);
  const [shadesCodes, tintsCodes] = colourous.generateShadesTints(variation[0]);
  const contrastColour = colourous.getHigherContrastColour(variation[0], [
    ...tintsCodes.map((tint) => tint[0]),
    ...shadesCodes.map((shade) => shade[0]),
  ]);
  const name = ntc.name(colourous.getHexFromHueList(variation[1]))[1] as string;
  return {
    rgb: variation[0],
    hex: variation[1],
    luminance,
    contrastColour,
    name,
  };
};

const App = () => {
  const [likes, setLikes] = useState<Colour[]>([]);
  const [searchActive, setSearchActive] = useState(false);
  if (likes.length === 0) {
    const localLikes = localStorage.getItem('likes');
    let likeColours: Colour[];
    if (localLikes) {
      likeColours = JSON.parse(localLikes);
      setLikes(likeColours);
    } else likeColours = [];
  }

  const generateNewColour = (colour?: string[]): MainColour => {
    const [rgb, hex] = colour
      ? [colour, colourous.convertRGBToHex(colour)]
      : colourous.generateRandomColour();
    const luminance = colourous.calculateLuminance(rgb);
    const [shadesCodes, tintsCodes] = colourous.generateShadesTints(rgb);
    const contrastColour = colourous.getHigherContrastColour(rgb, [
      ...tintsCodes.map((tint) => tint[0]),
      ...shadesCodes.map((shade) => shade[0]),
    ]);
    const tints = tintsCodes.map(populateVariation);

    const shades = shadesCodes.map(populateVariation);

    // The function name returns an array containing strings and booleans.
    // The element at index 1 will always be a string, so casting to a string
    // on this line is purely to make TypeScript happy
    const name = ntc.name(colourous.getHexFromHueList(hex))[1] as string;

    const liked = likes.find((like) => like.rgb === rgb) ? true : false;

    return { rgb, hex, luminance, tints, shades, contrastColour, name, liked };
  };

  const [colour, setColour] = useState<MainColour>(
    generateNewColour(['52', '58', '64'])
  );

  const controlLikes = () => {
    const liked = !colour.liked;
    const newLikes = colour.liked
      ? likes.filter(
          (like) =>
            colourous.getHexFromHueList(like.hex) !==
            colourous.getHexFromHueList(colour.hex)
        )
      : [...likes, colour as Colour];
    setLikes(newLikes);
    setColour({ ...colour, liked });
    localStorage.setItem('likes', JSON.stringify(newLikes));
  };

  const controlLikeClick = (like: string[]) => {
    setColour(generateNewColour(like));
  };

  const controlSearchClick = (target: HTMLElement) => {
    const searchForm = target.closest('.action-bar__search-form');
    if (!searchForm) throw new Error('Search form is not available.');
    const searchInput = searchForm.querySelector(
      '.action-bar__search-input'
    ) as HTMLInputElement;
    const use = target.closest('svg')?.querySelector('use') as SVGElement;

    if (use?.getAttribute('href')?.includes('close')) {
      searchInput.blur();
      setSearchActive(false);
    } else {
      searchInput.focus();
      setSearchActive(true);
    }
  };

  const onClick: MouseEventHandler = (e) => {
    const target = e.target as HTMLElement;
    if (target.closest('.action-bar__search-form')) {
      controlSearchClick(target);
    } else if (target.closest('.action-bar__icon')) {
      controlLikes();
    } else if (target.closest('.like-box')) {
      const backColour = colourous.getHueList(target.style.backgroundColor);
      controlLikeClick(backColour);
    } else setColour(generateNewColour());
  };

  const onSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    const rgbRegex =
      /rgb\(\s*(-?\d+|-?\d*\.\d+(?=%))(%?)\s*,\s*(-?\d+|-?\d*\.\d+(?=%))(\2)\s*,\s*(-?\d+|-?\d*\.\d+(?=%))(\2)\s*\)/;
    const hexRegex = /^#[0-9A-Fa-f]{6}\b/;
    const target = e.target as HTMLElement;
    const form = target.closest('.action-bar__search-form') as HTMLFormElement;
    const input = form[0] as HTMLInputElement;

    if (input) {
      if (input.value.match(hexRegex)) {
        const hexHueList = colourous.getHexHueList(input.value);
        const rgb = colourous.convertHexToRGB(hexHueList);

        setColour(generateNewColour(rgb));
        setSearchActive(false);
        input.value = '';
        input.blur();
      }
      if (input.value.match(rgbRegex)) {
        const rgb = colourous.getHueList(input.value);

        setColour(generateNewColour(rgb));
        setSearchActive(false);
        input.value = '';
        input.blur();
      }
    }
  };

  return (
    <div className='app' onClick={onClick} onSubmit={onSubmit}>
      <Generator colour={colour} searchActive={searchActive} />
      {likes.length > 0 ? (
        <Likes likes={likes} contrastColour={colour.contrastColour} />
      ) : null}
      <Variations
        type='tints'
        variations={colour.tints}
        contrastColour={colour.contrastColour}
      />
      <Variations
        type='shades'
        variations={colour.shades}
        contrastColour={colour.contrastColour}
      />
    </div>
  );
};

export default App;
