import type { Container } from '@evyweb/ioctopus';
import { DI_SYMBOLS } from '../types';
import type { OAHonoContext } from '$lib/types';

export function registerContextModule(container: Container, ctx: OAHonoContext) {
	container.bind(DI_SYMBOLS.Context).toValue(ctx);
}
