import styled from 'styled-components'

export const UpiCard = styled.li`
  margin-bottom: 30px;
  @media screen and (min-width: 768px) {
    width: 100%;
    border: 1px solid ${props => (props.dark ? '#202020' : '#dbdbdb')};
    box-sizing: border-box;
    border-radius: 4px;
    padding: 15px 0px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    background-color: ${props => (props.dark ? '#101010' : '#ffffff')};
  }
`
export const UpiHeader = styled.div`
  display: flex;
  align-items: center;
  margin-left: 20px;
  margin-bottom: 10px;
  @media screen and (min-width: 768px) {
    margin-bottom: 15px;
  }
`
export const UpiAvatarContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;
  border-radius: 100%;
  background-image: linear-gradient(
    314.35deg,
    #e20337 6.03%,
    #c60188 40.88%,
    #7700c3 73.23%
  );
  margin-right: 10px;
`
export const UpiAvatar = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 100%;
  border: 1px solid #ffffff;
`
export const UpiUserName = styled.p`
  font-family: 'Roboto';
  font-weight: 500;
  font-size: 14px;
  color: #262626;
  margin: 0px;
`
export const UpiImage = styled.img`
  width: 100%;
  margin-bottom: 5px;
  @media screen and (min-width: 768px) {
    align-self: center;
    width: 100%;
    max-height: 700px;
    margin-bottom: 5px;
  }
`
export const UpiFooter = styled.div`
  margin-left: 20px;
`
export const UpiReactionsContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  min-height: 32px;
  @media screen and (min-width: 768px) {
    margin-bottom: 12px;
  }
`
export const UpiReactionButton = styled.button`
  padding: 0px;
  border: 0px;
  background-color: transparent;
  margin-right: 10px;
  min-width: 25px;
`
export const UpiLikesCount = styled.p`
  font-family: 'Roboto';
  font-weight: 500;
  font-size: 12px;
  color: #262626;
  margin: 0px;
  margin-bottom: 8px;
  @media screen and (min-width: 768px) {
    font-size: 14px;
    margin-bottom: 12px;
  }
`
export const UpiCaption = styled.p`
  font-family: 'Roboto';
  font-weight: 400;
  font-size: 12px;
  color: #262626;
  margin: 0px;
  margin-bottom: 8px;
  @media screen and (min-width: 768px) {
    font-size: 14px;
    margin-bottom: 12px;
  }
`
export const UpiCommentsContainer = styled.ul`
  list-style-type: none;
  padding-left: 0px;
  margin: 0px;
  margin-bottom: 8px;
  @media screen and (min-width: 768px) {
    margin-bottom: 15px;
  }
`
export const UpiCommentItem = styled.li`
  margin-bottom: 5px;
  @media screen and (min-width: 768px) {
    margin-bottom: 6px;
  }
`
export const UpiCommentUsername = styled.span`
  font-family: 'Roboto';
  font-weight: 500;
  font-size: 12px;
  color: #262626;
  margin: 0px;
  margin-right: 3px;
  @media screen and (min-width: 768px) {
    font-size: 14px;
  }
`
export const UpiComment = styled.p`
  font-family: 'Roboto';
  font-weight: 400;
  font-size: 12px;
  color: #262626;
  margin: 0px;
  @media screen and (min-width: 768px) {
    font-size: 14px;
  }
`
export const UpiTime = styled.p`
  font-family: 'Roboto';
  font-weight: 400;
  font-size: 9px;
  color: #989898;
  margin: 0px;
  @media screen and (min-width: 768px) {
    font-size: 12px;
  }
`
