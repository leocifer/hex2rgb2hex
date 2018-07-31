!function(r){r.fn.colourBrightness=function(){function r(r){for(var t="";"html"!=r[0].tagName.toLowerCase()&&(t=r.css("background-color"),"rgba(0, 0, 0, 0)"==t||"transparent"==t);)r=r.parent();return t}var t,a,s,e,n=r(this);return n.match(/^rgb/)?(n=n.match(/rgba?\(([^)]+)\)/)[1],n=n.split(/ *, */).map(Number),t=n[0],a=n[1],s=n[2]):"#"==n[0]&&7==n.length?(t=parseInt(n.slice(1,3),16),a=parseInt(n.slice(3,5),16),s=parseInt(n.slice(5,7),16)):"#"==n[0]&&4==n.length&&(t=parseInt(n[1]+n[1],16),a=parseInt(n[2]+n[2],16),s=parseInt(n[3]+n[3],16)),e=(299*t+587*a+114*s)/1e3,125>e?this.removeClass("light").addClass("dark"):this.removeClass("dark").addClass("light"),this}}(jQuery);

$(document).ready(function(){
	$('body').colourBrightness();
});

// variables
let $hex_input = document.querySelector('.hex-input');
let $rgb_input = document.querySelector('.rgb-input');
let $hex_input_value = document.querySelector('.hex-input').value;
let $rgb_input_value = document.querySelector('.rgb-input').value;

var main = (function () {
	var instance;

	function init() {
		function hex2rgb(hex){
			hex = hex.replace('#','');
			if (hex.length === 8) {
				a = parseInt(hex.substring(0,2), 16);
				r = parseInt(hex.substring(2,4), 16);
				g = parseInt(hex.substring(4,6), 16);
				b = parseInt(hex.substring(6,8), 16);

				result = 'rgba('+r+','+g+','+b+','+a/100+')';

			} else if (hex.length === 6) {

				r = parseInt(hex.substring(0,2), 16);
				g = parseInt(hex.substring(2,4), 16);
				b = parseInt(hex.substring(4,6), 16);

				result = 'rgba('+r+','+g+','+b+')';
			} else if (hex.length === 3) {

				var h =  hex.match(new RegExp('(.{'+hex.length/3+'})', 'g'));

				for(var i=0; i<h.length; i++) {
					h[i] = parseInt(h[i].length==1? h[i]+h[i]:h[i], 16);
				}

				result = 'rgb('+h.join(',')+')';
			} else {
				result = '';
			}

			$($rgb_input).val(result);
			changeBackground(result);
		}

		function rgb2hex(rgb) {
			rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
			var result = (rgb && rgb.length === 4) ? "#" +
			("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
			("0" + parseInt(rgb[2],10).toString(16)).slice(-2) +
			("0" + parseInt(rgb[3],10).toString(16)).slice(-2) : '';

			$($hex_input).val(result);
			changeBackground(result);
		}

		function changeBackground(color) {
			console.log({bool: !!color, color});

			if (color.length) {
				document.body.style.background = color;
			} else {
				document.body.style.background = 'khakhi';
			}

			$('body').colourBrightness();
		}

		return  {
			callHex2Rgb: function (e) {
				return hex2rgb(e);
			},

			callRgb2Hex: function (e) {
				return rgb2hex(e);
			}
		};
	};

	return {
		getInstance: function () {
			if ( !instance ) {
				instance = init();
			}
			return instance;
		}
	};
})();

let $main = main.getInstance();

$('input').on('blur keyup', function(e) {
	if (e.target == $hex_input) {
		$main.callHex2Rgb(e.target.value);
	} else {
		$main.callRgb2Hex(e.target.value);
	}
})





