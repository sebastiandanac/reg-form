import React, { useState, useRef, RefObject, HTMLInputTypeAttribute, MouseEventHandler } from 'react'
import { Transition } from '@headlessui/react'
import Image from 'next/image'
import checkIcon from '../../assets/check.svg'

interface PrimaryInput {
	placeholder?: string
	customClass?: string
	label?: string
	id?: string
	type?: HTMLInputTypeAttribute
	icon?: JSX.Element | JSX.Element[] | HTMLElement
	iconClick?: MouseEventHandler
}

export const PrimaryInput = ({
	placeholder,
	customClass,
	label,
	id,
	type,
	icon,
	iconClick,
}: PrimaryInput) => {
	const inputRef = useRef<HTMLInputElement>(null)
	// only for checkbox
	const [isChecked, setIsChecked] = useState(false)

	const [hasValue, setHasValue] = useState('')

	const focusInputEl = () => {
		inputRef.current?.focus()
	}

	// Class constants to simplify working with classes
	const hover = 'border-transparent hover:border-Gray'
	const focus = 'focus:text-GrayDark outline-none focus:border-transparent'
	const renderInput = 'h-16 w-full px-5 rounded-14 text-Gray bg-GrayLight border relative'
	const error = 'border-[#F43C3C] text-[#F43C3C]'
	const checkboxInput = 'h-6 w-6 cursor-pointer border bg-GrayLight rounded-[6px]'

	const RenderInput = () => {
		const Input = () => {
			const handleOnChange = (e: { target: { value: React.SetStateAction<string> } }) => {
				setHasValue(e.target.value)
			}
			return (
				<input
					ref={inputRef as RefObject<HTMLInputElement>}
					className={` ${label ? 'pt-6 pb-1' : 'py-3'} ${renderInput} ${focus} ${hover}`}
					placeholder={placeholder}
					onChange={handleOnChange}
					value={hasValue}
					type={type}
					id={id}
					autoFocus
				/>
			)
		}

		if (icon) {
			const RenderIcon = () => {
				if (iconClick) {
					return (
						<div
							onClick={iconClick}
							className={`z-40 absolute right-4 top-0 h-full flex items-center`}
						>
							<div
								className={`p-1 rounded-7 hover:bg-Gray/10 cursor-pointer flex items-center`}
							>
								{icon}
							</div>
						</div>
					)
				}
				return <div className={`absolute right-5 top-0 h-full flex items-center`}>{icon}</div>
			}

			return (
				<div className={`relative`}>
					<Input />
					<RenderIcon />
				</div>
			)
		}

		return <Input />
	}

	const RenderLabel = () => {
		return (
			<label
				className={`pointer-events-none absolute text-Gray left-5 top-[22px] z-10 ${
					hasValue.length > 0
						? '-translate-y-3 text-[12px]'
						: 'group-focus-within:-translate-y-3 group-focus-within:text-[12px]'
				} translate-y-0 text-sm`}
				htmlFor={id}
			>
				{label}
			</label>
		)
	}

	if (type == 'checkbox') {
		const checkInput = () => setIsChecked(!isChecked)

		return (
			<div
				onClick={checkInput}
				className={`${checkboxInput} ${focus} ${hover} md:hover:shadow-xl md:hover:scale-110 ${
					isChecked ? 'bg-PrimaryBlue !border-transparent' : ''
				}`}
			>
				<input className={`hidden`} type="checkbox" checked={isChecked} id={id} />
				<Transition
					show={isChecked}
					className={`flex justify-center items-center w-full h-full`}
					enter="transition duration-300 ease-out"
					enterFrom="transform scale-50 opacity-0"
					enterTo="transform scale-100 opacity-100"
					leave="transition duration-75 ease-out"
					leaveFrom="transform scale-100 opacity-100"
					leaveTo="transform scale-50 opacity-0"
				>
					<Image src={checkIcon} />
				</Transition>
			</div>
		)
	}

	if (label) {
		return (
			<div
				onClick={focusInputEl}
				className={`relative overflow-hidden rounded-14 group ${
					customClass ? customClass : ''
				}`}
			>
				<div
					className={`absolute bottom-0 left-0 h-[2px] w-full group-focus-within:bg-PrimaryBlue group-focus-within:animate-scaleVert z-10 ${error}`}
				/>
				<RenderLabel />
				<RenderInput />
			</div>
		)
	}
	return <RenderInput />
}
