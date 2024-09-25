import { describe, it, expect, vi } from 'vitest'
import { mountSuspended, mockNuxtImport } from '@nuxt/test-utils/runtime'
import ColorModeToggle from '@/components/ColorModeToggle.vue'

describe('ColorModeToggle', () => {
  const { useColorModeMock } = vi.hoisted(() => {
    return {
      useColorModeMock: vi.fn().mockImplementation(() => {
        return {
          preference: 'light',
          value: 'light',
          unknown: false,
          forced: false
        }
      })
    }
  });
  
  mockNuxtImport('useColorMode', () => {
    return useColorModeMock
  });

  it('renders a moon icon in light mode', async () => {
    const wrapper = await mountSuspended(ColorModeToggle);
    expect(wrapper.find('button').exists()).toBe(true);
    expect(wrapper.find('[data-testid="moon-icon"]').exists()).toBe(true);
    expect(wrapper.find('[data-testid="sun-icon"]').exists()).toBe(false);
  });

  it('renders a sun icon in dark mode', async () => {
    useColorModeMock.mockImplementation(() => {
      return {
        preference: 'dark',
        value: 'dark',
        unknown: false,
        forced: false
      }
    })

    const wrapper = await mountSuspended(ColorModeToggle);
    expect(wrapper.find('button').exists()).toBe(true);
    expect(wrapper.find('[data-testid="moon-icon"]').exists()).toBe(false);
    expect(wrapper.find('[data-testid="sun-icon"]').exists()).toBe(true);
  });
})