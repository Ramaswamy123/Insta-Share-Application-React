import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import Header from '../Header'
import Profile from '../Profile'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class UserProfile extends Component {
  state = {userProfileData: {}, apiStatus: apiStatusConstants.initial}

  componentDidMount = () => {
    this.getUserProfile()
  }

  getUserProfile = async () => {
    const jwtToken = Cookies.get('jwt_token')
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const {match} = this.props
    const {params} = match
    const {id} = params

    const url = `https://apis.ccbp.in/insta-share/users/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `bearer ${jwtToken}`,
      },
    }

    const getFormattedData = data => ({
      posts: data.posts,
      stories: data.stories,
      followersCount: data.followers_count,
      followingCount: data.following_count,
      id: data.id,
      postsCount: data.posts_count,
      profilePic: data.profile_pic,
      userBio: data.user_bio,
      userId: data.user_id,
      userName: data.user_name,
    })

    const response = await fetch(url, options)
    const fetchedData = await response.json()

    if (response.ok) {
      const userProfile = fetchedData.user_details
      const updatedUserProfile = getFormattedData(userProfile)
      this.setState({
        userProfileData: updatedUserProfile,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderUserProfileView = () => {
    const {userProfileData} = this.state
    return <Profile profileDetails={userProfileData} owner="user" />
  }

  renderLoadingView = () => (
    <>
      <Header />
      <div
        className="user-profile-loader-container"
        // eslint-disable-next-line react/no-unknown-property
        testid="loader"
      >
        <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
      </div>
    </>
  )

  renderFailureView = () => (
    <>
      <Header />
      <div className="user-profile-loader-container">
        <img
          className="user-profile-error-image"
          alt="failure view"
          src="https://res.cloudinary.com/aneesmon/image/upload/v1648988134/Insta_Share/failure-image_hzoet8.png"
        />
        <p className="user-profile-error-message">
          Something went wrong. Please try again
        </p>
        <button
          className="user-profile-error-button"
          type="button"
          onClick={this.getUserProfile}
        >
          Try again
        </button>
      </div>
    </>
  )

  render() {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.success:
        return this.renderUserProfileView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }
}

export default UserProfile
