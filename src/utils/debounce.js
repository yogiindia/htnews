export const debounce = function(func, wait, immediate = false) {
    let timer;

    return function() {
        const callNow = immediate && !timer;
        const context = this;
        const args = arguments;

        const later = function() {
            timer = null;
            if (!immediate) {
                func.apply(context, args);
            }
        };

        clearTimeout(timer);
        timer = setTimeout(later, wait);

        if (callNow) {
            func.apply(context, args);
        }
    };
};
