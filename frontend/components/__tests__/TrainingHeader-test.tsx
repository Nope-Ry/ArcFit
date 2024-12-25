import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import TrainingHeader from '../training/TrainingHeader';


describe('TrainingHeader', () => {

  it('should call onButtonPress when end training button is pressed', () => {
    const onButtonPress = jest.fn();
    const { getByText } = render(
      <TrainingHeader onButtonPress={onButtonPress} time={0} setTime={jest.fn()} />
    );
    const endButton = getByText('结束训练');
    fireEvent.press(endButton);
    expect(onButtonPress).toHaveBeenCalled();
  });
});