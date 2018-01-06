
/*******************************************************************/
/* See README.md for more informations about the TypeWriter Object */
/*******************************************************************/

function TypeWriter(elmt) {
	this.elmt = elmt;
	this.selector = $(elmt);
	this.linesToDisplay = [
		'Hi.',
		'Welcome on jQuery TypeWriter.',
		'You know what ?',
		'You can easily configure the TypeWriter by editing TypeWriter attributes in the source file.',
		'Try pressing the Enter key.'
	];
	this.firstDelay = 2000;
	this.typingDelay = 70;
	this.afterLineDelay = 1000;
	this.endTimeOut = 2000;
	this.endText = "Fake loading on progress...";
}

TypeWriter.prototype.typeIt = function(selector, text, n) {
	var that = this;

	if (n < (text.length)) {
		$(that.elmt + ' ' + selector).html(text.substring(0, n + 1));
		n++;
		setTimeout(function() {
			that.typeIt(selector, text, n);
		}, that.typingDelay);
	} else {
		$.event.trigger("TypeWriter:linedisplayed");
	}
};

TypeWriter.prototype.appendTypeWriterItem = function(...args) {
	switch (args.length) {
		case 0:
			this.selector.append(
				"<span class='typewriter-item'>"
			);
			break;
		case 1:
			this.selector.append(
				"<span class='typewriter-item' data-text='" + args[0] + "'>"
			);
			break;
		default:
			break;
	}
};

TypeWriter.prototype.start = function() {
	var that = this;
	var i = 0;

	that.appendTypeWriterItem(that.linesToDisplay[i]);

	setTimeout(function() {
		that.typeIt('span.typewriter-item', that.linesToDisplay[i], 0);
	}, that.firstDelay);

	$(window).on('TypeWriter:linedisplayed', function() {
		i++;

		if (i < that.linesToDisplay.length) {
			that.appendTypeWriterItem(that.linesToDisplay[i]);
			setTimeout(function() {
				that.typeIt('span.typewriter-item:last-child', that.linesToDisplay[i], 0);
			}, that.afterLineDelay);
		} else
			that.appendTypeWriterItem();

		if (i === that.linesToDisplay.length)
			$.event.trigger("TypeWriter:finished");
	});

	$(window).on('TypeWriter:finished', function() {
		$(window).on('keypress', function(e) {
			if (e.keyCode == 13) {
				$(that.elmt).append("<span id='init'>" + that.endText);
				setTimeout(function() {
					$(that.elmt).fadeOut("slow");
				}, that.endTimeOut);
			}
		});
	});
};
