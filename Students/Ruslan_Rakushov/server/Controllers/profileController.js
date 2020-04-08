const Profile = require('../Models/profile.js');

module.exports = {
  async load(req, res) {
    const profile = await Profile.findOne({ 'tokens.token': req.cookies.token });
    if (!profile || profile.length === 0) {
      res.status(404);
      res.send();
    } else {
      res.json(profile);
    }
  },

  async send(req, res) {
    try {
      let profile = new Profile(req.body);
      const usr = await Profile.findByIdAndUpdate(profile._id,
        profile, { new: true });
      if (!usr) {
        await profile.save();
      }
      res.json({ status: 1, profile: profile });
    } catch {
      res.json({ status: false });
    }
  },
};
