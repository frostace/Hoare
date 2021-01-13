/*
procedure heapsort(a, count) is
    input: an unordered array a of length count
 
    (Build the heap in array a so that largest value is at the root)
    heapify(a, count)

    (The following loop maintains the invariants that a[0:endIdx] is a heap and every element
     beyond endIdx is greater than everything before it (so a[endIdx:count] is in sorted order))
    endIdx ← count - 1
    while endIdx > 0 do
        (a[0] is the root and largest value. The swap moves it in front of the sorted elements.)
        swap(a[endIdx], a[0])
        (the heap size is reduced by one)
        endIdx ← endIdx - 1
        (the swap ruined the heap property, so restore it)
        siftDown(a, 0, endIdx)

(Put elements of 'a' in heap order, in-place)
procedure heapify(a, count) is
    (startIdx is assigned the index in 'a' of the last parent node)
    (the last element in a 0-based array is at index count-1; find the parent of that element)
    startIdx ← iParent(count-1)
    
    while startIdx ≥ 0 do
        (sift down the node at index 'startIdx' to the proper place such that all nodes below
         the startIdx index are in heap order)
        siftDown(a, startIdx, count - 1)
        (go to the next parent node)
        startIdx ← startIdx - 1
    (after sifting down the root all nodes/elements are in heap order)

(Repair the heap whose root element is at index 'startIdx', assuming the heaps rooted at its children are valid)
procedure siftDown(a, startIdx, endIdx) is
    root ← startIdx

    while iLeftChild(root) ≤ endIdx do    (While the root has at least one child)
        child ← iLeftChild(root)   (Left child of root)
        swap ← root                (Keeps track of child to swap with)

        if a[swap] < a[child] then
            swap ← child
        (If there is a right child and that child is greater)
        if child+1 ≤ endIdx and a[swap] < a[child+1] then
            swap ← child + 1
        if swap = root then
            (The root holds the largest element. Since we assume the heaps rooted at the
             children are valid, this means that we are done.)
            return
        else
            swap(a[root], a[swap])
            root ← swap            (repeat to continue sifting down the child now)
*/

export default function(nums) {
    const length = nums.length;
    let animationNums = [];

    // build max heap
    heapify(nums, length, animationNums);

    // maintain invariants that: a[0: endIdx] is a heap and a[endIdx: length] is a sorted array
    let endIdx = length - 1;
    while (endIdx > 0) {
        // move the largest element found to the endIdx of the sorted array
        [nums[endIdx], nums[0]] = [nums[0], nums[endIdx]];
        endIdx -= 1;

        animationNums.push({
            nums: nums.slice(),
            pointers: { [0]: true, [endIdx]: true }
        });
        // restore heap property
        siftDown(nums, 0, endIdx, animationNums);
    }

    return animationNums;
}

function heapify(nums, length, animationNums) {
    let startIdx = Math.floor((length - 1 + 1) / 2) - 1; // find index of the parent of the last element

    // heapify upward
    while (startIdx >= 0) {
        siftDown(nums, startIdx, length - 1, animationNums);
        startIdx -= 1;
    }
}

function siftDown(nums, startIdx, endIdx, animationNums) {
    let rootIdx = startIdx;

    while (iLeftChildIdx(rootIdx) <= endIdx) {
        // check if terminal
        let childIdx = iLeftChildIdx(rootIdx);
        let pointer = rootIdx; // points at the largest element of any triplet (parent, left child, right child)

        if (nums[pointer] < nums[childIdx]) {
            // check left child
            pointer = childIdx;
        }
        if (childIdx + 1 <= endIdx && nums[pointer] < nums[childIdx + 1]) {
            // check right child
            pointer = childIdx + 1;
        }
        // root is largest, early termination
        if (pointer === rootIdx) return;

        // recurse
        [nums[rootIdx], nums[pointer]] = [nums[pointer], nums[rootIdx]];
        animationNums.push({
            nums: nums.slice(),
            pointers: { [rootIdx]: true, [pointer]: true }
        });
        rootIdx = pointer;
    }
}

// 0-index based
function iLeftChildIdx(idx) {
    return (idx + 1) * 2 - 1;
}
