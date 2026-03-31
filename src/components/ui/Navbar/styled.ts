import { Link, NavLink } from 'react-router-dom';
import styled from 'styled-components';

export const Wrapper = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	height: 75px;
	display: flex;
	align-items: center;
	background-color: ${(props) => props.theme.colors.gray.$8};
	box-shadow: ${(props) => props.theme.layout.shadow};
	z-index: 100;
`;

export const NavbarLink = styled(NavLink)`
	position: relative;
	text-decoration: none;
	margin-left: 30px;
	font-size: 1.2rem;
	color: #fff;

	&.active {
		color: ${(props) => props.theme.colors.primary};

		&:before {
			position: absolute;
		}
	}
`;

export const NavbarLogo = styled(Link)`
	font-family: ${(props) => props.theme.fonts.base};
	font-size: 3rem;
	font-weight: 900;
	color: #fff;
	display: flex;
	align-items: center;
	text-decoration: none;
	text-transform: uppercase;
	margin-right: 20px;

	span {
		position: relative;
		margin-left: 3px;
		font-size: 1.1rem;
		padding-top: 20px;
		line-height: 1.1;
		color: ${(props) => props.theme.colors.primary};

		&:before {
			position: absolute;
			content: '';
			top: 3px;
			left: 0;
			right: 0;
			height: 15px;
			border-radius: 2px;
			background-color: ${(props) => props.theme.colors.primary};
		}
	}
`;
