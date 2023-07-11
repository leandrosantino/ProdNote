import { Field } from '../Field'
import { BackContainer, Content, Menu } from './styles'
import { type HTMLProps, useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'

interface ComboboxRootProps extends HTMLProps<HTMLInputElement> {
  name: string
  options: string[]
  isValid?: boolean
  message?: string
  onSelectOption?: (option: string) => void
}

export function Combobox ({ options, onSelectOption, isValid = true, message, ...rest }: ComboboxRootProps) {
  const [showMenu, setShowMenu] = useState(false)
  const [value, setValue] = useState('')
  const [optionsFiltered, setOptionsFiltered] = useState<string[]>(options)

  useEffect(() => {
    setOptionsFiltered(options?.filter(option =>
      option?.toLocaleUpperCase()
        .search(value?.toLocaleUpperCase()) >= 0
    ))
  }, [value])

  useEffect(() => {
    if (optionsFiltered.length === 0) setShowMenu(false)
    if (optionsFiltered.length === 1 && optionsFiltered[0] === value) {
      if (onSelectOption !== undefined) {
        onSelectOption(optionsFiltered[0])
      }
      setShowMenu(false)
    }
  }, [optionsFiltered])

  const { getValues, watch, setValue: setFormValue, clearErrors } = useFormContext()

  useEffect(() => {
    const fieldValue = getValues(rest.name)
    setValue(fieldValue)
    fieldValue?.length > 0
      ? setShowMenu(true)
      : setShowMenu(false)
  }, [watch()[rest.name]])

  return (
    <>
      <Content>

      <Field.Input
        type="text"
        {...rest}
      />

      {showMenu &&
        <>
          <Menu>
            {optionsFiltered.map(option => (
              <button
                type='button'
                key={option}
                onClick={() => {
                  setValue(option)
                  setFormValue(rest.name, option)
                  clearErrors(rest.name)
                }}
              >
                {option}
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
