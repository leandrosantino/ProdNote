import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  gap: 1.2rem;
  grid-template-rows: 3.5rem auto;
  grid-template-columns: 1fr;
  grid-template-areas:
    "head"
    "content";

  &>header{
    grid-area: head;
  }
  &>div{
    grid-area: content;
  }

`

export const Header = styled.header`
  padding: .4rem;

  h2{
    font-size: 1.8rem;
    width: 33.33%;
    display: flex;
    justify-content: start;
    align-items: center;
  }

  &>div{
    width: 33.33%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  display: flex;
  justify-content: space-between;

`

export const OeeValueCase = styled.div`

  display: flex;
  border: 0.15rem solid ${p => p.theme.colors.dark.gray10};
  border-radius: .4rem;


  span{
    text-align: center;
    padding: .2rem .6rem;
    font-size: 1.4rem;
  }

  span:first-child{
    color: ${p => p.theme.colors.dark.gray12};
    background-color: ${p => p.theme.colors.dark.gray10}
  }

`

export const FiltersCase = styled.div`
  display: flex;
  justify-content: end;
  gap: .8rem;
`

export const Filter = styled.div`
  label{
    margin-right: .4rem;
  }

  select{
    width: 6rem;
    border: 0.15rem solid ${p => p.theme.colors.dark.gray10};
    font-size: 1.4rem;
    padding: .2rem;
    border-radius: .4rem;
    text-indent: .2rem;
  }
`
export const ChartsArea = styled.div`

  display: grid;
  gap: 1.6rem;
  grid-template-rows: .6fr .4fr;
  grid-template-columns: .4fr .6fr;
  grid-template-areas:
    "chart1 chart2"
    "chart3 chart3";

  div:nth-child(1){grid-area: chart1;}
  div:nth-child(2){grid-area: chart2;}
  div:nth-child(3){grid-area: chart3;}

`
export const Chart = styled.div`
  border: 0.15rem solid ${p => p.theme.colors.dark.gray10};
  border-radius: .8rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  *:active, *:focus{
    outline: none;
  }

  &>div{
    width: 100%;
    padding: 0 .8rem;
    display: flex;
    justify-content: space-between;
    h3{
      font-size: 1.6rem;
      width: 100%;
    }
    &>div{
      width: 50%;
    }
  }

`
