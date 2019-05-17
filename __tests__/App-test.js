/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../App';
import ForgotPassword from '../FirebaseLogin/screens/ForgotPassword/index';
import InputField from '../FirebaseLogin/components/InputField';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  renderer.create(<App />);
});

it('test rendering of input field ', () => {
    const TextInputComponent = renderer.create(<InputField />).toJSON();
    expect(TextInputComponent).toMatchSnapshot();
});

// i was guessing with this, not working
// it('test rendering of input field ', () => {
//     const props = {
//             placeholder: 'test'
//         },
//     DateInputComponent = mount(<InputField {...props} />);
//     expect(DateInputComponent.placeholder).toEqual('test');
// });

