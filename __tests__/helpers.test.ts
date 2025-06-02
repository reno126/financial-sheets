import { createUrl } from '@/helpers/createUri';
import { anyToError } from '@/helpers/errors';

describe('Fn: anyToError', () => {
  it.each(['abc', 123, null, {}, undefined, [], true, NaN])(
    'Return Error intance for argument %p',
    (arg) => {
      const result = anyToError(arg);
      expect(result instanceof Error).toBeTruthy();
    }
  );

  it.each([
    ['abc', 'abc'],
    [123, '123'],
    [null, 'null'],
    [{}, '{}'],
    [undefined, 'undefined'],
    [[], '\\[\\]'],
    [true, 'true'],
    [NaN, 'null'],
  ])('Return Error intance with message containing %p', (arg, expected) => {
    const result = anyToError(arg);
    expect(result.message).toMatch(new RegExp(expected));
  });

  it('Return the same error object, that was passed as argument', () => {
    const errObject = new Error('abc');
    const result = anyToError(errObject);
    expect(result).toEqual(errObject);
  });
});

describe('Fn: createUri', () => {
  it.each([
    ['http://host.name/', 'path/name', undefined, 'http://host.name/path/name'],
    [
      'http://host.name/',
      'pathName',
      { key: 'value', key2: 'value2' },
      'http://host.name/pathName?key=value&key2=value2',
    ],
    ['http://host.name/', ['path', 'name'], {}, 'http://host.name/path/name'],
    ['http://host.name/', undefined, undefined, 'http://host.name/'],
    ['http://host.name/', 'pathName', new URLSearchParams(), 'http://host.name/pathName'],
    [
      'http://host.name/',
      'pathName',
      new URLSearchParams({ key: 'value' }),
      'http://host.name/pathName?key=value',
    ],
  ])(
    'Based on partials: %s, %s, %s. Should return string equal: %p',
    (host, path, searchParams, expected) => {
      const result = createUrl(host, path, searchParams);
      expect(result).toEqual(expected);
    }
  );
});
