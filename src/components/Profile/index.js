import {BsGrid3X3} from 'react-icons/bs'
import {BiCamera} from 'react-icons/bi'

import Header from '../Header'

import './index.css'

const Profile = props => {
  const renderStories = () => {
    const {profileDetails, owner} = props
    const {stories} = profileDetails

    if (stories.length !== 0) {
      return (
        <ul className="up-stories-container">
          {stories.map(eachItem => {
            const {id, image} = eachItem
            return (
              <li className="up-story-item" key={id}>
                <img
                  className="up-story-image"
                  alt={`${owner} story`}
                  src={image}
                />
              </li>
            )
          })}
        </ul>
      )
    }
    return null
  }

  const renderPosts = () => {
    const {profileDetails, owner} = props
    const {posts} = profileDetails

    if (posts.length !== 0) {
      return (
        <ul className="up-posts-container">
          {posts.map(eachItem => {
            const {id, image} = eachItem
            return (
              <li className="up-post-container" key={id}>
                <img
                  className="up-post-image"
                  alt={`${owner} post`}
                  src={image}
                />
              </li>
            )
          })}
        </ul>
      )
    }
    return (
      <div className="up-no-posts-container">
        <div className="up-no-posts-icon-container">
          <BiCamera className="up-no-posts-icon" />
        </div>
        <h1 className="up-no-posts-message">No Posts Yet</h1>
      </div>
    )
  }

  const {profileDetails, owner} = props
  const {
    followersCount,
    followingCount,
    postsCount,
    profilePic,
    userBio,
    userId,
    userName,
  } = profileDetails

  return (
    <>
      <Header />
      <div className="up-container">
        <div className="up-header">
          <div className="up-info-container">
            <img className="up-avatar-lg" alt="" src={profilePic} />
            <div>
              <h1 className="up-name">{userName}</h1>
              <div className="up-avatar-counts-container">
                <img
                  className="up-avatar-sm"
                  alt={`${owner} profile`}
                  src={profilePic}
                />
                <ul className="up-counts-container">
                  <li className="up-count-item">
                    <h1 className="up-count-value">{postsCount}</h1>
                    <p className="up-count-label">posts</p>
                  </li>
                  <li className="up-count-item">
                    <h1 className="up-count-value">{followersCount}</h1>
                    <p className="up-count-label">followers</p>
                  </li>
                  <li className="up-count-item">
                    <h1 className="up-count-value">{followingCount}</h1>
                    <p className="up-count-label">following</p>
                  </li>
                </ul>
              </div>
              <p className="up-username">{userId}</p>
              <p className="up-bio">{userBio}</p>
            </div>
          </div>

          {renderStories()}
        </div>
        <hr className="up-horizontal-rule" />
        <div className="up-tab">
          <BsGrid3X3 className="up-tab-icon" />
          <h1 className="up-tab-label">Posts</h1>
        </div>
        {renderPosts()}
      </div>
    </>
  )
}

export default Profile
