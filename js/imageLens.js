/* 
http://www.dailycoding.com/ 
*/
(function ($) {
		$.fn.imageLens = function (options) {
				var defaults = {
						lensSize: 100,
						borderSize: 4,
						borderColor: "#888"
				};
				options = $.extend(defaults, options);

				var lensStyle = "background-position: 0px 0px;width: " + options.lensSize + "px;height: " + options.lensSize + "px;float: left;display: none;border-radius: " + options.lensSize / 2 + options.borderSize + "px;border: " + options.borderSize + "px solid " + options.borderColor + ";background-repeat: no-repeat;position: absolute;";

				return this.each(function () {
								var obj = $(this),
										parent = obj.parent(),
										// offset = obj.offset(),
										imageSrc = options.imageSrc || $(this).attr("src"),
										// Creating lensStyle
										target = $('<div style="' + lensStyle + '">&nbsp;</div>').appendTo(parent).addClass(options.lensCss).css({
														backgroundImage: "url('" + imageSrc + "')"
												}),
										widthRatio = 0,
										heightRatio = 0,
										tempImage = "<img style='display:none;' src='" + imageSrc + "' />",
										setPosition = function (e) {
												offset = obj.offset();

												var leftPos = e.pageX - offset.left,
														topPos = e.pageY - offset.top;

												if (leftPos < 0 || topPos < 0 || leftPos > obj.width() || topPos > obj.height()) {
														target.hide();
												} else {
														target.show();

														leftPos = -((e.pageX - offset.left) * widthRatio - target.width() / 2);
														topPos = -((e.pageY - offset.top) * heightRatio - target.height() / 2);
														target.css({
																		backgroundPosition: leftPos + 'px ' + topPos + 'px'
																});

														leftPos = String((e.pageX - offset.left) - target.width() / 2);
														topPos = String((e.pageY - offset.top) - target.height() / 2);
														target.css({
																		left: leftPos + 'px',
																		top: topPos + 'px'
																});

												}
										};

								// Calculating actual size of image
								$(tempImage).load(function () {
												widthRatio = $(this).width() / obj.width();
												heightRatio = $(this).height() / obj.height();
												$(this).remove();
										}).appendTo(parent);


								target.add(obj).mousemove(setPosition);


						});
		};
})(jQuery);