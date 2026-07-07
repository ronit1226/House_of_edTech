export type TopicSeed = {
  id: string;
  name: string;
  category: string;
};

export type QuestionSeed = {
  id: string;
  topicId: string;
  topic: string;
  category: string;
  difficulty: number;
  content: string;
  options: string[];
  correctAnswer: string;
  explanationSeed: string;
};

const topics: TopicSeed[] = [
  { id: "10000000-0000-4000-8000-000000000001", name: "Arrays", category: "DSA" },
  { id: "10000000-0000-4000-8000-000000000002", name: "Dynamic Programming", category: "DSA" },
  { id: "10000000-0000-4000-8000-000000000003", name: "Trees and Graphs", category: "DSA" },
  { id: "10000000-0000-4000-8000-000000000004", name: "DBMS and SQL", category: "Core CS" },
  { id: "10000000-0000-4000-8000-000000000005", name: "Operating System", category: "Core CS" },
  { id: "10000000-0000-4000-8000-000000000006", name: "OOPS", category: "Core CS" },
  { id: "10000000-0000-4000-8000-000000000007", name: "Computer Networks", category: "Core CS" },
  { id: "10000000-0000-4000-8000-000000000008", name: "Strings", category: "DSA" },
  { id: "10000000-0000-4000-8000-000000000009", name: "System Design", category: "Architecture" },
  { id: "10000000-0000-4000-8000-000000000010", name: "React and Node.js", category: "Full Stack" },
];

type DraftQuestion = {
  difficulty: number;
  content: string;
  correctAnswer: string;
  distractors: string[];
  explanationSeed: string;
};

const drafts: Record<string, DraftQuestion[]> = {
  Arrays: [
    {
      difficulty: 1,
      content: "Which operation is O(1) in a normal array when the index is already known?",
      correctAnswer: "Accessing arr[i]",
      distractors: ["Searching an unsorted value", "Inserting at the front", "Deleting from the middle"],
      explanationSeed: "Array indexing is direct address calculation; search and shifting operations are not constant time.",
    },
    {
      difficulty: 1,
      content: "What does the two-pointer technique usually reduce in array problems?",
      correctAnswer: "Nested loops over ordered or bounded positions",
      distractors: ["Database joins", "Recursive call depth", "Hash collisions"],
      explanationSeed: "Two pointers often replace a brute-force pair scan when movement rules are clear.",
    },
    {
      difficulty: 2,
      content: "For Two Sum on an unsorted array, which approach gives expected O(n) time?",
      correctAnswer: "Use a hash map to store seen values",
      distractors: ["Sort and binary search every value", "Try every pair", "Use a stack"],
      explanationSeed: "A hash map checks the needed complement in expected constant time.",
    },
    {
      difficulty: 2,
      content: "Kadane's algorithm is mainly used to find what?",
      correctAnswer: "Maximum sum contiguous subarray",
      distractors: ["Shortest path in a graph", "Longest common subsequence", "Median of two arrays"],
      explanationSeed: "Kadane tracks whether extending the current subarray is better than starting fresh.",
    },
    {
      difficulty: 3,
      content: "In a sorted array, why can binary search discard half the search space?",
      correctAnswer: "The middle value proves which half cannot contain the target",
      distractors: ["Arrays are always balanced trees", "The target is always near the center", "Sorting makes lookup O(1)"],
      explanationSeed: "The sorted order creates a monotonic property that makes one side impossible.",
    },
    {
      difficulty: 3,
      content: "Which invariant is used while merging two sorted arrays?",
      correctAnswer: "The output prefix is always sorted and final",
      distractors: ["Both inputs must have equal length", "The larger element is always chosen", "Pointers move backward only"],
      explanationSeed: "Merge works because each step commits the smallest remaining element to the output.",
    },
    {
      difficulty: 4,
      content: "Why does sliding window work for longest substring without repeating characters?",
      correctAnswer: "The window is kept valid by moving the left boundary past duplicates",
      distractors: ["Every substring is sorted", "It tries all subsequences", "It depends on recursion"],
      explanationSeed: "The key invariant is that the current window contains no duplicate characters.",
    },
    {
      difficulty: 4,
      content: "For trapping rain water, what do prefix max and suffix max represent?",
      correctAnswer: "The tallest barrier to the left and right of each index",
      distractors: ["The two nearest smaller values", "The average height around each bar", "The number of bars lower than current"],
      explanationSeed: "Water at an index depends on the lower of the best left and right barriers.",
    },
    {
      difficulty: 5,
      content: "Why is the Dutch National Flag algorithm O(n) for sorting 0s, 1s, and 2s?",
      correctAnswer: "Each pointer movement permanently classifies at least one element",
      distractors: ["It uses quicksort internally", "It compares every pair", "It needs a heap"],
      explanationSeed: "The algorithm maintains three regions: processed low, unknown, and processed high.",
    },
    {
      difficulty: 5,
      content: "In median of two sorted arrays, what makes the O(log(min(m,n))) solution possible?",
      correctAnswer: "Binary searching a partition where left halves are <= right halves",
      distractors: ["Merging both arrays first", "Using a hash map for counts", "Sorting the longer array again"],
      explanationSeed: "The partition condition verifies the median without materializing the merged array.",
    },
  ],
  "Dynamic Programming": [
    {
      difficulty: 1,
      content: "What two signs usually suggest a dynamic programming solution?",
      correctAnswer: "Overlapping subproblems and optimal substructure",
      distractors: ["Random input and hashing", "Only one loop", "A sorted array only"],
      explanationSeed: "DP is useful when repeated smaller decisions combine into an optimal answer.",
    },
    {
      difficulty: 1,
      content: "Memoization stores results mainly to avoid what?",
      correctAnswer: "Recomputing the same subproblem",
      distractors: ["Using arrays", "Writing base cases", "Comparing values"],
      explanationSeed: "Memoization caches answers for states so repeated calls return quickly.",
    },
    {
      difficulty: 2,
      content: "In Fibonacci with DP, what is the state?",
      correctAnswer: "The index n whose Fibonacci value is needed",
      distractors: ["The entire call stack", "Only the final answer", "The number of CPU cores"],
      explanationSeed: "A DP state must contain enough information to identify one subproblem.",
    },
    {
      difficulty: 2,
      content: "In 0/1 knapsack, why can each item be used at most once?",
      correctAnswer: "The transition moves to the next item after include or exclude",
      distractors: ["Weights are always unique", "Values are sorted", "Capacity never changes"],
      explanationSeed: "The item index in the state prevents reusing the same item.",
    },
    {
      difficulty: 3,
      content: "For longest common subsequence, what happens when two current characters match?",
      correctAnswer: "Take 1 plus the answer for both previous prefixes",
      distractors: ["Restart the whole sequence", "Delete both strings", "Sort both strings"],
      explanationSeed: "A match can extend the best subsequence from the smaller prefixes.",
    },
    {
      difficulty: 3,
      content: "Why is coin change with minimum coins often initialized with infinity?",
      correctAnswer: "To mark unreachable amounts until a valid transition improves them",
      distractors: ["To force recursion", "To sort the coins", "To avoid arrays"],
      explanationSeed: "Infinity makes min comparisons safe for states that have not been solved.",
    },
    {
      difficulty: 4,
      content: "In DP, what is the main risk of choosing too many state variables?",
      correctAnswer: "State space grows and the solution becomes too slow or memory-heavy",
      distractors: ["The answer becomes random", "Base cases disappear", "The code cannot compile"],
      explanationSeed: "DP performance is roughly number of states times transition cost.",
    },
    {
      difficulty: 4,
      content: "Why can some 2D DP tables be optimized to 1D?",
      correctAnswer: "Each row only depends on the previous row or nearby values",
      distractors: ["The table values are all equal", "The input is always sorted", "Recursion is not allowed"],
      explanationSeed: "Space optimization is valid only when overwritten values are no longer needed.",
    },
    {
      difficulty: 5,
      content: "In LIS O(n log n), what does the tails array store?",
      correctAnswer: "The smallest possible ending value for each subsequence length",
      distractors: ["Every valid subsequence", "Only duplicate values", "The final sorted array"],
      explanationSeed: "Tails is not the actual LIS; it keeps the best candidate endings for future extension.",
    },
    {
      difficulty: 5,
      content: "How do you avoid double counting in grid path DP with obstacles?",
      correctAnswer: "Define each cell as ways from top plus left only if the cell is open",
      distractors: ["Visit every path with DFS only", "Add diagonal moves always", "Ignore blocked cells until the end"],
      explanationSeed: "A precise transition counts each path by its final move into the cell.",
    },
  ],
  "Trees and Graphs": [
    {
      difficulty: 1,
      content: "Which traversal visits a binary search tree in sorted order?",
      correctAnswer: "Inorder traversal",
      distractors: ["Level order traversal", "Preorder traversal", "Postorder traversal"],
      explanationSeed: "For a BST, left subtree values are smaller and right subtree values are larger.",
    },
    {
      difficulty: 1,
      content: "Which data structure is commonly used for BFS?",
      correctAnswer: "Queue",
      distractors: ["Stack", "Heap only", "Hash set only"],
      explanationSeed: "BFS processes nodes in first-in-first-out order by distance layer.",
    },
    {
      difficulty: 2,
      content: "What does a visited set prevent in graph traversal?",
      correctAnswer: "Repeating nodes and getting stuck in cycles",
      distractors: ["Sorting adjacency lists", "Reducing memory to zero", "Changing edge weights"],
      explanationSeed: "Graphs can point back to already seen nodes, unlike simple trees.",
    },
    {
      difficulty: 2,
      content: "Which algorithm finds shortest paths in an unweighted graph?",
      correctAnswer: "BFS",
      distractors: ["DFS always", "Merge sort", "Binary search"],
      explanationSeed: "BFS explores all nodes at distance k before distance k+1.",
    },
    {
      difficulty: 3,
      content: "How can DFS detect a cycle in a directed graph?",
      correctAnswer: "Track nodes currently in the recursion stack",
      distractors: ["Only count edges", "Use inorder traversal", "Sort all vertices"],
      explanationSeed: "A back edge to an active recursion node means a directed cycle exists.",
    },
    {
      difficulty: 3,
      content: "What does topological sorting require?",
      correctAnswer: "A directed acyclic graph",
      distractors: ["A complete graph", "Negative edge weights", "A binary tree only"],
      explanationSeed: "Topological order is impossible when dependencies form a cycle.",
    },
    {
      difficulty: 4,
      content: "Why does Dijkstra's algorithm fail with negative edge weights?",
      correctAnswer: "A finalized shortest path may later become smaller",
      distractors: ["It cannot use a priority queue", "It only works on trees", "It ignores visited nodes"],
      explanationSeed: "Dijkstra relies on non-negative weights to safely finalize the nearest node.",
    },
    {
      difficulty: 4,
      content: "What problem does Union-Find solve efficiently?",
      correctAnswer: "Tracking connected components under union operations",
      distractors: ["Sorting strings", "Balancing binary trees", "Finding substring matches"],
      explanationSeed: "Union-Find answers whether two elements belong to the same set.",
    },
    {
      difficulty: 5,
      content: "In Tarjan's bridge algorithm, what does low-link value represent?",
      correctAnswer: "The earliest discovery time reachable from a node's subtree",
      distractors: ["The height of the tree", "The number of outgoing edges", "The shortest path weight"],
      explanationSeed: "Low-link identifies whether a subtree can reach an ancestor without a specific edge.",
    },
    {
      difficulty: 5,
      content: "Why is A* faster than Dijkstra in many pathfinding cases?",
      correctAnswer: "A good heuristic guides search toward the goal",
      distractors: ["It ignores edge costs", "It never uses a priority queue", "It only works with negative weights"],
      explanationSeed: "A* combines known cost and estimated remaining cost to prioritize promising nodes.",
    },
  ],
  "DBMS and SQL": [
    {
      difficulty: 1,
      content: "Which join returns only rows that match in both tables?",
      correctAnswer: "INNER JOIN",
      distractors: ["LEFT JOIN", "FULL OUTER JOIN", "CROSS JOIN"],
      explanationSeed: "INNER JOIN filters to matching keys on both sides.",
    },
    {
      difficulty: 1,
      content: "What does a primary key uniquely identify?",
      correctAnswer: "A row in a table",
      distractors: ["A database server", "Every column type", "Only duplicate records"],
      explanationSeed: "Primary keys give each row a stable unique identity.",
    },
    {
      difficulty: 2,
      content: "What does LEFT JOIN preserve?",
      correctAnswer: "All rows from the left table",
      distractors: ["Only unmatched right rows", "Only rows with no NULL values", "A random sample"],
      explanationSeed: "A LEFT JOIN keeps left rows even when the right side is missing.",
    },
    {
      difficulty: 2,
      content: "Why can COUNT(*) differ from COUNT(column_name)?",
      correctAnswer: "COUNT(column_name) ignores NULL values",
      distractors: ["COUNT(*) ignores duplicate rows", "COUNT(column_name) counts tables", "They are always identical"],
      explanationSeed: "COUNT(*) counts rows; COUNT(column) counts non-null column values.",
    },
    {
      difficulty: 3,
      content: "Where should a filter on the right table go if you want to keep unmatched LEFT JOIN rows?",
      correctAnswer: "Inside the ON condition",
      distractors: ["Only in ORDER BY", "Always in WHERE", "Only in GROUP BY"],
      explanationSeed: "A WHERE filter on right-table columns can remove NULL-extended rows.",
    },
    {
      difficulty: 3,
      content: "What does GROUP BY do?",
      correctAnswer: "Combines rows into groups so aggregate functions can summarize them",
      distractors: ["Sorts rows alphabetically only", "Deletes duplicate tables", "Creates foreign keys"],
      explanationSeed: "GROUP BY changes the result grain from rows to grouped summaries.",
    },
    {
      difficulty: 4,
      content: "What is the difference between WHERE and HAVING?",
      correctAnswer: "WHERE filters rows before grouping; HAVING filters groups after aggregation",
      distractors: ["HAVING is only for joins", "WHERE is only for strings", "They are always interchangeable"],
      explanationSeed: "HAVING can use aggregate results because it runs after grouping.",
    },
    {
      difficulty: 4,
      content: "Why can joining two one-to-many relationships create duplicate-looking rows?",
      correctAnswer: "The join multiplies combinations across matching child rows",
      distractors: ["SQL randomly repeats rows", "Primary keys stop working", "Indexes cause duplicate data"],
      explanationSeed: "Result rows represent combinations, not necessarily original table rows.",
    },
    {
      difficulty: 5,
      content: "Which SQL pattern finds customers with no orders?",
      correctAnswer: "LEFT JOIN orders and filter where orders.id IS NULL",
      distractors: ["INNER JOIN orders only", "CROSS JOIN orders", "ORDER BY orders.id"],
      explanationSeed: "The NULL right side after a LEFT JOIN identifies missing matches.",
    },
    {
      difficulty: 5,
      content: "Why are indexes important for join performance?",
      correctAnswer: "They help the database find matching keys without scanning every row",
      distractors: ["They encrypt table data", "They make SELECT impossible", "They replace foreign keys"],
      explanationSeed: "Indexes reduce lookup work for common join and filter access patterns.",
    },
  ],
  "Operating System": [
    {
      difficulty: 1,
      content: "What is a process?",
      correctAnswer: "A running instance of a program with its own memory space",
      distractors: ["A CPU register only", "A database row", "A network cable"],
      explanationSeed: "A process owns resources such as address space, handles, and execution state.",
    },
    {
      difficulty: 1,
      content: "What is a thread?",
      correctAnswer: "A lightweight execution unit inside a process",
      distractors: ["A database table", "A network protocol", "A compiled CSS file"],
      explanationSeed: "Threads share process memory but have their own execution stack.",
    },
    {
      difficulty: 2,
      content: "What is a deadlock?",
      correctAnswer: "Processes wait forever because each holds a resource another needs",
      distractors: ["A cache hit", "A completed thread", "A successful DNS lookup"],
      explanationSeed: "Deadlock requires circular waiting along with resource holding.",
    },
    {
      difficulty: 2,
      content: "Which CPU scheduling algorithm gives each process a fixed time slice?",
      correctAnswer: "Round Robin",
      distractors: ["FCFS only", "Binary Search", "Normalization"],
      explanationSeed: "Round Robin is preemptive and rotates processes through equal time quantum.",
    },
    {
      difficulty: 3,
      content: "Why is context switching not free?",
      correctAnswer: "The OS must save and restore execution state",
      distractors: ["It deletes the process", "It always restarts the computer", "It changes source code"],
      explanationSeed: "Switching tasks has CPU and cache overhead.",
    },
    {
      difficulty: 3,
      content: "What is the main purpose of virtual memory?",
      correctAnswer: "Give processes isolated address spaces and use disk as backing store when needed",
      distractors: ["Disable RAM", "Make networks faster", "Remove all page faults"],
      explanationSeed: "Virtual memory separates logical addresses from physical memory.",
    },
    {
      difficulty: 4,
      content: "Which four conditions are required for deadlock?",
      correctAnswer: "Mutual exclusion, hold and wait, no preemption, circular wait",
      distractors: ["Join, group, order, limit", "Class, object, method, constructor", "TCP, UDP, DNS, HTTP"],
      explanationSeed: "Deadlock happens only when all Coffman conditions can hold together.",
    },
    {
      difficulty: 4,
      content: "What is thrashing in operating systems?",
      correctAnswer: "Excessive paging where the CPU spends more time swapping than executing",
      distractors: ["A successful cache hit", "A normal SQL join", "A JavaScript closure"],
      explanationSeed: "Thrashing usually happens when memory pressure is too high.",
    },
    {
      difficulty: 5,
      content: "What problem does paging solve in memory management?",
      correctAnswer: "It maps fixed-size virtual pages to physical frames flexibly",
      distractors: ["It removes the need for storage", "It sorts processes by name", "It prevents all bugs"],
      explanationSeed: "Paging avoids requiring each process to occupy one contiguous physical block.",
    },
    {
      difficulty: 5,
      content: "What is the difference between segmentation and paging?",
      correctAnswer: "Segmentation is logical variable-size division; paging is fixed-size division",
      distractors: ["Both are exactly same", "Paging is only for databases", "Segmentation only means sorting"],
      explanationSeed: "Paging avoids external fragmentation; segmentation matches logical program sections.",
    },
  ],
  OOPS: [
    {
      difficulty: 1,
      content: "What is encapsulation in OOPS?",
      correctAnswer: "Binding data and methods together while controlling access",
      distractors: ["Running two loops", "Sorting objects alphabetically", "Converting SQL to JSON"],
      explanationSeed: "Encapsulation protects object state using controlled methods and access modifiers.",
    },
    {
      difficulty: 1,
      content: "What is inheritance?",
      correctAnswer: "A class acquiring properties and methods from another class",
      distractors: ["A database rollback", "A network handshake", "A CSS selector"],
      explanationSeed: "Inheritance supports reuse and specialization through parent-child class relationships.",
    },
    {
      difficulty: 2,
      content: "What is runtime polymorphism commonly achieved through?",
      correctAnswer: "Method overriding",
      distractors: ["Method overloading only", "SQL indexing", "Array slicing"],
      explanationSeed: "Runtime polymorphism chooses the overridden method based on the actual object.",
    },
    {
      difficulty: 2,
      content: "What is abstraction?",
      correctAnswer: "Showing essential behavior while hiding implementation details",
      distractors: ["Copying every class", "Removing all methods", "Writing only SQL"],
      explanationSeed: "Abstraction lets users depend on what an object does, not how it does it.",
    },
    {
      difficulty: 3,
      content: "Which OOPS concept is shown when the same method name behaves differently for different objects?",
      correctAnswer: "Polymorphism",
      distractors: ["Normalization", "Deadlock", "Indexing"],
      explanationSeed: "Polymorphism allows a common interface with different implementations.",
    },
    {
      difficulty: 3,
      content: "What is the difference between abstract class and interface in Java-style OOPS?",
      correctAnswer: "Abstract classes can hold state/constructors; interfaces define contracts",
      distractors: ["They are always identical", "Interfaces store database rows", "Abstract classes cannot have methods"],
      explanationSeed: "This tests design understanding, not only syntax.",
    },
    {
      difficulty: 4,
      content: "Which SOLID principle says a class should have only one reason to change?",
      correctAnswer: "Single Responsibility Principle",
      distractors: ["Open Closed Principle", "Liskov Substitution Principle", "Dependency Inversion Principle"],
      explanationSeed: "SRP keeps classes focused and easier to maintain.",
    },
    {
      difficulty: 4,
      content: "What is constructor overloading?",
      correctAnswer: "Defining multiple constructors with different parameter lists",
      distractors: ["Replacing inheritance", "Deleting object state", "Joining two SQL tables"],
      explanationSeed: "Overloading is compile-time polymorphism based on method or constructor signatures.",
    },
    {
      difficulty: 5,
      content: "What does Liskov Substitution Principle require?",
      correctAnswer: "Subclasses should be usable wherever the parent class is expected",
      distractors: ["Subclasses must delete parent behavior", "Every class must be final", "Objects cannot call methods"],
      explanationSeed: "LSP prevents child classes from breaking parent class contracts.",
    },
    {
      difficulty: 5,
      content: "Why is composition often preferred over inheritance?",
      correctAnswer: "It reduces tight coupling and allows behavior to be combined flexibly",
      distractors: ["It prevents object creation", "It removes encapsulation", "It only works for SQL"],
      explanationSeed: "Composition models has-a relationships and avoids fragile inheritance hierarchies.",
    },
  ],
  "Computer Networks": [
    {
      difficulty: 1,
      content: "Which layer of the OSI model is responsible for routing packets between networks?",
      correctAnswer: "Network layer",
      distractors: ["Transport layer", "Data link layer", "Application layer"],
      explanationSeed: "The network layer (Layer 3) handles logical addressing and routing between different networks.",
    },
    {
      difficulty: 1,
      content: "What does DNS stand for and what does it do?",
      correctAnswer: "Domain Name System; it translates domain names to IP addresses",
      distractors: ["Data Network Service; it encrypts packets", "Dynamic Node Switching; it routes packets", "Distributed Name Server; it stores passwords"],
      explanationSeed: "DNS resolves human-readable names like google.com into numeric IP addresses.",
    },
    {
      difficulty: 2,
      content: "What is the main difference between TCP and UDP?",
      correctAnswer: "TCP is connection-oriented with guaranteed delivery; UDP is connectionless with no delivery guarantee",
      distractors: ["TCP is faster than UDP always", "UDP uses more bandwidth than TCP", "TCP works only on wireless networks"],
      explanationSeed: "TCP establishes a connection and retransmits lost packets; UDP trades reliability for lower latency.",
    },
    {
      difficulty: 2,
      content: "What happens during a TCP three-way handshake?",
      correctAnswer: "Client sends SYN, server replies SYN-ACK, client sends ACK",
      distractors: ["Client sends data immediately without setup", "Server sends three packets at once", "Both sides send FIN to start"],
      explanationSeed: "The handshake synchronizes sequence numbers and establishes a reliable connection.",
    },
    {
      difficulty: 3,
      content: "Why does HTTPS use TLS/SSL on top of HTTP?",
      correctAnswer: "To encrypt data in transit and verify server identity",
      distractors: ["To compress web pages for speed", "To replace DNS resolution", "To make URLs shorter"],
      explanationSeed: "TLS provides confidentiality through encryption and authenticity through certificates.",
    },
    {
      difficulty: 3,
      content: "What is subnetting used for?",
      correctAnswer: "Dividing a large network into smaller logical segments for efficiency and security",
      distractors: ["Combining multiple networks into one IP", "Encrypting network traffic", "Replacing MAC addresses with IPs"],
      explanationSeed: "Subnetting reduces broadcast domains and allows better IP address management.",
    },
    {
      difficulty: 4,
      content: "What is the purpose of ARP in networking?",
      correctAnswer: "To map IP addresses to MAC addresses on a local network",
      distractors: ["To assign IP addresses dynamically", "To encrypt packets between routers", "To translate domain names to IPs"],
      explanationSeed: "ARP resolves Layer 3 addresses to Layer 2 addresses so frames can reach the correct physical device.",
    },
    {
      difficulty: 4,
      content: "How does a NAT router allow multiple devices to share one public IP?",
      correctAnswer: "It maps each device's private IP and port to the public IP with a unique port number",
      distractors: ["It gives each device a different public IP", "It broadcasts all traffic to every device", "It uses DNS to separate traffic"],
      explanationSeed: "NAT rewrites source addresses in outgoing packets and maintains a translation table for replies.",
    },
    {
      difficulty: 5,
      content: "Why can TCP congestion control cause a sawtooth throughput pattern?",
      correctAnswer: "Additive increase raises the window linearly, but packet loss triggers a multiplicative decrease",
      distractors: ["TCP always sends at maximum speed", "Routers randomly drop half the packets", "UDP interference causes the pattern"],
      explanationSeed: "AIMD (additive increase multiplicative decrease) slowly probes for bandwidth then cuts back sharply on loss.",
    },
    {
      difficulty: 5,
      content: "What problem does BGP solve and why is it considered complex?",
      correctAnswer: "BGP routes traffic between autonomous systems using policy-based path selection across the global internet",
      distractors: ["BGP assigns local IP addresses inside a company", "BGP encrypts all internet traffic", "BGP replaces DNS for faster lookups"],
      explanationSeed: "BGP must balance business policies, loop prevention, and convergence across thousands of independent networks.",
    },
  ],
  Strings: [
    {
      difficulty: 1,
      content: "What is the time complexity of checking if two strings are equal by comparing character by character?",
      correctAnswer: "O(n) where n is the length of the shorter string",
      distractors: ["O(1) always", "O(n^2) always", "O(log n) with binary search"],
      explanationSeed: "Each character must be compared once until a mismatch is found or both strings are exhausted.",
    },
    {
      difficulty: 1,
      content: "What does it mean for a string to be a palindrome?",
      correctAnswer: "It reads the same forwards and backwards",
      distractors: ["It contains only unique characters", "It is sorted alphabetically", "It has an even number of characters"],
      explanationSeed: "A palindrome has symmetric characters around its center.",
    },
    {
      difficulty: 2,
      content: "How can you check if two strings are anagrams of each other in O(n) time?",
      correctAnswer: "Count character frequencies in both strings and compare the counts",
      distractors: ["Sort both strings and check lengths", "Reverse one string and compare", "Use binary search on each character"],
      explanationSeed: "Anagrams have identical character frequencies; a frequency array or hash map verifies this in linear time.",
    },
    {
      difficulty: 2,
      content: "What technique efficiently finds the longest substring without repeating characters?",
      correctAnswer: "Sliding window with a hash set tracking characters in the current window",
      distractors: ["Sorting the string first", "Trying every possible subsequence", "Binary search on substring length"],
      explanationSeed: "The sliding window expands to include new characters and shrinks when a duplicate is encountered.",
    },
    {
      difficulty: 3,
      content: "Why is string immutability important in languages like Java and Python?",
      correctAnswer: "It enables safe sharing, caching, and use as hash map keys without unexpected mutation",
      distractors: ["It makes strings faster to sort", "It prevents strings from being stored in memory", "It forces strings to be fixed length"],
      explanationSeed: "Immutable strings can be interned and shared safely because their content never changes.",
    },
    {
      difficulty: 3,
      content: "What is the key idea behind the Rabin-Karp string matching algorithm?",
      correctAnswer: "Use a rolling hash to compare pattern hash with window hashes in O(1) per shift",
      distractors: ["Sort the text and binary search for the pattern", "Compare every character of every window", "Use a stack to reverse the pattern"],
      explanationSeed: "Rolling hash avoids recomputing the full hash by updating it incrementally as the window slides.",
    },
    {
      difficulty: 4,
      content: "What does the KMP failure function store for each position in the pattern?",
      correctAnswer: "The length of the longest proper prefix of the pattern that is also a suffix at that position",
      distractors: ["The index of the next mismatch", "The total number of character matches so far", "The hash value of the substring"],
      explanationSeed: "The failure function lets KMP skip redundant comparisons by knowing how much of the pattern still matches.",
    },
    {
      difficulty: 4,
      content: "How does a trie help with prefix-based search compared to a hash map?",
      correctAnswer: "A trie can find all strings with a given prefix efficiently by traversing shared prefix nodes",
      distractors: ["A trie uses less memory than a hash map always", "A trie sorts strings automatically by length", "A trie stores each string as a single node"],
      explanationSeed: "Tries share common prefix paths, making prefix queries natural without scanning all keys.",
    },
    {
      difficulty: 5,
      content: "Why does Manacher's algorithm find all palindromic substrings in O(n) time?",
      correctAnswer: "It exploits symmetry of known palindromes to skip redundant center expansions",
      distractors: ["It sorts the string first", "It uses binary search on palindrome length", "It only checks even-length palindromes"],
      explanationSeed: "Manacher reuses previously computed palindrome radii when the current position falls within a known palindrome.",
    },
    {
      difficulty: 5,
      content: "What is the suffix array and why is it useful for substring problems?",
      correctAnswer: "A sorted array of all suffixes that enables binary search for any substring pattern in O(m log n)",
      distractors: ["An array of prefix sums for character counts", "A hash table of all substrings", "A linked list of reversed strings"],
      explanationSeed: "Suffix arrays compactly encode all suffix positions; combined with LCP arrays they solve many string problems efficiently.",
    },
  ],
  "System Design": [
    {
      difficulty: 1,
      content: "What is the difference between vertical scaling and horizontal scaling?",
      correctAnswer: "Vertical scaling adds more power to one machine; horizontal scaling adds more machines",
      distractors: ["Vertical scaling is always cheaper", "Horizontal scaling means using a faster CPU", "Both terms mean the same thing"],
      explanationSeed: "Vertical scaling has hardware limits; horizontal scaling distributes load across multiple servers.",
    },
    {
      difficulty: 1,
      content: "What is a load balancer and why is it needed?",
      correctAnswer: "It distributes incoming requests across multiple servers to prevent any single server from being overwhelmed",
      distractors: ["It encrypts all database queries", "It stores backup copies of data", "It compiles code faster"],
      explanationSeed: "Load balancers improve availability and throughput by spreading traffic evenly.",
    },
    {
      difficulty: 2,
      content: "Why is caching important in system design?",
      correctAnswer: "It stores frequently accessed data in fast memory to reduce database load and latency",
      distractors: ["It permanently replaces the database", "It only works for static websites", "It increases network bandwidth"],
      explanationSeed: "Caches trade memory for speed by keeping hot data closer to the application layer.",
    },
    {
      difficulty: 2,
      content: "What is the CAP theorem?",
      correctAnswer: "A distributed system can provide at most two of three guarantees: Consistency, Availability, and Partition tolerance",
      distractors: ["All distributed systems are always consistent", "CAP means Caching Always Performs", "It states databases cannot be replicated"],
      explanationSeed: "During a network partition, the system must choose between returning stale data (availability) or rejecting requests (consistency).",
    },
    {
      difficulty: 3,
      content: "What is database sharding and when would you use it?",
      correctAnswer: "Splitting a database into smaller pieces across servers based on a shard key to handle massive data volume",
      distractors: ["Copying the entire database to every server", "Deleting old data to save space", "Encrypting database columns"],
      explanationSeed: "Sharding partitions data horizontally so each shard handles a subset of rows, enabling linear scale-out.",
    },
    {
      difficulty: 3,
      content: "What problem does a message queue like Kafka solve?",
      correctAnswer: "It decouples producers and consumers, buffers bursts, and enables asynchronous processing",
      distractors: ["It replaces the database entirely", "It makes synchronous calls faster", "It stores user passwords securely"],
      explanationSeed: "Message queues absorb traffic spikes and let services process work at their own pace.",
    },
    {
      difficulty: 4,
      content: "How does consistent hashing help when adding or removing servers?",
      correctAnswer: "Only a fraction of keys need to be remapped instead of rehashing everything",
      distractors: ["All keys are always remapped", "It eliminates the need for replication", "It stores keys in sorted order only"],
      explanationSeed: "Consistent hashing maps both keys and servers onto a ring, minimizing redistribution on topology changes.",
    },
    {
      difficulty: 4,
      content: "What is the difference between an API gateway and a load balancer?",
      correctAnswer: "An API gateway handles routing, auth, rate limiting, and protocol translation; a load balancer only distributes traffic",
      distractors: ["They are exactly the same component", "A load balancer handles authentication", "An API gateway only works with GraphQL"],
      explanationSeed: "API gateways sit at the application layer and provide cross-cutting concerns beyond simple traffic distribution.",
    },
    {
      difficulty: 5,
      content: "How does a CDN reduce latency for global users?",
      correctAnswer: "It caches content at edge servers geographically close to users, reducing round-trip time",
      distractors: ["It compresses all data to zero bytes", "It replaces DNS with direct IP connections", "It moves the origin server closer physically"],
      explanationSeed: "CDNs serve cached content from nearby points of presence, avoiding long cross-continent trips to the origin.",
    },
    {
      difficulty: 5,
      content: "What is eventual consistency and when is it acceptable?",
      correctAnswer: "All replicas will converge to the same state given enough time; acceptable when immediate consistency is not critical",
      distractors: ["Data is never consistent in any system", "It means data is always up to date everywhere", "It only applies to single-server systems"],
      explanationSeed: "Eventual consistency trades immediate agreement for higher availability and partition tolerance.",
    },
  ],
  "React and Node.js": [
    {
      difficulty: 1,
      content: "What is the virtual DOM in React?",
      correctAnswer: "A lightweight in-memory copy of the real DOM that React uses to calculate minimal updates",
      distractors: ["A separate browser built into React", "A database for storing component state", "A CSS framework for styling"],
      explanationSeed: "React diffs the virtual DOM against the previous version to determine the smallest set of real DOM changes.",
    },
    {
      difficulty: 1,
      content: "What is the purpose of useState in React?",
      correctAnswer: "To declare a state variable in a functional component that triggers a re-render when updated",
      distractors: ["To fetch data from an API", "To define CSS styles", "To create a new component"],
      explanationSeed: "useState returns a value and a setter; calling the setter schedules a re-render with the new value.",
    },
    {
      difficulty: 2,
      content: "What does useEffect do and when does it run?",
      correctAnswer: "It runs side effects after render; the dependency array controls when it re-runs",
      distractors: ["It replaces the render method entirely", "It runs before the component mounts only", "It directly modifies the DOM synchronously"],
      explanationSeed: "useEffect separates side effects from rendering and runs after the browser paints.",
    },
    {
      difficulty: 2,
      content: "What is middleware in Express.js?",
      correctAnswer: "Functions that execute during the request-response cycle with access to req, res, and next",
      distractors: ["A database driver for MongoDB", "A CSS preprocessor", "A type of React component"],
      explanationSeed: "Middleware functions can modify the request, send a response, or pass control to the next function.",
    },
    {
      difficulty: 3,
      content: "Why is the key prop important when rendering lists in React?",
      correctAnswer: "It helps React identify which items changed, were added, or removed for efficient re-rendering",
      distractors: ["It sets the CSS class name", "It encrypts the list data", "It defines the sort order"],
      explanationSeed: "Keys give elements a stable identity so React can match old and new virtual DOM trees correctly.",
    },
    {
      difficulty: 3,
      content: "What is the Node.js event loop and why does it matter?",
      correctAnswer: "It is a single-threaded loop that processes callbacks from an event queue, enabling non-blocking I/O",
      distractors: ["It creates a new thread for every request", "It is a for loop that iterates over arrays", "It only handles file system operations"],
      explanationSeed: "The event loop lets Node handle thousands of concurrent connections without creating threads for each one.",
    },
    {
      difficulty: 4,
      content: "What problem does React.memo solve?",
      correctAnswer: "It prevents unnecessary re-renders of a component when its props have not changed",
      distractors: ["It stores data in localStorage", "It replaces useEffect entirely", "It makes API calls faster"],
      explanationSeed: "React.memo does a shallow comparison of props and skips re-rendering if they are the same.",
    },
    {
      difficulty: 4,
      content: "What is the difference between SSR and CSR in Next.js?",
      correctAnswer: "SSR renders HTML on the server per request; CSR renders in the browser after downloading JavaScript",
      distractors: ["SSR is always slower than CSR", "CSR sends HTML from the server", "SSR only works with static pages"],
      explanationSeed: "SSR provides faster first paint and better SEO; CSR enables richer interactivity after initial load.",
    },
    {
      difficulty: 5,
      content: "How does React's reconciliation algorithm decide when to unmount and remount a component?",
      correctAnswer: "When the element type changes at the same position in the tree, React destroys the old subtree and builds a new one",
      distractors: ["It always remounts every component on every render", "It only checks prop values, never element types", "It uses the key prop as the sole criterion"],
      explanationSeed: "React assumes different element types produce fundamentally different trees, so it replaces rather than patches.",
    },
    {
      difficulty: 5,
      content: "Why can unhandled promise rejections crash a Node.js process and how should you prevent it?",
      correctAnswer: "Node treats them as fatal errors; use try/catch with async/await or .catch() on every promise chain",
      distractors: ["Promise rejections are always silently ignored", "Only synchronous errors can crash Node", "Using callbacks instead of promises prevents all crashes"],
      explanationSeed: "Unhandled rejections indicate missing error handling; Node exits to avoid running in an inconsistent state.",
    },
  ],
};

export const topicBank = topics;

export const questionBank: QuestionSeed[] = topics.flatMap((topic, topicIndex) =>
  drafts[topic.name].map((question, questionIndex) => ({
    id: `20000000-0000-4000-8000-${String(topicIndex * 10 + questionIndex + 1).padStart(12, "0")}`,
    topicId: topic.id,
    topic: topic.name,
    category: topic.category,
    difficulty: question.difficulty,
    content: question.content,
    options: [question.correctAnswer, ...question.distractors],
    correctAnswer: question.correctAnswer,
    explanationSeed: question.explanationSeed,
  })),
);

export function getQuestion(id: string) {
  return questionBank.find((question) => question.id === id);
}

export function getDiagnosticQuestions() {
  return topicBank.flatMap((topic) =>
    questionBank.filter((question) => question.topicId === topic.id && question.difficulty === 3).slice(0, 2),
  );
}

export function getNextQuestion(topicId: string, difficulty: number, previousQuestionId?: string) {
  return (
    questionBank.find(
      (question) =>
        question.topicId === topicId &&
        question.difficulty === difficulty &&
        question.id !== previousQuestionId,
    ) ?? questionBank.find((question) => question.topicId === topicId && question.difficulty === difficulty)
  );
}

export function publicQuestion(question: QuestionSeed) {
  return {
    id: question.id,
    topicId: question.topicId,
    topic: question.topic,
    category: question.category,
    difficulty: question.difficulty,
    content: question.content,
    options: question.options,
  };
}
