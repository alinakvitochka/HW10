
const notifications = [
    { source: 'email', text: 'You have a new email', date: '2021-06-01' },
    { source: 'sms', text: 'New SMS message', date: '2020-06-02' },
    { source: 'email', text: 'Another email', date: '2021-08-03' },
    { source: 'push', text: 'Push notification', date: '2022-07-04' },
    { source: 'sms', text: 'Another SMS message', date: '2022-05-05' }
];


notifications[Symbol.iterator] = function () {
    let index = 0;
    const length = this.length
    return {
        next: () => {
            if (index < length) {
                return { value: this[index++], done: false };
            } else {
                return { done: true }
            }
        }
    }
}

for (let notification of notifications) {
    console.log(notification);
}



function memoize(fn) {
    const cache = new Map();

    return function (...args) {
        const key = args.join(',');

        if (cache.has(key)) {
            return cache.get(key);
        }

        const result = fn.apply(this, args);
        cache.set(key, result);
        return result;
    };
}


function sum(a, b) {
    console.log('Calculating sum...');
    return a + b;
}

const memoizedSum = memoize(sum);

console.log(memoizedSum(3, 4));
console.log(memoizedSum(3, 4));
console.log(memoizedSum(5, 6));
console.log(memoizedSum(5, 6));



function memoize(fn, limit) {
    const cache = new Map();

    return function (...args) {
        const key = args.join(',');

        if (cache.has(key)) {
            return cache.get(key);
        }

        const result = fn.apply(this, args);

        if (cache.size >= limit) {
            const oldestKey = cache.keys().next().value;
            cache.delete(oldestKey);
        }

        cache.set(key, result);

        return result;
    };
}


function divide(a, b) {
    console.log('Calculating division...');
    return a / b;
}

const memoizedDivide = memoize(divide, 2);

console.log(memoizedDivide(10, 2));
console.log(memoizedDivide(10, 2));
console.log(memoizedDivide(15, 3));
console.log(memoizedDivide(20, 4));
console.log(memoizedDivide(20, 4));
console.log(memoizedDivide(25, 5));


function memoize(fn, limit) {
    const cache = new Map();

    return function (...args) {
        const key = args.join(',');

        if (cache.has(key)) {
            return cache.get(key);
        }

        const result = fn.apply(this, args);


        const duplicates = Array.from(cache.entries()).filter(([_, value]) => value == result);
        duplicates.forEach(([dupKey]) => cache.delete(dupKey));

        if (cache.size >= limit) {
            const oldestKey = cache.keys().next().value;
            cache.delete(oldestKey);
        }

        cache.set(key, result);

        return result;
    };
}


function power(a, b) {
    console.log('Calculating power...');
    return Math.pow(a, b);
}

const memoizedPower = memoize(power, 2);

console.log(memoizedPower(2, 3));
console.log(memoizedPower(2, 3));
console.log(memoizedPower(2, 4));
console.log(memoizedPower(2, 5));
console.log(memoizedPower(2, 5));
console.log(memoizedPower(3, 4)); 
