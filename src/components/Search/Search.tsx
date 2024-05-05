import cn from 'classnames';
import { forwardRef } from 'react';
import styles from './Search.module.css';
import { SearchProps } from './Search.props';

const Search =
	forwardRef<HTMLInputElement, SearchProps>(function Search({ className, isValid, ...props }, ref) {
		return (
			<div className={styles['input-wrapper']}>
				
			<input
				ref={ref}
				className={cn(styles['input'], className, {
					[styles['invalid']]: isValid,
				})}
				{...props}
				/>
				<img className={styles['icon']} src="/loop-icon.svg" alt="search" />
				</div>
		);
	});

export default Search;
