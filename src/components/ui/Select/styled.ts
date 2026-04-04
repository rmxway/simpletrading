import type { ComponentPropsWithoutRef, ComponentPropsWithRef, PropsWithChildren } from 'react';
import styled, { css } from 'styled-components';

type SelectRootProps = PropsWithChildren<ComponentPropsWithRef<'div'>>;

const SelectRoot = styled.div<SelectRootProps>`
	${({ theme }) => css`
		position: relative;
		width: 100%;
		font-family: ${theme.fonts.base};

		label {
			display: block;
			margin-bottom: 5px;
			color: ${theme.colors.gray.$4};
			text-transform: uppercase;
			font-size: 12px;
		}
	`}
`;

type TriggerProps = ComponentPropsWithoutRef<'button'> & {
	$isOpen: boolean;
	$disabled?: boolean;
};

const Trigger = styled.button<TriggerProps>`
	${({ theme, $isOpen, $disabled }) => css`
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		padding: 11px 14px 10px 16px;
		border-radius: ${theme.radius.borderRadius};
		background-color: ${theme.colors.gray.$9};
		font-family: inherit;
		font-size: 14px;
        font-weight: 600;
		line-height: 1.2;
		color: ${theme.colors.gray.$2};
        border: 1px solid ${theme.colors.gray.$6};
		text-align: left;
		cursor: pointer;
		transition: border-color 0.12s ease;

		&:focus-visible {
			outline: none;
			border-color: ${theme.colors.success};
		}

		${$isOpen &&
		css`
			border-color: ${theme.colors.success};
		`}

		${$disabled &&
		css`
			background-color: ${theme.colors.gray.$3};
			opacity: 0.8;
			cursor: default;
			pointer-events: none;
		`}
	`}
`;

type TriggerLabelProps = PropsWithChildren<ComponentPropsWithRef<'span'>>;

const TriggerLabel = styled.span<TriggerLabelProps>`
	${({ theme }) => css`
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		flex: 1;
		min-width: 0;

		&[data-placeholder='true'] {
			color: ${theme.colors.gray.$5};
		}
	`}
`;

const Chevron = styled.span<{ $isOpen: boolean }>`
	${({ theme, $isOpen }) => css`
		flex-shrink: 0;
		margin-left: 10px;
		width: 0;
		height: 0;
		border-left: 5px solid transparent;
		border-right: 5px solid transparent;
		border-top: 6px solid ${theme.colors.gray.$6};
		transform: rotate(${$isOpen ? '180deg' : '0deg'});
		transition: transform 0.15s ease;
	`}
`;

type ListProps = ComponentPropsWithoutRef<'ul'>;

const List = styled.ul<ListProps & { $open: boolean }>`
	${({ theme, $open }) => css`
		position: absolute;
		z-index: 20;
		left: 0;
		right: 0;
		top: calc(100% + 4px);
		margin: 5px 0 0;
		padding: 0;
		list-style: none;
		max-height: 240px;
        display: flex;
        flex-direction: column;
		overflow-y: auto;
        overflow-x: hidden;
		transition: opacity 0.2s;
		opacity: ${$open ? 1 : 0};
		visibility: ${$open ? 'visible' : 'hidden'};
		border-radius: ${theme.radius.borderRadius};
        border: 1px solid ${theme.colors.gray.$8};
		background-color: ${theme.colors.gray.$9};
		box-shadow: 0 5px 25px rgba(0, 0, 0, 0.4);
	`}
`;

type OptionProps = ComponentPropsWithoutRef<'li'> & {
	$selected: boolean;
	$highlighted: boolean;
};

const Option = styled.li<OptionProps>`
	${({ theme, $selected, $highlighted }) => css`
		padding: 10px 16px;
		font-size: 14px;
		line-height: 1.2;
		color: ${theme.colors.gray.$4};
		cursor: pointer;
		transition: background-color 0.1s ease;

		${$highlighted &&
		css`
			background-color: ${theme.colors.gray.$8};
		`}

		${$selected &&
		css`
			color: ${theme.colors.success};
			font-weight: 600;
		`}
	`}
`;

export { Chevron, List, Option, SelectRoot, Trigger, TriggerLabel };
