import { fireEvent, render } from '@testing-library/svelte';
import DictClipboardOutput from './DictClipboardOutput.svelte';
import type { Dict } from '../common/Project';
import { tick } from 'svelte';

describe('DictClipboardOutput', () => {
  const dict: Dict = { t1: 't1', t2: 't2', t3: 't3', t4: {} };
  const defaultDict: Dict = { t1: 't1', t2: 't2', t3: 't3', t4: {} };
  const lang = 'en';
  const indent = 2;

  beforeEach(() => {
    Object.defineProperty(document, 'execCommand', {
      value: vi.fn(),
      configurable: true,
    });
  });

  it('shows textarea with no empty keys', async () => {
    const { container } = render(DictClipboardOutput, { dict, lang, indent, defaultDict });
    expect(container.querySelector('textarea').value).toContain('{\n  "t1": "t1",\n  "t2": "t2",\n  "t3": "t3"\n}');
  });

  it('clicking copy copies to clipboard', async () => {
    const { container } = render(DictClipboardOutput, { dict, lang, indent, defaultDict });
    const buttonElement = container.querySelector('button') as HTMLButtonElement;
    expect(buttonElement).toBeInTheDocument();
    const copy = vi.spyOn(document, 'execCommand');
    await fireEvent.click(buttonElement);
    await tick();
    expect(copy).toHaveBeenCalled();
  });
});
