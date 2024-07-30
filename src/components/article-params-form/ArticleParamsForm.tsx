import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';

import styles from './ArticleParamsForm.module.scss';
import { CSSProperties, RefObject, useEffect, useState } from 'react';
import clsx from 'clsx';
import {
	backgroundColors,
	contentWidthArr,
	rootCSS,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
} from 'src/constants/articleProps';
import { Text } from 'components/text';
import { Select } from 'components/select';
import { Separator } from 'components/separator';
import { RadioGroup } from 'components/radio-group';

type PropsFormType = {
	onChange: (prevState: CSSProperties) => void;
	articleRef: RefObject<HTMLDivElement>;
};

type ParameterFormType = {
	fontFamilyOption: OptionType;
	fontSizeOption: OptionType;
	fontColor: OptionType;
	backgroundColor: OptionType;
	contentWidth: OptionType;
};

export const ArticleParamsForm = (props: PropsFormType) => {
	const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

	const [selectedOptions, setSelectedOptions] = useState<ParameterFormType>({
		...defaultArticleState,
	});

	useEffect(() => {
		const handleClick = (event: MouseEvent) => {
			const { target } = event;
			if (
				target instanceof Node &&
				props.articleRef.current &&
				isMenuOpen &&
				props.articleRef.current.contains(target)
			) {
				setIsMenuOpen(!isMenuOpen);
			}
		};

		window.addEventListener('click', handleClick);

		return () => {
			window.removeEventListener('click', handleClick);
		};
	}, [isMenuOpen]);

	const handleClickArrow = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	return (
		<>
			<ArrowButton onClick={handleClickArrow} isMenuOpen={isMenuOpen} />
			<aside
				className={clsx(styles.container, {
					[styles.container_open]: isMenuOpen,
				})}>
				<form
					className={styles.form}
					onSubmit={(e) => {
						e.preventDefault();
						props.onChange({
							'--font-family': selectedOptions.fontFamilyOption.value,
							'--font-size': selectedOptions.fontSizeOption.value,
							'--font-color': selectedOptions.fontColor.value,
							'--container-width': selectedOptions.contentWidth.value,
							'--bg-color': selectedOptions.backgroundColor.value,
						} as CSSProperties);
					}}>
					<Text weight={800} size={31} uppercase align={'left'}>
						задайте параметры
					</Text>
					<Select
						title={'шрифт'}
						options={fontFamilyOptions}
						selected={selectedOptions.fontFamilyOption}
						onChange={(font) => {
							setSelectedOptions({
								...selectedOptions,
								fontFamilyOption: font,
							});
						}}
					/>
					<RadioGroup
						name={'FontSize'}
						title={'размер шрифта'}
						options={fontSizeOptions}
						selected={selectedOptions.fontSizeOption}
						onChange={(fontSizeOption) => {
							setSelectedOptions({
								...selectedOptions,
								fontSizeOption: fontSizeOption,
							});
						}}
					/>
					<Select
						title={'цвет шрифта'}
						options={fontColors}
						selected={selectedOptions.fontColor}
						onChange={(fontColor) => {
							setSelectedOptions({
								...selectedOptions,
								fontColor: fontColor,
							});
						}}
					/>
					<Separator />
					<Select
						title={'цвет фона'}
						options={backgroundColors}
						selected={selectedOptions.backgroundColor}
						onChange={(backgroundColor) => {
							setSelectedOptions({
								...selectedOptions,
								backgroundColor: backgroundColor,
							});
						}}
					/>
					<Select
						title={'ширина контента'}
						options={contentWidthArr}
						selected={selectedOptions.contentWidth}
						onChange={(contentWidth) => {
							setSelectedOptions({
								...selectedOptions,
								contentWidth: contentWidth,
							});
						}}
					/>

					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							type='reset'
							onClick={() => {
								setSelectedOptions({
									...defaultArticleState,
								});
								props.onChange(rootCSS);
							}}
						/>
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
