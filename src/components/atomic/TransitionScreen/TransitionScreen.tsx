import React, { useEffect } from 'react'
import styled from 'styled-components/native'
import LottieView from 'lottie-react-native'

const Container = styled.View`
  flex: 1;
  flex-grow: 1;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  padding: 36px;
  background-color: white;
`

const Message = styled.Text`
  font-size: 26px;
  line-height: 40px;
  font-family: 'Poppins-SemiBold';
  text-align: center;
`

const TransitionScreen: React.FC<ITransitionScreen> = ({ message, navigatesTo }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigatesTo()
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <Container>
      <LottieView
        style={{ height: 220, width: 220 }}
        source={require('../../../../assets/lottie/check_animation.json')}
        autoPlay
        loop={false}
      />
      <Message>{message}</Message>
    </Container>
  )
}

export default TransitionScreen
