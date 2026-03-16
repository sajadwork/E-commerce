import { useSettings } from '../context/SettingsContext';
import { formatPrice as formatPriceUtil } from '../utils/formatPrice';

export const useFormatPrice = () => {
    const { settings } = useSettings();
    
    const formatPrice = (price) => {
        return formatPriceUtil(price, settings.currency, settings.language === 'en' ? 'en-US' : settings.language);
    };

    return formatPrice;
};
