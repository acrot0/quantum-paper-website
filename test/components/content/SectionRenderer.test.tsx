import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import SectionRenderer from '../../../src/components/content/SectionRenderer';

describe('SectionRenderer', () => {
  it('renders markdown heading', () => {
    render(<SectionRenderer content="# Hello World" />);
    expect(screen.getByRole('heading', { name: /hello world/i })).toBeDefined();
  });

  it('renders paragraph text', () => {
    render(<SectionRenderer content="This is a test paragraph." />);
    expect(screen.getByText(/this is a test paragraph/i)).toBeDefined();
  });

  it('renders bold text', () => {
    render(<SectionRenderer content="This is **bold** text." />);
    const bold = screen.getByText('bold');
    expect(bold.tagName).toBe('STRONG');
  });

  it('renders inline code', () => {
    render(<SectionRenderer content="Use `const` to declare." />);
    expect(screen.getByText('const')).toBeDefined();
  });

  it('renders links', () => {
    render(<SectionRenderer content="[Click here](https://example.com)" />);
    const link = screen.getByRole('link', { name: /click here/i });
    expect(link).toBeDefined();
    expect(link.getAttribute('href')).toBe('https://example.com');
  });

  it('renders list container', () => {
    render(<SectionRenderer content={"- item one\n- item two\n- item three"} />);
    const list = document.querySelector('ul');
    expect(list).toBeDefined();
  });

  it('renders table container', () => {
    render(<SectionRenderer content={"| A | B |\n|---|---|\n| 1 | 2 |"} />);
    const table = document.querySelector('table');
    expect(table).toBeDefined();
  });
});
