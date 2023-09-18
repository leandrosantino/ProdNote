import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  height: 100%;
  justify-content: center;
  &>div{
    width: 100%;
    height: 100%;
    max-width: 500px;

    form{
      margin-top: 1.2rem;
      width: 100%;
    }

  }

`

export const FieldCase = styled.div`

  display: flex;
  gap: .8rem;;

`
