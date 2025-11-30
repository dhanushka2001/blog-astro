---
title: The Two Sneaky Numbers of Digitville
description: Showing an intuitive (hash table) method and an unintuitive (bitwise XOR) method to solve a Leetcode problem
alt: Leetcode Problem 3289. The Two Sneaky Numbers of Digitville
tags: ["leetcode","c++"]
layout: '@/templates/BasePost.astro'
pubDate: Sunday, 30 November 2025 20:15:00 GMT
imgSrc: '/imgs/2025/nov/numbers.jpg'
authors: [Dhanushka Jayagoda]
---

In this article I will cover two ways to solve this easy [Leetcode problem](https://leetcode.com/problems/the-two-sneaky-numbers-of-digitville). There is an intuitive way using a hash table, and a very unintuitive but beautiful way using bitwise XOR, which this article aims to intuitively explain.

## <ins>Problem</ins>

> In the town of Digitville, there was a list of numbers called nums containing integers from 0 to n - 1. Each number was supposed to appear exactly once in the list, however, two mischievous numbers sneaked in an additional time, making the list longer than usual.
> 
> As the town detective, your task is to find these two sneaky numbers. Return an array of size two containing the two numbers (in any order), so peace can return to Digitville.
> 
> #### Example 1: Input: nums = [0,1,1,0], Output: [0,1]
> 
> #### Example 2: Input: nums = [0,3,2,1,3,2], Output: [2,3]
> 
> #### Example 3: Input: nums = [7,1,5,4,3,4,6,0,9,5,8,2], Output: [4,5]
> 
> #### Constraints:
> * 2 <= n <= 100
> * nums.length == n+2
> * 0 <= nums[i] < n
> * The input is generated such that nums contains exactly two repeated elements.

## <ins> Method 1. Hash Table </ins>

### Intuition
Use a hash table to count the frequency of the numbers in `nums` and return the two numbers that appear twice.

### Implementation

```cpp
// Hash table: O(n) time, O(n) space
void hash_solve() {
	int n;
	cin >> n;
    
	unordered_map<int, int> freq;
	vector<int> dupes;
    
	int num;
	for (int i=0; i < n; i++) {
		cin >> num;
		freq[num]++;
		if (freq[num] > 1) {
			dupes.push_back(num);
		}
	}

	for (int dupe: dupes) {
		cout << dupe << " ";
	}
	cout << "\n";
}
```

## <ins> Method 2. Bitwise XOR </ins>

### Intuition
This approach can be broken down into 3 steps. It is admittedly very unintuitive but I will try to explain it as best as I can.

#### Step 1: Find a⊕b
We will be using bitwise XOR (written as ⊕ in symbolic logic, and ^ in code) a lot, it is defined as follows:

| A | B | A⊕B |
|---|---|-----|
| 0 | 0 | 0   |
| 0 | 1 | 1   |
| 1 | 0 | 1   |
| 1 | 1 | 0   |

The bitwise XOR can be applied to any two integers by simply converting them to binary and doing element-wise XOR on their binary digits ("bits"). Below is an example of 5⊕3:

| 16 | 8 | 4 | 2 | 1 | n     |
|----|---|---|---|---|-------|
| 0  | 0 | 1 | 0 | 1 | 5     |
| 0  | 0 | 0 | 1 | 1 | 3     |
| 0  | 0 | 1 | 1 | 0 | 5⊕3=6 |

One very important thing to notice about bitwise XOR is it is essentially telling you which bits the two binary numbers differ. Where the bits differ, XOR is 1, and where they are the same, XOR is 0.

There are 4 useful properties of bitwise XOR which we'll need and you can prove as a fun exercise:

1. a⊕0=a (identity)
2. a⊕a=0 (self-inverse)
3. a⊕b=b⊕a (commutative)
4. a⊕(b⊕c)=(a⊕b)⊕c (associative)

Notice that the 1st and 2nd property (identity and self-inverse) means that XOR cancels matching pairs, and the 3rd and 4th property (commutative and associative) means that the order of operations does not matter, we can rearrange the order however we like.

What would happen if we XOR'd all the numbers in `nums`?

Well, if nums=[0,3,1,2,0,2], XORall = 0⊕3⊕1⊕2⊕0⊕2 = (0⊕0)⊕1⊕(2⊕2)⊕3 = 0⊕1⊕0⊕3 = 1⊕3 = 2.

XORing all the numbers in `nums` cancelled the two sneaky duplicate numbers, and what remained was all the non-duplicates XOR'd.

**Question:** Can you find a way to get just the two duplicates XOR'd, a⊕b?

<details> <summary> Hint </summary>
Think about which numbers would need to get cancelled and which would need to remain. What would you need to add to `nums` for the XOR'd duplicates to remain?
</details>

<details> <summary> Answer (please have a good attempt at solving before revealing) </summary>
We know that XOR cancels matching pairs. `nums` contains all the numbers from 0 to n-1 and the two duplicates. So there is 1 occurrence of all non-duplicates and 2 occurrences of the two duplicates. We would need to add one additional occurrence of the non-duplicates and duplicates, increasing the occurrence of non-duplicates to 2 and duplicates to 3. What this would mean when XORing everything is: all the non-duplicates would now get annihilated, a matching pair of the two duplicates would also get annihilated, and the single remaining 3rd copy of the two duplicates XOR'd would remain, a⊕b. We can do this simply by adding all the numbers from 0 to n-1 again to `nums`. If nums=[0,3,1,2,2,3], then the new appended array would be [0,1,2,3,0,3,1,2,0,2], XORall = 0⊕1⊕2⊕3⊕0⊕3⊕1⊕2⊕0⊕2 = (0⊕0⊕0)⊕(1⊕1)⊕(2⊕2⊕2)⊕(3⊕3) = 0⊕0⊕2⊕0 = 0⊕2 = a⊕b = 1.
</details>

#### Step 2 and 3: Isolate a and b

So we found a way to get a⊕b, now what? You might think that this was pointless as we have no way of getting back a and b from a⊕b -- and that would be fair of you to think that.

With most operations there is no way of getting back the original operands after performing the operation, e.g. you wouldn't know that the original operands were 5 and 2 if I just said the operation was addition and the result was 7, as there are infinite operands that could result in that, e.g. 3 and 4.

But the very surprising fact is that there **IS** a way for us to sneakily find the two sneaky duplicate numbers. The previous step required quite a bit of ingenuity, and this step similarly requires a very clever trick.

**Question:** Can you find a way to isolate a and b?

<details> <summary> Hint </summary>
From the previous step we saw that by adding the numbers 0...n-1 to `nums` and XORing everything, we can get a⊕b. This is because all the non-duplicates gain a matching pair and get annihilated, and the two sneaky numbers gain a 3rd copy which survives the XORing. What if we could somehow separate the appended array into two groups, with a and b in separate groups? Remember what a⊕b tells you about a and b. Can you use that to your advantage?
</details>

<details> <summary> Answer (please have a good attempt at solving before revealing) </summary>
The way to isolate a and b is to notice that a⊕b tells us exactly where the two sneaky numbers a and b differ. We just need to know one bit where they differ, and as it so happens, the easiest to calculate is the smallest (rightmost) differing bit of a and b, which can be calculated using a bitwise AND on XORall=a⊕b and -XORall=-(a⊕b). We can use this differing bit as a mask, splitting the appended array into two groups, those that have that bit as 1 and those that have that bit as 0. This guarantees that a and b are in different groups, and it also guarantees that duplicates stay together, and so matching pairs will get annihilated, which we want. After splitting into two groups, all we have to do now is XOR all the numbers in the two groups separately, and we will be left with a and b isolated.
</details>

Bitwise AND is defined as follows:

| A | B | A&B |
|---|---|-----|
| 0 | 0 | 0   |
| 0 | 1 | 0   |
| 1 | 0 | 0   |
| 1 | 1 | 1   |

In our example, nums=[0,3,1,2,0,2], XORall for the appended `nums` ([0,1,2,3,0,3,1,2,0,2]) = a⊕b = 2, therefore lowDiffBit = XORall & -(XORall) = 2 & -2:

00000000 00000000 00000000 00000010  =  2\
<u>11111111 11111111 11111111 11111110  = -2</u>\
00000000 00000000 00000000 00000010  =  2&-2 = 2

What 2&-2 gives us is a mask that we can apply to the appended `nums` array, splitting it into two groups, with a and b in different groups and all matching pairs in the same group.

| 8 | 4 | **<u>2</u>** | 1 |   n  | Group |
|:-:|:-:|:------------:|:-:|:----:|:-----:|
| 0 | 0 | **<u>1</u>** | 0 | 2&-2 |  MASK |
| 0 | 0 | **<u>0</u>** | 0 |   0  |   A   |
| 0 | 0 | **<u>0</u>** | 1 |   1  |   A   |
| 0 | 0 | **<u>1</u>** | 0 |   2  |   B   |
| 0 | 1 | **<u>1</u>** | 0 |   3  |   B   |

As you can see, the sneaky numbers, 0 and 2, are put in different groups. We apply the mask by simply doing a bitwise AND with the mask (2&-2) and the numbers in the appended `nums`. If the result is zero, the number gets put in Group A, and if the result is non-zero, it gets put in Group B.

The final step is to just XOR all the numbers in each group separately, which isolates a and b.

### Implementation

```cpp
// Bitwise XOR: O(n) time, O(n) space (O(1) space with optimization)
void xor_solve() {
	int N;
	cin >> N;

	vector<int> nums(N);
	int num;
	for (int i = 0; i < N; i++) {
		cin >> nums[i];
	}

	// Step 1. Find a XOR b by XORing nums and additional 0...n-1
	// -----------------------------------------------------------
	int n = static_cast<int>(nums.size()) - 2;
	int y = 0;
	for (int x : nums) {
		y ^= x;
	}

	for (int i = 0; i < n; i++) {
		y ^= i;
	}

	// Step 2. Get smallest (rightmost) differing bit of a and b
	// ---------------------------------------------------------
	int lowDiffBit = y & (-y);

	// Step 3. Use the differing bit as a mask to separate nums and
	//         additional 0...n-1 into two groups, with a and b in
	//         different groups, and XOR the groups to isolate a and b
	// ---------------------------------------------------------------
	int x1 = 0, x2 = 0;
	for (int x : nums) {
		if (x & lowDiffBit) {
			x1 ^= x;
		} else {
			x2 ^= x;
		}
	}

	for (int i = 0; i < n; i++) {
		if (i & lowDiffBit) {
			x1 ^= i;
		} else {
			x2 ^= i;
		}
	}
	cout << x1 << " " << x2 << "\n";
}

```
