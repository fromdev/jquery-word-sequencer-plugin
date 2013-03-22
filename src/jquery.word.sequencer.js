/*
* jQuery Word Sequencer Plugin
* Author: Sachin Joshi sachin@fromdev.com
* Copyright (c) 2013 www.FromDev.com
* MIT Licensed: http://www.opensource.org/licenses/mit-license.php
*/ 
(function($) {
	$.fn.wordSequencer = function(userSettings) {
		var settings = {
			wordsPerLine : 2,
			wordsPerMinute : 150,
			displayElementClass : 'wsContentPanel',
			currentElement : this
		};
		var calculatedSettings = {
			fadeInTime : (settings.wordsPerLine * 60 * 100)
					/ settings.wordsPerMinute,
			fadeOutTime : (settings.wordsPerLine * 60 * 100)
					/ settings.wordsPerMinute,
			delayTime : (settings.wordsPerLine * 60 * 800)
					/ settings.wordsPerMinute,
			words : $(settings.currentElement).text().split(' ')
		};
		$.extend(settings, calculatedSettings);
		$.extend(settings, userSettings);
		prepare(settings);
		play(settings);
	}

	function exists(elm) {
		if (typeof elm == null)
			return false;
		if (typeof elm != "object")
			elm = $(elm);
		return elm.length ? true : false;
	}
	function prepare(options) {
		var index = 0;
		var sentenceLen = options.words.length;
		var displayWords = "";
		if (!exists('.' + options.displayElementClass)) {
			$(options.currentElement).after(
					'<div class="' + options.displayElementClass + '"></div>');
		}

		while (index < sentenceLen) {
			var nextIndex = index + options.wordsPerLine;
			if (nextIndex > sentenceLen) {
				nextIndex = sentenceLen;
			}
			var wordGroup = options.words.slice(index, nextIndex);

			var len = wordGroup.length;
			displayWords = '<div class="content" id="' + nextIndex + '"><div>';
			for ( var i = 0; i < len; i++) {
				if (i > 0) {
					displayWords += ' ' + wordGroup[i];
				} else {
					displayWords += wordGroup[i];
				}
			}
			displayWords += '</div></div>';
			// $('.debug').append(displayWords);
			if (displayWords) {
				$('.' + options.displayElementClass).append(displayWords);
			}
			index += options.wordsPerLine;
		}
	}
	;

	function play(options) {
		$("." + options.displayElementClass + " .content:hidden:first").fadeIn(
				options.fadeInTime).delay(options.delayTime).fadeOut(
				options.fadeOutTime, function() {
					$(this).appendTo($(this).parent());

					if (!$('#' + options.words.length).is(this)) {
						play(options);
					}
				});
	}

})(jQuery);
