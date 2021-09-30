function curriedAdd(total) {
    if (total === undefined) return 0;

    function add(number) {
        total += number;
    }

    return function accumulate(num) {
        if (num === undefined) return total;
        add(num);
        return accumulate;
    }
}

module.exports = { curriedAdd };
