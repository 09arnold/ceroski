# Ceros Ski Code Challenge 

Welcome to the Ceros Code Challenge - Ski Edition!

<small>_[What I came up with](#what-i-came-up-with)_</small>

For this challenge, we have included some base code for Ceros Ski, our version of the classic Windows game SkiFree. If
you've never heard of SkiFree, Google has plenty of examples. Better yet, you can play our version here: 
http://ceros-ski.herokuapp.com/  

Or deploy it locally by running:
```
npm install
npm run dev
```

There is no exact time limit on this challenge and we understand that everyone has varying levels of free time. We'd 
rather you take the time and produce a solution up to your ability than rush and turn in a suboptimal challenge. Please 
look through the requirements below and let us know when you will have something for us to look at. If anything is 
unclear, don't hesitate to reach out.

**Requirements**

* **Fix a bug:**

  There is a bug in the game. Well, at least one bug that we know of. Use the following bug report to debug the code
  and fix it.
  * Steps to Reproduce:
    1. Load the game
    1. Crash into an obstacle
    1. Press the left arrow key
  * Expected Result: The skier gets up and is facing to the left
  * Actual Result: Giant blizzard occurs causing the screen to turn completely white (or maybe the game just crashes!)
  
* **Write unit tests:**

  The base code has Jest, a unit testing framework, installed. Write some unit tests to ensure that the above mentioned
  bug does not come back.
  
* **Extend existing functionality:**

  We want to see your ability to extend upon a part of the game that already exists. Add in the ability for the skier to 
  jump. The asset file for jumps is already included. All you gotta do is make the guy jump. We even included some jump 
  trick assets if you wanted to get really fancy!
  * Have the skier jump by either pressing a key or use the ramp asset to have the skier jump whenever he hits a ramp.
  * The skier should be able to jump over some obstacles while in the air. 
    * Rocks can be jumped over
    * Trees can NOT be jumped over
  * Anything else you'd like to add to the skier's jumping ability, go for it!
   
* **Build something new:**

  Now it's time to add something completely new. In the original Ski Free game, if you skied for too long, 
  a yeti would chase you down and eat you. In Ceros Ski, we've provided assets for a Rhino to run after the skier, 
  catch him and eat him.
  * The Rhino should appear after a set amount of time or distance skied and chase the skier, using the running assets
    we've provided to animate the rhino.
  * If the rhino catches the skier, it's game over and the rhino should eat the skier. 

* **Documentation:**

  * Update this README file with your comments about your work; what was done, what wasn't, features added & known bugs.
  * Provide a way for us to view the completed code and run it, either locally or through a cloud provider
  
* **Be original:**  
  * This should go without saying but don’t copy someone else’s game implementation!

**Grading** 

Your challenge will be graded based upon the following:

* How well you've followed the instructions. Did you do everything we said you should do?
* The quality of your code. We have a high standard for code quality and we expect all code to be up to production 
  quality before it gets to code review. Is it clean, maintainable, unit-testable, and scalable?
* The design of your solution and your ability to solve complex problems through simple and easy to read solutions.
* The effectiveness of your unit tests. Your tests should properly cover the code and methods being tested.
* How well you document your solution. We want to know what you did and why you did it.

**Bonus**

*Note: You won’t be marked down for excluding any of this, it’s purely bonus.  If you’re really up against the clock, 
make sure you complete all of the listed requirements and to focus on writing clean, well organized, and well documented 
code before taking on any of the bonus.*

If you're having fun with this, feel free to add more to it. Here's some ideas or come up with your own. We love seeing 
how creative candidates get with this.
 
* Provide a way to reset the game once it's over
* Provide a way to pause and resume the game
* Add a score that increments as the skier skis further
* Increase the difficulty the longer the skier skis (increase speed, increase obstacle frequency, etc.)
* Deploy the game to a server so that we can play it without having to install it locally
* Write more unit tests for your code

We are looking forward to see what you come up with!

---

## What I came up with

### What was done

* **Held back the blizzard:** I fixed the bug that used to occur when the skier crashed and the left key was pressed. Now, the skier will move out of the way of the obstacle it crashed into and then stand facing the direction of the key that was used to move the skier. If it's the down arrow key though, the skier will set off as soon it's cleared the obstacle

* **Wrote initial unit tests to ensure the blizzard doesn't return:** I wrote unit tests to test the turning and moving capabilities of the skier

* **Taught skier how to jump:** I added the ability for the skier to jump either by hitting a _jump ramp_ or when the space key is pressed. The skier can jump rocks but sadly not jump high enough to avoid colliding with trees as is expected. _The jump is fancy though, with a front flip and all_.

* **Added a hungry Rhino:** I added a rhino that appears after a configurable number of seconds (_Currently set to 15_) of skiing. The rhino will basically chase down the skier and well, eat the skier. The rhino's speed starts configurable.

* **Delivery of the challenge:** I created a [Github Repo](https://github.com/09arnold/ceroski) for the challenge to make it available for download. I also took advantage of Github Pages to deliver the Ceros Ski Game online <a href="https://09arnold.github.io/ceroski/" target="_blank">here</a>, updated directly by pushing the dist folder from `npm run build` to the gh-pages branch, using a trick from <a href="https://medium.com/linagora-engineering/deploying-your-js-app-to-github-pages-the-easy-way-or-not-1ef8c48424b7" target="_blank">this article</a>

* **Restart after game over:** After the rhino has eaten the skier, a prompt appears informing the player the game is over and shows the score. The prompt will also restart the game

* **Take a ski break:** The game will now pause and resume when the `ESC` key is pressed. It also shows a dialog that informs you when the game is paused.

* **Scoreboard:** A handy scoreboard has been added to the top right corner of the screen that shows the current score, which is accrued when the skier is skiing. The scoreboard also shows the duration of time since the skier started skiing

* **Rhino rage:** As the game progresses, the rhino becomes faster at a configurable interval.

* **A bit of game mechanics balancing:** To be a bit fairer to the skier, the rhino will slow down a bit while the skier is airborne. _Probably to admire that front flip_. This makes the game more playable so you get to play for longer and stand a chance against the rhino

* **Added a Sound Manager:** The sound manager plays a sound when the rhino is unleashed. 

* **Found and fixed bug:** Sometimes on reload, the `previousGameWindow` object would be null and bring that blizzard around. I added a check for that and return when the object is not available

### What wasn't done
* **Rhino running assets usage:** Currently, only one rhino asset is used when the rhino is on the move 
### Known Bugs
* **Scoreboard updating:** The scoreboard keeps updating even when the game is paused