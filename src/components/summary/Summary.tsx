import styled from '@emotion/styled'
import SummaryInfoCard from './SummaryInfoCard'

const Summary = () => {
  return (
    <Container>
      <ImgStyled
        src={require('../../assets/images/summary-bgc.jpg')}
        alt="summary"
      />
      <SummaryInfoCard />
    </Container>
  )
}

export default Summary

const Container = styled('div')`
  height: 527px;
`

const ImgStyled = styled('img')`
  height: 432px;
  width: 100%;
  margin-top: 6.3rem;
`
