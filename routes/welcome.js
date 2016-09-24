welcome.method = 'get';
welcome.path = '/';

function* welcome() {
  yield this.render('welcome');
}

module.exports = welcome;
