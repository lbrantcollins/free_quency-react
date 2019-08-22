import React, { Component } from 'react';
import { Button, Form, Grid, Image, Message, Segment, Menu, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const Header = (props) => {
	return(

			<Menu>
				<Menu.Item><Link to='#'>Browse Media</Link></Menu.Item>

				{ props.loggedIn ? 
					<Menu.Menu>
						<Menu.Item><Link to='#'>My Media</Link></Menu.Item>
						<Menu.Item><Link to='#'>My Favorites</Link></Menu.Item>
						<Menu.Item><Link to='/media/new'><Icon name="plus"/></Link></Menu.Item>
						<Menu.Item><Link to='/user/edit'>Edit Profile</Link></Menu.Item>
						<Menu.Item><Link to='/mediaf'>feature media</Link></Menu.Item>
						<Menu.Item onClick={props.logout}>Logout</Menu.Item>
					</Menu.Menu> 
					:
					<Menu.Menu>
						<Menu.Item><Link to='/login'>Login</Link></Menu.Item>
						<Menu.Item><Link to='/register'>Register</Link></Menu.Item>
					</Menu.Menu>
				}
			</Menu>

	)
}

export default Header