import { getData } from '../getData';
import { describe, expect, test, vi } from 'vitest';

describe('getData', () => {
  test('get data', async () => {
    const mockres = [
        { id: 1, title: 'aaaa' },
        {id: 2, title: 'fasdfsafafs'}
    ];

    globalThis.fetch = vi.fn().mockResolvedValueOnce({
      json: vi.fn().mockResolvedValueOnce(mockres),
    }) as any;
    const data = await getData(1);

    expect(fetch).toHaveBeenCalledWith(expect.stringContaining('posts'), {
      method: 'GET',
    });
    expect(data).toEqual(mockres);
  });
});