import styled from "styled-components"

export const FooterContainer = styled.footer`
  padding: 1em 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  right: 0;
  bottom: 0;
  left: 0;
  margin: 0;
`

export const AcceptedPayments = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 1rem;

  img {
    width: 50px;
  }
`
