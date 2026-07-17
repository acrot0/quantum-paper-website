import { describe, it, expect, vi } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import React from 'react';
import CodeBlock from '../../../src/components/content/CodeBlock';

describe('CodeBlock', () => {
  it('renders code content', () => {
    render(<CodeBlock>const x = 1;</CodeBlock>);
    expect(screen.getByText('const x = 1;')).toBeDefined();
  });

  it('displays language label', () => {
    render(<CodeBlock className="language-python">print("hello")</CodeBlock>);
    expect(screen.getByText('python')).toBeDefined();
  });

  it('shows Copy button', () => {
    render(<CodeBlock>const x = 1;</CodeBlock>);
    expect(screen.getByRole('button', { name: /copy/i })).toBeDefined();
  });

  it('copies code to clipboard', async () => {
    const mockClipboard = { writeText: vi.fn().mockResolvedValue(undefined) };
    Object.defineProperty(navigator, 'clipboard', { value: mockClipboard, configurable: true });

    render(<CodeBlock>const x = 1;</CodeBlock>);
    const copyBtn = screen.getByRole('button', { name: /copy/i });
    await act(async () => copyBtn.click());

    expect(mockClipboard.writeText).toHaveBeenCalledWith('const x = 1;');
  });

  it('shows Copied! feedback after copy', async () => {
    const mockClipboard = { writeText: vi.fn().mockResolvedValue(undefined) };
    Object.defineProperty(navigator, 'clipboard', { value: mockClipboard, configurable: true });

    render(<CodeBlock>const x = 1;</CodeBlock>);
    const copyBtn = screen.getByRole('button', { name: /copy/i });
    await act(async () => copyBtn.click());

    expect(screen.getByRole('button', { name: /copied!/i })).toBeDefined();
  });
});
