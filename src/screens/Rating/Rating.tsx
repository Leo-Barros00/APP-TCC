import AvaliationService from '@Api/services/avaliationService'
import TextButton from '@Components/atomic/TextButton'
import { useAppSelector } from '@Hooks/redux'
import { Route, RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { useState } from 'react'
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
// import { ICustomNativeStackNavigator } from 'src/RootNavigation'
import { Avaliation } from 'src/typings'
// type prop = RouteProp<ICustomNativeStackNavigator, 'Rating'>

const Rating = ({providerId}) => {
  // const route = useRoute();
  // const { providerId } = route.params
  const { name, surname } = useAppSelector(({ user }) => user)
  const [defaultRating, setDefaultRating] = useState(0)
  const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5])
  const navigation = useNavigation()
  
  function sendAvaliation() {    
    console.log("ID: ", providerId)
    const avaliation: Avaliation = {
      description: "bla bla",
      userId:providerId,
      value: defaultRating.toString() 
    }
    AvaliationService.sendAvaliation(avaliation)
  }

  const RatingBar = () => {
    return (
      <View style={styles.ratingBarStyle}>
        {maxRating.map((item, key) => (
          <TouchableOpacity
            activeOpacity={0.7}
            key={item}
            onPress={() => setDefaultRating(item)}
          >
            <Image
              style={styles.starImageStyle}
              source={
                item <= defaultRating
                  ? require('../../../assets/estrela_completa.png')
                  : require('../../../assets/estrela_vaziaa.png')
              }
            />
          </TouchableOpacity>
        ))}
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Text style={styles.textStyle}>Classifique o serviço do prestador</Text>
        <RatingBar />
        <Text style={styles.textStyle}>
          {defaultRating} / {Math.max.apply(null, maxRating)}
        </Text>
        <View style={{ marginTop: 12 }}>
          <TextButton
            text={'Enviar avaliação'}
            variant={'primary'}
            onPress={() => {           
              sendAvaliation()
              alert('A nota dada ao prestador foi de ' + defaultRating + ' estrelas')
              navigation.goBack()
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  )
}
export default Rating

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
    justifyContent: 'center',
    textAlign: 'center',
  },
  textStyle: {
    fontFamily: 'Poppins-SemiBold',
    textAlign: 'center',
    fontSize: 26,
    color: '#000',
    marginTop: 15,
  },
  buttonTextStyle: {
    color: '#fff',
    textAlign: 'center',
  },
  ratingBarStyle: {
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 30,
  },
  starImageStyle: {
    width: 40,
    height: 40,
    resizeMode: 'cover',
  },
})
