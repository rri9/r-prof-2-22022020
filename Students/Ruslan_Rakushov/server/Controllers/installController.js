const Install = require('../Models/install.js');

module.exports = {
  async installCount(req, res) {
    let install = await Install.findOne({});
    if (install) {
      install.installs = install.installs+1;
    } else {
      install = new Install();
      install.installs = 1;
    }
    await install.save(err => {
      if (err) console.log(err);
    });
  },
};
