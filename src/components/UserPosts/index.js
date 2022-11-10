import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import UserPostItem from '../UserPostItem'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class UserPosts extends Component {
  state = {userPosts: [], apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getUserPosts()
  }

  getUserPosts = async () => {
    const jwtToken = Cookies.get('jwt_token')
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const url = 'https://apis.ccbp.in/insta-share/posts'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const getFormattedData = data =>
      data.map(eachPost => ({
        comments: eachPost.comments.map(eachComment => ({
          comment: eachComment.comment,
          userId: eachComment.user_id,
          userName: eachComment.user_name,
        })),
        postDetails: {
          caption: eachPost.post_details.caption,
          imageUrl: eachPost.post_details.image_url,
        },
        createdAt: eachPost.created_at,
        likesCount: eachPost.likes_count,
        postId: eachPost.post_id,
        profilePic: eachPost.profile_pic,
        userId: eachPost.user_id,
        userName: eachPost.user_name,
      }))

    const response = await fetch(url, options)
    const responseData = await response.json()
    if (response.ok) {
      const userPosts = responseData.posts
      const updatedUserPosts = getFormattedData(userPosts)
      this.setState({
        userPosts: updatedUserPosts,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderUserPostsView = () => {
    const {userPosts} = this.state

    return (
      <ul className="user-posts-container">
        {userPosts.map(eachPost => (
          <UserPostItem key={eachPost.postId} UserPostDetails={eachPost} />
        ))}
      </ul>
    )
  }

  renderLoadingView = () => (
    <div
      className="user-posts-loader-container"
      // eslint-disable-next-line react/no-unknown-property
      testid="loader"
    >
      <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
    </div>
  )

  renderFailureView = () => (
    <div className="user-posts-loader-container">
      <img
        className="user-posts-error-icon"
        alt="failure view"
        src="https://res.cloudinary.com/aneesmon/image/upload/v1648988122/Insta_Share/home-failure-image_twfusi.png"
      />
      <p className="user-posts-error-message">
        Something went wrong. Please try again
      </p>
      <button
        className="user-posts-error-button"
        type="button"
        onClick={this.getUserPosts}
      >
        Try again
      </button>
    </div>
  )

  render() {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.success:
        return this.renderUserPostsView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }
}

export default UserPosts
