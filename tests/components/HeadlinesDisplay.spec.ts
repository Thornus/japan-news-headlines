import { mountSuspended } from '@nuxt/test-utils/runtime';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import HeadlinesDisplay from '~/components/HeadlinesDisplay.vue';

describe('HeadlinesDisplay component', async () => {
  let mockStyleSheets: CSSStyleSheet[];

  beforeEach(() => {
    mockStyleSheets = [
      {
        insertRule: vi.fn(),
        deleteRule: vi.fn(),
        cssRules: [],
      } as unknown as CSSStyleSheet,
    ];

    // Use a proxy to mock styleSheets
    Object.defineProperty(document, 'styleSheets', {
      get: () => mockStyleSheets,
      configurable: true,
    });

    // Optionally mock other DOM methods if needed
    vi.spyOn(window, 'innerWidth', 'get').mockReturnValue(1024); // Mock viewport width if needed
  });

  it('should render 10 h1 elements', async () => {
    const component = await mountSuspended(HeadlinesDisplay);
    expect(component.findAll('h1').length).toBe(10);
  });
});