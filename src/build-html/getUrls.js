import Promise from "bluebird";
import path from "path";
import fs from "fs";

Promise.promisifyAll(fs);

export default (dataPath) => new Promise((resolve, reject) => {
    console.log("Generating urls..");

    //Init urls with static paths
    let urls = [
        "/",
        "/about"
    ];

    //Add tournaments
    const tournamentsFolder = path.join(dataPath, "tournaments");
    fs.readdirAsync(tournamentsFolder).then(tournamentFiles => {
        for (const tournamentFile of tournamentFiles) {
            const tournamentPrefix = "/" + tournamentFile.substring(0, tournamentFile.lastIndexOf("."));
            const tournament = require(path.join(tournamentsFolder, tournamentFile));
            urls.push(tournamentPrefix); //Tournament main url

            for (const stageId of Object.keys(tournament.stages)) {
                urls.push([tournamentPrefix, stageId].join("/")); //Stage urls

                const stage = tournament.stages[stageId];
                if (stage.type === "groups") {
                    for (const group of Object.values(stage.groups)) {
                        for (const match of group.matches) {
                            for (const game of match.games) {
                                urls.push([tournamentPrefix, stageId, game.id].join("/")); //Game urls
                            }
                        }
                    }
                }
            }
        }

        resolve(urls);
    });
});
