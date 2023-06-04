import styled from 'styled-components/native'
import { IContractCard } from './interface'

const CardTitle = styled.Text`
  font-size: 24px;
  font-family: 'Poppins-SemiBold';
  text-align: center;
`

const CardOwnerName = styled.Text`
  font-size: 20px;
  font-family: 'Poppins-SemiBold';
  text-align: center;
`

const CardDescription = styled.Text`
  font-size: 16px;
  line-height: 30px;
  font-family: 'Poppins-SemiBold';
  text-align: center;
`

const CardLocale = styled.Text`
  font-size: 16px;
  font-family: 'Poppins-SemiBold';
  text-align: center;
`

const ProposalCard = styled.TouchableOpacity`
  min-height: 180px;
  flex-direction: row;
  border-top-width: 4px;
  border-top-color: ${({ theme }) => theme.colors['primary']['main']};
  background-color: white;
  margin-bottom: 24px;
  padding: 16px;
  border-radius: 8px;
  justify-content: space-between;
`

const LeftContainerCard = styled.View`
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`

const HouseInfoCard = styled.View`
  justify-content: center;
  align-items: center;
  padding-bottom: 16px;
`

const LocaleContainerCard = styled.View`
  justify-content: flex-end;
  align-items: center;
`

const InfoContainerCard = styled.View`
  justify-content: space-between;
`

const NameDescriptionContainer = styled.View`
  justify-content: flex-start;
`

const ContractCard: React.FC<IContractCard> = ({
  value,
  icon,
  houseSize,
  contractorName,
  jobDescription,
  locale,
}) => {
  return (
    <ProposalCard
      style={{
        shadowColor: '#000000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.17,
        shadowRadius: 2.54,
        elevation: 3,
      }}
    >
      <LeftContainerCard>
        <CardTitle>{'R$' + value + ',00'}</CardTitle>
        <HouseInfoCard>
          {icon}
          <CardDescription>{houseSize + ' m²'}</CardDescription>
        </HouseInfoCard>
      </LeftContainerCard>

      <InfoContainerCard>
        <NameDescriptionContainer>
          <CardOwnerName>{contractorName}</CardOwnerName>
          <CardDescription>{'"' + jobDescription + '"'}</CardDescription>
        </NameDescriptionContainer>

        <LocaleContainerCard>
          <CardLocale>{locale}</CardLocale>
        </LocaleContainerCard>
      </InfoContainerCard>
    </ProposalCard>
  )
}

export default ContractCard
