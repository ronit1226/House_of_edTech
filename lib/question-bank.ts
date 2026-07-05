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
