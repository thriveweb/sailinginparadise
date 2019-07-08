import React, { Component } from 'react'

import { ICONInstagram, ICONButtonArrows } from './Icons'

import './InstagramFeed.css'

export default class InstagramFeed extends Component {
  static defaultProps = {
    instagramUrl: 'https://www.instagram.com/sailinginparadisegoldcoast/',
    count: 6
  }

  state = {
    mounted: false,
    posts: [],
    instagramUsername: ''
  }

  clearStorage() {
    const lastclear = localStorage.getItem('lastclear'),
      time_now = new Date().getTime()

    // .getTime() returns milliseconds so 1000 * 60 * 60 * 24 = 1 days
    if (time_now - lastclear > 1000 * 60 * 60 * 1) {
      localStorage.clear()
      localStorage.setItem('lastclear', time_now)
    }
  }

  componentDidMount() {
    this.clearStorage()
    const parsed = this.parseInstagramUrl(this.props.instagramUrl)
    const instagramUsername = parsed ? parsed[1] : ''

    if (!this.state.mounted && instagramUsername) {
      this.fetchInstagram()
      this.setState({
        mounted: true,
        instagramUsername
      })
    }
  }

  componentDidUpdate = () => {
    if(this.state.posts && !!this.state.posts.length && !this.state.lazyAdded) {

      this.setState({
        lazyAdded: true
      }, () => {
        var lazyImages = [].slice.call(document.querySelectorAll(".lazy"));

        if ("IntersectionObserver" in window) {
          let lazyImageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
              if (entry.isIntersecting) {
                let lazyImage = entry.target;

                if(lazyImage.dataset.src) {
                  if(lazyImage.classList.contains('BackgroundImage')) {
                    lazyImage.style.backgroundImage = `url(${lazyImage.dataset.src})`;
                  }  else {
                    lazyImage.src = lazyImage.dataset.src;
                  }

                  lazyImage.classList.remove("lazy");
                  lazyImageObserver.unobserve(lazyImage);
                }
              }
            });
          });

          lazyImages.forEach(function(lazyImage) {
            lazyImageObserver.observe(lazyImage);
          });
        }
      })
    }
  }

  parseInstagramUrl = string =>
    string.match(/(?:https?:\/\/)(?:www.)?instagram.com\/([\w\d_-]+)\/?/i)

  fetchInstagram = () => {
    let insaFeed = localStorage.getItem('insaFeed')
      ? localStorage.getItem('insaFeed')
      : false

    if (!insaFeed) {
      typeof window !== 'undefined' &&
        fetch(`https://instagram.thrivex.io/?ref=sailinginparadisegoldcoast`)
          .then(res => res.json())
          .then(data => {
            insaFeed = data && data.items ? data.items : []
            localStorage.setItem('insaFeed', JSON.stringify(insaFeed))
            this.setState({
              posts: insaFeed
            })
          })
          .catch(err => console.error(err))
    }
    this.setState({
      posts: JSON.parse(insaFeed)
    })
  }

  renderLoadingItems = () => (
    <div className="InstagramFeed">
      {[...Array(this.props.count)].map((x, index) => (
        <div
          className="InstagramFeed--EmptyPost"
          data-display="Loading"
          key={`EmptyPost-${index}`}
        />
      ))}
    </div>
  )

  render() {
    if (!this.state.posts.length) {
      return this.renderLoadingItems()
    }
    return (
      <section className="InstagramSection">
				<div className='insta-intro'>
					<h2><ICONInstagram /> Instagram</h2>
					<a className='button' href='https://www.instagram.com/sailinginparadisegoldcoast/'>Follow Us <ICONButtonArrows/></a>
				</div>
				<div id='instafeed'>
	        {this.state.posts.slice(0, this.props.count).map(post => (
	          <Post
	            key={post.code}
	            src={post.display_src}
	            code={post.code}
	            caption={post.caption}
	          />
	        ))}
				</div>
      </section>
    )
  }
}

const Post = ({ src, code }) => (
  <a
    className="instagram-item"
    href={`https://instagram.com/p/${code}`}
    rel="noopener noreferrer"
    target="_blank"
    aria-label="Instagram Post Link"
  >

  <div
    style={{
      backgroundSize: 'cover'
    }}
    data-src={src}
    className='Instagram BackgroundImage absolute lazy'
  ></div>
  </a>
)
