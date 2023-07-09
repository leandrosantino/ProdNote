import * as Form from '@radix-ui/react-form'
import styled from 'styled-components'
import { slideDownAndFade } from '../../../styles/global'

export const Field = styled(Form.Field)`
  width: 100%;
  display: flex;
  flex-direction: column;


  div{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;

    label{
      font-weight: 500;
      color: ${p => p.theme.colors.dark.gray5};
    }

    span{
      font-size: 1.2rem;
      color: ${p => p.theme.colors.light.red11};
    }

  }

  div:last-child{
    position: relative;

    color: ${p => p.theme.colors.dark.gray5};

    svg{
      width: 2rem;
      height: 2rem;
      position: absolute;
      right: 1rem;
      margin: auto;
    }

  }

  input{
    width: 100%;
    tab-size: 0;
    border: 0.15rem solid ${p => p.theme.colors.dark.gray10};
    font-size: 1.6rem;
    padding: .8rem;
    padding-right: 3.2rem;
    border-radius: .4rem;
    text-indent: .4rem;
    text-overflow: ellipsis;

    &[data-invalid]{
      border: 1px solid ${p => p.theme.colors.light.red11};
    }
  }

`

export const Content = styled.div`
  position: relative;

`

export const Menu = styled.menu`
  position: absolute;
  background-color: red;
  left: .4rem;
  margin-top: .4rem;
  width: 85%;

  padding: .8rem;
  border-radius: .4rem;
  background-color: ${p => p.theme.colors.light.gray1};
  box-shadow: 1px 1px 5px 0px rgba(0, 0, 0, 0.2);
  flex-direction: column;
  display: flex;
  gap: .4rem;

  animation-name: ${slideDownAndFade};
  animation-duration: 400ms;
  animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
  will-change: transform, opacity;

  button{
    width: 100%;
    background-color: ${p => p.theme.colors.light.gray1};
    padding: .4rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: .4rem;

    &:hover{
      background-color: rgba(0, 0, 0, .08);
    }


  }

`
