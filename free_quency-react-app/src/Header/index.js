import React, { Component } from 'react';
import { Menu, Icon, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class Header extends Component {

	constructor(){
		super()

		this.state = {
			activeItem: 'browse-media'
		}
	}

	handleItemClick = (e, { name }) => {

		console.log(name);

		this.setState({ activeItem: name })

	}

	render(){
		return(

				<Menu>

					{ this.props.loggedIn ? 
							<Menu.Item 
								className='Link'
								name='addMedia'
            				active={this.state.activeItem === 'addMedia'}
            				onClick={this.handleItemClick}>
            				<Link to='/media/new' color='black'><Icon name="plus"/></Link>
            			</Menu.Item>
						:
						null
					}



					<Menu.Item
						className='Link'
						name='browse-media'
            		active={this.state.activeItem === 'browseMedia'}
            		onClick={this.handleItemClick}>
						<Link to='/browse-media'>Browse Media</Link>
					</Menu.Item>

					{ this.props.loggedIn ? 
						<Menu.Menu>
							<Menu.Item
								className='Link'
								name='my-media'
				            active={this.state.activeItem === 'myMedia'}
				            onClick={this.handleItemClick}>
								<Link to='/my-media'>My Media</Link>
							</Menu.Item>
							<Menu.Item
								className='Link'
								name='my-favorites'
				            active={this.state.activeItem === 'myFavorites'}
				            onClick={this.handleItemClick}>
								<Link to='/my-favorites'>My Favorites</Link>
							</Menu.Item>
						</Menu.Menu> 
						:
						<Menu.Menu position='right'>
							<Menu.Item
								className='Link'
								name='login'
				            active={this.state.activeItem === 'login'}
				            onClick={this.handleItemClick}>
								<Link to='/login'>Login</Link>
							</Menu.Item>
							<Menu.Item
								className='Link'
								name='register'
				            active={this.state.activeItem === 'register'}
				            onClick={this.handleItemClick}>
								<Link to='/register'>Register</Link>
							</Menu.Item>
						</Menu.Menu>
					}
					{ this.props.loggedIn ? 
						<Menu.Menu position='right'>
							<Menu.Item

								name='myProfile'
				            active={this.state.activeItem === 'myProfile'}
				            onClick={this.handleItemClick}>
								<Link to={ '/user/'+this.props.userId }>My Profile</Link>
							</Menu.Item>
							<Menu.Item onClick={this.props.logout}>Logout</Menu.Item>
						</Menu.Menu>
						:
						null
					}
				</Menu>

		)

	}
}

export default Header