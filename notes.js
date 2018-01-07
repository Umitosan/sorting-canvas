// Canvas notes


// basic shapes
// https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Drawing_shapes

// 1. First, you create the path.
// 2. Then you use drawing commands to draw into the path.
// 3. Once the path has been created, you can stroke or fill the path to render it.

beginPath()
// Creates a new path. Once created, future drawing commands are directed into the path and used to build the path up.
// Path methods
// Methods to set different paths for objects.

closePath()
// Adds a straight line to the path, going to the start of the current sub-path.

stroke()
// Draws the shape by stroking its outline.

fill()
// Draws a solid shape by filling the path's content area.




// Draws a filled rectangle.
fillRect(x, y, width, height)

// Draws a rectangular outline.
strokeRect(x, y, width, height)

// Clears the specified rectangular area, making it fully transparent.
clearRect(x, y, width, height)
