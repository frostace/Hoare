export default function(nums) {
    let animationNums = [];
    let length = nums.length;

    let swapped = true;

    while (swapped) {
        swapped = false;
        for (let i = 0; i < length; i++) {
            if (nums[i - 1] > nums[i]) {
                [nums[i - 1], nums[i]] = [nums[i], nums[i - 1]];
                swapped = true;

                animationNums.push({
                    nums: nums.slice(),
                    pointers: { [i - 1]: true, [i]: true }
                });
            }
        }
    }

    return animationNums;
}
