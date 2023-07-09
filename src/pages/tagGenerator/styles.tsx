import styled from 'styled-components'

export const Container = styled.div`

  width: 100%;
  height: 100%;

  display: flex;
  gap: .8rem;

  div{
    flex: 1;
  }

  form{
    width: 100%;
    padding: .8rem;
    gap: .4rem;
    display: flex;
    flex-direction: column;
  }

  section{
    border: 0.1rem solid ${p => p.theme.colors.dark.gray10};
    border-radius: .4rem;
    flex: 1;
  }


`
