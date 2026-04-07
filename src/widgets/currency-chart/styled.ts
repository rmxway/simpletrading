import type { ComponentPropsWithoutRef, PropsWithChildren } from 'react';
import styled, { css, keyframes } from 'styled-components';

export const CHART_MOUNT_CLASS = 'chart-mount';

export const ChartRoot = styled.div`
	${({ theme }) => css`
		display: flex;
		flex-direction: column;
		gap: ${theme.layout.baseMargin};
	`}
`;

export const PeriodRow = styled.div`
	${({ theme }) => css`
		display: flex;
		flex-wrap: wrap;
		gap: ${theme.layout.baseMargin};
	`}
`;

export const ChartWrapper = styled.div<PropsWithChildren<{ $height: string; $width: string }>>`
	${({ $height, $width }) => css`
		height: ${$height};
		width: ${$width};

		& > .${CHART_MOUNT_CLASS} {
			height: 100%;
			width: 100%;
		}
	`}
`;

type SkeletonRootProps = { $height: string } & ComponentPropsWithoutRef<'div'>;

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

export const SkeletonRoot = styled.div<SkeletonRootProps>`
	${({ $height, theme }) => css`
		height: ${$height};
		width: 100%;
		border-radius: ${theme.radius.borderRadius};
		background-color: ${theme.colors.gray.$8};
		animation: ${pulse} 1.4s ease-in-out infinite;
	`}
`;
