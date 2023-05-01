# This is a comment
"""
This is a multi-line comment
"""

# Import statements
import math
from datetime import datetime

# Variable declaration and assignment
x = 5
y = 3.14
z = "Hello, World!"

# Data types
a = 3  # Integer
b = 3.14  # Float
c = True  # Boolean
d = "Hello, World!"  # String
e = [1, 2, 3]  # List
f = (1, 2, 3)  # Tuple
g = {1, 2, 3}  # Set
h = {"name": "John", "age": 25}  # Dictionary

# Arithmetic operations
sum = x + y
difference = x - y
product = x * y
quotient = x / y
remainder = x % y
exponentiation = x**y

# Comparison operators
if x == y:
    print("x is equal to y")
elif x < y:
    print("x is less than y")
else:
    print("x is greater than y")

# Logical operators
if x > 0 and y > 0:
    print("Both x and y are positive")
if x > 0 or y > 0:
    print("Either x or y is positive")
if not x == y:
    print("x is not equal to y")

# Membership operators
if "Hello" in z:
    print("Hello is present in the string")
if 2 not in e:
    print("2 is not present in the list")

# Identity operators
if x is y:
    print("x and y have the same identity")
if x is not y:
    print("x and y do not have the same identity")

# Conditional statements
if x > y:
    print("x is greater than y")
elif x < y:
    print("x is less than y")
else:
    print("x is equal to y")

# Loops
for i in range(5):
    print(i)

while x > 0:
    print(x)
    x -= 1


# Functions
def square(x):
    return x**2


# Built-in functions
print(len(z))
print(type(x))
print(str(y))
print(int(b))
print(float(a))
print(list(h.keys()))
print(tuple(e))
print(set(f))
print(abs(-10))
print(max(e))
print(min(g))
print(sum(e))
print(sorted(e))
print(math.pi)
print(datetime.now())

# Exception handling
try:
    a = 10 / 0
except ZeroDivisionError:
    print("Error: Division by zero")


# Class and object
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age

    def greet(self):
        print("Hello, my name is " + self.name)


p = Person("John", 25)
p.greet()
