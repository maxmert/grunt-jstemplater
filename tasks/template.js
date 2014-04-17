module.exports = function(grunt) {

	// ==========================================================================
	// HELPERS
	// ==========================================================================

		function template(files, staticPath) {
			return files ? files.map(function(filepath){
				paths = filepath.split(staticPath)[1].split('/')
				jsonpart = buildJsonPath(paths, filepath);
				return jsonpart;
			}) : ''
		};


	// ==========================================================================
	// FUNCTIONS
	// ==========================================================================

		function deepmerge(foo, bar) {
			var merged = {};
			for (var each in bar) {
				if (each in foo) {
					if (typeof(foo[each]) == "object" && typeof(bar[each]) == "object") {
						merged[each] = deepmerge(foo[each], bar[each]);
					} else {
						merged[each] = [foo[each], bar[each]];
					}
				} else {
					merged[each] = bar[each];
				}
			}
			for (var each in foo) {
				if (!(each in bar)) {
					merged[each] = foo[each];
				}
			}
			return merged;
		}

		function buildJsonPath(path, filepath) {
			pathLength = path.length;
			node = path.splice(0,1);
			res = '{';

			if( pathLength > 1 ) {
				res += '"' + node + '":' + buildJsonPath(path, filepath) + '}'
			}
			else if( path.length == 0 ) {
				res += '"' + node[0].match(/(.*)\.[^.]+$/)[1] + '":"' + grunt.file.read(filepath).replace(/\t/g,"").replace(/\n/g," ").replace(/\\/g, '\\\\').replace(/"/g,'\\"') + '"}'
			}
			return res;
		}


	// ==========================================================================
	// TASKS
	// ==========================================================================

	grunt.registerMultiTask('template', 'Concatenate all javascript templates into json.', function() {
		var files = grunt.file.expand(this.filesSrc);
		var staticPath = this.data.variables.staticPath ? this.data.variables.staticPath : 'javascripts/templates/';
		staticPath.charAt( staticPath.length - 1 ) !== '/' ? staticPath += '/' : void 0;
		var src = template(files, staticPath);
		var obj = {};
		var name = 'TEMPLATES';
		
		for( item in src ) {
			src[item] = src[item].replace(/(\r\n|\n|\r|\t)/gm,"");
			src[item] = src[item].replace(/>[\s]+</gm,"><");
			src[item] = src[item].replace(/[\s]{2,}/gm,"");
			obj = deepmerge(obj, JSON.parse(src[item]));
		}
		
		if( this.data.variables.name && this.data.variables.name !== '' )
			name = this.data.variables.name
		
		grunt.file.write(this.data.dest, 'var '+ name +' = ' + JSON.stringify(obj) + ';');

		grunt.log.ok(this.data.dest, name);
	});

};





