import {useState, useEffect} from 'react';

const useResize = () => {
    const [windowSize, setWindowSize] = useState(window.innerWidth);

    useEffect(()=> {
        const handleResize = () => {
            setWindowSize(window.innerWidth);
        }
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, []);

    let moviesPerPage;

    if (windowSize < 768) {
        moviesPerPage = 6;
    } else if (windowSize < 1024) {
        moviesPerPage = 9;
    } else {
        moviesPerPage = 12;
    }

    return moviesPerPage;

}

export default useResize;