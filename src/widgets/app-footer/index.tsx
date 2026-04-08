'use client';

import { FC } from 'react';

import { Container } from '@/shared/ui/layouts';

import { Brand, Text, Wrapper } from './styled';

const AppFooter: FC = () => {
	const year = new Date().getFullYear();

	return (
		<Wrapper>
			<Container>
				<Text>
					<Brand>Simple Trading</Brand>
					{' · '}
					{year}
				</Text>
			</Container>
		</Wrapper>
	);
};

export { AppFooter };
export default AppFooter;
