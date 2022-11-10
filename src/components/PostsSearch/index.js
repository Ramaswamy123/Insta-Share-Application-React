import {Component} from 'react'
import Loader from 'react-loader-spinner'
import UserPostItem from '../UserPostItem'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class PostsSearch extends Component {
  renderSearchResultsView = () => {
    const {searchResults} = this.props

    if (searchResults.length !== 0) {
      return (
        <>
          <h1 className="posts-search-title">Search Results</h1>
          <ul className="user-posts-container search-results-container">
            {searchResults.map(eachPost => (
              <UserPostItem key={eachPost.postId} UserPostDetails={eachPost} />
            ))}
          </ul>
        </>
      )
    }
    return (
      <div className="user-profile-loader-container">
        <img
          className="user-profile-error-image"
          alt="search not found"
          src="https://res.cloudinary.com/aneesmon/image/upload/v1648988144/Insta_Share/search-not-found-image_pgjuwz.png"
        />
        <h1 className="posts-search-error-message">Search Not Found</h1>
        <p className="posts-search-error-description">
          Try different keyword or search again
        </p>
      </div>
    )
  }

  renderInitialView = () => (
    <div className="user-profile-loader-container">
      <img
        className="posts-search-initial-image"
        alt=""
        src="https://res.cloudinary.com/aneesmon/image/upload/v1649495550/Insta_Share/search-initial_oyoblm.png"
      />
      <h1 className="posts-search-initial-message">
        Search Results will be appear here
      </h1>
    </div>
  )

  renderLoadingView = () => (
    <div
      className="user-profile-loader-container"
      // eslint-disable-next-line react/no-unknown-property
      testid="loader"
    >
      <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
    </div>
  )

  onClickRetry = () => {
    const {getSearchResults} = this.props
    getSearchResults()
  }

  renderFailureView = () => (
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
        onClick={this.onClickRetry}
      >
        Try again
      </button>
    </div>
  )

  render() {
    const {apiStatus} = this.props
    switch (apiStatus) {
      case apiStatusConstants.initial:
        return this.renderInitialView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.success:
        return this.renderSearchResultsView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }
}

export default PostsSearch
