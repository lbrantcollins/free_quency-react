import React from 'react';
import { Menu, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const Header = (props) => {
	return(

			<Menu>

				{ props.loggedIn ? 
						<Menu.Item><Link to='/media/new'><Icon name="plus"/></Link></Menu.Item>
					:
					null
				}

				<Menu.Item><Link to='/browse-media'>Browse Media</Link></Menu.Item>

				{ props.loggedIn ? 
					<Menu.Menu>
						<Menu.Item><Link to='/my-media'>My Media</Link></Menu.Item>
						<Menu.Item><Link to='/my-favorites'>My Favorites</Link></Menu.Item>
					</Menu.Menu> 
					:
					<Menu.Menu position='right'>
						<Menu.Item><Link to='/login'>Login</Link></Menu.Item>
						<Menu.Item><Link to='/register'>Register</Link></Menu.Item>
					</Menu.Menu>
				}
				{ props.loggedIn ? 
					<Menu.Menu position='right'>
						<Menu.Item><Link to={ '/user/'+props.userId }>My Profile</Link></Menu.Item>
						<Menu.Item onClick={props.logout}>Logout</Menu.Item>
					</Menu.Menu>
					:
					null
				}
			</Menu>

	)
}

export default Header