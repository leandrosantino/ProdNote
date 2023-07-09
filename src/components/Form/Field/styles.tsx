import styled from 'styled-components'

export const Cont = styled.div`
  .teste{
    background-color: red;
  }
`

export const Root = styled.div`
  display: flex;
  flex-direction: column;
  justify-content:center ;
  span{
    height: 2rem;
    padding: 0 .4rem;
    font-size: 1.2rem;
    color: ${p => p.theme.colors.light.red11};
  }
`

export const Control = styled.div`
  position: relative;
  color: ${p => p.theme.colors.dark.gray5};

  input{
    width: 100%;
    tab-size: 0;
    border: 0.15rem solid ${p => p.theme.colors.dark.gray10};
    font-size: 1.6rem;
    padding: .8rem;
    border-radius: .4rem;
    text-indent: .4rem;

  }

  &[data-invalid='true']{
    input{
      border: 1px solid ${p => p.theme.colors.light.red11};
    }
  }

  &[data-icon='on']{
    svg{
      width: 2rem;
      height: 2rem;
      position: absolute;
      right: .8rem;
      top: 0;
      bottom: 0;
      margin: auto;
    }

    input{
      padding-right: 3.2rem;
      text-overflow: ellipsis;
    }

  }

`

export const Label = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 2rem;

  label{
    font-weight: 500;
    color: ${p => p.theme.colors.dark.gray5};
  }

`
