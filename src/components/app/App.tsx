import { useState, ReactNode, CSSProperties } from 'react';
import { Article } from '../article';
import { ArticleParamsForm } from '../article-params-form';
import {
	ArticleStateType,
	defaultArticleState,
} from 'src/constants/articleProps';

import styles from '../../styles/index.module.scss';

interface WrapperProps {
	tag?: keyof JSX.IntrinsicElements;
	children: ReactNode;
}

const Wrapper: React.FC<WrapperProps> = ({ tag: Tag = 'div', children }) => {
	return <Tag>{children}</Tag>;
};

export const App = () => {
	const [wrapperStyles, setWrapperStyles] =
		useState<ArticleStateType>(defaultArticleState);

	const onChange = (styles: ArticleStateType) => {
		setWrapperStyles(styles);
	};
	return (
		<Wrapper tag='main'>
			<div
				className={styles.main}
				style={
					{
						'--font-family': wrapperStyles.fontFamilyOption.value,
						'--font-size': wrapperStyles.fontSizeOption.value,
						'--font-color': wrapperStyles.fontColor.value,
						'--container-width': wrapperStyles.contentWidth.value,
						'--bg-color': wrapperStyles.backgroundColor.value,
					} as CSSProperties
				}>
				<ArticleParamsForm onChange={onChange} />
				<Article />
			</div>
		</Wrapper>
	);
};
