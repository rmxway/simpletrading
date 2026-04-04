'use client';

import { FC } from 'react';

import { Container, Flexbox, Space } from '@/components/Layouts';

import { NavbarLogo, Wrapper } from './styled';

const Navbar: FC = () => {
	return (
		<Wrapper>
			<Container>
				<Flexbox $align="center">
					<NavbarLogo href="/">
						ST <span>Simple Trading</span>
					</NavbarLogo>
					<Space />
				</Flexbox>
			</Container>
		</Wrapper>
	);
};

export { Navbar };
export default Navbar;
