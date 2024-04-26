import {registerSheet} from 'react-native-actions-sheet';
import CopySheet from './CopySheet';
import DeleteSheet from './DeleteSheet';

/**
 * Registering the sheets here because otherwise sheet closes on
 * hot reload during development.
 */
registerSheet('CopySheet', CopySheet);
registerSheet('DeleteSheet', DeleteSheet);

export {};
