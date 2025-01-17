const Listing = require("../models/listingModel");

module.exports.index = async (req, res) => {
    let allListings = await Listing.find();
    res.render("listings/index.ejs", { allListings });
  }

  module.exports.renderNewForm = (req, res) => {
    res.render("listings/new.ejs");
  }

  module.exports.editLising = async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    let originalImageUrl = listing.image.url;
    originalImageUrl = originalImageUrl.replace("/upload", '/upload/w_250');
    res.render("listings/edit.ejs", { listing ,originalImageUrl });
  }


  module.exports.updateListing = async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });

    if(typeof req.file !== "undefined"){
    let url = req.file.path;
    console.log(url)
    let filename = req.file.filename;
    listing.image = { url, filename };
    await listing.save()
    }

    req.flash("success", "Update Successfully!");
    res.redirect(`/listings/${id}`);
  }

   module.exports.deleteListing = async (req, res) => {
       const { id } = req.params;
       let deletedList = await Listing.findByIdAndDelete(id);
       req.flash("success", "Listing Deleted!");
       res.redirect("/listings");
     }

     module.exports.showAllListings = async (req, res) => {
        let { id } = req.params;
        let listing = await Listing.findById(id)
          .populate({
            path: "reviews",
            populate: {
              path: "author",
            },
          })
          .populate("owner");
        if (!listing) {
          req.flash("error", "Listing You requested for doesn't exist!");
          res.redirect("/listings");
        }
    
        res.render("listings/show.ejs", { listing });
      }

      //for post route

      module.exports.createListing = async (req, res, next) => {
        let url = req.file.path;
        let filename = req.file.filename;
        console.log("URL: ", url, "...", filename);
        
        let listing = req.body.listing;
        let addList = new Listing(listing);
        addList.owner = req.user._id;
        addList.image = {url, filename};
        await addList.save();
        req.flash("success", "New Listing Created!");
        res.redirect("/listings");
      }
      