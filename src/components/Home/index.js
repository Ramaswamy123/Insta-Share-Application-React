import {Component} from 'react'
import Cookies from 'js-cookie'

import Header from '../Header'
import UserStories from '../UserStories'
import UserPosts from '../UserPosts'
import PostsSearch from '../PostsSearch'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Home extends Component {
  state = {
    searchQuery: '',
    searchResults: [],
    apiStatus: apiStatusConstants.initial,
  }

  updateSearchQuery = updatedQuery => {
    const {searchQuery} = this.state
    this.setState({searchQuery: updatedQuery})
    if (searchQuery === '') {
      this.setState({apiStatus: apiStatusConstants.initial})
    }
  }

  getSearchResults = async () => {
    const {searchQuery} = this.state
    const jwtToken = Cookies.get('jwt_token')
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const url = `https://apis.ccbp.in/insta-share/posts?search=${searchQuery}`
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
    const fetchedData = await response.json()
    if (response.ok) {
      const searchResults = fetchedData.posts
      const updatedSearchResults = getFormattedData(searchResults)
      this.setState({
        searchResults: updatedSearchResults,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  render() {
    const {searchQuery, searchResults, apiStatus} = this.state

    if (searchQuery === '') {
      return (
        <>
          <Header
            searchQuery={searchQuery}
            updateSearchQuery={this.updateSearchQuery}
          />
          <UserStories />
          <UserPosts />
        </>
      )
    }
    return (
      <>
        <Header
          searchQuery={searchQuery}
          updateSearchQuery={this.updateSearchQuery}
          getSearchResults={this.getSearchResults}
        />
        <PostsSearch
          searchResults={searchResults}
          apiStatus={apiStatus}
          getSearchResults={this.getSearchResults}
        />
      </>
    )
  }
}

export default Home
