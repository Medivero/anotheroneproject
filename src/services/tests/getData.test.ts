import { getData } from '../getData';
import { describe, expect, test, vi } from 'vitest';

describe('getData', () => {
  test('get data', async () => {
    const mockResponse = [
        { id: 1, title: 'aaaa' },
        {id: 2, title: 'fasdfsafafs'}
    ];

    global.fetch = vi.fn().mockResolvedValueOnce({
      json: vi.fn().mockResolvedValueOnce(mockResponse),
    }) as any;

    const data = await getData();

    expect(fetch).toHaveBeenCalledWith(expect.stringContaining('posts'), {
      method: 'GET',
    });
    expect(data).toEqual(mockResponse);
  });

  test('throw JSON failure', async () => {
    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

    global.fetch = vi.fn().mockResolvedValueOnce({
      json: vi.fn().mockRejectedValueOnce(new Error('something wrong with JSON')),
    }) as any;

    const data = await getData();

    expect(consoleSpy).toHaveBeenCalledWith(expect.any(Error));
    expect(data).toBeUndefined();

    consoleSpy.mockRestore();
  });
});