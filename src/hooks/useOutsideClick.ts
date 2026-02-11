import { useEffect, RefObject } from "react";

export function useOutsideClick<T extends HTMLElement>(
    ref: RefObject<T |null>, 
    callback: () => void) {
        useEffect(() => {
            const handleClickOutside = (event: MouseEvent) => {
                const target = event.target as Node;
                if (ref.current && !ref.current.contains(target)) {
                    callback();
                }
            };
            document.addEventListener('mousedown', handleClickOutside);
            return () => {
                document.removeEventListener('mousedown', handleClickOutside);
            };
        }, [ref, callback]);
    }