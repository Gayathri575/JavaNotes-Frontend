
export const topicConfigs = {

  corejava: {
    label: "Core Java",
    fetchConfig: [
      { type: "category", value: "Core Java" }
    ],
    sectionMap: {
      "OOP Concepts": [
        "Classes and Objects","Constructors","this keyword","static keyword",
        "Inheritance","Method Overriding & super keyword","Polymorphism",
        "Encapsulation","Abstraction","Interfaces","Object class methods",
        "Packages and Access Modifiers","Marker Interface","Cloneable Interface"
      ],
      "Exception Handling": [
        "try, catch, finally","Multiple catch blocks","Nested try",
        "throw vs throws","Custom Exceptions","Checked vs Unchecked Exceptions"
      ],
      "Java Memory Management": [
        "Stack vs Heap","Garbage Collection","finalize() method",
        "final, finally, finalize differences","Garbage Collectors (types)","Garbage Collector"
      ],
      "Java Strings": [
        "String, StringBuilder, StringBuffer","Immutability of String",
        "String methods","String Comparison","Regular Expressions"
      ],
      "Collections Framework": [
        "Collection Interfaces","Implementation Classes","Iterators & Loops",
        "Generics","Comparable vs Comparator","Collections Utility Class","Thread-safe Collections"
      ],
      "Java Generics": [
        "Generic Classes and Methods","Bounded Types","Wildcards","Type Erasure"
      ],
      "Multithreading": [
        "Thread Creation","Thread Lifecycle","Thread Priorities",
        "Synchronization","Inter-thread Communication","ExecutorService",
        "Callable and Future","Atomic Classes"
      ],
      "Java I/O": [
        "File I/O","Buffered I/O","Byte vs Character Streams","Serialization",
        "Deserialization","transient keyword","Scanner Class","NIO"
      ],
      "Java 8+ Features": [
        "Lambda Expressions","Functional Interfaces","Predicate","Function",
        "Consumer","Stream API","Optional Class","Method References",
        "Default & Static Methods in Interfaces","Date & Time API"
      ],
      "Concurrency Utilities": [
        "java.util.concurrent","CountDownLatch, Semaphore, CyclicBarrier",
        "ForkJoinPool","Executors Framework"
      ],
      "Annotations & Reflection": [
        "Built-in Annotations","Custom Annotations","Reflection API","Dynamic Class Loading"
      ],
      "Networking": [
        "Sockets (TCP/UDP)","URL & URLConnection","HTTP Requests","InetAddress"
      ]
    }
  },

  dsa: {
    label: "DSA",
    fetchConfig: [
      { type: "category", value: "Arrays" },
      { type: "category", value: "Strings" },
      { type: "category", value: "Sorting" },
      { type: "category", value: "Searching" },
      { type: "category", value: "Patterns" },
      { type: "category", value: "Maths" },
    ],
    sectionMap: {
      "Arrays": [
        "Array Traversal","Array Insertion & Deletion","Array Searching",
        "Array Max & Min","Array Reversal","Array Rotation","Prefix Sum","Two Pointers"
      ],
      "Strings": [
        "String Traversal","String Comparison","Palindrome Check",
        "String Reversal","Character Frequency","Anagram Check","Substrings","String Manipulation"
      ],
      "Sorting": ["Bubble Sort","Selection Sort","Insertion Sort"],
      "Searching": ["Linear Search","Binary Search"],
      "Pattern Problems": [
        "Star Pattern","Number Pattern","Pyramid Pattern","Inverted Pattern","Character Pattern"
      ],
      "Maths Problems": [
        "Prime Number Check","Factorial","GCD / HCF","LCM",
        "Fibonacci Sequence","Reverse a Number","Digit Counting"
      ]
    }
  },

  mysql: {
    label: "MySQL",
    fetchConfig: [
      { type: "topic", value: "MySQL" }
    ],
    sectionMap: {
      "1. Basics": ["What is MySQL & RDBMS","Database vs Table","Rows & Columns","Primary Key, Foreign Key","Data Types"],
      "2. Table Operations": ["CREATE DATABASE","DROP DATABASE","CREATE TABLE","ALTER TABLE","TRUNCATE TABLE"],
      "3. CRUD": ["INSERT","SELECT","UPDATE","DELETE"],
      "4. Filtering": ["WHERE clause","AND, OR, NOT","BETWEEN","IN / NOT IN","LIKE"],
      "5. Sorting & Limiting": ["ORDER BY","LIMIT"],
      "6. Functions": ["Aggregate Functions","String Functions","Date Functions"],
      "7. Grouping": ["GROUP BY","HAVING"],
      "8. Joins": ["INNER JOIN","LEFT JOIN","RIGHT JOIN","FULL JOIN"],
      "9. Constraints": ["PRIMARY KEY","FOREIGN KEY","UNIQUE","NOT NULL","DEFAULT"],
      "10. Indexes": ["What is Index","CREATE INDEX"],
      "11. Subqueries": ["Nested SELECT","IN with subqueries"],
      "12. Views": ["CREATE VIEW","DROP VIEW"],
      "13. Transactions": ["COMMIT","ROLLBACK","ACID properties"],
      "14. Performance": ["Index usage","Query optimization"]
    }
  },

  hibernate: {
    label: "Hibernate",
    fetchConfig: [
      { type: "category", value: "Hibernate" }
    ],
    sectionMap: {
      "Hibernate Basics": [
        "Hibernate Basics","ORM (Object Relational Mapping)",
        "Hibernate Architecture","Configuration (hibernate.cfg.xml)"
      ],
      "Core Components": ["SessionFactory","Session","CRUD Operations"],
      "Entity & Mapping": [
        "Entity Mapping","Annotations (@Entity, @Table, @Id, @Column)",
        "Relationships (OneToOne, OneToMany, ManyToOne)","Fetch Types (Lazy, Eager)"
      ],
      "Advanced Concepts": [
        "Hibernate Object States (Transient, Persistent, Detached)",
        "HQL (Hibernate Query Language)","Transactions"
      ]
    }
  },

  springboot: {
    label: "Spring Boot",
    fetchConfig: [
      { type: "category", value: "Spring Boot" },
      { type: "category", value: "Core Spring Annotations" },
      { type: "category", value: "Spring Boot Annotations" },
      { type: "category", value: "REST API Annotations" },
      { type: "category", value: "Exception Handling Annotations" },
      { type: "category", value: "JPA Annotations" },
      { type: "category", value: "Validation Annotations" },
      { type: "category", value: "Lombok Annotations" },
      { type: "category", value: "Testing Annotations" },
    ],
    sectionMap: {
      "Spring Boot": [
        "Spring Boot Introduction","Spring vs Spring Boot","Spring Boot Architecture",
        "Spring Boot Setup (Spring Initializr)","Project Structure",
        "Dependency Management (Maven/Gradle)","application.properties / application.yml",
        "REST API Development","Dependency Injection (DI)","Spring Data JPA",
        "Database Configuration (MySQL)","Exception Handling","Validation",
        "Logging","Profiles","Basic Security"
      ],
      "Core Spring Annotations": [
        "@Component","@Service","@Repository","@Controller","@RestController",
        "@Autowired","@Qualifier","@Primary","@Value"
      ],
      "Spring Boot Annotations": [
        "@SpringBootApplication","@EnableAutoConfiguration","@Configuration","@Bean","@ComponentScan"
      ],
      "REST API Annotations": [
        "@RequestMapping","@GetMapping","@PostMapping","@PutMapping","@DeleteMapping",
        "@PathVariable","@RequestParam","@RequestBody","@ResponseBody"
      ],
      "Exception Handling Annotations": ["@ControllerAdvice","@ExceptionHandler"],
      "JPA / Hibernate Annotations": [
        "@Entity","@Table","@Id","@GeneratedValue","@Column","@Transient",
        "@OneToOne","@OneToMany","@ManyToOne","@ManyToMany","@JoinColumn","@JoinTable"
      ],
      "Validation Annotations": [
        "@Valid","@NotNull","@NotEmpty","@NotBlank","@Size","@Email","@Min","@Max","@Pattern"
      ],
      "Lombok Annotations": [
        "@Getter","@Setter","@NoArgsConstructor","@AllArgsConstructor",
        "@ToString","@EqualsAndHashCode","@Data"
      ],
      "Testing Annotations": ["@SpringBootTest","@Test"]
    }
  },

  springsecurity: {
    label: "Spring Security",
    fetchConfig: [
      { type: "category", value: "Authentication" },
      { type: "category", value: "Authorization" },
      { type: "category", value: "User Management" },
      { type: "category", value: "Configuration" },
      { type: "category", value: "Token & Session" },
      { type: "category", value: "OAuth2 & Advanced" },
      { type: "category", value: "Filters & Chain" },
      { type: "category", value: "Method Security" },
      { type: "category", value: "Exception & Logout" },
    ],
    sectionMap: {
      "Authentication": [
        "Authentication","HTTP Basic Authentication","Form Login",
        "Stateless vs Stateful Authentication","Remember Me Authentication","Custom Authentication Provider"
      ],
      "Authorization": [
        "Authorization","Roles & Authorities","Access Control Expressions",
        "Method Level Security","Pre/Post Annotations"
      ],
      "User Management": ["UserDetails","UserDetailsService","Password Encoding"],
      "Configuration": ["Security Configuration","CORS","CSRF Protection"],
      "Token & Session": ["JWT","Session Management","Security Context"],
      "OAuth2 & Advanced": ["OAuth2"],
      "Filters & Chain": ["Security Filters","Filter Chain"],
      "Exception & Logout": ["Exception Handling","Logout Handling"]
    }
  }
};