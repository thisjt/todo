import { createContainer } from '@evyweb/ioctopus';

import { DI_SYMBOLS } from './types';
import type { DI_RETURN_TYPES } from './types';

const applicationContainer = createContainer();

export function getDI<K extends keyof typeof DI_SYMBOLS>(symbol: K): DI_RETURN_TYPES[K] {
	return applicationContainer.get(DI_SYMBOLS[symbol]);
}
