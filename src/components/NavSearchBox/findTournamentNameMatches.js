const testFunctions = {
    findAcronymMatches(tournamentName, value) {
        let matches = [];

        const match = value.match(/^([a-zA-Z]+)\s*(\d*)$/);
        if (match === null) {
            return false;
        }

        /*
            TI       7
            ^acronym ^iteration
        */
        const [ , acronym, iteration ] = match;
        let leftAcronym = acronym;
        const tournamentWords = tournamentName.split(" "); //Don't need to filter this one!

        for (const tournamentWord of tournamentWords) {
            //Check first char of acronym
            if (tournamentWord[0] === leftAcronym[0]) {
                //Remove first char from leftAcronym so we can search for the next one
                leftAcronym = leftAcronym.substr(1);

                //Add to matches
                const index = tournamentName.indexOf(tournamentWord);
                matches.push({
                    start: index,
                    end: index
                });
            }
        }

        //Check iteration / year
        if (iteration.length > 0) {
            const index = tournamentName.lastIndexOf(iteration)
            if (
                index >= 0
                //Special check for TI, because users can search for "TI 1" and for "TI 2011"
                && (acronym !== "ti" || iteration.length > 2 || tournamentName.endsWith(iteration))
            ) {
                matches.push({
                    start: index,
                    end: index + iteration.length - 1
                });
            }
        }

        if (acronym.length + (iteration.length > 0 ? 1 : 0) === matches.length) {
            //We need to find a match for every char and one extra match if there is a iteration
            return matches;
        }

        return false;
    },

    findWordMatches(tournamentName, value) {
        let matches = [];
        const isTI = tournamentName.startsWith("the international");

        function splitWordList(wordList) {
             // We use filter because trim() doesn't eliminiate double spaces between words.
            return wordList.split(" ").filter(word => word.length > 0);
        }

        const tournamentWords = splitWordList(tournamentName);
        const valueWords = splitWordList(value);

        for (const valueWord of valueWords) {
            for (const tournamentWord of tournamentWords) {
                const tournamentWordIndex = tournamentWord.lastIndexOf(valueWord);
                if (tournamentWordIndex >= 0) {
                    if (
                        valueWord.length > 3 //Just a match no matter where it is enough if we have more than 3 chars
                        || tournamentWord.startsWith(valueWord)
                        //Special check for TI,
                        //because users can search for "The International 1" and for "The International 2011"
                        || isTI && tournamentWord.endsWith(valueWord)
                    ) {
                        const index = tournamentName.indexOf(tournamentWord) + tournamentWordIndex;
                        matches.push({
                            start: index,
                            end: index + valueWord.length - 1
                        });
                        break;
                    }
                }
            }
        }

        if (matches.length === valueWords.length) { //We need to find a match for every value word
            return matches;
        }

        return false;
    }
};

export default (casedTournamentName, casedValue) => {
    const tournamentName = casedTournamentName.toLowerCase();
    const value = casedValue.toLowerCase();

    let sortIndex = 0;
    for (const testFunction of Object.values(testFunctions)) {
        const matches = testFunction(tournamentName, value);
        if (matches !== false) {
            return {
                sortIndex,
                matches
            };
        }

        sortIndex++;
    }

    return {
        matches: false
    }
}
