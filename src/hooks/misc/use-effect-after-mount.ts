import { DependencyList, EffectCallback, useEffect, useRef } from "react";

export default function useEffectAfterMount(effect: EffectCallback, deps?: DependencyList) {
	const justMounted = useRef(true);

	useEffect(() => {
		if (justMounted.current) justMounted.current = false;
		else effect();
	}, deps);
}
