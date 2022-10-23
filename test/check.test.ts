import {listContains, ListResult} from '../src/check'

test('list contains the entry', () => {
    expect(listContains('development', ['fun', 'development'])).toBe(ListResult.ON_LIST);
    expect(listContains('development', ['fun', 'develop[a-z]+'])).toBe(ListResult.ON_LIST);
    expect(listContains('develop', ['fun', 'develop[a-z]*'])).toBe(ListResult.ON_LIST);
});

test('list doesn\'t contain the entry', () => {
    expect(listContains('main', ['ma'])).toBe(ListResult.NOT_ON_LIST);
    expect(listContains('main', ['fun', 'development'])).toBe(ListResult.NOT_ON_LIST);
    expect(listContains('devel', ['fun', 'develop[a-z]+'])).toBe(ListResult.NOT_ON_LIST);
});

test('list is empty', () => {
    expect(listContains('development', [])).toBe(ListResult.EMPTY_LIST);
    expect(listContains('main', [])).toBe(ListResult.EMPTY_LIST);
});
