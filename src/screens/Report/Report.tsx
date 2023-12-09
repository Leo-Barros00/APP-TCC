import ContractService from '@Api/services/contractService'
import TextButton from '@Components/atomic/TextButton'
import TransitionScreen from '@Components/atomic/TransitionScreen'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useState } from 'react'
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native'

const Report = () => {
  const { params } = useRoute()
  const navigation = useNavigation()
  const [finished, setFinished] = useState(false)

  function handleOnPressReportButton() {
    const { contract } = params as any

    ContractService.updateProgressStatus(contract.id, 'cancelled').then(() => {
      setFinished(true)
    })
  }

  function navigateToHiringList() {
    navigation.navigate('HiringList')
  }

  if (finished)
    return (
      <TransitionScreen
        message="Report enviado com sucesso!"
        navigatesTo={navigateToHiringList}
      />
    )

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Text style={styles.mainTextStyle}>O prestador não apareceu para realizar o serviço?</Text>
        <Text style={styles.secondaryTextStyle}>
          Reporte para que não seja efetuada cobrança em seu cartão ou que seu pagamento seja ressarcido.
        </Text>
        <TextButton
          text='Reportar'
          variant='primary'
          onPress={handleOnPressReportButton}
        />
      </View>
    </SafeAreaView>
  )
}
export default Report

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
    justifyContent: 'center',
    textAlign: 'center',
  },
  mainTextStyle: {
    fontFamily: 'Poppins-SemiBold',
    textAlign: 'center',
    fontSize: 26,
    color: '#000',
  },
  secondaryTextStyle: {
    fontFamily: 'Poppins-Medium',
    textAlign: 'center',
    fontSize: 20,
    color: '#000',
    marginTop: 10,
    marginBottom: 18
  },
})
