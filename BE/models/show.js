function init(mongoose) {
    console.log('Initializing show schema');
    var showSchema = new mongoose.Schema({
        _id: {
            type: String,
            required: true,
            index: {
                unique: true
            }
        },
        imdb_id: String,
        title: String,
        slug: String,
        synopsis: String,
        year: String,
        images: {},
        runtime: String,
        rating: {},
        country: String,
        network: String,
        status: String,
        air_day: String,
        air_time: String,
        num_seasons: Number,
        genres: [],
        last_updated: Number,
        episodes: [],
        OMDBAPIObject: Object
    });

    showSchema.statics.findEpisodeBySeasonAndEpisodeNum = function(episodes, seasonNum, episodeNum, c) {
        episodes.forEach(function (t) {
            if (t.season == seasonNum && t.episode == episodeNum) {
                return t.exec(c);
            }
        });
    };

    var Show = mongoose.model('Show', showSchema);
}

module.exports = init;
