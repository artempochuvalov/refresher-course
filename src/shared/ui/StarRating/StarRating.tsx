import { memo, useCallback, useState } from 'react';

import { Star } from '@/shared/assets/icons';
import { classNames } from '@/shared/lib/classNames';

import { HStack } from '../Stack';
import cls from './StarRating.module.scss';

interface StarRatingProps {
    size?: number;
    selectedStars?: number;
    className?: string;
    onSelect?: (stars: number) => void;
}

const stars = [1, 2, 3, 4, 5];

export const StarRating = memo((props: StarRatingProps) => {
    const {
        size = 60,
        selectedStars = 0,
        className,
        onSelect,
    } = props;

    const [currentStar, setCurrentStar] = useState(selectedStars);
    const [isSelected, setIsSelected] = useState(Boolean(selectedStars));

    const onMouseEnter = useCallback((star: number) => {
        if (!isSelected) {
            setCurrentStar(star);
        }
    }, [isSelected]);
    const onMouseLeave = useCallback(() => {
        if (!isSelected) {
            setCurrentStar(0);
        }
    }, [isSelected]);
    const onClick = useCallback((star: number) => {
        if (!isSelected) {
            setCurrentStar(star);
            setIsSelected(true);
            onSelect?.(star);
        }
    }, [isSelected, onSelect]);

    return (
        <HStack
            gap="4"
            className={classNames(cls.StarRating, {}, [className])}
            onMouseLeave={onMouseLeave}
        >
            {stars.map((star) => (
                <Star
                    className={classNames(
                        cls.starIcon,
                        {
                            [cls.filled]: star <= currentStar,
                            [cls.selected]: isSelected,
                        }
                    )}
                    width={`${size}px`}
                    height={`${size}px`}
                    key={String(star)}
                    onMouseEnter={() => onMouseEnter(star)}
                    onClick={() => onClick(star)}
                />
            ))}
        </HStack>
    );
});
