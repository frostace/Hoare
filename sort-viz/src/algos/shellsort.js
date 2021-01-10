/*
# Sort an array a[0...n-1].
gaps = [701, 301, 132, 57, 23, 10, 4, 1]

# Start with the largest gap and work down to a gap of 1
foreach (gap in gaps)
{
    # Do a gapped insertion sort for this gap size.
    # The first gap elements a[0..gap-1] are already in gapped order
    # keep adding one more element until the entire array is gap sorted
    for (i = gap; i < n; i += 1)
    {
        # add a[i] to the elements that have been gap sorted
        # save a[i] in temp and make a hole at position i
        temp = a[i]
        # shift earlier gap-sorted elements up until the correct location for a[i] is found
        for (j = i; j >= gap and a[j - gap] > temp; j -= gap)
        {
            a[j] = a[j - gap]
        }
        # put temp (the original a[i]) in its correct location
        a[j] = temp
    }
}
*/

import gaps from "./gapGenerator";

export default function(nums) {
	let animationNums = [];
	let length = nums.length;

	let gapIdx = 0;
	let gapMax = Math.ceil(length / 2);
	for (let i = 0, len = gaps.length; i < len; i += 1) {
		if (gaps[i] < gapMax) {
			gapIdx = i;
			break;
		}
	}
	while (gaps[gapIdx] >= 1) {
		let gap = gaps[gapIdx];
		for (let i = gap; i < length; i += 1) {
			let temp = nums[i];
			let j;
			for (j = i; j >= gap && nums[j - gap] > temp; j -= gap) {
				nums[j] = nums[j - gap];

				animationNums.push({
					nums: nums.slice(),
					pointers: { [j]: true, [j - gap]: true },
				});
			}
			nums[j] = temp;

			animationNums.push({
				nums: nums.slice(),
				pointers: { [j]: true, [i]: true },
			});
		}

		gapIdx += 1;
	}

	return animationNums;
}
