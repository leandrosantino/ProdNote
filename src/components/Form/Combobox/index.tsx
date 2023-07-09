import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { BackContainer, Content, Menu } from './styles'

import { type HTMLProps, useEffect, useState } from 'react'
import { Field } from '../Field'

interface Option {
  name: string
  value: string
}

interface ComboboxRootProps extends HTMLProps<HTMLInputElement> {
  options: Option []
  isValid?: boolean
  message?: string
  onSelectOption: (option: Option) => void
}

export function Combobox ({ options, onSelectOption, isValid = true, message, ...rest }: ComboboxRootProps) {
  const [showMenu, setShowMenu] = useState(false)
  const [value, setValue] = useState('')
  const [optionsFiltered, setOptionsFiltered] = useState<Option[]>(options)

  useEffect(() => {
    setOptionsFiltered(options.filter(option =>
      option.name.toLocaleUpperCase()
        .search(value.toLocaleUpperCase()) >= 0
    ))
  }, [value])

  useEffect(() => {
    if (optionsFiltered.length === 0) setShowMenu(false)
    if (optionsFiltered.length === 1 && optionsFiltered[0].name === value) {
      onSelectOption(optionsFiltered[0])
      setShowMenu(false)
    }
  }, [optionsFiltered])

  return (
    <>
      <Content>

      <Field.Root {...{ isValid, message }}>
        <Field.Label >{rest.name}</Field.Label>
        <Field.Control
          icon={<MagnifyingGlassIcon/>}
        >
          <input
            type="text"
            placeholder={rest.placeholder}
            value={ value }
            onChange={(e) => {
              setValue(e.target.value)
              e.target.value.length > 0
                ? setShowMenu(true)
                : setShowMenu(false)
            }}
            {...rest}
          />
        </Field.Control>
      </Field.Root>

      {showMenu &&
        <>
          <Menu>
            {optionsFiltered.map(option => (
              <button
                type='button'
                key={option.name}
                onClick={() => {
                  setValue(option.name)
                }}
              >
                {option.name}
              </button>
            ))}
          </Menu>
        </>
      }
      </Content>
      {showMenu && <BackContainer onClick={() => { setShowMenu(false) }}/>}
    </>
  )
}
