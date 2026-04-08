'use client';

import { FC } from 'react';

import { Container, Flexbox } from '@/shared/ui/layouts';

import { LogoMark, LogoTitle, NavbarLogo, Wrapper } from './styled';

const Navbar: FC = () => {
	return (
		<Wrapper>
			<Container>
				<Flexbox $align="center" $justify="center">
					<NavbarLogo href="/" aria-label="Simple Trading — на главную">
						<LogoMark>ST</LogoMark>
						<LogoTitle>
							<strong>Simple Trading</strong>
						</LogoTitle>
					</NavbarLogo>
				</Flexbox>
			</Container>
		</Wrapper>
	);
};

export { Navbar };
export default Navbar;
