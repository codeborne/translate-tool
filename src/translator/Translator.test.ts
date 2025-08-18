import { fireEvent, render } from '@testing-library/svelte';
import Translator from './Translator.svelte';
import type { Dict } from '../common/Project';
import googleTranslate from './GoogleTranslate';

describe('Translator', () => {
  const lang = 'de';
  const defaultLang = 'en';
  const dict: Dict = { text: '' };
  const defaultDict: Dict = { text: 'some text' };
  const uneditedDict: Dict = { text: '' };
  const key = 'text';

  it('shows translation button by default', async () => {
    const { container } = render(Translator, { lang, defaultDict, dict, defaultLang, uneditedDict, key });
    expect(container.querySelector('.translate')).toBeInTheDocument();
  });

  it('returns translation on click', async () => {
    const { container } = render(Translator, { lang, defaultDict, dict, defaultLang, uneditedDict, key });
    vi.spyOn(googleTranslate, 'translate').mockResolvedValue('some text, but in german');
    const button = container.querySelector('.translate');
    await fireEvent.click(button);
    expect(googleTranslate.translate).toHaveBeenCalled();
  });
});
