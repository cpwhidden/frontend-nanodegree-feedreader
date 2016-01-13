/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        it('url defined and not empty', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            });
        });

        it('name defined and not empty', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            });
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
    });

    describe('The menu', function() {
        it('hidden at startup', function() {
            expect(document.getElementsByTagName('body')[0].classList.contains('menu-hidden')).toBe(true);
            // Get bounding rect of the hidden menu
            var bounds = document.getElementsByClassName('slide-menu')[0].getBoundingClientRect();
            expect(bounds.left + bounds.width).toBe(0);
        });

        it('menu icon displays and hides menu', function(done) {
            var delay = 201;
            var body = document.getElementsByTagName('body')[0];
            var icon = document.getElementsByTagName('body')[0].getElementsByClassName('menu-icon-link')[0];
            var menu = document.getElementsByClassName('slide-menu')[0];
            // Programmatically click the menu icon.  Then wait 200 ms before testing menu bounds
            icon.click();
            setTimeout(function() {
                var hidden = body.classList.contains('menu-hidden');
                var left = menu.getBoundingClientRect().left;
                expect(hidden).toBe(false);
                expect(left).toBe(0);

                // Click icon a second time and test whether it returns to its original position.
                icon.click();
                setTimeout(function() {
                    var hidden = body.classList.contains('menu-hidden');
                    var bounds = menu.getBoundingClientRect();
                    var right = bounds.left + bounds.width;
                    expect(hidden).toBe(true);
                    expect(right).toBe(0);  
                    done();
                }, delay);
            }, delay);
        });
    });

    describe('Initial Entries', function() {
        beforeEach(function(done) {
            loadFeed(0, done);        
        });

        it('has at least one entry element in feed container', function() {
            var feed = document.getElementsByClassName('feed')[0];
            var entries = feed.getElementsByClassName('entry');
            expect(entries.length).toBeGreaterThan(0);
        });
    });

    describe('New Feed Selection', function() {
        // test variable will hold variables to be tested
        var test = this;

        beforeEach(function(done) {
            // make two feed arrays
            test.firstFeed = [];
            test.secondFeed = [];
            var i = 0;
            // Load feed and process results
            loadFeed(i, function() {
                var feed = document.getElementsByClassName('feed')[0];
                var entries = feed.getElementsByClassName('entry');
                for (var e = 0; e < entries.length; e++) {
                    // Add to array to be tested later
                    test.firstFeed.push(entries[0].getElementsByTagName('h2')[0].innerHTML);
                }
                ++i;
                // Load second feed
                loadFeed(i, function() {
                    var feed = document.getElementsByClassName('feed')[0];
                    var entries = feed.getElementsByClassName('entry');
                    for (var e = 0; e < entries.length; e++) {
                        test.secondFeed.push(entries[0].getElementsByTagName('h2')[0].innerHTML);
                    }
                    // End async steps in unit test
                    done();
                });
            });
        });

        it('changes content on new selection', function() {
            expect(test.firstFeed).not.toEqual(test.secondFeed);
        });
    });

    // Delete button not yet implemented    
    describe('Delete button', function() {
        it('deletes entry when clicked', function() {
            var feed = document.getElementsByClassName('feed')[0];
            var entries = feed.getElementsByClassName('entry');
            for (var e = 0; e < entries.length; e++) {
                // Click delete button
                entries[e].getElementsByClassName('delete').click();
            }
            expect(entries.length).toBe(0);
        });
    });
    
}());