import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import Header from '../Header'
import Profile from '../Profile'

const myPosts = [
  {
    image:
      'https://res.cloudinary.com/randy-orton/image/upload/v1667797126/PicsArt_01-19-05.54.52_ym0tgx.jpg',
  },
  {
    image:
      'https://res.cloudinary.com/randy-orton/image/upload/v1668058706/IMG_20200917_192831_mlbijo.jpg',
  },
  {
    image:
      'https://res.cloudinary.com/randy-orton/image/upload/v1668060210/IMG_20210315_133814_zkmsyu.jpg',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class MyProfile extends Component {
  state = {myProfileData: {}, apiStatus: apiStatusConstants.initial}

  componentDidMount = () => {
    this.getMyProfile()
  }

  getMyProfile = async () => {
    const jwtToken = Cookies.get('jwt_token')
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const url = 'https://apis.ccbp.in/insta-share/my-profile'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `bearer ${jwtToken}`,
      },
    }

    const getFormattedData = data => ({
      posts: myPosts,
      stories: data.stories,
      followersCount: data.followers_count,
      followingCount: data.following_count,
      id: data.id,
      postsCount: data.posts_count,
      profilePic:
        'https://res.cloudinary.com/randy-orton/image/upload/v1668057973/ram_q53zcw.jpg ',
      userBio: 'Frontend Developer',
      userId: 'Ramaswamy',
      userName: 'Ramaswamy',
    })

    const response = await fetch(url, options)
    console.log(response)
    const fetchedData = await response.json()
    console.log(fetchedData)

    if (response.ok) {
      const myProfile = fetchedData.profile
      const updatedMyProfile = getFormattedData(myProfile)
      this.setState({
        myProfileData: updatedMyProfile,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderMyProfileView = () => {
    const {myProfileData} = this.state
    return <Profile profileDetails={myProfileData} owner="my" />
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
          onClick={this.getMyProfile}
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
        return this.renderMyProfileView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }
}

export default MyProfile
