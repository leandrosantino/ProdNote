import styled from 'styled-components'
import * as RadixAvatar from '@radix-ui/react-avatar'
import * as RadixSwitch from '@radix-ui/react-switch'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { slideDownAndFade } from '../../styles/global'

export const Container = styled.header<{ isAuth: 'true' | 'false' }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
  /* box-shadow: 0px 1px 3px 1px rgba(0,0,0, 0.15); */

  ${p => p.isAuth === 'false'
 ? `
    background-color: ${p.theme.colors.dark.blue4};
    color: ${p.theme.colors.light.gray1};
  `
 : ''}

  z-index: 100;

  h2{
    font-size: 2.4rem;
    font-weight: 500;
    span{
      color: ${p => p.theme.colors.dark.blue11};
    }
  }

  div{
    h3{
      color: ${p => p.isAuth === 'true' ? p.theme.colors.dark.blue7 : ''};
      font-weight: 500;
      font-size: 1.6rem;
    }

    button{
      display: none;
    }

    @media(max-width: 800px){
      button{
        display: inherit;
      }
    }

  }

  div{
    display: flex;
    justify-content: end;
    align-items:  center;
    height: 100%;
    width: fit-content;
    gap: .8rem;

    label{
      font-weight: 500;
      font-size: 1.2rem;
      padding: .4rem .8rem;
      border-radius: .4rem;
      background-color:${p => p.theme.colors.dark.blue12};
      color: ${p => p.theme.colors.dark.blue5};
    }

  }

  `

export const Avatar = styled(RadixAvatar.Root)`
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 100%;
  background-color: ${p => p.theme.colors.light.gray8};
  color: ${p => p.theme.colors.light.gray12};
  display: flex;
  justify-content: center;
  align-items: center;

`
export const AvatarFallback = styled(RadixAvatar.Fallback)``

export const Switch = styled(RadixSwitch.Root)`
  width: 4rem;
  height: 2.4rem;
  border-radius: 1.2rem;
  position: relative;
  display: flex;
  align-items: center;
  border: none; /*1px solid ${p => p.theme.colors.dark.gray10}; */
  background-color: ${p => p.theme.colors.light.blue6};
`

export const SwitchThumb = styled(RadixSwitch.Thumb)`
  display: block;
  width: 2rem;
  height: 2rem;
  border-radius: 100%;
  background-color: ${p => p.theme.colors.light.blue8};
  color: ${p => p.theme.colors.light.gray1};
  display: flex;
  justify-content: center;
  align-items: center;

  transition: transform 100ms;
  transform: translateX(.3rem);
  will-change: transform;
  &[data-state='checked'] {
    transform: translateX(1.7rem);
  }

`

export const DropdownMenuTrigger = styled(DropdownMenu.Trigger)`

  background: transparent;
  border: none;
  opacity: 1;

`

export const DropdownMenuContent = styled(DropdownMenu.Content)`
  background-color: #802525;
  margin-right: 1rem;
  width: 13rem;
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

  .btQuit{
    color: ${p => p.theme.colors.light.red11};
    &:hover{
      background-color: ${p => p.theme.colors.light.red4};
    }
  }

`

export const DropdownMenuSeparator = styled(DropdownMenu.Separator)`
  width: 100%;
  height: .1rem;
  background-color: rgba(0,0,0,.08);
`
