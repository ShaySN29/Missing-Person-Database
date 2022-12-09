import React from 'react';
import renderer from 'react-test-renderer';
import AdminHomepage from '../components/AdminHomepage';

it('renders correctly', () => {
    const tree = renderer.create(<AdminHomepage />)
        .toJSON();
    expect(tree).toMatchSnapshot();
});

