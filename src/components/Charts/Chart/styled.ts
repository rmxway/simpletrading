import type { ComponentProps, PropsWithChildren } from 'react';
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

type PeriodButtonProps = { $active: boolean } & ComponentProps<'button'>;

export const PeriodButton = styled.button<PeriodButtonProps>`
	${({ theme, $active }) => css`
		appearance: none;
		border-radius: ${theme.radius.borderRadius};
		padding: 11px 16px 10px;
		font-size: 12px;
		font-weight: 800;
		text-transform: uppercase;
		cursor: pointer;
		line-height: 1;
		transition:
			background-color 0.1s,
			border-color 0.1s,
			color 0.1s;
		font-family: inherit;

		${$active
			? css`
					border: 1px solid transparent;
					background-color: ${theme.colors.primary};
					color: #6d410a;

					&:hover {
						filter: brightness(0.95);
					}
				`
			: css`
					border: 1px solid ${theme.colors.gray.$5};
					background: transparent;
					color: ${theme.colors.gray.$4};

					&:hover {
						background-color: ${theme.colors.gray.$8};
					}

					&:active {
						background-color: ${theme.colors.gray.$7};
					}
				`}
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
