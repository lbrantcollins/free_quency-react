import React, { Component } from 'react';
import { Button, Form, Grid, Image, Message, Segment, Menu, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const Header = (props) => {
	return(

			<Menu>
				<Menu.Item><a href='#'>Browse Media</a></Menu.Item>

				{ props.loggedIn ? 
					<Menu.Menu>
						<Menu.Item><a href='#'>My Media</a></Menu.Item>
						<Menu.Item><a href='#'>My Favorites</a></Menu.Item>
						<Menu.Item><a href='/media/new'><Icon name="plus"/></a></Menu.Item>
					</Menu.Menu> :

					<Menu.Menu>
						<Menu.Item><a href='/login'>Login</a></Menu.Item>
						<Menu.Item><a href='/register'>Register</a></Menu.Item>
					</Menu.Menu>
				}
			</Menu>

	)
}

export default Header