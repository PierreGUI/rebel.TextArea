_.extend(this, {
	value: null,
	height: null,
    length: 0,

	construct: function(config) {
		$.textarea.applyProperties(_.omit(config, 'id', '__parentSymbol', '__itemTemplate', '$model'));

		$.value = '';

		if (OS_IOS) {
			$.label.applyProperties({
				text: config.hintText,
				font: config.font
			});
		}
	},

	setValue: function(value) {
		$.textarea.value = value;
		$.value = value;

		sizeHandler();

        if(OS_IOS && $.value.length > 0) {
            $.label.hide();
        }
        else if($.value.length === 0) {
            $.label.show();
        }
	},

	setHintText: function(value) {
		if(OS_IOS) {
			$.label.text = value;
		}
	},

	focus: function() {
		$.textarea.focus();
	},

	blur: function() {
		$.textarea.blur();
	},

	addEventListener: function(type, callback) {
		$.on(type, callback);
	},

	removeEventListener: function(type, callback) {
		$.off(type, callback);
	},

	applyProperties: function(config) {
		$.textarea.applyProperties(config);
	},

	destruct: function() {
		$.off();
	}
});

// Handle the textArea growing/shrinking to match maxHeight parameter
function sizeHandler() {
    if(!$.height) {
        $.height = $.textarea.height;
    }
    if(!$.length && $.textarea.maxHeight && $.textarea.rect.height >= $.textarea.maxHeight) {
        $.textarea.setHeight($.textarea.maxHeight);
        $.length = $.textarea.value.length;
    }
    else if($.length && $.length > $.value.length) {
        $.textarea.setHeight($.height);
        $.length = 0;
    }
}

function onFocus(evt) {
	$.trigger(evt.type, evt);
}

function onBlur(evt) {
	$.trigger(evt.type, evt);
}

function onChange(evt) {
	$.value = this.value;

	sizeHandler();

    if(OS_IOS && $.value.length > 0) {
        $.label.hide();
    }
    else if($.value.length === 0) {
        $.label.show();
    }

	$.trigger(evt.type, evt);
}

function onPostlayout(evt) {
    sizeHandler();
    $.trigger(evt.type, evt);
}
