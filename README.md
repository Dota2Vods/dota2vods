[![GitHub stars](https://img.shields.io/github/stars/dota2vods/dota2vods.svg?style=social&label=Stars)](https://github.com/dota2vods/dota2vods)
[![GitHub issues](https://img.shields.io/github/issues/dota2vods/dota2vods.svg?style=social)](https://github.com/dota2vods/dota2vods/issues)

[Dota2Vods](https://github.com/dota2vods/dota2vods) is intended to become a website where you can easily access the youtube vods of all major dota tournaments without the hazzle to type the tournament and team names into the youtube search by hand.

However at the moment everything is still in early development and the project is far away from this vision.  
If you are still interested in watching some dota games, check out [/r/DotaVods](https://www.reddit.com/r/DotaVods/), they are great!

--------------------------------------------------------------------------------

#### But if /r/DotaVods already collects dota vods, why create a separate website?
Yes the subreddit is great, but it's still just a list of games. I have no bracket and there is also no option to "turn off" their spoiler protection.  
What i want is a website where you just need to type in the tournament name and can then either go through the games automatically one by one or disable the spoiler protection and just select a game from the bracket.

*(They are also missing all tournaments from before 2015)*

--------------------------------------------------------------------------------

Development
-----------

### Setup
```shell
   git clone https://github.com/dota2vods/dota2vods.git
   cd dota2vods
   make install
   make build-data #Downloads or updates the tournament data
   make build-html #Builds all entry html files and saves them in a json file used by the dev-server
   make watch #Starts the webpack-dev-server
```

### Build
Execute `make build` to run all build commands (this is what gets called before a deploy).  
Take a look at the `Makefile` to see a list of all available sub-build commands.

### Storybook
This project uses [React Storybook](https://getstorybook.io/) to develop some of it's components.  
Execute `make watch-storybook` to start the storybook in watch mode.
