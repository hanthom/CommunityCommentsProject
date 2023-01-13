## Community Comments and Testimonials Page

## To Start
+ Run `npm start`. No need to run `npm install` as no packages were added to this repo.

### Notes

The application is somewhat responsive, however I did not spend too much time to make significant improvements there as that did not seem to be the intent. 

### Decisions

Due to time constraints having missed out on some of the time for completing this project due to illness, my filtering of the comments via the search input is not done in the best way to my opinion. Ideally I wouldn't need to have two sets of comments (comments and filteredComments) in the context to have the original source of truth and what should be displayed. But I figured it was better to show it working then potentially run past the deadline of the 72 hour mark. Also, with a little more time, I'm sure there could be a couple of other optimizations around small aspects of the components.

Another note, the search checks all values for matching strings, which is ok, but as an actual user experience, could be a little weird to just grab aspects of comments versus actual identifiable data like name, location, etc.


