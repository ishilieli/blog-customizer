import { createRoot } from 'react-dom/client';
import { StrictMode, useRef, useState, ReactNode } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { rootCSS } from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

interface WrapperProps {
	tag?: keyof JSX.IntrinsicElements;
	children: ReactNode;
}

const Wrapper: React.FC<WrapperProps> = ({ tag: Tag = 'div', children }) => {
	return <Tag>{children}</Tag>;
};

const App = () => {
	const [wrapperStyles, articleStyles] = useState(rootCSS);
	const articleRef = useRef<HTMLDivElement>(null);
	return (
		<Wrapper tag='main'>
			<div className={clsx(styles.main)} style={wrapperStyles}>
				<ArticleParamsForm articleRef={articleRef} onChange={articleStyles} />
				<Article />
			</div>
		</Wrapper>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
