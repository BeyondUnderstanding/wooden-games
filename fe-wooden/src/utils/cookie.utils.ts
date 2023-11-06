import { setCookie, hasCookie } from 'cookies-next';
import { v4 as uuidv4 } from 'uuid';

/**
 * @description set UUID if not has on cookies.
 */
export const useUUID = () => {
    if (!hasCookie('x-uuid')) {
        setCookie('x-uuid', uuidv4());
    }
};
