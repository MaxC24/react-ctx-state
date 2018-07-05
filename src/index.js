import createContext from './create-context';
import { mP, mC } from './multiple-contexts'

export default createContext;
export const provideMultipleCtx = mP
export const consumeMultipleCtx = mC