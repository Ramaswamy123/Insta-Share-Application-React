import {Component} from 'react'
import Slider from 'react-slick'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import ThemeContext from '../../context/ThemeContext'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}
const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 7,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 900,
      settings: {
        slidesToShow: 6,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 660,
      settings: {
        slidesToShow: 5,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
      },
    },
  ],
}
class UserStories extends Component {
  state = {userStoriesData: [], apiStatus: apiStatusConstants.initial}

  componentDidMount = () => {
    this.getUserStories()
  }

  getUserStories = async () => {
    const jwtToken = Cookies.get('jwt_token')
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const getFormattedData = data =>
      data.map(eachItem => ({
        storyUrl: eachItem.story_url,
        userId: eachItem.user_id,
        userName: eachItem.user_name,
      }))
    const url = 'https://apis.ccbp.in/insta-share/stories'
    const options = {
      method: 'GET',
      headers: {
        authorization: `bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const responseData = await response.json()
      const updatedResponseData = getFormattedData(responseData.users_stories)
      this.setState({
        userStoriesData: updatedResponseData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderStoriesView = () => {
    const {userStoriesData} = this.state
    return (
      userStoriesData.length !== 0 && (
        <>
          <div className="main-container">
            <div className="slick-container">
              <Slider {...settings}>
                {userStoriesData.map(eachStory => {
                  const {storyUrl, userId, userName} = eachStory
                  return (
                    <div className="slick-item" key={userId}>
                      <div className="story-item">
                        <img
                          className="story-image"
                          src={storyUrl}
                          alt="user story"
                        />
                        <p className="story-user-name marquee">
                          <span>{userName}</span>
                        </p>
                      </div>
                    </div>
                  )
                })}
              </Slider>
            </div>
          </div>
          <ThemeContext.Consumer>
            {value => {
              const {isDark} = value
              const hrClassName = isDark
                ? 'story-footer-rule story-footer-rule-dark'
                : 'story-footer-rule'
              return <hr className={hrClassName} />
            }}
          </ThemeContext.Consumer>
        </>
      )
    )
  }

  renderLoadingView = () => (
    <>
      <div
        className="stories-loading-container"
        // eslint-disable-next-line react/no-unknown-property
        testid="loader"
      >
        <Loader type="TailSpin" color="#4094EF" height={30} width={30} />
      </div>
      <hr className="story-footer-rule" />
    </>
  )

  renderFailureView = () => (
    <>
      <div className="stories-loading-container">
        <img
          className="stories-error-icon"
          alt="failure view"
          src="https://res.cloudinary.com/aneesmon/image/upload/v1648988122/Insta_Share/home-failure-image_twfusi.png"
        />
        <p className="stories-error-message">
          Something went wrong. Please try again
        </p>
        <button
          className="stories-error-button"
          type="button"
          onClick={this.getUserStories}
        >
          Try again
        </button>
      </div>
      <hr className="story-footer-rule" />
    </>
  )

  render() {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.success:
        return this.renderStoriesView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }
}
export default UserStories
