import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;


`

export const Content = styled.div`
  width: 100%;
  height: 100%;
  max-width: 1038px;
  max-height: 625px;
  display: grid;
  justify-content: center;
  align-items: center;
  gap: 1.2rem;
  grid-template-rows: 4.1rem auto;
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
    /* background-color: red; */
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
  justify-content: end !important;
  gap: .4rem;

  div{
    margin-right: .8rem;
    p{
      font-weight: 500;
      font-size: 1.2rem;
      text-align: end;
    }
  }

`

export const Filter = styled.div`
  label{
    margin-right: .4rem;
  }

  input:last-child{
    width: 16rem;
  }

  input, select{
    width: 6rem;
    border: 0.15rem solid ${p => p.theme.colors.dark.gray10};
    font-size: 1.4rem;
    padding: .2rem;
    border-radius: .4rem;
    text-indent: .2rem;
  }
`
export const ChartsArea = styled.div`
  height: 100%;
  display: grid;
  gap: 1.6rem;
  grid-template-columns: .4fr .6fr;
  grid-template-rows: .6fr .4fr;
  grid-template-areas:
    "chart1 chart2"
    "chart3 chart3";

  div:nth-child(1){grid-area: chart1;}
  div:nth-child(2){grid-area: chart2;}
  div:nth-child(3){grid-area: chart3;}

`
export const Chart = styled.div<{ loading?: boolean }>`
  border: 0.15rem solid ${p => p.theme.colors.dark.gray10};
  border-radius: .8rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: s${p => p.loading ? 'space-between' : 'center'};
  align-items: center;
  padding: .8rem;
  position: relative;

  button{
    position: absolute;
    top: 0;
    right: 0;
    margin-top: 2rem;
    margin-right: 2rem;
    padding: .4rem;
    border-radius: .4rem;
    color: ${p => p.theme.colors.dark.green11};
    &:hover{
      background-color: ${p => p.theme.colors.dark.green12};
    }
    display: flex;
    justify-content: center;
    align-items: center;
    gap: .4rem;
    font-weight: 500;
    font-size: 1.4rem;

  }

  *:active, *:focus{
    outline: none;
  }
  div#chatTurn{
    height: fit-content ;
    justify-content: center;
  }

  div#chatClass{
    height: 100%;
    justify-content: center;
  }

  div#chartDaily{
    height: fit-content ;
    justify-content: center;
  }

  &>div:last-child{
    height: 80%;
    width: 95%;
    margin-top: 1.2rem;
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
      width: 100%;
      #tech{
        width: 13rem;
      }
    }
  }

`
export const SelectFiltersContent = styled.div`
  box-shadow: var(--shadown);
  width: 100%;
  max-width: 60rem;
  height: fit-content;
  background-color: white;
  border-radius: 1.2rem;
  padding: 1.2rem;
  position: absolute;
  inset: 0;
  margin: auto;
  top: -20rem;
  display: flex;
  flex-direction: column;

  form {
    &>div{
      width: 100%;
      display: flex;
      gap: .8rem;
      div{
        flex: 1;
      }
    }
    select{
      option{
        font-size: 1.2rem;
      }
    }
  }

  div{
    width: 100%;
    display: flex;
    justify-content: end;
    button{
      width: 16rem;
    }
  }

  @media (min-width:1000px){
    left: 25.6rem
  }

  h1{
    font-size: 2rem;
    margin-bottom: auto.4rem;
  }

  z-index: 200;
  @media (max-width: 560px) {
    height: fit-content;
    z-index: 210;
  }
`
