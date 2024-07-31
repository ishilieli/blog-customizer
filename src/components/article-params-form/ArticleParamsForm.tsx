import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';

import styles from './ArticleParamsForm.module.scss';
import { FormEvent, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import {
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	ArticleStateType,
} from 'src/constants/articleProps';
import { Text } from 'components/text';
import { Select } from 'components/select';
import { Separator } from 'components/separator';
import { RadioGroup } from 'components/radio-group';

type PropsFormType = {
	onChange: (data: ArticleStateType) => void;
};

export const ArticleParamsForm = (props: PropsFormType) => {
	const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
	const [selectedOptions, setSelectedOptions] =
		useState<ArticleStateType>(defaultArticleState);
	const formRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!isMenuOpen) return;
		const handleClick = (event: MouseEvent) => {
			if (formRef.current && !formRef.current.contains(event.target as Node)) {
				setIsMenuOpen(!isMenuOpen);
			}
		};

		window.addEventListener('mousedown', handleClick);

		return () => {
			window.removeEventListener('mousedown', handleClick);
		};
	}, [isMenuOpen, formRef]);

	const handleClickArrow = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	const handleFormSubmit = (evt: FormEvent) => {
		evt.preventDefault();
		props.onChange(selectedOptions);
	};

	const handleFormReset = () => {
		setSelectedOptions(defaultArticleState);
		props.onChange(defaultArticleState);
	};

	return (
		<>
			<ArrowButton onClick={handleClickArrow} isMenuOpen={isMenuOpen} />
			<aside
				ref={formRef}
				className={clsx(styles.container, {
					[styles.container_open]: isMenuOpen,
				})}>
				<form className={styles.form} onSubmit={handleFormSubmit}>
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
						<Button title='Сбросить' type='reset' onClick={handleFormReset} />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
