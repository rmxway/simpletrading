'use client';

import { usePathname } from 'next/navigation';
import { FC } from 'react';

import { Container, Flexbox, Space } from '@/components/Layouts';

import { NavbarLink, NavbarLogo, Wrapper } from './styled';

const Navbar: FC = () => {
	const pathname = usePathname();

	return (
		<Wrapper>
			<Container>
				<Flexbox $align="center">
					<NavbarLogo href="/">
						ST <span>Simple Trading</span>
					</NavbarLogo>
					<Space />
					<NavbarLink href="/" $active={pathname === '/'}>
						Main
					</NavbarLink>
					<NavbarLink href="/about" $active={pathname === '/about'}>
						About
					</NavbarLink>
				</Flexbox>
			</Container>
		</Wrapper>
	);
};

export { Navbar };
export default Navbar;
