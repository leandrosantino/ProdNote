import styled from 'styled-components'
import * as RadixSwitch from '@radix-ui/react-switch'

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

  form{
    width: 100%;
    display: grid;
    grid-template-rows: auto auto;


    div{
      width: 100%;
      display: flex;
      align-items: center;
      column-gap: .8rem;
      label{
        font-size: 1.4rem;
      }
    }

    .amountField{
      width: 12rem;
    }

    .productField{
      width: 100%;
    }

  }

  section:first-child{
    padding: 0 1.2rem;
    flex: 1;
  }

  @media(max-width: 1087px){
    section:last-child{display: none;}
  }
  @media(max-height: 650px){
    section:last-child{display: none;}
  }

  animation: mymove .5s;

  @keyframes mymove {
    from {
      transform: translateY(1rem);
    }
    to {
      transform: translateY(0);
    }
  }

  section:last-child{
    border: 0.1rem solid ${p => p.theme.colors.dark.gray10};
    border-radius: .4rem;
    height: calc(100vh - 7.4rem);

    div{
      aspect-ratio: 7/10;
      height: 100%;
      background-color: aquamarine;
    }
  }

  tr[data-fractional='yes']{
    background-color: ${p => p.theme.colors.light.red4};
    &:hover{
      background-color: ${p => p.theme.colors.light.red5};
    }
  }

  tbody tr{
    &:hover{
      background-color: ${p => p.theme.colors.light.gray4};
      cursor: pointer;
    }
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

export const Switch = styled(RadixSwitch.Root)`
  width: 3.6rem;
  height: 2rem;
  border-radius: 1.2rem;
  position: relative;
  display: flex;
  align-items: center;
  border: none;
  background-color: ${p => p.theme.colors.light.gray6};
  &[data-state='checked'] {
    background-color: ${p => p.theme.colors.light.blue6};
  }
`

export const SwitchThumb = styled(RadixSwitch.Thumb)`
  display: block;
  width: 1.4rem;
  height: 1.4rem;
  border-radius: 100%;
  background-color: ${p => p.theme.colors.light.gray10};
  display: flex;
  justify-content: center;
  align-items: center;

  transition: transform 100ms;
  transform: translateX(.4rem);
  will-change: transform;
  &[data-state='checked'] {
    transform: translateX(1.8rem);
    background-color: ${p => p.theme.colors.dark.blue4};
  }

`
