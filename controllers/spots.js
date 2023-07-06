const Spot = require('../models/spot');
module.exports.index = async (req, res) => {
    const spots = await Spot.find({});
    res.render('spots/index', { spots })
}

module.exports.renderNewForm = (req, res) => {
    res.render('spots/new');
}

module.exports.createSpot = async (req, res, next) => {
    const spot = new Spot(req.body.spot);
    spot.images = req.files.map(f => ({ url: f.path, filename: f.filename }));
    spot.author = req.user._id;
    await spot.save();
    req.flash('success', 'Successfully made a new spot!');
    res.redirect(`/spots/${spot._id}`)
}

module.exports.showSpot = async (req, res) => {
    const spot = await Spot.findById(req.params.id)
    .populate({
        path: 'reviews',
        populate: {
            path: 'author'
        }
    }).populate('author');
    if (!spot) {
        req.flash('error', 'Cannot find that spot!');
        return res.redirect('/spots');
    }
    console.log(spot)
    res.render('spots/show', { spot });
}

module.exports.renderEditForm = async (req, res) => {
    const spot = await Spot.findById(req.params.id);
    if(!spot){
        req.flash('error', 'Cannot find that spot!');
        return res.redirect('/spots');
    }
    res.render('spots/edit', { spot });
}

module.exports.updateSpot = async (req, res) => {
    const { id } = req.params;
    const spot = await Spot.findByIdAndUpdate(id, { ...req.body.spot });
    const imgs = req.files.map(f => ({ url: f.path, filename: f.filename }));
    spot.images.push(...imgs);
    await spot.save();
    req.flash('success', 'Successfully updated spot!');
    res.redirect(`/spots/${spot._id}`)
}

module.exports.deleteSpot = async (req, res) => {
    const { id } = req.params;
    await Spot.findByIdAndDelete(id);
    req.flash('success', 'Successfully deleted spot!')
    res.redirect('/spots');
}