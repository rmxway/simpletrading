import type { PropsWithChildren } from 'react';
import styled, { css } from 'styled-components';

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
