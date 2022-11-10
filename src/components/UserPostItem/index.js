import {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import {AiOutlineHeart} from 'react-icons/ai'
import {FaRegComment} from 'react-icons/fa'
import {BiShareAlt} from 'react-icons/bi'
import {FcLike} from 'react-icons/fc'

import ThemeContext from '../../context/ThemeContext'
import {
  UpiCard,
  UpiHeader,
  UpiAvatarContainer,
  UpiAvatar,
  UpiUserName,
  UpiImage,
  UpiFooter,
  UpiReactionsContainer,
  UpiReactionButton,
  UpiLikesCount,
  UpiCaption,
  UpiCommentsContainer,
  UpiCommentItem,
  UpiCommentUsername,
  UpiComment,
  UpiTime,
} from './styledComponents'

import './index.css'

class UserPostItem extends Component {
  state = {likeStatus: false}

  onClickLikeButton = async () => {
    const {likeStatus} = this.state
    const {UserPostDetails} = this.props
    const {postId} = UserPostDetails
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/insta-share/posts/${postId}/like`
    const requestObject = {like_status: !likeStatus}
    const options = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      body: JSON.stringify(requestObject),
    }
    const response = await fetch(url, options)
    if (response.ok) {
      this.setState({likeStatus: !likeStatus})
    }
  }

  renderUserPostComments = () => {
    const {UserPostDetails} = this.props
    const {comments} = UserPostDetails
    return (
      <UpiCommentsContainer>
        {comments.map(eachComment => {
          const {userId, userName, comment} = eachComment
          return (
            <UpiCommentItem key={userId}>
              <UpiComment>
                <UpiCommentUsername>{userName}</UpiCommentUsername>
                {comment}
              </UpiComment>
            </UpiCommentItem>
          )
        })}
      </UpiCommentsContainer>
    )
  }

  render() {
    const {likeStatus} = this.state
    const {UserPostDetails} = this.props
    const {
      createdAt,
      likesCount,
      postDetails,
      profilePic,
      userId,
      userName,
    } = UserPostDetails
    const {caption, imageUrl} = postDetails

    return (
      <ThemeContext.Consumer>
        {value => {
          const {isDark} = value
          return (
            <UpiCard dark={isDark}>
              <UpiHeader>
                <UpiAvatarContainer>
                  <UpiAvatar alt="post author profile" src={profilePic} />
                </UpiAvatarContainer>
                <Link className="upi-username-link" to={`/users/${userId}`}>
                  <UpiUserName>{userName}</UpiUserName>
                </Link>
              </UpiHeader>
              <UpiImage alt="post" src={imageUrl} />
              <UpiFooter>
                <UpiReactionsContainer>
                  {likeStatus ? (
                    <UpiReactionButton
                      type="button"
                      testid="unLikeIcon"
                      onClick={this.onClickLikeButton}
                    >
                      <FcLike className="upi-like-icon" />
                    </UpiReactionButton>
                  ) : (
                    <UpiReactionButton
                      type="button"
                      testid="likeIcon"
                      onClick={this.onClickLikeButton}
                    >
                      <AiOutlineHeart className="upi-unlike-icon" />
                    </UpiReactionButton>
                  )}

                  <UpiReactionButton type="button">
                    <FaRegComment className="upi-comment-icon" />
                  </UpiReactionButton>
                  <UpiReactionButton type="button">
                    <BiShareAlt className="upi-share-icon" />
                  </UpiReactionButton>
                </UpiReactionsContainer>
                <UpiLikesCount>{likesCount + likeStatus} likes</UpiLikesCount>
                <UpiCaption>{caption}</UpiCaption>
                {this.renderUserPostComments()}
                <UpiTime>{createdAt}</UpiTime>
              </UpiFooter>
            </UpiCard>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}
export default UserPostItem
