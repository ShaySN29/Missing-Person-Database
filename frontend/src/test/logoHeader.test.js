import { render, screen } from '@testing-library/react';
import LogoHeader from "../components/LogoHeader";

// Testing the img render
test('renders logo image', () => {
    render(<LogoHeader />);
    const logo = screen.getByRole("img")
    expect(logo.alt).toBe("missingLogo")
})