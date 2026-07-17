import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Header from '../../../src/components/layout/Header';

const renderWithRouter = (ui: React.ReactElement) =>
  render(<BrowserRouter>{ui}</BrowserRouter>);

describe('Header', () => {
  it('renders site title/logo', () => {
    renderWithRouter(<Header />);
    expect(screen.getByText(/RF Spectrogram Anomaly Detection/i)).toBeDefined();
  });

  it('has link to paper page', () => {
    renderWithRouter(<Header />);
    const link = screen.getByRole('link', { name: /read paper/i });
    expect(link.getAttribute('href')).toBe('/paper');
  });

  it('has link to download page', () => {
    renderWithRouter(<Header />);
    const link = screen.getByRole('link', { name: /download/i });
    expect(link.getAttribute('href')).toBe('/download');
  });

  it('has home link via logo', () => {
    renderWithRouter(<Header />);
    const logoLink = screen.getByRole('link', { name: /RF Spectrogram/i });
    expect(logoLink.getAttribute('href')).toBe('/');
  });
});
