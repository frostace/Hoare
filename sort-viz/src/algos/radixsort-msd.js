const radixsort = function(nums) {
    let animationNums = [];
    const radixHelper = (strings, bit) => {
        // base case
        if (strings.length <= 1) return strings;
        // console.log(strings);
        // maintain an array of arrays of strings
        let arr = new Array(10).fill(0).map(() => new Array(0));

        for (let string of strings) {
            arr[parseInt(string.charAt(bit))].push(string);
        }

        // recurse
        for (let i = 0; i < 10; i += 1) {
            arr[i] = radixHelper(arr[i], bit + 1);
        }
        // console.log("arr", arr);

        // join
        return concatenate(arr);
    };

    // find digit nums with 1 scan
    let maxDigits = Math.max(...nums.map(num => num.toString().length));
    let strings = nums.map(num => {
        let numStr = num.toString();
        let arr = new Array(maxDigits - numStr.length).fill("0");
        let prefixStr = arr.join("");
        return prefixStr + numStr;
    });

    return radixHelper(strings, 0).map(numStr => {
        // remove leading-zeros
        let i = 0;
        while (i < numStr.length && numStr[i] === "0") i += 1;
        return i === numStr.length ? 0 : parseInt(numStr.slice(i));
    });
    return animationNums;
};

const concatenate = function(buckets) {
    return Array.prototype.concat(
        ...buckets.filter(bucket => bucket.length !== 0)
    );
};

console.log(
    radixsort([
        208,
        250,
        201,
        145,
        70,
        185,
        230,
        126,
        122,
        47,
        82,
        4,
        292,
        7,
        277,
        42
    ])
);
// export default radixsort;

/*
LSD radix sorts typically use the following sorting order: short keys come before longer keys, and then keys of the same length 
are sorted lexicographically. This coincides with the normal order of integer representations, like the sequence 
[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]. LSD sorts are generally stable sorts.

MSD radix sorts are most suitable for sorting strings or fixed-length integer representations. A sequence like 
[b, c, e, d, f, g, ba] would be sorted as [b, ba, c, d, e, f, g]. If lexicographic ordering is used to sort variable-length 
integers in base 10, then numbers from 1 to 10 would be output as [1, 10, 2, 3, 4, 5, 6, 7, 8, 9], as if the shorter keys were 
left-justified and padded on the right with blank characters to make the shorter keys as long as the longest key. MSD sorts are 
not necessarily stable if the original ordering of duplicate keys must always be maintained.


Input list, fixed width numeric strings with leading zeros:

[170, 045, 075, 025, 002, 024, 802, 066]
First digit, with brackets indicating buckets:

[{045, 075, 025, 002, 024, 066}, {170}, {802}]
Notice that 170 and 802 are already complete because they are all that remain in their buckets, so no further recursion is needed
Next digit:

[{ {002}, {025, 024}, {045}, {066}, {075} }, 170, 802]
Final digit:

[ 002, { {024}, {025} }, 045, 066, 075 , 170, 802]
All that remains is concatenation:

[002, 024, 025, 045, 066, 075, 170, 802]

*/
