export default function(nums) {
    let animationNums = [];
    let length = nums.length;

    for (let i = 0; i < length; i++) {
        let j = i - 1;
        let value = nums[i];
        while (j >= 0 && value < nums[j]) {
            [nums[j], nums[j + 1]] = [value, nums[j]];
            animationNums.push({
                nums: nums.slice(),
                pointers: { [j]: true, [j + 1]: true },
            });
            j--;
        }
    }

    return animationNums;
}
