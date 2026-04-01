import type { PropsWithChildren } from 'react';
import styled, { css } from 'styled-components';

export const TableStyled = styled.div<PropsWithChildren>`
	position: relative;
	color: #fff;
	overflow-x: auto;
	padding-bottom: 10px;
	display: flex;
	flex-direction: column;
`;

export const TableHeader = styled.div<PropsWithChildren>`
	display: flex;
	width: 100%;
	font-weight: 600;
	padding: 10px;
	${({ theme }) => css`
		font-family: ${theme.fonts.bold};
	`}
	flex-wrap: nowrap;
	margin-bottom: 20px;
`;

export const TableItem = styled.div<PropsWithChildren>`
	width: 100%;
	display: flex;
	flex-wrap: nowrap;
	width: max-content;
	min-width: 100%;
	padding: 10px;
	${({ theme }) => css`
		border-bottom: 1px solid ${theme.colors.gray.$8};
	`}
	transition: 0.1s;

	&:last-child {
		border: none;
	}

	&:hover {
		${({ theme }) => css`
			background-color: ${theme.colors.gray.$9};
		`}
	}
`;

interface TableCellProps {
	$alignRight?: boolean;
	$width?: number;
	$pointer?: boolean;
	$flexGrow?: boolean;
}

export const TableCell = styled.div<PropsWithChildren<TableCellProps>>`
	${({ $width, $alignRight, $flexGrow, $pointer }) => css`
		position: relative;
		width: ${$width ?? 200}px;
		display: flex;
		align-items: center;
		justify-content: ${$alignRight ? 'flex-end' : 'flex-start'};
		flex-shrink: 0;
		flex-grow: ${$flexGrow ? 1 : 0};
		padding-right: 20px;
		cursor: ${$pointer ? 'pointer' : 'default'};
	`}
`;
