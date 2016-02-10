---
layout:     post
title:      Recursive Backtracking Maze Generator in Java with GUI
summary:    Simple maze generator and basic GUI in Java.
thumbnail:  code
tags:
 - java
 - backtracking
 - dfs
 - maze
 - gui
 - xml
---

# One Short Back Story

<img src="{{ site.baseurl }}/assets/images/maze_generator1.png" width="50%" align="left"/>
I needed a simple maze generator for some homeworks of my AI course, while I was studying at university. After I'd passed that class,
I wrote a basic console application just for fun. Then I forgot about it but, one year later when I was on holiday,
I found that console application on my disk drive and added UI (Yes, just for fun.) And I forgot
about it again. After my graduation, I found it one more time and this time I added XML output function, also decided to write
a blog post about it.

# Maze Generator

## What It Does?

![Maze Generator]({{ site.baseurl }}/assets/images/maze_generator0.png)

The application generates maze with using recursive backtracking method.
In that way, we get a maze that has only one solution and one exit. There are basic features
of the application, like:

* If you want to watch generation process click on _Generate & Simulate_ button and control the speed of the process via slide bar.
* After the maze is generated, 
    * You can see path 
    * Create XML file
* If don't like it, you can generate a new one.

My goal to put [this code on github][1] is to give some examples about using simple GUI components (buttons, panels, slide bars etc.) and
creating basic XML output in Java.

## How It Does That?

### The Problem

Actually problem is very simple. We want to generate a maze which has only one entrance, one exit and there must be only one path
between entrance and exit points.

There are lots of algorithms to do that (see [here][2],) but since it is easier to implement and understand than others, I have used recursive
backtracking method (or if you look in a general perspective [DFS -Depth First Search-][3] algorithm.)

### Recursive Backtracking Algorithm

1. Make the initial cell the current cell and mark it as visited
2. While there are unvisited cells
    1. If the current cell has any neighbors which have not been visited
        1. Choose randomly one of the unvisited neighbours
        2. Push the current cell to the stack
        3. Remove the wall between the current cell and the chosen cell
        4. Make the chosen cell the current cell and mark it as visited
    2. Else if stack is not empty
        1. Pop a cell from the stack
        2. Make it the current cell
        
*Source: [Wikipedia][4]*

### Implementation

Implementation of the above algorithm is could be found under [Maze.java][5] file, as `generate()` method. As you
can see it does exactly what algorithm says between while loop. In here *current*, *finish* and *start* are `Cell` objects and 
*unvisitedCells* is an `ArrayList` of `Cell`s (for more about structures and user defined objects, please keep reading.)

`generate()` method is called when user click on "Generate" button however, there is one additional method which is `generateAndSimulate()`
that does same thing with [Timer][6] to simulate the process. If you need more information about swing timers please visit 
[How to Use Swing Timers][7] page of Oracle's Java Tutorials.

```java
public void generate() {
	current = unvisitedCells.remove(getRandomInt(unvisitedCells.size()));
	current.setStatus(Status.VISITED);
	finish = null;
	start = current;
	
	while(!this.unvisitedCells.isEmpty()) {
		if(unvisitedCells.size() == 1)
			finish = unvisitedCells.get(0);
		
		Cell unvisited = this.chooseRandomUnvisitedNeighbour(current);
		
		if(unvisited != null) {
			this.stack.push(current);
			this.theWallBetween(current, unvisited).removeMe();
			current = unvisited;
			current.setStatus(Status.VISITED);
			this.unvisitedCells.remove(current);
		}
		else if(!this.stack.isEmpty()) {
			current = this.stack.pop();
		}
		else {
			current = this.unvisitedCells.remove(getRandomInt(unvisitedCells.size()));
			current.setStatus(Status.VISITED);
		}
	}
	isGenerated = true;
	start.setBackground(Color.GREEN);
	finish.setBackground(Color.RED);
}
```

### About GUI

We need cells that are wrapped by walls, some walls will be removed (replaced with cells) to create ways between cells.
That is why the algorithm says *"Remove the wall between the current cell and the chosen cell"* so, we have a board
like the below image at the beginning where white squares are cells and black ones are walls.

![Maze Beginning]({{ site.baseurl }}/assets/images/maze_beginning.png)

If you change background color of unvisited cells from black to white, you will get a similar image.

#### Structure

* __Cell__: The main component of that project. It is derived from `JPanel`. It keeps its own positions and its neighbors' positions.
* __Wall__: It is derived from `Cell`. It has two additional methods one for removing itself and one to see is it removed.
* __Status__: It is an enumerator that determines statuses and colors of the all `Cell`s. There are 3 statuses:
    * Visited
    * Unvisited
    * Unknown
* __Position__: It is an enumerator that specifies x and y values of neighbors of `Cell`s. There are 4 positions:
    * Up
    * Down
    * Left
    * Right
* __Maze__: It is derived from `JPanel`. All necessary methods are placed in that class.
* __MazeFrame__: It is derived from `JFrame`. It is for GUI, all buttons, panels and other components are created here.

# Last Words

I hope codes that I put on [github][1] and this blog post would be helpful for your homeworks/projects. 
This is the first blog post of mine, so if you have time, please share your ideas with me :)

[1]: https://github.com/onurozuduru/maze-generator
[2]: https://en.wikipedia.org/wiki/Maze_generation_algorithm
[3]: http://www.cs.toronto.edu/~heap/270F02/node36.html
[4]: https://en.wikipedia.org/wiki/Maze_generation_algorithm#Recursive_backtracker
[5]: https://github.com/onurozuduru/maze-generator/blob/master/src/com/ozuduru/mazegenerator/Maze.java
[6]: https://docs.oracle.com/javase/7/docs/api/javax/swing/Timer.html
[7]: https://docs.oracle.com/javase/tutorial/uiswing/misc/timer.html

