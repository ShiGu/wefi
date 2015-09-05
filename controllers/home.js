/**
 * GET /
 * Home page.
 */
exports.index = function(req, res) {
if(req.isAuthenticated()){
	res.redirect('/registeredUsers');

}
else{

 res.render('home', {
    title: 'Home'
  });
}
 
};

exports.registeredUsers = function(req, res){
	ensureAuthenticated(req, res, function(){
		res.render('registeredUsers', {
			title: 'Registered Users'
		});
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