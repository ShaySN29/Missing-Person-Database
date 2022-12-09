import React from "react";
import renderer from "react-test-renderer";
import AdminHomepage from '../components/AdminHomepage';

// Tests if the component renders correctly
it('renders correctly', () => {
    const tree = renderer.create(<AdminHomepage />)
    .toJSON();
    expect(tree).toMatchSnapshot();
}); 
