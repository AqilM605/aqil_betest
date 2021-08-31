const passport = require('passport');

// This middlware is use to protec route
// Trigger jwt validation and decide what action to take if validation success or validation fail
exports.authMiddleware = () => {
    return function (req, res, next) {
        passport.authenticate('jwt', {}, function (err, user, info) {

            if (!user || err) {
                return res.status(401).send({
                    message: 'Unauthorized access, please login to access the API.',
                });
            } else {
                next();
            }

        })(req, res, next);
    };
};
