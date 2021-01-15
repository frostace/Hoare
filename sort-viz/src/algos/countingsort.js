// assume nums all positive
const countingsort = function(nums) {
    let animationNums = [];

    let k = Math.max(...nums); // upper bound
    let count = new Array(k + 1).fill(0);
    for (let num of nums) {
        count[num] += 1;
        animationNums.push({
            nums: count.slice(),
            pointers: { [num]: true }
        });
    }
    // now count[idx] denotes #occurrence of each index in the original array

    let total = 0;
    for (let i = 0; i <= k; i++) {
        [count[i], total] = [total, count[i] + total];
        animationNums.push({
            nums: count.slice(),
            pointers: { [i]: true }
        });
    }
    // now count[idx] denotes the prefix sum of the counts
    // which is essentially a pointer to the index at which we should place the number

    let output = new Array(nums.length).fill(0);
    for (let num of nums) {
        output[count[num]] = num;
        animationNums.push({
            nums: output.slice(),
            pointers: { [count[num]]: true }
        });
        count[num] += 1; // increment pointer
    }

    return animationNums;
};

// console.log(countingsort([6, 4, 4, 3, 2, 1, 0]));
export default countingsort;

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
