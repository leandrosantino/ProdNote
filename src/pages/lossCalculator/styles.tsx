import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;

  &>div{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 4rem;
    width: 300px;
    height: min-content;

    form{

      div{
        width: 100%;
      }

      button{
        width: 100%;
      }

    }
  }



`

export const QuantityLostCase = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  padding-top: 0;
  font-weight: 500;
  margin-bottom: .4rem;
`
