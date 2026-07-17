import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import MathBlock from '../../../src/components/content/MathBlock';

describe('MathBlock', () => {
  it('renders inline math without error', () => {
    render(<MathBlock inline>x^2</MathBlock>);
    expect(screen.getByTestId('react-katex')).toBeDefined();
  });

  it('renders block math without error', () => {
    render(<MathBlock>x^2 + y^2 = z^2</MathBlock>);
    expect(screen.getByTestId('react-katex')).toBeDefined();
  });

  it('renders complex integral', () => {
    render(<MathBlock>{'\\int_0^1 x^2 dx'}</MathBlock>);
    expect(screen.getByTestId('react-katex')).toBeDefined();
  });

  it('renders pmatrix notation', () => {
    render(<MathBlock>{'\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}'}</MathBlock>);
    expect(screen.getByTestId('react-katex')).toBeDefined();
  });

  it('renders fraction', () => {
    render(<MathBlock>{'\\frac{a}{b}'}</MathBlock>);
    expect(screen.getByTestId('react-katex')).toBeDefined();
  });
});
