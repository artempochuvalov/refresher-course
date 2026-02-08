import { memo, useCallback, useState } from 'react';
import { BrowserView, MobileView } from 'react-device-detect';
import { useTranslation } from 'react-i18next';

import { classNames } from '@/shared/lib/classNames';
import { Button, ButtonTheme } from '@/shared/ui/Button';
import { Card } from '@/shared/ui/Card/Card';
import { Drawer } from '@/shared/ui/Drawer/Drawer';
import { Input } from '@/shared/ui/Input/Input';
import { Modal } from '@/shared/ui/Modal/Modal';
import { HStack, VStack } from '@/shared/ui/Stack';
import { StarRating } from '@/shared/ui/StarRating/StarRating';
import { TextAtom } from '@/shared/ui/TextAtom/TextAtom';

interface FeedbackCardProps {
    title: string;
    feedbackTitle?: string;
    hasFeedback?: boolean;
    className?: string;
    onAccept?: (stars: number, feedback?: string) => void;
    onCancel?: (stars: number) => void;
}

export const FeedbackCard = memo((props: FeedbackCardProps) => {
    const {
        title,
        feedbackTitle,
        hasFeedback,
        className,
        onAccept,
        onCancel,
    } = props;
    const { t } = useTranslation();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedStars, setSelectedStars] = useState(0);
    const [feedback, setFeedback] = useState<string>();

    const onStarsSelected = useCallback((stars: number) => {
        setSelectedStars(stars);
        if (hasFeedback) {
            setIsModalOpen(true);
        } else {
            onAccept?.(stars);
        }
    }, [hasFeedback, onAccept]);
    const onFeedbackCancel = useCallback(() => {
        setIsModalOpen(false);
        onCancel?.(selectedStars);
    }, [onCancel, selectedStars]);
    const onFeedbackAccept = useCallback(() => {
        setIsModalOpen(false);
        onAccept?.(selectedStars, feedback);
    }, [onAccept, selectedStars, feedback]);

    const modalContent = (
        <VStack gap="8">
            {feedbackTitle && <TextAtom title={feedbackTitle} />}
            <Input
                placeholder={t('Отзыв')}
                value={feedback}
                onChange={setFeedback}
            />
        </VStack>
    );

    return (
        <>
            <Card className={classNames('', {}, [className])}>
                <VStack gap="4" align="center">
                    <TextAtom title={title} />
                    <StarRating
                        size={30}
                        onSelect={onStarsSelected}
                    />
                </VStack>
            </Card>

            <MobileView>
                <Drawer
                    isOpen={isModalOpen}
                    onClose={onFeedbackCancel}
                >
                    <VStack gap="16">
                        {modalContent}
                        <Button fullWidth onClick={onFeedbackAccept}>
                            {t('Отправить')}
                        </Button>
                    </VStack>
                </Drawer>
            </MobileView>
            <BrowserView>
                <Modal isOpen={isModalOpen} onClose={onFeedbackCancel} lazy>
                    <VStack gap="16">
                        {modalContent}

                        <HStack gap="8" justify="end">
                            <Button theme={ButtonTheme.OutlineRed} onClick={onFeedbackCancel}>
                                {t('Отменить')}
                            </Button>
                            <Button onClick={onFeedbackAccept}>
                                {t('Отправить')}
                            </Button>
                        </HStack>
                    </VStack>
                </Modal>
            </BrowserView>
        </>
    );
});
