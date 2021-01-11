/*
function combsort(array input) is

    gap := input.size // Initialize gap size
    shrink := 1.3 // Set the gap shrink factor
    sorted := false

    loop while sorted = false
        // Update the gap value for a next comb
        gap := floor(gap / shrink)
        if gap ≤ 1 then
            gap := 1
            sorted := true // If there are no swaps this pass, we are done
        end if

        // A single "comb" over the input list
        i := 0
        loop while i + gap < input.size // See Shell sort for a similar idea
            if input[i] > input[i+gap] then
                swap(input[i], input[i+gap])
                sorted := false
                // If this assignment never happens within the loop,
                // then there have been no swaps and the list is sorted.
             end if
    
             i := i + 1
         end loop
     end loop
end function
*/

export default function(nums) {
    let animationNums = [];
    let length = nums.length;

    let gap = length; // initial gap size
    let shrink = 1.3; // gap shrink factor
    let sorted = false;

    while (!sorted) {
        gap = Math.floor(gap / shrink);
        if (gap <= 1) {
            gap = 1;
            sorted = true;
        }

        // inner loop is a bubble sort with gap
        let i = 0;
        while (i + gap < length) {
            if (nums[i] > nums[i + gap]) {
                [nums[i], nums[i + gap]] = [nums[i + gap], nums[i]];
                sorted = false; // early termination?

                animationNums.push({
                    nums: nums.slice(),
                    pointers: { [i]: true, [i + gap]: true }
                });
            }

            i += 1;
        }
    }

    return animationNums;
}
