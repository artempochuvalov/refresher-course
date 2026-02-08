import { PopupAnchorPosition } from '../model/types';
import cls from './Popup.module.scss';

export const PopupAnchorPositionClasses: Record<PopupAnchorPosition, string> = {
    'top left': cls.topLeft,
    'top right': cls.topRight,
    'bottom left': cls.bottomLeft,
    'bottom right': cls.bottomRight,
};
