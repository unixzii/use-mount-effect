type Destructor = () => void;
type EffectCallback = () => void | Destructor;
type UseMountEffect = (effect: EffectCallback) => void;

/**
 * It works similarly to `useEffect`, but it fires only once after the component is mounted.
 * Use this to register some operations that should only perform when the component is mounted, regardless
 * of whether strict mode is enabled.
 *
 * @param effect Imperative function that can return a cleanup function
 */
export const useMountEffect: UseMountEffect;
