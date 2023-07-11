import styled from 'styled-components'

export const Container = styled.div`

  width: 100%;
  height: 100%;

  display: flex;
  gap: .8rem;

  h3{
    width: 100%;
    margin-bottom: 1.2rem;
    text-align: center;
  }

  section{
    flex: 1;
    padding: 0 1.2rem;
  }

  form{
    width: 100%;
    gap: .8rem;
    display: flex;
    align-items: center;
    justify-content: center ;

    .amountField{
      width: 12rem;
    }

    .productField{
      width: 100%;
    }

  }

  section:last-child{
    border: 0.1rem solid ${p => p.theme.colors.dark.gray10};
    border-radius: .4rem;
    flex: 1;
  }

`

export const Separator = styled.div`
  width: 100%;
  height: 1px;
  margin-top: .4rem;
  margin-bottom: 1.2rem;
  background-color: ${p => p.theme.colors.light.gray5};
`

export const Info = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: start;
  font-size: 1.2rem;
  margin-top: 1.2rem;
  padding: 0 .8rem;

  span{
    color: ${p => p.theme.colors.light.gray10};
  }

`
