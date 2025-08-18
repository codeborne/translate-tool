import { fireEvent, render } from '@testing-library/svelte';
import DictKeyAdder from './DictKeyAdder.svelte';
import type { Dict } from '../common/Project';

describe('DictKeyAdder', () => {
  const keyPrefix = 'aaa.bbb';
  const key = 'bbb';
  const dict: Dict = { aaa: { bbb: { ccc: 'cc' }, bb: 'bb' } };

  async function clickPlusButton(promptResult: string | null) {
    const { container } = render(DictKeyAdder, { dict, keyPrefix, key });
    const button = container.querySelector('button');
    vi.spyOn(window, 'prompt').mockReturnValue(promptResult);
    const onChange = vi.fn();
    button.addEventListener('focusout', onChange);
    await fireEvent.click(button);
    return onChange;
  }

  it('user can cancel', async () => {
    const onChange = await clickPlusButton(null);
    expect(window.prompt).toHaveBeenCalled();
    expect(onChange).not.toHaveBeenCalled();
  });

  it('user can create a new key', async () => {
    const onChange = await clickPlusButton('new');
    expect(window.prompt).toHaveBeenCalledWith('New key: aaa.bbb.');
    expect(onChange).toHaveBeenCalled();
  });
});
