##############
### README ###
##############

TypeWriter.JS has an object named typeWriter.
It has the following properties :
	
	-> elmt 
		# The id of the TypeWriter section, it can be anything you want (eg. : #typeWriter)
	
	-> selector
		# Represents the DOM element
	
	-> linesToDisplay
		# The array that represents all the lines you want to display.
		# Each element of the array represents a line.
	
	-> firstDelay
		# Number of ms of the first delay, right before the very first line begins to be displayed

	-> typingDelay
		# Number of ms for the delay of the display for each letters

	-> afterLineDelay
		# Number of ms for the delay after each lines is displayed

	-> endTimeOut
		# Number of ms for the delay after the user has pressed the Enter key

	-> endText
		# The text that has to be displayed for TypeWriter.endTimeOut ms when the user has pressed the Enter key


It also has the following methods :

	-> typeIt()
		# The main function.
		# This is a recursive function that is called until the current element of the array has text to display.
		# If the current element has finished to be displayed, a event is triggered, which allows the program to
		# display the next line.

	-> appendTypeWriterItem()
		# This method appends an empty span item into the TypeWriter.selector element.
		# If no args are given, it appends a span with no data attribute (usefull for displaying the very last 
		# line).
		# Else, if an argument is given, it appends a span with a data-text attribut containing the text to display

	-> start()
		# This is the method that starts the script.
		# This is where the custom event TypeWriter:linedisplayed triggered by the TypeWriter.typeIt() method is catched.
			-- Notice that when all the lines has been displayed, it triggers another custom event inside the 
			on(TypeWriter:linedisplayed) function --
		# Also catches the TypeWriter:finished custom event and waits for the user to press the Enter key.