(function(global) {
	this.Utils = {
		log: function(str) {
			console.log('%c%s', 'background:#e07070;color:#fff;font-size:20x;', str);
		},
		conInfo: function() {
			var str =
				'	   _  _    __         __    __    __   __ 	\n' +
				'	  / /  ) /   ) | /  /___) /   \' (_ ` (_ `	\n' +
				'	_/_/__/_(___/__|/__(___ _(___ _(__)_(__)_ 	\n' +
				' 												\n' +
				' 			author: move11@126.com				\n';
			console.log('%c%s', 'color:#e07070; text-shadow: 0 0 20px #fff;', str);
		},
		getselection: function() {
			var r;
			if (window.getSelection) {
				r = window.getSelection();
			} else if (document.getSelection) {
				r = document.getSelection();
			} else if (document.selection) {
				r = document.selection.createRange();
			}
			return r;
		}
	};
	console.log(chrome);
	Utils.conInfo();
	return this;
})(window);