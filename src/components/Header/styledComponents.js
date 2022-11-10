import styled from 'styled-components'

export const Navbar = styled.nav`
  display: flex;
  justify-content: center;
  padding-top: 5px;
  background-color: ${props => (props.dark ? '#303030' : '#ffffff')};
  @media screen and (min-width: 768px) {
    padding-top: 10px;
    padding-bottom: 10px;
  }
`
export const NavContent = styled.div`
  width: 85%;
  @media screen and (min-width: 768px) {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  @media screen and (min-width: 1024px) {
    width: 70%;
  }
`
export const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`
export const HeaderWebsiteLogo = styled.img`
  width: 54px;
  margin-right: 10px;
`
export const HeaderWebsiteTitle = styled.h1`
  font-family: 'Roboto';
  font-weight: 500;
  font-size: 18px;
  color: #262626;
  @media screen and (min-width: 768px) {
    margin: 0px;
  }
  @media screen and (min-width: 1024px) {
    font-size: 20px;
  }
`
export const HeaderMenuButton = styled.button`
  background-color: transparent;
  border: 0px;
  padding: 0px;
`
export const NavMenuSm = styled.ul`
  display: flex;
  align-items: center;
  list-style-type: none;
  padding-left: 0px;
  justify-content: space-between;
  @media screen and (min-width: 768px) {
    display: none;
  }
`
export const NavItem = styled.li`
  margin-right: 10px;
  @media screen and (min-width: 768px) {
    margin-right: 15px;
  }
  @media screen and (min-width: 1024px) {
    margin-right: 22px;
  }
`
export const NavItemButton = styled(NavItem)`
  margin-right: 0px;
`
export const SearchTextButton = styled.button``
export const HeaderThemeButton = styled.button`
  padding: 0px;
  background-color: transparent;
  border: 0px;
`
export const HeaderLogoutButton = styled.button`
  width: 80px;
  height: 30px;
  background-color: #4094ef;
  border-radius: 4px;
  border: 0px;
  color: #ffffff;
  font-family: 'Roboto';
  font-weight: 500;
  font-size: 12px;
  @media screen and (min-width: 375px) {
    width: 90px;
  }
`

export const HeaderSearchContainerSm = styled.div`
  background-color: ${props => (props.dark ? '#505050' : '#fafafa')};
  border: 1px solid ${props => (props.dark ? '#505050' : '#dbdbdb')};
  border-radius: 3px;
  display: flex;
  height: 28px;
  margin-top: 16px;
  margin-bottom: 20px;
  @media screen and (min-width: 768px) {
    display: none;
  }
`
export const HeaderSearch = styled.input`
  font-family: 'Roboto';
  font-weight: 300;
  font-size: 14px;
  color: ${props => (props.dark ? '#fafafa' : '#666666')};
  background-color: transparent;
  border: 0px;
  padding-left: 10px;
  flex-grow: 1;
  outline: none;
  margin-right: 5px;
`

export const HeaderSearchButton = styled.button`
  background-color: ${props => (props.dark ? '#202020' : '#dbdbdb')};
  border-radius: 0px 2px 2px 0px;
  border: 0px;
  padding: 0px;
  width: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and (min-width: 768px) {
    width: 35px;
  }
`
export const NavMenuLg = styled.ul`
  display: none;
  @media screen and (min-width: 768px) {
    display: flex;
    align-items: center;
    list-style-type: none;
    padding-left: 0px;
    margin: 5px 0px 5px 0px;
  }
`

export const HeaderSearchContainerLg = styled(NavItem)`
  background-color: ${props => (props.dark ? '#505050' : '#fafafa')};
  border: 1px solid ${props => (props.dark ? '#505050' : '#dbdbdb')};
  border-radius: 3px;
  display: flex;
  height: 24px;
`
export const NavbarFooterRule = styled.hr`
  display: none;
  @media screen and (min-width: 768px) {
    display: block;
    border-top: none;
    border-bottom: 1px solid ${props => (props.dark ? '#303030' : '#dbdbdb')};
    margin-bottom: 25px;
    margin-top: 0px;
  }
`
