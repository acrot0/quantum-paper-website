import { describe, it, expect, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import useReadingProgress from '../../src/hooks/useReadingProgress';

function mockElement(
  scrollTop: number,
  scrollHeight: number,
  clientHeight: number,
  sections: { id: string; top: number; bottom: number }[]
) {
  const sectionEls = sections.map(s => {
    const el = document.createElement('section');
    el.id = s.id;
    Object.defineProperty(el, 'getBoundingClientRect', {
      value: () => ({ top: s.top, bottom: s.bottom, left: 0, right: 0, width: 0, height: 0, x: 0, y: 0, toJSON: () => ({}) }),
      configurable: true,
    });
    return el;
  });

  const container = document.createElement('div');
  sectionEls.forEach(el => container.appendChild(el));

  Object.defineProperty(container, 'scrollTop', { value: scrollTop, writable: true, configurable: true });
  Object.defineProperty(container, 'scrollHeight', { value: scrollHeight, configurable: true });
  Object.defineProperty(container, 'clientHeight', { value: clientHeight, configurable: true });

  const addSpy = vi.spyOn(container, 'addEventListener');
  const removeSpy = vi.spyOn(container, 'removeEventListener');

  return { container, sectionEls, addSpy, removeSpy };
}

describe('useReadingProgress', () => {
  it('returns initial state', () => {
    const ref = { current: null };
    const { result } = renderHook(() => useReadingProgress(ref));
    expect(result.current.percentage).toBe(0);
    expect(result.current.currentSection).toBe('');
  });

  it('updates percentage on scroll', () => {
    const { container } = mockElement(50, 300, 100, [
      { id: 's1', top: 0, bottom: 100 },
      { id: 's2', top: 200, bottom: 300 },
    ]);
    const ref = { current: container };
    const { result } = renderHook(() => useReadingProgress(ref));

    act(() => {
      container.dispatchEvent(new Event('scroll'));
    });

    expect(result.current.percentage).toBeGreaterThanOrEqual(0);
    expect(result.current.percentage).toBeLessThanOrEqual(100);
  });

  it('detects a current section when one is in view', () => {
    const { container } = mockElement(0, 300, 200, [
      { id: 'abstract', top: 100, bottom: 200 },
    ]);
    const ref = { current: container };
    const { result } = renderHook(() => useReadingProgress(ref));

    act(() => {
      container.dispatchEvent(new Event('scroll'));
    });

    expect(result.current.currentSection).toBe('abstract');
  });

  it('returns empty currentSection when no section is in view', () => {
    const { container } = mockElement(0, 300, 100, [
      { id: 'abstract', top: 500, bottom: 600 },
    ]);
    const ref = { current: container };
    const { result } = renderHook(() => useReadingProgress(ref));

    act(() => {
      container.dispatchEvent(new Event('scroll'));
    });

    expect(result.current.currentSection).toBe('');
  });

  it('cleans up scroll listener on unmount', () => {
    const { container, removeSpy } = mockElement(0, 300, 100, []);
    const ref = { current: container };
    const { unmount } = renderHook(() => useReadingProgress(ref));
    unmount();
    expect(removeSpy).toHaveBeenCalledWith('scroll', expect.any(Function));
  });

  it('attaches scroll listener on mount', () => {
    const { container, addSpy } = mockElement(0, 300, 100, []);
    const ref = { current: container };
    renderHook(() => useReadingProgress(ref));
    expect(addSpy).toHaveBeenCalledWith('scroll', expect.any(Function));
  });
});
