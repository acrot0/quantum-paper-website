import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import Card from '../../../src/components/ui/Card';

describe('Card', () => {
  it('renders children', () => {
    render(<Card>Hello Card</Card>);
    expect(screen.getByText('Hello Card')).toBeDefined();
  });

  it('renders title when provided', () => {
    render(<Card title="My Title">Content</Card>);
    expect(screen.getByText('My Title')).toBeDefined();
  });

  it('applies custom className', () => {
    const { container } = render(<Card className="custom-class">Content</Card>);
    const card = container.firstChild as HTMLElement;
    expect(card.classList.contains('custom-class')).toBe(true);
  });

  it('does not render title div when title is omitted', () => {
    const { container } = render(<Card>Content only</Card>);
    const headings = container.querySelectorAll('h3');
    expect(headings.length).toBe(0);
  });
});
