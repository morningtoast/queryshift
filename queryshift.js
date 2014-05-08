/*
	Query Shift
	2014 - Brian Vaughn, http://www.morningtoast.com
	Takes the specified source element and copies it to specified container element.
	Intended for use with responsive listeners like Gluten or Enquire

	No jQuery or other framework needed.
*/

var queryShift = {
	cache: {},
	active: [],

	// Refresh will restore elements before each shift
	refresh: function(contentId, destinationId) {
		this.clear();

		if (contentId) {
			this.shift(contentId, destinationId);
		}
	},

	// Copies content from source and inserts it into destination
	// Original source is hidden
	shift: function(contentId, destinationId) {
		var cacheId        = contentId.replace(/[^\w\s]/gi, '');
		var contentObj     = document.getElementById(contentId);
		var destinationObj = document.getElementById(destinationId);

		contentObj.style.display = "none"; // Hide parent element

		// Use cached HTML if available
		if (!this.cache[cacheId]) {
			var contentHtml          = contentObj.innerHTML;

			destinationObj.innerHTML = contentHtml;
			this.cache[cacheId]      = contentHtml;
		} else {
			var contentHtml = this.cache[cacheId];

			destinationObj.innerHTML = contentHtml;
		}

		// Add to active list
		this.active.push({
			"contentId": contentId,
			"destinationId": destinationId
		});
	},

	// Restores all original placements
	clear: function() {
		var activeSize = this.active.length;

		for (a=0; a < activeSize; a+=1) {
			var active         = this.active[a];
			var contentObj     = document.getElementById(active.contentId).style.display = "";
			var destinationObj = document.getElementById(active.destinationId).innerHTML = "";
		}
	}
}
