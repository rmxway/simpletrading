'use client';

import { FC, KeyboardEvent, MouseEvent, useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';

import { Chevron, List, Option, SelectRoot, Trigger, TriggerLabel } from './styled';

export type SelectOption = {
	value: string;
	label: string;
};

export type SelectProps = {
	/** Имя для скрытого input (отправка формы) */
	name: string;
	options: SelectOption[];
	value: string;
	onChange: (value: string) => void;
	label?: string;
	placeholder?: string;
	disabled?: boolean;
	className?: string;
};

const SelectUI: FC<SelectProps> = ({
	name,
	options,
	value,
	onChange,
	label,
	placeholder = 'Выберите…',
	disabled,
	className,
}) => {
	const [open, setOpen] = useState(false);
	const [highlightedIndex, setHighlightedIndex] = useState(0);
	const rootRef = useRef<HTMLDivElement>(null);
	const uid = useId();
	const listId = `${uid}-list`;
	const baseId = `${uid}-base`;

	const selectedIndex = useMemo(() => options.findIndex((o) => o.value === value), [options, value]);

	const selectedOption = selectedIndex >= 0 ? options[selectedIndex] : undefined;

	const close = useCallback(() => {
		setOpen(false);
	}, []);

	useEffect(() => {
		if (!open) return;

		const onDocPointerDown = (e: Event) => {
			const el = rootRef.current;
			if (el && !el.contains(e.target as Node)) {
				close();
			}
		};

		document.addEventListener('mousedown', onDocPointerDown);
		document.addEventListener('touchstart', onDocPointerDown);
		return () => {
			document.removeEventListener('mousedown', onDocPointerDown);
			document.removeEventListener('touchstart', onDocPointerDown);
		};
	}, [open, close]);

	useEffect(() => {
		if (open) {
			setHighlightedIndex(selectedIndex >= 0 ? selectedIndex : 0);
		}
	}, [open, selectedIndex]);

	const selectByIndex = useCallback(
		(index: number) => {
			const opt = options[index];
			if (opt) {
				onChange(opt.value);
			}
			close();
		},
		[options, onChange, close],
	);

	const onKeyDown = (e: KeyboardEvent) => {
		if (disabled) return;

		if (e.key === 'Escape' && open) {
			e.preventDefault();
			close();
			return;
		}

		if (!open && (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown' || e.key === 'ArrowUp')) {
			e.preventDefault();
			setOpen(true);
			return;
		}

		if (!open) return;

		if (e.key === 'ArrowDown') {
			e.preventDefault();
			setHighlightedIndex((i) => (i + 1 >= options.length ? 0 : i + 1));
			return;
		}

		if (e.key === 'ArrowUp') {
			e.preventDefault();
			setHighlightedIndex((i) => (i - 1 < 0 ? options.length - 1 : i - 1));
			return;
		}

		if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			selectByIndex(highlightedIndex);
		}
	};

	return (
		<SelectRoot ref={rootRef} className={className}>
			{label && <label htmlFor={`${baseId}-trigger`}>{label}</label>}

			<input type="hidden" name={name} value={value} readOnly aria-hidden />

			<Trigger
				id={`${baseId}-trigger`}
				type="button"
				disabled={disabled}
				$isOpen={open}
				$disabled={disabled}
				aria-haspopup="listbox"
				aria-expanded={open}
				aria-controls={listId}
				aria-activedescendant={open ? `${baseId}-opt-${highlightedIndex}` : undefined}
				onClick={() => !disabled && setOpen((o) => !o)}
				onKeyDown={onKeyDown}
			>
				<TriggerLabel data-placeholder={!selectedOption}>
					{selectedOption ? selectedOption.label : placeholder}
				</TriggerLabel>
				<Chevron $isOpen={open} aria-hidden />
			</Trigger>

			{options.length > 0 && (
				<List id={listId} role="listbox" tabIndex={-1} aria-label={label ?? placeholder} $open={open}>
					{options.map((opt, index) => (
						<Option
							key={opt.value}
							id={`${baseId}-opt-${index}`}
							role="option"
							aria-selected={opt.value === value}
							$selected={opt.value === value}
							$highlighted={index === highlightedIndex}
							onMouseEnter={() => setHighlightedIndex(index)}
							onMouseDown={(e: MouseEvent<HTMLLIElement>) => e.preventDefault()}
							onClick={() => selectByIndex(index)}
						>
							{opt.label}
						</Option>
					))}
				</List>
			)}
		</SelectRoot>
	);
};

export { SelectUI };
export default SelectUI;
