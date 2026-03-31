import { FC } from 'react';

import { Container, Flexbox, Space } from '@/components/Layouts';

import { NavbarLink, NavbarLogo, Wrapper } from './styled';

const Navbar: FC = () => (
	<Wrapper>
		<Container>
			<Flexbox align="center">
				<NavbarLogo to="/">
					ST <span>Simple Trading</span>
				</NavbarLogo>
				<Space />
				<NavbarLink to="/">Main</NavbarLink>
				<NavbarLink to="/about">About</NavbarLink>
			</Flexbox>
		</Container>
	</Wrapper>
);

export { Navbar };
export default Navbar;
