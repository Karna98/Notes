/**
 * index.ts
 *
 * Description:
 *    Custom Hooks.
 *
 */

import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { AppDispatchType, RootStateType } from 'renderer/State';
import useResponse from './useResponse';

// Use instead of plain `useDispatch` and `useSelector`
const useAppDispatch = () => useDispatch<AppDispatchType>();
const useAppSelector: TypedUseSelectorHook<RootStateType> = useSelector;

export { useAppDispatch, useAppSelector, useResponse };
