import styled from 'styled-components/macro';

export const TableStyled = styled.div`
	position: relative;
	color: #fff;
	overflow-x: auto;
	padding-bottom: 10px;
	display: flex;
	flex-direction: column;
`;

export const TableHeader = styled.div`
	display: flex;
	width: 100%;
	font-weight: 600;
	padding: 10px;
	font-family: ${(props) => props.theme.fonts.bold};
	flex-wrap: nowrap;
	margin-bottom: 20px;
`;

export const TableItem = styled.div`
	width: 100%;
	display: flex;
	flex-wrap: nowrap;
	width: max-content;
	min-width: 100%;
	padding: 10px;
	border-bottom: 1px solid ${(props) => props.theme.colors.gray.$8};
	transition: 0.1s;

	&:last-child {
		border: none;
	}

	&:hover {
		background-color: ${(props) => props.theme.colors.gray.$9};
	}
`;

interface TableCellProps {
	alignRight?: boolean;
	width?: number;
	pointer?: boolean;
	flexGrow?: boolean;
}

export const TableCell = styled.div<TableCellProps>`
	position: relative;
	width: ${(props) => props?.width || 200}px;
	display: flex;
	align-items: center;
	justify-content: ${(props) => (props.alignRight ? 'flex-end' : 'flex-start')};
	flex-shrink: 0;
	flex-grow: ${(props) => (props.flexGrow ? 1 : 0)};
	padding-right: 20px;
	cursor: ${(props) => (props.pointer ? 'pointer' : 'default')};
`;
