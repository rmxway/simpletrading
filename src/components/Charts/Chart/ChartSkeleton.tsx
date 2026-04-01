import type { ComponentPropsWithoutRef } from 'react';
import { FC } from 'react';
import styled, { css, keyframes } from 'styled-components';

type RootProps = { $height: string } & ComponentPropsWithoutRef<'div'>;

const pulse = keyframes`
	0% {
		opacity: 0.45;
	}
	50% {
		opacity: 0.85;
	}
	100% {
		opacity: 0.45;
	}
`;

const Root = styled.div<RootProps>`
	${({ $height, theme }) => css`
		height: ${$height};
		width: 100%;
		border-radius: ${theme.radius.borderRadius};
		background-color: ${theme.colors.gray.$8};
		animation: ${pulse} 1.4s ease-in-out infinite;
	`}
`;

export interface ChartSkeletonProps {
	height?: string;
	className?: string;
}

export const ChartSkeleton: FC<ChartSkeletonProps> = ({ height = '300px', ...props }) => (
	<Root {...props} $height={height} role="status" aria-label="Загрузка графика" />
);
