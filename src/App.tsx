import './App.css';
import { FormEventHandler, MouseEventHandler, useState } from 'react';
import colourous from './colourous';
import ntc from './nameThatColour';
import Generator from './components/generator';
import Variations from './components/variations';
import Likes from './components/likes';
import { useTypedSelector } from './hooks/use-typed-selector';
import { useActions } from './hooks/use-actions';
import init, { generate_random_colour, convert_rgb_to_hex } from 'colourous';

ntc.init();

const App = () => {
  const { toggleLikeColour, setColour, toggleSearchActive } = useActions();
  const [ wasmInit, setWasmInit ] = useState(false);

  const textDecoder = new TextDecoder("utf-8");

  if (!wasmInit) {
    init().then(() => {
      setWasmInit(true);
    });
  } else {
    const rand_col = generate_random_colour();
    console.log(rand_col);
    console.log(textDecoder.decode(convert_rgb_to_hex(rand_col)));
    console.log(convert_rgb_to_hex(rand_col));
  }

  const likes = useTypedSelector((state) => state.likes.data);
  const colour = useTypedSelector((state) => state.colours.data.colour);
  const searchActive = useTypedSelector(
    (state) => state.colours.data.searchActive
  );

  const controlLikes = () => {
    const liked = !likes.find((like) => colour.rgb === like.rgb);
    toggleLikeColour(colour, liked);
    localStorage.setItem('likes', JSON.stringify(likes));
  };

  const controlLikeClick = (like: string[]) => {
    setColour(like);
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
      toggleSearchActive();
    } else {
      searchInput.focus();
      toggleSearchActive();
    }
  };

  const onClick: MouseEventHandler = (e) => {
    const target = e.target as HTMLElement;
    if (target.closest('.action-bar__search-form')) {
      controlSearchClick(target);
    } else if (target.closest('.action-bar__icon')) {
      controlLikes();
    } else if (target.closest('.like-box')) {
      const backColour = colourous.getHueList(
        (target.closest('.like-box') as HTMLElement).style.backgroundColor
      );
      controlLikeClick(backColour);
    } else setColour();
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

        setColour(rgb);
        toggleSearchActive();
        input.value = '';
        input.blur();
      }
      if (input.value.match(rgbRegex)) {
        const rgb = colourous.getHueList(input.value);

        setColour(rgb);
        toggleSearchActive();
        input.value = '';
        input.blur();
      }
    }
  };

  return (
    <div className='app' onClick={onClick} onSubmit={onSubmit}>
      <Generator colour={colour} searchActive={searchActive} />
      {likes.length > 0 ? (
        <Likes contrastColour={colour.contrastColour} />
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
