import { useEffect } from 'react'

export const useClickOutside = (
  insideRefs,
  isVisible,
  onClose,
) => {
  useEffect(() => {
    const handleWindowClick = (event) => {
      const someRefContainTarget = insideRefs
        .filter((ref) => ref.current)
        .some((ref) => ref.current.contains(event.target));

      if (someRefContainTarget || !isVisible) {
        return;
      }

      if (onClose) {
        onClose();
      }
    };

    if (isVisible) {
      window.addEventListener('click', handleWindowClick);
    }

    return () => {
      if (isVisible) {
        window.removeEventListener('click', handleWindowClick);
      }
    };
  }, [isVisible, onClose]);
};
