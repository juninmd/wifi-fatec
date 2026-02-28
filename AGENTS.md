```markdown
# AGENTS.md - AI Coding Agent Guidelines

These guidelines are designed to ensure the creation and maintenance of high-quality, maintainable, and robust AI coding agents. Adherence to these principles is mandatory.

## 1. DRY (Don't Repeat Yourself)

*   All functions, classes, and methods should have single, well-defined purposes.
*   Avoid duplicating logic across multiple files.
*   When a task can be achieved with a single solution, implement it directly in the relevant file.
*   Refactor code to eliminate redundancies and simplify structures.

## 2. KISS (Keep It Simple, Stupid)

*   Prioritize clarity and readability over complexity.
*   Keep functions and classes short and focused.
*   Minimize nesting and excessive conditional statements.
*   Avoid overly intricate algorithms or data structures.

## 3. SOLID Principles

*   **Single Responsibility Principle:** Each class/module should have a single, well-defined responsibility.
*   **Open/Closed Principle:**  The system should be extensible through mechanisms like interfaces and abstract classes without modifying existing code.
*   **Liskov Substitution Principle:**  Subclasses should be substitutable for their base classes without altering the correctness of the program.
*   **Interface Segregation Principle:** Client code should not be required to implement interfaces it doesn’t use.
*   **Dependency Inversion Principle:** Dependencies should be replaced by abstractions.

## 4. YAGNI (You Aren't Gonna Need It)

*   Do not implement features or functionality that are not currently required.
*   Refrain from adding code that is likely to be obsolete or irrelevant in the future.
*   Focus on delivering the essential functionality outlined in the requirements.

## 5. Code Length Constraint: 180 Lines Max

*   All code within this file must not exceed 180 lines.
*   Code must be organized logically and efficiently.

## 6. Test Coverage: 80% Minimum

*   Each file must achieve at least 80% test coverage.
*   Test cases should cover all critical functionality, edge cases, and error conditions.
*   Testing should be integrated directly into the code development process.

## 7.  Development Process:

*   **Requirements First:**  All development must begin with a thorough understanding of the requirements.
*   **Design First:**  Design should occur before implementation.
*   **Incremental Development:**  Break down the project into smaller, manageable units.
*   **Code Review:**  Every change should undergo a code review process.
*   **Continuous Integration:**  Implement a CI/CD pipeline for automated testing and deployment.
*   **Static Analysis:**  Use static analysis tools to identify potential issues and code quality problems.

## 8. Specific Guidelines

*   **Data Structures:** Use appropriate data structures for optimal performance and readability.
*   **Error Handling:** Implement robust error handling and logging.
*   **Concurrency:**  Consider concurrency issues when designing algorithms and data structures.
*   **Documentation:**  Include clear and concise comments to explain complex logic.
*   **Naming Conventions:** Follow consistent naming conventions throughout the project.

## 9.  Workflow

1.  **Requirements Gathering:**  Define clear and complete requirements.
2.  **Design:** Create a high-level design.
3.  **Implement:** Write the code.
4.  **Test:** Run unit tests and integration tests.
5.  **Code Review:**  Peer review code changes.
6.  **Refactor:** Improve code structure and readability.

## 10. Dependencies

*   This document provides guidelines but does not define specific dependencies or libraries.
*   User-defined dependencies will be documented separately.

## 11.  Example

[Example Code - Minimal, demonstrating DRY - should be minimal and focused on a single concept.]

```python
def calculate_sum(numbers):
  """Calculates the sum of a list of numbers."""
  total = 0
  for number in numbers:
    total += number
  return total

# Example usage:
my_numbers = [1, 2, 3, 4, 5]
result = calculate_sum(my_numbers)
print(result)
```

This document will be updated periodically as the AGENTS.md repository evolves.
```