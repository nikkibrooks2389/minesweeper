// hooks/useTheme.js
import { useSelector } from 'react-redux';
import { selectGameSettings } from '../redux/gameSettingsSlice';
import { lightTheme, darkTheme } from '../style/theme';

export const useTheme = () => {
    const selectedTheme = useSelector(selectGameSettings).theme;
    return selectedTheme === 'light' ? lightTheme : darkTheme;
};