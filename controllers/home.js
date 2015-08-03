/**
 * GET /
 * Home page.
 */
exports.index = function(req, res) {
  res.render('home', {
    title: 'Home'
  });
};

exports.wefihost = function(req, res){
ensureAuthenticated(req, res, function(){

		 	res.render('wefihost', {
	 	title: 'Wefi Host Dashboard'
		});
		
});

};


function ensureAuthenticated(req, res, next){
	 if (req.isAuthenticated())
	 {
	 	return next();

	 }

	 else {
	 	  req.session.error = 'Please sign in!';
	 	  res.redirect('/login');
	 	};

	 };