import Filter from './Filter';

describe('Filter', () => {
  const filter: Filter = new Filter('test', false);

  it('filters searching string', async () => {
    expect(filter.shouldShow('app.test', 'someValue')).toBeTruthy();
    expect(filter.shouldShow('mixedcaseTeSt', 'someValue')).toBeTruthy();
    expect(filter.shouldShow('app.nothing', 'nothing')).toBeFalsy();
  });

  it('returns true on filtered empty values', async () => {
    filter.showEmptyValuesOnly = true;
    expect(filter.shouldShow('app.test', 'someValue')).toBeFalsy();
    expect(filter.shouldShow('mixedcaseTeSt', 'someValue')).toBeFalsy();
    expect(filter.shouldShow('app.empty', '')).toBeFalsy();
    expect(filter.shouldShow('app.test', '')).toBeTruthy();
  });
});
