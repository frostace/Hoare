const countingsort = function(nums) {
    let animationNums = [];

    let count = {};

    for (let num of nums) {
        if (count.hasOwnProperty(num)) count[num] += 1;
        else count[num] = 1;
    }
    console.log(count);

    let total = 0;
    let k = Math.max(...nums); // upper bound
    for (let i = 0; i <= k; i++) {
        [count[i], total] = [total, count[i] + total];
        console.log(count, total);
    }

    let output = [];
    for (let num of nums) {
        output[count[num]] = num;
        count[num] += 1;
    }

    // animationNums.push({
    //     nums: nums.slice(),
    //     pointers: { [0]: true, [endIdx]: true }
    // });

    return output;
};

console.log(countingsort([6, 4, 4, 3, 2, 1, 0]));
// export default countingsort;

/*
count = array of k+1 zeros
for x in input do
    count[key(x)] += 1

total = 0
for i in 0, 1, ... k do
    count[i], total = total, count[i] + total

output = array of the same length as input
for x in input do
    output[count[key(x)]] = x
    count[key(x)] += 1 

return output
*/
