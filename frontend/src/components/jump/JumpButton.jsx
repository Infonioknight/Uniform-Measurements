import { useEffect, useState, useCallback } from 'react';
import { BiSolidUpArrowCircle } from 'react-icons/bi';

function debounce(func, delay) {
    let timeoutId;
    return (...args) => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
            func(...args);
        }, delay);
    };
}

const JumpButton = () => {
    const [isVisible, setIsVisible] = useState(false);

    const handleJump = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const toggleVisibility = useCallback(
        debounce(() => {
            if (window.pageYOffset > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        }, 300), // here the delay can be adjusted
        []
    );

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);
        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, [toggleVisibility]);

    return (
        <>
            {isVisible && (
                <button
                    className="jump-button bg-btn-grad fixed bottom-5 right-5 p-[10px] text-white rounded-[4px] cursor-pointer z-[100]"
                    onClick={handleJump}
                >
                    <BiSolidUpArrowCircle className="text-lg" />
                </button>
            )}
        </>
    );
};

export default JumpButton;

