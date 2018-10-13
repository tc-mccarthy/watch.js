# Watch.js

Scroll spy library that leverages IntersectionObserver

## Usage

After including the JS on your page you can instantiate a new `Watch` object passing to it a valid selector string, DOM Element or jQuery object. Use the `inView` method to define the function to be called whenever the object comes in to view. Use the `outView` method whenever an object goes out of view.

## Example

    <div id="myThing"></div>

    <script>
      const watcher = new Watch("#myThing");

      watcher.inView(() => {
        // what to do when the element comes in to view
      }).outView(() => {
        // what to do when the element goes out of view
      });
    </script>
