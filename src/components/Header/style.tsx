import styled from 'styled-components'
import * as RadixAvatar from '@radix-ui/react-avatar'
import * as RadixSwitch from '@radix-ui/react-switch'

export const Container = styled.header`
  grid-area: head;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1.2rem;
  box-shadow: 0px 1px 3px 1px rgba(0,0,0, 0.15);

  z-index: 100;

  h3{
    color: ${p => p.theme.colors.dark.blue7};
    font-weight: 500;
    font-size: 1.6rem;
  }

  div{
    display: flex;
    justify-content: end;
    align-items:  center;
    height: 100%;
    width: fit-content;
    gap: 1.2rem;

    label{

    }
  }

  `

export const Avatar = styled(RadixAvatar.Root)`
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 100%;
  background-color: ${p => p.theme.colors.light.gray8};
  color: ${p => p.theme.colors.light.gray11};
  display: flex;
  justify-content: center;
  align-items: center;

`
export const AvatarFallback = styled(RadixAvatar.Fallback)``

export const Switch = styled(RadixSwitch.Root)`
  width: 40px;
  height: 24px;
  border-radius: 9999px;
  position: relative;
  border: 1px solid ${p => p.theme.colors.dark.gray10};
  background-color: ${p => p.theme.colors.light.gray6};
  &[data-state='checked'] {
    background-color: ${p => p.theme.colors.light.blue5};
  }
`

export const SwitchThumb = styled(RadixSwitch.Thumb)`
  display: block;
  width: 20px;
  height: 20px;
  border-radius: 100%;
  background-color: ${p => p.theme.colors.dark.gray10};

  transition: transform 100ms;
  transform: translateX(1px);
  will-change: transform;
  &[data-state='checked'] {
    background-color: ${p => p.theme.colors.dark.blue8};
    transform: translateX(17px);
  }

`
