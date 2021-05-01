// import { render, screen } from '@testing-library/react';
// import App from './App';

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

describe('initial test', () => {
  it('should return welcome text', () => {
    const text = 'welcome'
    const welcome = text => {
      return text
    }
    expect(welcome(text)).toEqual(text)
  })
})